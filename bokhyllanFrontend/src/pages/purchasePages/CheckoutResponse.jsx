// IMPORT DEPENDENCIES
import { Link } from "react-router-dom";
import "./cartCheckoutConfirm.css";

// FUNCTION
function CheckoutResponse() {
  return (
    <div className="checkout-response-container">
      <h2 className="checkout-response-header">Tack för ditt köp!</h2>
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
export default CheckoutResponse;
