// HEADER COMPONENT - used in App.jsx, rendered on all pages
// IMPORT DEPENDENCIES
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useCart from "../../hooks/useCart";
import "./header.css";

// IMPORT FROM PUBLIC FOLDER
// const logo = "/bokhyllanLogo.jpg";
const loginIcon = "/icons/circle-user-solid-full.svg";
const bagIcon = "/icons/bag-shopping-solid-full.svg";
const signoutIcon = "/icons/arrow-right-from-bracket-solid-full.svg";
const menuIcon = "/icons/bars-solid-full.svg";

// FUNCTIONS & PARAMETERS
function Header({ onMenuToggle, isMobileMenuOpen }) {
  // const Logo = "B";
  const Title = "Bokhyllan";
  const { authed, logoutUser } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const cartItemCount = cartItems.reduce(
    (sum, item) => sum + Number(item.quantity || 1),
    0,
  );
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
          <h1 className="header-logo">B</h1>
          {/* <img src={logo} alt="Logo for Bokhyllan" className="header-logo" /> */}
        </div>
        {/* Title */}
        <div className="header-title-container">
          <h1 className="header-title">{Title}</h1>
        </div>
      </div>
      {/* Container for Icons with Links */}
      <div className="header-icons-container">
        {/* Profile icon is visible for all users 
        and available for login, and profile access 
        for logged-in users */}
        <div className="header-icons-subcontainer">
          <Link
            to={authed ? "/profile" : "/login"}
            className="header-icon-link"
            aria-label={authed ? "Profil" : "Logga in"}
          >
            <img
              src={loginIcon}
              alt=""
              aria-hidden="true"
              className="header-icon-icon"
            />
            <p className="header-icon-text">{authed ? "Profil" : "Logga in"}</p>
          </Link>
        </div>
        {/* Cart icon is visible for all users */}
        <div className="header-icons-subcontainer">
          <Link to="/cart" className="header-icon-link" aria-label="Varukorg">
            <img
              src={bagIcon}
              alt=""
              aria-hidden="true"
              className="header-icon-icon"
            />
            <p className="header-icon-text">Varukorg ({cartItemCount})</p>
          </Link>
        </div>
        {/* Logout icon is only visible for logged-in users */}
        <div className="header-icons-subcontainer">
          {authed ? (
            <button
              type="button"
              className="header-icon-button"
              onClick={handleLogout}
              aria-label="Logga ut"
            >
              <img
                src={signoutIcon}
                alt=""
                aria-hidden="true"
                className="header-icon-icon"
              />
              <p className="header-icon-text">Logga ut</p>
            </button>
          ) : (
            <span className="header-icon-placeholder" aria-hidden="true" />
          )}
        </div>
        <div className="header-icons-subcontainer">
          {/* Menu icon replaces Navbar on small tablets and mobile
          Menu icon is visible for all users */}
          <button
            type="button"
            className="header-icon-button mobile-nav-menu-button"
            onClick={onMenuToggle}
            aria-label="Meny"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav-menu"
          >
            <img
              src={menuIcon}
              alt=""
              aria-hidden="true"
              className="header-icon-icon"
            />
            <p className="header-icon-text"></p>
          </button>
        </div>
      </div>
    </header>
  );
}

// EXPORT
export default Header;
