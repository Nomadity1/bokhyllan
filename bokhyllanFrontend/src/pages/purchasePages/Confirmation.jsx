// CONFIRMATION PAGE
// IMPORT DEPENDENCIES
import { Link } from "react-router-dom";
import "./cartCheckoutConfirm.css";

// FUNCTION
function Confirmation() {
  return (
    <div>
      <h2>Tack för ditt köp!</h2>
      <p className="info-message">Funktionalitet inte implementerad än</p>
      <div className="navbar">
        <p>
          <Link to="/" className="navbar-link">
            Tillbaka till start
          </Link>
        </p>
      </div>
    </div>
  );
}
// EXPORT
export default Confirmation;
