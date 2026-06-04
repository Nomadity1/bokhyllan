// IMPORTS
import { Link } from "react-router-dom";
// IMPORT STYLE
import "./publics.css";

// FUNCTION
function About() {
  return (
    <div className="publics-container">
      <h2 className="publics-title">Om oss</h2>
      <p className="publics-info-message">
        Här kommer du att kunna läsa mer om oss och vårt arbete så småningom.
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
export default About;
