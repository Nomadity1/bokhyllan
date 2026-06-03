// NAVBAR-komponent som används i App.jsx
// PACKAGES & DEPENDENCIES
import { Link } from "react-router-dom";
// AUTH-HOOK
import useAuth from "../../hooks/useAuth";
// STYLE
import "./navbar.css";

function Navbar({ isMobileMenuOpen, onNavigate }) {
  // useAuth hook hämtar statusen på authed från AuthContext
  const { authed } = useAuth();

  const mobileNavClassName = isMobileMenuOpen
    ? "tablet-mobile-navbar tablet-mobile-navbar-open"
    : "tablet-mobile-navbar";

  return (
    <div className="navbar-container">
      <div className="navbar-subcontainer">
        <nav className="desktop-navbar">
          {/* Public links (always visible) */}
          <Link to="/">Start</Link>
          <Link to="/tips">Boktips</Link>
          {authed && <Link to="/profile/favourites">Favoriter</Link>}
          <Link to="/contact">Kontakt</Link>
          <Link to="/about">Om oss</Link>
          {/* <Link to="/login">Inloggning</Link> */}
          {/* <Link to="/register">Registrering</Link> */}
          {/* <Link to="/cart">Varukorg</Link> */}
          {/* Protected links (visible only if authed is true) */}
          {/* {authed && <Link to="/profile">Profil</Link>} */}
        </nav>
      </div>
      {/* Mobile navigation menu, visible on small tablets and mobile */}
      {/* Menu icon is visible for all users and toggles the mobile menu */}
      <div id="mobile-nav-menu" className={mobileNavClassName}>
        <Link to="/" onClick={onNavigate}>
          Start
        </Link>
        <Link to="/tips" onClick={onNavigate}>
          Boktips
        </Link>
        <Link to="/contact" onClick={onNavigate}>
          Kontakt
        </Link>
        <Link to="/about" onClick={onNavigate}>
          Om oss
        </Link>
        {authed && (
          <Link to="/profile/favourites" onClick={onNavigate}>
            Favoriter
          </Link>
        )}
      </div>
    </div>
  );
}
// EXPORT
export default Navbar;
