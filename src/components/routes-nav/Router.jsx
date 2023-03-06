import React from "react";
import { Routes, Route } from "react-router-dom";
import PlantSearch from "../plant/PlantSearch";
import Plant from "../plant/Plant";
import User from "../profile/User";
import Home from "../home/Home";
import SignupForm from "../auth/SignupForm";
import LoginForm from "../auth/LoginForm";
import UpdateUserForm from "../profile/UpdateUserForm";

import PrivateRoutes from "./PrivateRoutes";

const Router = ({
  signup,
  login,
  update,
  handleIsLoading,
  isLoading,
  toast,
}) => {
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
          <Route
            element={<UpdateUserForm update={update} />}
            path="/users/:username/update"
            exact
          />
          <Route element={<User />} path="/users/:username" exact />
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
