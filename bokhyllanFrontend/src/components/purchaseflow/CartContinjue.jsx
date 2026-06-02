// IMPORTS
import { useNavigate } from "react-router-dom";

// FUNCTION TO GO TO CHECKOUT PAGE
function CartContinue() {
  const navigate = useNavigate();
  // Function to handle order and navigation
  function handlePlaceOrder() {
    navigate("/checkout");
  }

  return (
    <div className="cart-payment-button-container">
      <p className="info-message">
        Du kommer att välja leveranssätt och betalningsmetod i nästa steg.
      </p>
      <button
        type="submit"
        className="place-order-button"
        onClick={handlePlaceOrder}
      >
        Fortsätt till kassan
      </button>
    </div>
  );
}

// EXPORT
export default CartContinue;
