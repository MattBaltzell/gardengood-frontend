import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import PlantSearch from "./components/Plant/PlantSearch";
import Navbar from "./components/Navigation-Routes/Navbar";
function App() {
  const [plantsList, setPlantsList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchPlants = (term) => {
    setSearchTerm(term);
  };

  useEffect(() => {
    async function getPlants(filterTerm) {
      try {
        let res = await axios({
          url: !filterTerm
            ? "http://localhost:3001/plants/"
            : `http://localhost:3001/plants?name=${filterTerm}`,
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Nzc2NDA3Mzl9.HoNDrjYXseNCN6CIKkCB9FqT6ecJumAVNE6OeTg1WLk`,
          },
        });
        const plants = res.data.plants;
        setPlantsList(plants);
        console.log(plants);
      } catch (error) {
        console.error(error);
      }
    }
    getPlants(searchTerm);
  }, [searchTerm]);
  return (
    <div className="App">
      <Navbar />
      <div className="container">
        <PlantSearch plants={plantsList} search={searchPlants} />
      </div>
    </div>
  );
}

export default App;
