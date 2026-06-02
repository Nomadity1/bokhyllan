// IMPORTS
import { Link } from "react-router-dom";
// IMPORT STYLE
import "./booktip.css";

// FUNCTION
function About() {
  return (
    <div className="about-container">
      <h2 className="about-title">Om oss</h2>
      <p className="about-text">
        Här kan du läsa mer om oss och vårt arbete. Vi strävar efter att erbjuda
        bästa möjliga service och upplevelse för våra användare.
      </p>
      <div className="about-navbar">
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
