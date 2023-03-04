import "./Navbar.css";
import gardenGoodLogo from "../../GardenGood-logo.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import UserContext from "../../auth/UserContext";
import WeatherContext from "../../WeatherContext";
import { useContext } from "react";

const Navbar = ({ logout }) => {
  const user = useContext(UserContext);
  const weather = useContext(WeatherContext);

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="Navbar">
      <div className="Navbar__container">
        <nav>
          <NavLink to="/" className="Navbar__logo-link">
            <img
              className="Navbar__logo"
              src={gardenGoodLogo}
              alt="GardenGood"
            />
          </NavLink>

          {user && weather ? (
            <div className="Navbar__weather">
              <div className="Navbar__weather-condition">
                <img
                  className="Navbar__weather-icon"
                  src={weather.condition.icon}
                  alt="Weather condition"
                />
                <p>{weather.condition.text}</p>
              </div>
              <p>{Math.round(weather.temp_f)} F°</p>
            </div>
          ) : null}

          {!user ? (
            <div className="Navbar__links">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/Signup">Signup</NavLink>
            </div>
          ) : (
            <div className="Navbar__links">
              <NavLink to="/plants">Plants</NavLink>
              <Link onClick={handleLogout}>Logout {user.username}</Link>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
