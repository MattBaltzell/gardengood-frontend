import "./Navbar.css";
import gardenGoodLogoMark from "../../GardenGood-logomark.svg";
import { NavLink, Link, useNavigate } from "react-router-dom";
import UserContext from "../auth/UserContext";
import WeatherContext from "../../WeatherContext";
import { useContext, useEffect, useRef } from "react";

const Navbar = ({ logout, menuIsOpen, handleMenuIsOpen }) => {
  const user = useContext(UserContext);
  const weather = useContext(WeatherContext);
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu

      if (
        menuIsOpen &&
        menuRef.current &&
        !e.target.classList.contains("Navbar__menu-icon-bar") &&
        !menuRef.current.contains(e.target)
      ) {
        handleMenuIsOpen();
      }
    };

    document.addEventListener("mouseup", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mouseup", checkIfClickedOutside);
    };
  }, [menuIsOpen]);

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <>
      <div className="Navbar">
        <div className="Navbar__container">
          <nav>
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

            <div
              onClick={handleMenuIsOpen}
              className={`Navbar__menu-icon ${menuIsOpen ? "active" : ""}`}
            >
              <div className="Navbar__menu-icon-bar"></div>
              <div className="Navbar__menu-icon-bar"></div>
              <div className="Navbar__menu-icon-bar"></div>
            </div>

            <div
              ref={menuRef}
              className={`Navbar__menu ${menuIsOpen ? "active" : ""}`}
            >
              {!user ? (
                <div className="Navbar__links">
                  <NavLink to="/login" onClick={handleMenuIsOpen}>
                    Login
                  </NavLink>
                  <NavLink to="/Signup" onClick={handleMenuIsOpen}>
                    Signup
                  </NavLink>
                </div>
              ) : (
                <div className="Navbar__links">
                  <NavLink to="/plants" onClick={handleMenuIsOpen}>
                    Plants
                  </NavLink>
                  <NavLink
                    to={`/users/${user.username}`}
                    onClick={handleMenuIsOpen}
                  >
                    {`${
                      user.username[0].toUpperCase() + user.username.slice(1)
                    }'s Account`}
                  </NavLink>
                  <Link onClick={handleLogout}>Logout</Link>
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navbar;
