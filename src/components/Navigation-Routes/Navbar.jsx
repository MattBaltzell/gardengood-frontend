import "./Navbar.css";
import gardenGoodLogo from "../../GardenGood-logo.svg";
import { NavLink } from "react-router-dom";
import UserContext from "../../auth/UserContext";
import { useContext } from "react";

const Navbar = () => {
  const user = useContext(UserContext);

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

          {!user ? (
            <div className="Navbar__links">
              <NavLink to="/plants">Plants</NavLink>
              <NavLink to="/gardens">My Gardens</NavLink>
              <NavLink to="/logout">Logout</NavLink>
            </div>
          ) : (
            <div className="Navbar__links">
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/Signup">Signup</NavLink>
            </div>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
