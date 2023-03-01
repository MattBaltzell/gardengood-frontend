import React, { useState } from "react";
import "./Plant.css";
import PlantList from "./PlantList";

const PlantSearch = ({ plants, search }) => {
  const INITIAL_STATE = { searchTerm: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    search(formData.searchTerm);
    setFormData(INITIAL_STATE);
  };

  return (
    <main className="Plant-search">
      <h1>Find a Plant</h1>
      <form className="Plant-search_form" onSubmit={handleSubmit}>
        <input
          name="searchTerm"
          onChange={handleChange}
          type="text"
          value={formData.searchTerm}
          placeholder="Enter plant name"
        />
        <button>Search</button>
      </form>
      <PlantList plants={plants} />
    </main>
  );
};

export default PlantSearch;
