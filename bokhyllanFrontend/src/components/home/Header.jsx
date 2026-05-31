// HEADER COMPONENT - used in App.jsx, rendered on all pages
// IMPORT ASSETS & COMPONENTS
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./header.css";
// IMPORT FROM PUBLIC FOLDER
const logo = "/bokhyllanLogo.jpg";
const loginIcon = "/icons/circle-user-solid-full.svg";
const bagIcon = "/icons/bag-shopping-solid-full.svg";

// FUNCTIONS & PARAMETERS
function Header() {
  const Title = "Bokhyllan";
  const { authed } = useAuth();

  // CONTENT TO BE RENDERED
  return (
    <header className="header-container">
      <div className="header-logo">
        <img src={logo} alt="Logo for Bokhyllan" className="header-logo-icon" />
      </div>
      <div className="header-title-container">
        <h1 className="header-title">{Title}</h1>
      </div>
      <div className="header-menu-icon-container">
        <Link
          to={authed ? "/profile" : "/login"}
          className="header-menu-icon-link"
          aria-label={authed ? "Profil" : "Logga in"}
        >
          <img
            src={loginIcon}
            alt=""
            aria-hidden="true"
            className="header-menu-icon"
          />
          <p className="header-menu-icon-text">
            {authed ? "Profil" : "Logga in"}
          </p>
        </Link>
        <Link
          to="/cart"
          className="header-menu-icon-link"
          aria-label="Varukorg"
        >
          <img
            src={bagIcon}
            alt=""
            aria-hidden="true"
            className="header-menu-icon"
          />
          <p className="header-menu-icon-text">Varukorg (0)</p>
        </Link>
      </div>
    </header>
  );
}

// EXPORT
export default Header;
