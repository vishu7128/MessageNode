import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };
  return (
    <div id="navbar-conatiner">
      <div id="navbar-logo" onClick={handleLogoClick}>
        MessageNode
      </div>
      <div id="navbar-links">
        <ul>
          <li>Feed</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
