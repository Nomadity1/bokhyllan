// CHECKOUT PAGE
// IMPORT
import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import api from "../../api";
import useCart from "../../hooks/useCart";

// FUNCTION
function Checkout() {
  const { cartItems, cartTotal, clearCart } = useCart();

  // State to manage checkout form and error messages
  const [postalcode, setPostalcode] = useState("");
  const [city, setCity] = useState("");
  const [postaladdress, setPostaladdress] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");

  // Activate navigate to redirect the user after confirmation
  const navigate = useNavigate();

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

    if (cartRows.length === 0) {
      setError("Varukorgen är tom.");
      return;
    }

    // CALL API FOR ORDER
    try {
      await api.placeOrder({
        items: cartRows,
        cartTotal,
        postalcode,
        city,
        postaladdress,
        email,
        phone,
      });
      clearCart();
      navigate("/confirmation");
    } catch (error) {
      // IF ERROR --> Set error state to error.message
      setError(error.message);
    }
  }
  // RENDER CONTENT
  return (
    <div className="order-container">
      <h2>Checkout</h2>

      <h3>Valda produkter</h3>
      {cartRows.length === 0 ? (
        <p>Din varukorg är tom.</p>
      ) : (
        <table className="cart-table">
          <thead>
            <tr>
              <th scope="col">Titel</th>
              <th scope="col">Antal</th>
              <th scope="col">Pris/st</th>
              <th scope="col">Summa</th>
            </tr>
          </thead>
          <tbody>
            {cartRows.map((item) => (
              <tr key={item.isbn}>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>{item.price} kr</td>
                <td>{item.price * item.quantity} kr</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      <p className="cart-total">Totalt: {cartTotal} kr</p>

      <form onSubmit={handleSubmit} className="order-form">
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
        <button type="submit" className="placeOrder-button" disabled={cartRows.length === 0}>
          Placera order
        </button>
      </form>
      {/* Conditional error message */}
      {error && <p className="error-message">{error}</p>}
      <nav className="registration-navbar">
        <p>Är du redan registrerad?</p>
        <p>
          <Link to="/login" className="login-link">
            Inloggning
          </Link>
        </p>
        <p>Till start utan att registrera dig?</p>
        <p>
          <Link to="/" className="home-link">
            Start
          </Link>
        </p>
      </nav>
    </div>
  );
}
// EXPORT
export default Checkout;
