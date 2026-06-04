// IMPORTS
import { Link } from "react-router-dom";
// IMPORT STYLE
import "./publics.css";

// FUNCTION
function Contact() {
  return (
    <div className="publics-container">
      <h2 className="publics-title">Kontakt</h2>
      <p className="publics-info-message">
        Här kommer du att kunna kontakta oss för frågor, feedback eller
        samarbeten så småningom. Då ser vi fram emot att höra från dig!
      </p>
      <div className="publics-navbar">
        <p>
          <Link to="/" className="home-link">
            Tillbaka till start
          </Link>
        </p>
      </div>
    </div>
  );
}
// EXPORT
export default Contact;
