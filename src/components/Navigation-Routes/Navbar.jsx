import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="Navbar">
      <div className="Navbar_container">
        <nav>
          <div className="Navbar_logo">GardenGood</div>
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
