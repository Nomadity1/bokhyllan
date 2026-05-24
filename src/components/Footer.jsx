// KOMPONENT FÖR FOOTER
// IMPORT OF PACKAGES & DEPENDENCIES
// import React from "react";
import { Link } from "react-router-dom";

// FUNCTIONS & PARAMETERS
function Footer() {
  const currentYear = new Date().getFullYear();
  // CONTENT TO BE RENDERED
  return (
    <footer className="footer-desktop">
      <div className="footer-desktop-copyright row-flex">
        <p className="footer-desktop-text">
          Copyright © {currentYear} Bokhyllan. All rights reserved.
        </p>
      </div>
      <div className="footer-desktop-links">
        <Link to="Contact">Kontakt</Link>
        <Link to="Terms">Villkor</Link>
        <Link to="Privacy">Integritetspolicy</Link>
      </div>
      <div className="footer-desktop-courtesy-icons column-flex">
        <img
          src="/assets/courtesyIcons/hero.png"
          alt="Hero Icon"
          className="footer-courtesy-icon"
        />
        <img
          src="/assets/courtesyIcons/react.svg"
          alt="React Icon"
          className="footer-courtesy-icon"
        />
        <img
          src="/assets/courtesyIcons/vite.svg"
          alt="Vite Icon"
          className="footer-courtesy-icon"
        />
      </div>
    </footer>
  );
}
// EXPORTS
export default Footer;
