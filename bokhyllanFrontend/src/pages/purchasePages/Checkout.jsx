// CHECKOUT PAGE
// IMPORTS
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import api from "../../api";
import useCart from "../../hooks/useCart";
import CartSummary from "../../components/purchaseflow/CartSummary";
import "./cartCheckoutConfirm.css";

// FUNCTION
function Checkout() {
  // Variables to manage cart state and navigation
  const { cartItems, cartTotal, clearCart } = useCart();
  // Variable to check if the user is authenticated
  const { authed } = useAuth();
  // State to manage checkout form and error messages
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postaladdress, setPostaladdress] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  // Activate navigate to redirect the user after confirmation
  const navigate = useNavigate();

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

  // FUNCTION FOR SENDING ORDER TO API
  async function handleSubmit(e) {
    // Prevent the page from reloading when the form is submitted
    e.preventDefault();
    setError("");
    // Checking if the cart is empty
    if (cartRows.length === 0) {
      setError("Varukorgen är tom.");
      return;
    }
    // CALL API TO PLACE ORDER
    try {
      await api.placeOrder({
        items: cartRows,
        cartTotal,
        email,
        phone,
        postalcode,
        city,
        postaladdress,
      });
      // CLEAR CART AND NAVIGATE TO CONFIRMATION PAGE
      clearCart();
      navigate("/confirmation");
    } catch (error) {
      // IF ERROR --> Set error state to error.message
      setError(error.message);
    }
  }
  // RENDER CONTENT
  return (
    <div className="checkout-container">
      <div className="checkout-column-right">
        <h3>Välj leveranssätt</h3>
        <h3>Välj betalningsmetod</h3>
      </div>
      <div className="checkout-column-left">
        <h2>Sammanställning över din beställning</h2>
        {cartRows.length === 0 ? (
          <p>Din varukorg är tom.</p>
        ) : (
          <table className="checkout-overview-table">
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
        <CartSummary />
        {/* Conditional error message  */}
        {error && <p className="error-message">{error}</p>}
        {!authed && (
          <>
            <h3>Fyll i dina uppgifter för att slutföra beställningen.</h3>
            <form onSubmit={handleSubmit} className="order-form-guest">
              <div>
                <input
                  type="email"
                  value={email}
                  placeholder="E-post"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  value={phone}
                  placeholder="Telefonnummer"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  value={postalcode}
                  placeholder="Postnummer"
                  onChange={(e) => setPostalcode(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  value={city}
                  placeholder="Ort"
                  onChange={(e) => setCity(e.target.value)}
                  required
                />
              </div>
              <div>
                <input
                  type="text"
                  value={postaladdress}
                  placeholder="Postadress"
                  onChange={(e) => setPostaladdress(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="place-order-button"
                disabled={cartRows.length === 0}
              >
                Bekräfta beställning
              </button>
            </form>
          </>
        )}
        {authed && (
          <form onSubmit={handleSubmit} className="order-form-user">
            <p className="info-message">
              Eftersom du är inloggad kommer dina uppgifter att användas för att
              slutföra beställningen. Beställningen kommer också att sparas i
              din köphistorik.
            </p>
            <button
              type="submit"
              className="place-order-button"
              disabled={cartRows.length === 0}
            >
              Bekräfta beställning
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
// EXPORT
export default Checkout;
