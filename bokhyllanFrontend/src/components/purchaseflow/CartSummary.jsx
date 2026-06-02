// COMPONENT FOR SUMMARY IN CART PAGE

// COMPONENT FOR CART SUMMARY AND BUTTON TO PROCEED TO CHECKOUT
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

// // IMPORTS
// import useCart from "../../hooks/useCart"; // Custom hook to manage cart state and operations
// import { useNavigate } from "react-router-dom";

// // FUNCTION
// function CartSummary() {
//   // Variables to manage cart state and navigation
//   const { cartTotal } = useCart();
//   const navigate = useNavigate();
//   // Calculate tax, shipping and total cost
//   const taxAmount = (cartTotal * 0.12).toFixed(2); // Assuming 12% tax
//   const shippingCost = cartTotal > 0 ? 89 : 0; // Shipping cost if there are items in the cart
//   const totalAmount = (
//     parseFloat(cartTotal) +
//     parseFloat(taxAmount) +
//     parseFloat(shippingCost)
//   ).toFixed(2);

//   function handlePlaceOrder() {
//     navigate("/checkout");
//   }

//   // CONTENT TO BE RENDERED
//   return (
//     <div className="cart-summary-and-payment-container">
//       <div className="cart-summary-sub-container">
//         {cartTotal === "0.00" ? (
//           <p></p>
//         ) : (
//           <table className="checkout-summary-table">
//             <thead>
//               <tr>
//                 <th scope="row" className="cart-total-header th-2">
//                   <h3>
//                     <strong>Summa </strong>
//                   </h3>
//                 </th>
//                 <td>
//                   <h3>{cartTotal} kr</h3>
//                 </td>
//               </tr>
//               <tr>
//                 <th scope="row" className="cart-total-header th-3">
//                   <h3>
//                     <strong>Moms </strong>
//                   </h3>
//                 </th>
//                 <td>
//                   <h3>{taxAmount} kr</h3>
//                 </td>
//               </tr>
//               <tr>
//                 <th scope="row" className="cart-total-header th-4">
//                   <h3>
//                     <strong>Frakt </strong>
//                   </h3>
//                 </th>
//                 <td>
//                   <h3>{shippingCost} kr</h3>
//                 </td>
//               </tr>
//               <tr>
//                 <th scope="row" className="cart-total-header th-5">
//                   <h3>
//                     <strong>Total </strong>
//                   </h3>
//                 </th>
//                 <td>
//                   <h3>{totalAmount} kr</h3>
//                 </td>
//               </tr>
//             </thead>
//           </table>
//         )}
//       </div>
//       <div className="cart-payment-button-container">
//         <p>
//           Du kommer att välja leveranssätt och betalningsmetod i nästa steg.
//         </p>
//         <button
//           type="submit"
//           className="place-order-button"
//           onClick={handlePlaceOrder}
//         >
//           Fortsätt till kassan
//         </button>
//       </div>
//     </div>
//   );
// }

// // EXPORT
// export default CartSummary;
