import React from "react";

const PlantGrid = ({ plants }) => {
  return (
    <>
      {plants.map((plant) => {
        return (
          <div key={plant.id} className="Plant">
            <img className="Plant-img" alt={plant.name} src={plant.imgUrl} />
            <h3>{plant.name}</h3>
          </div>
        );
      })}
    </>
  );
};

export default PlantGrid;
