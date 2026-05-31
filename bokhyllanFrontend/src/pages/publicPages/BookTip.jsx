// IMPORTS
import { Link } from "react-router-dom";
// IMPORT STYLE
import "./booktip.css";

// FUNCTION
function BookTip() {
  return (
    <div className="book-tip-container">
      <h2 className="book-tip-title">Boktips</h2>
      <p className="book-tip-text">
        Här kommer vi att dela med oss av boktips och rekommendationer, både
        från vårt team och från våra användare. Håll utkik för att hitta din
        nästa favoritbok!
      </p>
      <div className="booktip-navbar">
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
export default BookTip;
