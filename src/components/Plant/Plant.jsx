import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

  return (
    <>
      <Link to="/plants" className="breadcrumb">
        Back to Plants
      </Link>
      <main className="Plant">
        <div className="Plant__info-container">
          <div className="Plant__info-header">
            <h1>{plant.name}</h1>
            <small>{plant.isPerrenial ? "Perrenial" : "Annual"}</small>
          </div>

          <div className="Plant__img-info-group">
            <img className="Plant__img" alt={plant.name} src={plant.imgUrl} />
            <div className="Plant__info-group">
              <div className="Plant__info">
                <h4>Species:</h4>
                <p>{plant.species}</p>
              </div>
              <div className="Plant__info">
                <h4>Days to Maturity</h4>
                <p>{`${plant.daysToMaturityMin} - ${plant.daysToMaturityMax}`}</p>
              </div>
              <div className="Plant__info">
                <h4>Sun Amount</h4>
                <p>{plant.sunlight.join(", ")}</p>
              </div>
              <div className="Plant__info">
                <h4>Growing Seasons</h4>
                <p>{plant.growingSeasons.join(", ")}</p>
              </div>
            </div>
          </div>

          <hr></hr>

          <div className="Plant__info">
            <h4>About</h4>
            <p>{plant.description}</p>
          </div>
          <hr></hr>
          <h2>Instructions</h2>
          <div className="Plant__instructions">
            <div className="Plant__info">
              <h4>Planting</h4>
              <p>{plant.instructions.planting || "Coming soon."}</p>
            </div>
            <div className="Plant__info">
              <h4>Pruning</h4>
              <p>{plant.instructions.pruning || "Coming soon."}</p>
            </div>
            <div className="Plant__info">
              <h4>Watering</h4>
              <p>{plant.instructions.watering || "Coming soon."}</p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Plant;
