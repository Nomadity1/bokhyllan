// IMPORTS
import { useNavigate, Link } from "react-router-dom";
import "../../pages/purchasePages/cartCheckoutConfirm.css";

// FUNCTION TO GO TO CHECKOUT PAGE
function CartConfirmation() {
  // Activate navigate to redirect the user after confirmation
  const navigate = useNavigate();
  // Function to handle order and navigation
  function handlePlaceOrder() {
    navigate("/checkout");
  }

  return (
    <div className="cart-confirmation-container">
      <p className="info-message">
        Du kommer att få välja leveranssätt och betalningsmetod i nästa steg.
      </p>
      <button
        type="submit"
        className="place-order-button"
        onClick={handlePlaceOrder}
      >
        Till kassan
      </button>
      <p>
        <Link to="/" className="navbar-link">
          Fortsätt handla
        </Link>
      </p>
    </div>
  );
}

// EXPORT
export default CartConfirmation;
