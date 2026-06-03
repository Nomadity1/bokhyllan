// COMPONENT FOR FOOTER
// IMPORT OF PACKAGES & DEPENDENCIES
// import React from "react";
import { Link } from "react-router-dom";
// IMPORT STYLE
import "./footer.css";

// FUNCTIONS & PARAMETERS
function Footer() {
  const currentYear = new Date().getFullYear();
  // CONTENT TO BE RENDERED
  return (
    <footer className="footer-container">
      <div className="footer-copyright">
        <p className="footer-text">
          Copyright © {currentYear} Bokhyllan. Alla rättigheter förbehållna.
        </p>
      </div>
      <div className="footer-navbar">
        <Link to="Terms">Villkor</Link>
        <Link to="Privacy">Integritetspolicy</Link>
      </div>
    </footer>
  );
}
// EXPORT
export default Footer;
