// IMPORTS
import { Link } from "react-router-dom";
// IMPORT STYLE
import "./booktip.css";

// FUNCTION
function Contact() {
  return (
    <div className="contact-container">
      <h2 className="contact-title">Kontakt</h2>
      <p className="contact-text">
        Här kan du kontakta oss för frågor, feedback eller samarbeten. Vi ser fram emot att höra från dig!
      </p>
      <div className="contact-navbar">
        <p>Tillbaka till start</p>
        <p>
          <Link to="/" className="home-link">
            Start
          </Link>
        </p>
      </div>
    </div>
  );
}
// EXPORT
export default Contact;
