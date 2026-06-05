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
    <div className="cart-summary-container">
      {/* <div className="cart-summary-sub-container"> */}
      <table className="cart-summary-table">
        {/* Same setup as in cart-list-table to easier harmonize output */}
        <colgroup>
          <col className="cart-col-1" />
          <col className="cart-col-2" />
          <col className="cart-col-3" />
          <col className="cart-col-4" />
          <col className="cart-col-5" />
          <col className="cart-col-6" />
        </colgroup>
        <thead>
          <tr>
            <th scope="row" className="cart-summary-header th-2" colSpan={4}>
              <strong>Deltotal </strong>
            </th>
            <td colSpan={2}>
              <strong>{cartTotal} kr</strong>
            </td>
          </tr>
          <tr>
            <th scope="row" className="cart-summary-header th-3" colSpan={4}>
              <strong>Moms </strong>
            </th>
            <td colSpan={2}>
              <strong>{taxAmount} kr</strong>
            </td>
          </tr>
          <tr>
            <th scope="row" className="cart-summary-header th-4" colSpan={4}>
              <strong>Frakt </strong>
            </th>
            <td colSpan={2}>
              <strong>{shippingCost} kr</strong>
            </td>
          </tr>
          <tr>
            <th scope="row" className="cart-summary-header th-5" colSpan={4}>
              <h3>
                <strong>Total </strong>
              </h3>
            </th>
            <td colSpan={2}>
              <h3>
                <strong>{totalAmount} kr</strong>
              </h3>
            </td>
          </tr>
        </thead>
      </table>
    </div>
    // </div>
  );
}

// EXPORTS
export default CartSummary;
