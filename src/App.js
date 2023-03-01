import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

import PlantGrid from "./components/Plant/PlantGrid";
function App() {
  const [plants, setPlants] = useState([]);

  useEffect(() => {
    async function getPlants() {
      try {
        const res = await axios({
          url: "http://localhost:3001/plants",
          method: "GET",
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RhZG1pbiIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE2Nzc2NDA3Mzl9.HoNDrjYXseNCN6CIKkCB9FqT6ecJumAVNE6OeTg1WLk`,
          },
        });
        const plants = res.data.plants;

        setPlants(plants);
      } catch (error) {
        console.error(error);
      }
    }
    getPlants();
  }, []);
  return (
    <div className="App">
      <div className="container">
        <PlantGrid plants={plants} />
      </div>
    </div>
  );
}

export default App;
