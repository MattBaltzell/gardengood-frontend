import React, { useState, useEffect } from "react";
import GardenGoodApi from "../../api/api";
import "./Plant.css";
import "../form/Form.css";
import PlantList from "./PlantList";
import { BallTriangle } from "react-loader-spinner";
import useLoading from "../../hooks/useLoading";

const PlantSearch = () => {
  const [plantsList, setPlantsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, handleIsLoading] = useLoading();

  const search = async (term) => {
    handleIsLoading(true);
    await setSearchTerm(term);
    handleIsLoading(false);
  };

  useEffect(() => {
    async function getPlants(filterTerm) {
      try {
        handleIsLoading(true);
        const plants = await GardenGoodApi.getAllPlants(filterTerm);
        await setPlantsList(plants);
        handleIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    getPlants(searchTerm);
  }, [searchTerm, handleIsLoading]);

  const INITIAL_STATE = { searchTerm: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
    search(value.trim() || undefined);
  };

  useEffect(() => {
    return () => {
      setFormData({ searchTerm: "" });
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleIsLoading(true);
    search(formData.searchTerm.trim() || undefined);
  };

  return (
    <main className="Plant-search">
      <h1>Plant Directory</h1>
      <form
        autoComplete="off"
        className="Plant-search__form"
        onSubmit={handleSubmit}
      >
        <input
          autoComplete="false"
          name="hidden"
          type="text"
          style={{ display: "none" }}
        />
        <input
          className="Form__input--text"
          name="searchTerm"
          onChange={handleChange}
          type="text"
          value={formData.searchTerm}
          placeholder="Start typing plant name"
        />
      </form>
      {isLoading ? (
        <>
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
        </>
      ) : plantsList.length === 0 ? (
        <p>No plants found.</p>
      ) : (
        <PlantList plants={plantsList} />
      )}
    </main>
  );
};

export default PlantSearch;
