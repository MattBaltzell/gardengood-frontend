import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import gardenGoodLogo from "../../GardenGood-logo.svg";

import "./Home.css";

const Home = () => {
  const user = useContext(UserContext);

  return (
    <main className="Home">
      <div className="Home__bg"></div>
      <img className="Home__logo" src={gardenGoodLogo} alt="GardenGood" />
      <div className="Home__intro-text">
        <h1>
          Helping gardeners plan, plant, and tend their crops for a thriving
          garden.
        </h1>
        <h2>It's time for you to garden GOOD.</h2>
      </div>

      {!user ? (
        <p>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </p>
      ) : null}
    </main>
  );
};

export default Home;
