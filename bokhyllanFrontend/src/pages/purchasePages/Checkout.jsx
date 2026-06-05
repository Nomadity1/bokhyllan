// CHECKOUT PAGE
// IMPORT  DEPENDENCIES
import CheckoutList from "../../components/purchaseflow/CheckoutList";
import CheckoutSummary from "../../components/purchaseflow/CheckoutSummary";
import CheckoutConfirmation from "../../components/purchaseflow/CheckoutConfirmation";
import "./cartCheckoutConfirm.css";

// FUNCTION
function Checkout() {
  // RENDER CONTENT
  return (
    <div className="checkout-container">
      <h2>Sammanställning över din beställning</h2>
      <CheckoutList />
      <CheckoutSummary />
      <CheckoutConfirmation />
    </div>
  );
}
// EXPORT
export default Checkout;
