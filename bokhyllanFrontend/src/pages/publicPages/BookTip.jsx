// IMPORTS
import { Link } from "react-router-dom";
// IMPORT STYLE
import "./publics.css";

// FUNCTION
function BookTip() {
  return (
    <div className="publics-container">
      <h2 className="publics-title">Boktips</h2>
      <p className="publics-info-message">
        Här kommer vi att dela med oss av boktips och rekommendationer, både
        från vårt team och från våra användare. Håll utkik för att hitta din
        nästa favoritbok!
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
export default BookTip;
