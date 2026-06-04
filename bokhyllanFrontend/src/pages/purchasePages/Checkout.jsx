// CHECKOUT PAGE
// IMPORT OF PACKAGES & DEPENDENCIES
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import api from "../../api";
import useCart from "../../hooks/useCart";
// import CheckoutList from "../../components/purchaseflow/CheckoutList";
// import CheckoutSummary from "../../components/purchaseflow/CheckoutSummary";
// import CheckoutConfirmation from "../../components/purchaseflow/CheckoutConfirmation";
import "./cartCheckoutConfirm.css";

// FUNCTION
function Checkout() {
  // Variables to manage cart state and navigation
  const { cartItems, cartTotal, clearCart } = useCart();
  // Variable to check if the user is authenticated
  const { authed } = useAuth();
  // State variables to manage checkout form and error messages
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [postaladdress, setPostaladdress] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  // State variables to manage payment and delivery options
  const [deliveryOption, setDeliveryOption] = useState("");
  const [paymentOption, setPaymentOption] = useState("");
  // Put navigate to work to redirect the user after confirmation
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
  // Functions to handle changes in delivery and payment options (not implemented in the form yet)
  function handleDeliveryChange(e) {
    setDeliveryOption(e.target.value);
  }
  function handlePaymentChange(e) {
    setPaymentOption(e.target.value);
  }

  // Function to send order to API
  async function handleSubmit(e) {
    // Prevent the page from reloading when the form is submitted
    e.preventDefault();
    if (!deliveryOption) {
      alert("Vänligen välj leveranssätt.");
      return;
    }
    if (!paymentOption) {
      alert("Vänligen välj betalningsmetod.");
      return;
    }
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
      <h2>Sammanställning över din beställning</h2>
      {/* <CheckoutList/> */}
      {/* <CheckoutSummary/> */}
      {/* <CheckoutConfirmation/> */}

      <div className="checkout-content">
        {cartRows.length === 0 ? (
          <p>Din varukorg är tom.</p>
        ) : (
          <table className="checkout-list-table">
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
                <th scope="col" className="th-1" colSpan={2}>
                  Titel
                </th>
                <th scope="col" className="th-2">
                  Antal
                </th>
                <th scope="col" className="th-3">
                  Pris/st
                </th>
                <th scope="col" className="th-4" colSpan={2}>
                  Summa
                </th>
              </tr>
            </thead>
            <tbody>
              {cartRows.map((item) => (
                <tr key={item.isbn}>
                  <td colSpan={2}>{item.title}</td>
                  <td className="checkout-col-qty">{item.quantity}</td>
                  <td className="checkout-col-price">{item.price} kr</td>
                  <td className="checkout-col-subtotal" colSpan={2}>
                    {(item.price * item.quantity).toFixed(0)} kr
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {/* Display CartSummary component */}
        {/* <CartSummary /> */}
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
                  value={postaladdress}
                  placeholder="Postadress"
                  onChange={(e) => setPostaladdress(e.target.value)}
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
              <h3>Välj leveranssätt</h3>
              <div>
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="homeDelivery"
                    aria-label="Hemleverans"
                    label="Hemleverans"
                    checked={deliveryOption === "homeDelivery"}
                    onChange={handleDeliveryChange}
                    required
                  />
                  Hemleverans
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="storePickup"
                    checked={deliveryOption === "storePickup"}
                    onChange={handleDeliveryChange}
                    aria-label="Butikupphämtning"
                    label="Butikupphämtning"
                    required
                  />
                  Butikupphämtning
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="delivery"
                    value="postBoxPickup"
                    checked={deliveryOption === "postBoxPickup"}
                    onChange={handleDeliveryChange}
                    aria-label="Postboxupphämtning"
                    label="Postboxupphämtning"
                    required
                  />
                  Postboxupphämtning
                </label>
              </div>
              <h3>Välj betalningsmetod</h3>
              <div>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    onChange={handlePaymentChange}
                    aria-label="Kortbetalning"
                    label="Kortbetalning"
                    required
                  />
                  Kortbetalning
                </label>
              </div>
              <div>
                <label>
                  <input
                    type="radio"
                    name="payment"
                    value="swish"
                    onChange={handlePaymentChange}
                    aria-label="Swish"
                    label="Swish"
                    required
                  />
                  Swish
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  className="place-order-button"
                  disabled={cartRows.length === 0}
                >
                  Bekräfta beställning
                </button>
              </div>
            </form>
          </>
        )}
        {authed && (
          <form onSubmit={handleSubmit} className="order-form-user">
            <p className="info-message">
              Eftersom du är inloggad kommer dina uppgifter att användas för att
              slutföra beställningen. Beställningen kommer också att sparas i
              din köphistorik.
              {/* Detta kräver vidareutveckling för att hämta data från användarens profil och fylla i formuläret automatiskt. */}
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
      <div className="navbar">
        <p>
          <Link to="/" className="navbar-link">
            Fortsätt handla
          </Link>
        </p>
        <p>
          <Link to="/cart" className="navbar-link">
            Tillbaka
          </Link>
        </p>
      </div>
    </div>
  );
}
// EXPORT
export default Checkout;
