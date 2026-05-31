// CART PAGE
// IMPORT SECTIONS
import CartList from "../../sections/purchaseSections/CartList";
import CartSummary from "../../sections/purchaseSections/CartSummary";

// FUNCTION
function Cart() {
  return (
    <div>
      <CartList />
      <CartSummary />
    </div>
  );
}
// EXPORT
export default Cart;
