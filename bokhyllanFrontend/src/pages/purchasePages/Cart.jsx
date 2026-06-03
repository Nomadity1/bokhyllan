// CART PAGE
// IMPORT DEPENDENCIES
import CartList from "../../components/purchaseflow/CartList";
import CartSummary from "../../components/purchaseflow/CartSummary";
import CartConfirmation from "../../components/purchaseflow/CartContinjue";
import "./cartCheckoutConfirm.css";

// FUNCTION
function Cart() {
  // CONTENT TO BE RENDERED
  return (
    <div className="cart-container">
      <h2>Varukorg</h2>
      <CartList />
      <CartSummary />
      <CartConfirmation />
    </div>
  );
}

// EXPORT
export default Cart;
