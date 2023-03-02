import React from "react";
import { Routes, Route } from "react-router-dom";
import PlantSearch from "../Plant/PlantSearch";

const Router = ({ plants, search }) => {
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
          element={<PlantSearch plants={plants} search={search} />}
        />
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
