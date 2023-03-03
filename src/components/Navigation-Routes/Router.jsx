import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import PlantSearch from "../Plant/PlantSearch";
import Plant from "../Plant/Plant";
import Home from "../../Home/Home";
import SignupForm from "../../auth/SignupForm";
import LoginForm from "../../auth/LoginForm";
import UserContext from "../../auth/UserContext";
import PrivateRoutes from "./PrivateRoutes";

const Router = ({ signup, login, handleIsLoading, isLoading }) => {
  const user = useContext(UserContext);
  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            !user ? (
              <Home />
            ) : (
              <>
                <h1>Welcome back, {user.firstName}!</h1>
              </>
            )
          }
        />

        <Route element={<PrivateRoutes />}>
          <Route
            element={
              <PlantSearch
                isLoading={isLoading}
                handleIsLoading={handleIsLoading}
              />
            }
            path="/plants"
          />
          <Route element={<Plant />} path="/plants/:id" />
        </Route>

        <Route path="/signup" element={<SignupForm signup={signup} />} />
        <Route path="/login" element={<LoginForm login={login} />} />

        <Route
          path="*"
          element={
            <>
              <h1>NO PAGE</h1>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default Router;
