// FOOTER COMPONENT
// IMPORT OF PACKAGES & DEPENDENCIES
import { Link } from "react-router-dom";
// IMPORT STYLE
import "./footer.css";

// FUNCTION
function Footer() {
  const currentYear = new Date().getFullYear();
  // CONTENT TO BE RENDERED
  return (
    <footer className="footer-container">
      <div className="footer-copyright-container">
        <p className="footer-text">
          Copyright © {currentYear} Bokhyllan. Alla rättigheter förbehållna.
        </p>
      </div>
      <div className="footer-navbar-container">
        <Link to="Terms">Villkor</Link>
        <Link to="Privacy">Integritetspolicy</Link>
      </div>
    </footer>
  );
}
// EXPORT
export default Footer;
