import React, { useState, useEffect } from "react";
import "./App.css";
import Router from "./components/Navigation-Routes/Router";
import Navbar from "./components/Navigation-Routes/Navbar";
import GardenGoodApi from "./api/api";
import WeatherApi from "./api/weatherApi";
import UserContext from "./auth/UserContext";
import WeatherContext from "./WeatherContext";
import jwt_decode from "jwt-decode";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [weather, setWeather] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("gardengood-token"));
  const [userWasUpdated, setUserWasUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleToast = (type, msg) => {
    console.log(toast[type](msg));
  };

  useEffect(() => {
    const getCurrUser = async () => {
      if (token) {
        try {
          GardenGoodApi.token = token;
          let { username } = jwt_decode(token);
          const user = await GardenGoodApi.getCurrentUser(username);
          setCurrUser(user);
          localStorage.setItem("gardengood-token", token);

          console.log();
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

  const handleIsLoading = (bool) => {
    setIsLoading(bool);
  };

  const login = async ({ username, password }) => {
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

  const signup = async ({
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

  const logout = async () => {
    try {
      setToken(null);
      setCurrUser(null);
      GardenGoodApi.token = null;
      localStorage.setItem("gardengood-token", "");
      const message = `Successfully logged out.`;
      handleToast("success", message);
    } catch (error) {
      return { message: error };
    }
  };

  return (
    <div className="App">
      <UserContext.Provider value={currUser}>
        <WeatherContext.Provider value={weather}>
          <Navbar logout={logout} />

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
            login={login}
            signup={signup}
            logout={logout}
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
