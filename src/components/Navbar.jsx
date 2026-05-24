// NAVBAR-komponent som används i Header.jsx
// PACKAGES & DEPENDENCIES
// import React from "react";
import { Link } from "react-router-dom";
// AUTH-COMPONENT (används här för att hantera navigationslänkar)
import RequireAuth from "../../auth/RequireAuth";

export default function Navbar({ authed }) {
  return (
    <nav className="top-navbar">
      {/* Publika navigationslänkar (syns alltid) */}
      <Link to="/">Start</Link>
      {/* <Link to="/categories">Kategorier</Link> */}
      {/* <Link to="/categories">Boktips</Link> */}
      {/* <Link to="/about">Om oss</Link> */}
      <Link to="/login">Logga in</Link>
      <Link to="/register">Register</Link>
      {/* <Link to="/cart">Varukorg (´{$numberOfItems}´)</Link> */}
      {/* Skyddade navigationslänkar (syns bara när användaren är inloggad) */}
      <RequireAuth>
        {authed && <Link to="/contacts">Kontakter</Link>}
        {authed && <Link to="/contacts">Contacts</Link>}
        {/* {authed && <Link to="/favourites">Favoriter</Link>} */}
        {/* {authed && <Link to="/profile">Profil</Link>} */}
      </RequireAuth>
    </nav>
  );
}
