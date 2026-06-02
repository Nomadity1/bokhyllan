// HEADER COMPONENT - used in App.jsx, rendered on all pages
// IMPORT DEPENDENCIES
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import "./header.css";

// IMPORT FROM PUBLIC FOLDER
const logo = "/bokhyllanLogo.jpg";
const loginIcon = "/icons/circle-user-solid-full.svg";
const bagIcon = "/icons/bag-shopping-solid-full.svg";
const signoutIcon = "/icons/arrow-right-from-bracket-solid-full.svg";
const menuIcon = "/icons/bars-solid-full.svg";

// FUNCTIONS & PARAMETERS
function Header({ onMenuToggle, isMobileMenuOpen }) {
  // const Logo = "B";
  const Title = "Bokhyllan";
  const { authed, logoutUser } = useAuth();
  const navigate = useNavigate();
  // Function to handle user logout
  function handleLogout() {
    const confirmed = window.confirm("Vill du logga ut?");
    if (!confirmed) {
      return;
    }
    logoutUser();
    window.alert("Du är nu utloggad.");
    navigate("/");
  }

  // CONTENT TO BE RENDERED
  return (
    <header className="header-container">
      {/* Container for Logo and Title */}
      <div className="header-subcontainer">
        {/* Logo */}
        <div className="header-logo-container">
          <img src={logo} alt="Logo for Bokhyllan" className="header-logo" />
        </div>
        {/* Title */}
        <div className="header-title-container">
          <h1 className="header-title">{Title}</h1>
        </div>
      </div>
      {/* Container for Icons with Links */}
      <div className="header-link-icons-container">
        {/* Login/Profile icon is visible for all users 
        but only functional for logged-in users */}
        <div className="header-link-icons-subcontainer">
          <Link
            to={authed ? "/profile" : "/login"}
            className="header-link-icons"
            aria-label={authed ? "Profil" : "Logga in"}
          >
            <img
              src={loginIcon}
              alt=""
              aria-hidden="true"
              className="header-link-icons"
            />
            <p className="header-link-icons-text">
              {authed ? "Profil" : "Logga in"}
            </p>
          </Link>
        </div>
        {/* Cart icon is visible for all users */}
        <div className="header-link-icons-subcontainer">
          <Link to="/cart" className="header-link-icons" aria-label="Varukorg">
            <img
              src={bagIcon}
              alt=""
              aria-hidden="true"
              className="header-link-icons"
            />
            <p className="header-link-icons-text">Varukorg (0)</p>
          </Link>
        </div>
        {/* Logout icon is only visible for logged-in users */}
        <div className="header-link-icons-subcontainer">
          {authed ? (
            <button
              type="button"
              className="header-link-icons header-link-icons-button"
              onClick={handleLogout}
              aria-label="Logga ut"
            >
              <img
                src={signoutIcon}
                alt=""
                aria-hidden="true"
                className="header-link-icons"
              />
              <p className="header-link-icons-text">Logga ut</p>
            </button>
          ) : (
            <span
              className="header-link-icons-placeholder"
              aria-hidden="true"
            />
          )}
        </div>
        <div className="header-link-icons-subcontainer">
          {/* Menu icon replaces Navbar on small tablets and mobile
          Menu icon is visible for all users */}
          <button
            type="button"
            className="header-link-icons header-link-icons-button mobile-nav-menu-button"
            onClick={onMenuToggle}
            aria-label="Meny"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            <img
              src={menuIcon}
              alt=""
              aria-hidden="true"
              className="header-link-icons"
            />
            <p className="header-link-icons-text"></p>
          </button>
        </div>
      </div>
    </header>
  );
}

// EXPORT
export default Header;
