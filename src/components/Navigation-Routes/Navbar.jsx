import "./Navbar.css";
import gardenGoodLogo from "../../GardenGood-logo.svg";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="Navbar_container">
        <nav>
          <img className="Navbar_logo" src={gardenGoodLogo} alt="GardenGood" />
          <div className="Navbar_links">
            <p>Plants</p>
            <p>My Garden</p>
            <p>Logout</p>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
