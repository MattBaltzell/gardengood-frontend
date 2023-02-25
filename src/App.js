import { useState,useEffect } from 'react';
import './App.css';
import axios from 'axios';

function App() {

  const [plants, setPlants] = useState([])

useEffect(() => {
    async function getPlants() {
      try {
        const res = await axios.get('http://localhost:3001/plants');
        const plants = res.data.plants;
        console.log(res.data.plants);
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
        {plants.map(plant=>{
          return (
            <div key={plant.id} className='Plant'>
            <img className="Plant-img" alt={plant.name} src={plant.imgUrl}/>
            <h3>{plant.name}</h3>
            <p>{plant.description}</p>
          </div>
          )
        })}
      </div>
    </div>
  );
}

export default App;
