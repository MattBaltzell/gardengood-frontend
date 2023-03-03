import React, { useState, useEffect } from "react";
import "./App.css";
import Router from "./components/Navigation-Routes/Router";
import Navbar from "./components/Navigation-Routes/Navbar";
import GardenGoodApi from "./api/api";
import UserContext from "./auth/UserContext";
import jwt_decode from "jwt-decode";

function App() {
  const [currUser, setCurrUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("gardengood-token"));
  const [userWasUpdated, setUserWasUpdated] = useState(false);
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

  const handleIsLoading = (bool) => {
    setIsLoading(bool);
  };

  const login = async ({ username, password }) => {
    try {
      const token = await GardenGoodApi.login({ username, password });
      setToken(token);
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
    } catch (error) {
      return { message: error };
    }
  };

  return (
    <div className="App">
      <UserContext.Provider value={currUser}>
        <Navbar logout={logout} />
        <Router
          login={login}
          signup={signup}
          logout={logout}
          handleIsLoading={handleIsLoading}
          isLoading={isLoading}
        />
      </UserContext.Provider>
    </div>
  );
}

export default App;
