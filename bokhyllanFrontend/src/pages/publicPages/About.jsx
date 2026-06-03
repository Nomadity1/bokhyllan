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
        Här kan du läsa mer om oss och vårt arbete. Vi strävar efter att erbjuda
        bästa möjliga service och upplevelse för våra användare.
      </p>
      <div className="publics-navbar">
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
export default About;
