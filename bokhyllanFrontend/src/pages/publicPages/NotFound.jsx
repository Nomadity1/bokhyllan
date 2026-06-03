// PAGE COMPONENT FOR 404 NOT FOUND
// IMPORTS
import { Link } from "react-router-dom";
import "./publics.css";

function NotFound() {
  return (
    <div className="publics-container">
      <h2 className="publics-title">404 - Not Found</h2>
      <p className="publics-info-message">
        Sorry, the content you are looking for does not exist.
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

// EXPORTS
export default NotFound;
