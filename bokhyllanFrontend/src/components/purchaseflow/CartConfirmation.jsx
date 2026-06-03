// IMPORTS
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "../../pages/purchasePages/cartCheckoutConfirm.css";

// FUNCTION TO GO TO CHECKOUT PAGE
function CartConfirmation() {
  const navigate = useNavigate();
  // Function to handle order and navigation
  function handlePlaceOrder() {
    navigate("/checkout");
  }

  return (
    <div className="cart-payment-button-container">
      <p className="info-message">
        Du kommer att få välja leveranssätt och betalningsmetod i nästa steg.
      </p>
      <button
        type="submit"
        className="place-order-button"
        onClick={handlePlaceOrder}
      >
        Fortsätt till kassan
      </button>
      <div className="navbar">
        <p>
          <Link to="/" className="navbar-link">
            Fortsätt handla
          </Link>
        </p>
      </div>
    </div>
  );
}

// EXPORT
export default CartConfirmation;
