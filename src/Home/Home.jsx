import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../auth/UserContext";
import "./Home.css";

const Home = () => {
  const user = useContext(UserContext);

  return (
    <main className="Home">
      <div className="Home__bg"></div>
      <h1>GardenGood</h1>
      <p>
        Helping gardeners plan, plant, and tend their crops for a thriving
        garden. It's time for you to garden GOOD.
      </p>

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
