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
        <nav className="desktop-nav-container">
          {/* Public links (always visible) */}
          <Link to="/">Start</Link>
          <Link to="/tips">Boktips</Link>
          <Link to="/contact">Kontakt</Link>
          <Link to="/about">Om oss</Link>
          {/* <Link to="/login">Inloggning</Link> */}
          {/* <Link to="/register">Registrering</Link> */}
          {/* <Link to="/cart">Varukorg</Link> */}
          {/* Protected links (visible only if authed is true) */}
          {/* {authed && <Link to="/profile">Profil</Link>} */}
          {authed && <Link to="/profile/favourites">Favoriter</Link>}
        </nav>
      </div>
      {/* <div className="header-menu-icon-subcontainer">
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
              </div>
       */}
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
