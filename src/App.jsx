import React, { useState, useEffect, useCallback } from "react";
import "./App.css";
import Router from "./components/routes-nav/Router";
import Navbar from "./components/routes-nav/Navbar";
import GardenGoodApi from "./api/api";
import WeatherApi from "./api/weatherApi";
import UserContext from "./components/auth/UserContext";
import WeatherContext from "./WeatherContext";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [weather, setWeather] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("gardengood-token"));
  const [userWasUpdated, setUserWasUpdated] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrUser = async () => {
      if (token) {
        try {
          GardenGoodApi.token = token;
          let { username } = jwt_decode(token);
          const user = await GardenGoodApi.getCurrentUser(username);
          setCurrUser(user);
          localStorage.setItem("gardengood-token", token);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getCurrUser();
    setUserWasUpdated(false);
  }, [token, userWasUpdated]);

  useEffect(() => {
    const getWeather = async () => {
      try {
        if (!currUser) return;
        const weather = await WeatherApi.getCurrentWeather(currUser.zipCode);
        setWeather(weather);
      } catch (err) {
        console.error(err);
      }
    };

    if (process.env.NODE_ENV === "production") {
      const checkWeather = setInterval(() => {
        getWeather();
        return () => {
          clearInterval(checkWeather);
        };
      }, 600000);
    }
    getWeather();
  }, [currUser]);

  const handleToast = (type, msg) => {
    return toast[type](msg);
  };

  const handleMenuIsOpen = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const handleIsLoading = useCallback((bool) => {
    setIsLoading(bool);
  }, []);

  const handleLogin = async ({ username, password }) => {
    try {
      const token = await GardenGoodApi.login({ username, password });
      setToken(token);
      const message = `Welcome back, ${username}!`;
      handleToast("success", message);
      return { message: message };
    } catch (error) {
      return { message: error };
    }
  };

  const handleSignup = async ({
    username,
    password,
    firstName,
    lastName,
    email,
    zipCode,
  }) => {
    try {
      const token = await GardenGoodApi.signup({
        username,
        password,
        firstName,
        lastName,
        email,
        zipCode,
      });
      setToken(token);

      const message = `Welcome, ${username}!`;
      handleToast("success", message);
    } catch (error) {
      return { message: error };
    }
  };

  const handleUpdate = async (data) => {
    try {
      await GardenGoodApi.updateUser(data);
      setUserWasUpdated(true);
      const message = `Updated ${data.username}!`;
      handleToast("success", message);
      return message;
    } catch (error) {
      return { message: error };
    }
  };

  const handleLogout = async () => {
    try {
      setToken(null);
      setCurrUser(null);
      GardenGoodApi.token = null;
      localStorage.setItem("gardengood-token", "");
      const message = `Successfully logged out.`;
      handleToast("success", message);
      setMenuIsOpen(false);
    } catch (error) {
      return { message: error };
    }
  };

  return (
    <div className="App">
      <UserContext.Provider value={currUser}>
        <WeatherContext.Provider value={weather}>
          <Navbar
            logout={handleLogout}
            handleMenuIsOpen={handleMenuIsOpen}
            menuIsOpen={menuIsOpen}
          />

          <ToastContainer
            position="top-right"
            autoClose={4000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />

          <Router
            login={handleLogin}
            signup={handleSignup}
            update={handleUpdate}
            logout={handleLogout}
            handleIsLoading={handleIsLoading}
            isLoading={isLoading}
            toast={handleToast}
          />
        </WeatherContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
