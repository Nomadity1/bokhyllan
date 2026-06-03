// COMPONENT FOR SUMMARY IN CART PAGE
// IMPORTS
import useCart from "../../hooks/useCart"; // Custom hook to manage cart state and operations

// FUNCTION GENERATING CART SUMMARY
function CartSummary() {
  // Variables to manage cart state
  const { cartTotal } = useCart();
  // Calculate tax and shipping costs
  const taxAmount = (cartTotal * 0.12).toFixed(0); // Assuming 12% tax
  const shippingCost = cartTotal > 0 ? 89 : 0; // Shipping cost if there are items in the cart
  const totalAmount = (
    parseFloat(cartTotal) +
    parseFloat(taxAmount) +
    shippingCost
  ).toFixed(0);

  // CONTENT TO BE RENDERED
  return (
    <div className="cart-summary-and-payment-container">
      <div className="cart-summary-sub-container">
        <table className="cart-summary-table">
          <thead>
            <tr>
              <th scope="row" className="cart-total-header th-2">
                <h3>
                  <strong>Deltotal </strong>
                </h3>
              </th>
              <td>
                <h3>{cartTotal} kr</h3>
              </td>
            </tr>
            <tr>
              <th scope="row" className="cart-total-header th-3">
                <h3>
                  <strong>Moms </strong>
                </h3>
              </th>
              <td>
                <h3>{taxAmount} kr</h3>
              </td>
            </tr>
            <tr>
              <th scope="row" className="cart-total-header th-4">
                <h3>
                  <strong>Frakt </strong>
                </h3>
              </th>
              <td>
                <h3>{shippingCost} kr</h3>
              </td>
            </tr>
            <tr>
              <th scope="row" className="cart-total-header th-5">
                <h3>
                  <strong>Total </strong>
                </h3>
              </th>
              <td>
                <h3>{totalAmount} kr</h3>
              </td>
            </tr>
          </thead>
        </table>
      </div>
    </div>
  );
}

// EXPORTS
export default CartSummary;
