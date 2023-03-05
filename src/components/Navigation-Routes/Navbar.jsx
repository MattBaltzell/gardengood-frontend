import "./Navbar.css";
import gardenGoodLogoMark from "../../GardenGood-logomark.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import UserContext from "../../auth/UserContext";
import WeatherContext from "../../WeatherContext";
import { useContext, useState, useRef } from "react";

const Navbar = ({ logout }) => {
  const user = useContext(UserContext);
  const weather = useContext(WeatherContext);
  const [showNavbar, setShowNavbar] = useState(false);
  const navigate = useNavigate();

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  const handleLogout = async () => {
    await logout();
    setShowNavbar(false);
    navigate("/");
  };

  return (
    <>
      <div className="Navbar">
        <div className="Navbar__container">
          <nav>
            <div className="Navbar__constants">
              <NavLink to="/" className="Navbar__logo-link">
                <img
                  className="Navbar__logo"
                  src={gardenGoodLogoMark}
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
            </div>

            <div className={`Navbar__menu ${showNavbar ? "active" : ""}`}>
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
            </div>
            <div
              onClick={handleShowNavbar}
              className={`Navbar__menu-icon ${showNavbar ? "active" : ""}`}
            >
              <div></div>
              <div></div>
              <div></div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
