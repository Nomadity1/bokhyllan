// COMPONENT TO GENERATE CHECKOUT LIST
// IMPORTS
import { useMemo } from "react";
import useCart from "../../hooks/useCart"; // Custom hook to manage cart state and operations
import "./cartCheckoutConfirm.css";

// FUNCTION
function CheckoutList() {
  // Variables to manage cart state and navigation
  const { cartItems } = useCart();
  // Variable to transform cart items into the API format
  const cartRows = useMemo(
    () =>
      cartItems.map((item) => ({
        isbn: Number(item.isbn),
        title: item.title,
        author: item.author,
        quantity: Number(item.quantity || 1),
        price: Number(item.price || 0),
      })),
    [cartItems],
  );

  // CONTENT TO BE RENDERED
  return (
    <div className="checkout-container">
      <h2>Sammanställning över din beställning</h2>
      {cartRows.length === 0 ? (
        <p>Din varukorg är tom.</p>
      ) : (
        <table className="checkout-list-table">
          <colgroup>
            <col className="checkout-col-1" />
            <col className="checkout-col-2" />
            <col className="checkout-col-3" />
            <col className="checkout-col-4" />
          </colgroup>
          <thead>
            <tr>
              <th scope="col" className="th-1">
                Titel
              </th>
              <th scope="col" className="th-2">
                Antal
              </th>
              <th scope="col" className="th-3">
                Pris/st
              </th>
              <th scope="col" className="th-4">
                Delsumma
              </th>
            </tr>
          </thead>
          <tbody>
            {cartRows.map((item) => (
              <tr key={item.isbn}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.price} kr</td>
                <td>{(item.price * item.quantity).toFixed(0)} kr</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
// EXPORT
export default CheckoutList;
