import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import PlantSearch from "../Plant/PlantSearch";
import Plant from "../Plant/Plant";
import Home from "../../Home/Home";
import SignupForm from "../../auth/SignupForm";
import LoginForm from "../../auth/LoginForm";
import UserContext from "../../auth/UserContext";
import PrivateRoutes from "./PrivateRoutes";

const Router = ({ signup, login, handleIsLoading, isLoading, toast }) => {
  const currUser = useContext(UserContext);

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<PrivateRoutes />}>
          <Route
            element={
              <PlantSearch
                isLoading={isLoading}
                handleIsLoading={handleIsLoading}
              />
            }
            path="/plants"
            exact
          />
          <Route element={<Plant />} path="/plants/:id" />
        </Route>

        <Route
          path="/signup"
          element={<SignupForm signup={signup} toast={toast} />}
        />
        <Route
          path="/login"
          element={<LoginForm login={login} toast={toast} />}
        />

        <Route
          path="*"
          element={
            <>
              <h1>404: PAGE NOT FOUND</h1>
            </>
          }
        />
      </Routes>
    </div>
  );
};

export default Router;
