// NAVBAR-komponent som används i App.jsx
// PACKAGES & DEPENDENCIES
import { Link } from "react-router-dom";
// AUTH-HOOK
import useAuth from "../../hooks/useAuth";

function Navbar() {
  // useAuth hook hämtar statusen på authed från AuthContext
  const { authed } = useAuth();
  return (
    <nav className="head-nav-container">
      {/* Public links (always visible) */}
      <Link to="/categories">Kategorier</Link>
      <Link to="/tips">Boktips</Link>
      {/* <Link to="/">Home</Link> */}
      {/* Behövs Home-länk? Home är ju redan på "/" */}
      <Link to="/login">Logga in</Link>
      <Link to="/register">Registrera</Link>
      <Link to="/cart">Varukorg (0)</Link>
      {/* Protected links (visible only if authed is true) */}
      {authed && <Link to="/profile">Profil</Link>}
      {authed && <Link to="/profile/favourites">Favoriter</Link>}
    </nav>
  );
}
// EXPORT
export default Navbar;
