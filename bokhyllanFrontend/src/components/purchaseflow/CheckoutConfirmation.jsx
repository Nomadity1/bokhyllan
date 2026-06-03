// COMPONENT FOR CONFIRMING ORDER AND SENDING TO API
// IMPORTS
import { useNavigate } from "react-router-dom";
import { cartRows } from "../../pages/purchasePages/Checkout";
import "./cartCheckoutConfirm.css";

// FUNCTION
function CheckoutConfirmation() {
  // Activate navigate to redirect the user after confirmation
  const navigate = useNavigate();
  function handleConfirmation() {
    navigate("/confirmation");
  }

  // CONTENT TO BE RENDERED
  return (
    <button
      type="submit"
      className="place-order-button"
      onClick={handleConfirmation}
      disabled={cartRows.length === 0}
    >
      Bekräfta beställning
    </button>
  );
}
// EXPORT
export default CheckoutConfirmation;
