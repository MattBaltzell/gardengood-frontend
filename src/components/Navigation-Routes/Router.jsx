import React from "react";
import { Routes, Route } from "react-router-dom";
import PlantSearch from "../Plant/PlantSearch";
import Plant from "../Plant/Plant";

const Router = ({ handleIsLoading, isLoading }) => {
  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Home Page</h1>
            </>
          }
        />
        <Route
          path="/plants"
          element={
            <PlantSearch
              isLoading={isLoading}
              handleIsLoading={handleIsLoading}
            />
          }
        />
        <Route path="/plants/:id" element={<Plant />} />

        <Route
          path="/logout"
          element={
            <>
              <h1>Logged Out</h1>
            </>
          }
        />
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
