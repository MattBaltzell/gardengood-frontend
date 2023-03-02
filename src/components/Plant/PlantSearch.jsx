import React, { useState, useEffect } from "react";
import GardenGoodApi from "../../api/api";
import "./Plant.css";
import "../Form/Form.css";
import PlantList from "./PlantList";

const PlantSearch = () => {
  const [plantsList, setPlantsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const search = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    async function getPlants(filterTerm) {
      try {
        const plants = await GardenGoodApi.getAllPlants(filterTerm);
        setPlantsList(plants);
      } catch (error) {
        console.error(error);
      }
    }
    getPlants(searchTerm);
  }, [searchTerm]);

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
    search(formData.searchTerm.trim() || undefined);
  };

  return (
    <main className="Plant-search">
      <h1>Find a Plant</h1>
      <form className="Form Plant-search__form" onSubmit={handleSubmit}>
        <input
          className="Form__input--text"
          name="searchTerm"
          onChange={handleChange}
          type="text"
          value={formData.searchTerm}
          placeholder="Search plant name"
        />
      </form>
      <PlantList plants={plantsList} />
    </main>
  );
};

export default PlantSearch;
