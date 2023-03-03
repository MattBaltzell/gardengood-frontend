import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import GardenGoodApi from "../../api/api";
import { BallTriangle } from "react-loader-spinner";
import "./Plant.css";

const Plant = () => {
  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(true);
  const [plant, setPlant] = useState({});

  useEffect(() => {
    const getPlant = async () => {
      const plant = await GardenGoodApi.getPlant(id);
      await setPlant(plant);
      setIsLoading(false);
    };

    getPlant();
  }, [id]);

  if (isLoading) {
    return (
      <main>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="var(--color-primary-400)"
          ariaLabel="ball-triangle-loading"
          wrapperClass={{}}
          wrapperStyle=""
          visible={true}
        />
        <p className="pulsing">Loading...</p>
      </main>
    );
  }
  console.log(plant);
  return (
    <main className="Plant">
      <small>{plant.isPerrenial ? "Perrenial" : "Annual"}</small>
      <img className="Plant__img" alt={plant.name} src={plant.imgUrl} />
      <h1>{plant.name}</h1>
      <h4>Species:</h4>
      <p>{plant.species}</p>
      <h4>Days to Maturity</h4>
      <p>{`${plant.daysToMaturityMin} - ${plant.daysToMaturityMax}`}</p>
      <h4>Sun Amount</h4>
      <p>{plant.sunlight.join(", ")}</p>
      <h4>Growing Seasons</h4>
      <p>{plant.growingSeasons.join(", ")}</p>
      <h4>About:</h4>
      <p>{plant.description}</p>
      <hr></hr>
      <h2>Instructions</h2>
      <h4>Planting</h4>
      <p>{plant.instructions.planting || "Coming soon."}</p>

      <h4>Pruning</h4>
      <p>{plant.instructions.pruning || "Coming soon."}</p>

      <h4>Watering</h4>
      <p>{plant.instructions.watering || "Coming soon."}</p>
    </main>
  );
};

export default Plant;
