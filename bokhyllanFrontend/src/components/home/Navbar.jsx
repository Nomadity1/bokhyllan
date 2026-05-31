// NAVBAR-komponent som används i App.jsx
// PACKAGES & DEPENDENCIES
import { Link } from "react-router-dom";
// AUTH-HOOK
import useAuth from "../../hooks/useAuth";
// STYLE
import "./navbar.css";

function Navbar() {
  // useAuth hook hämtar statusen på authed från AuthContext
  const { authed } = useAuth();
  return (
    <nav className="head-nav-container">
      {/* Public links (always visible) */}
      <Link to="/">Start</Link>
      {/* <Link to="/categories">Kategorier</Link> */}
      <Link to="/tips">Boktips</Link>
      {/* <Link to="/login">Inloggning</Link> */}
      {/* <Link to="/register">Registrering</Link> */}
      {/* <Link to="/cart">Varukorg</Link> */}
      {/* Protected links (visible only if authed is true) */}
      {/* {authed && <Link to="/profile">Profil</Link>} */}
      {authed && <Link to="/profile/favourites">Favoriter</Link>}
    </nav>
  );
}
// EXPORT
export default Navbar;
