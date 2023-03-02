import React, { useState, useEffect } from "react";
import "./Plant.css";
import "../Form/Form.css";
import PlantList from "./PlantList";

const PlantSearch = ({ plants, search }) => {
  const INITIAL_STATE = { searchTerm: "" };
  const [formData, setFormData] = useState(INITIAL_STATE);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
    search(value.trim() || undefined);
  };

  useEffect(() => {
    return () => {
      setFormData(INITIAL_STATE);
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
      <PlantList plants={plants} />
    </main>
  );
};

export default PlantSearch;
