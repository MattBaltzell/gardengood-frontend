import React, { useState, useEffect } from "react";
import "./Plant.css";

const Plant = ({ plant }) => {
  return (
    <main className="Plant">
      <h1>{plant.name}</h1>
    </main>
  );
};

export default Plant;
