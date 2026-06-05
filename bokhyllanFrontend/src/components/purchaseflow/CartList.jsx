// COMPONENT GENERATING LIST FOR IN CART PAGE
// IMPORTS
import useCart from "../../hooks/useCart"; // Custom hook to manage cart state and operations
import "../../pages/purchasePages/cartCheckoutConfirm.css";
// IMPORT FROM PUBLIC FOLDER
const trashIcon = "/icons/trash-can-solid-full.svg";

// FUNCTION GENERATING CART LIST
function CartList() {
  // Variables to manage cart state and operations
  const { cartItems, updateCartItemQuantity, removeCartItem, clearCart } =
    useCart();
  // Functions to manage cart state and operations
  function handleQuantityChange(isbn, quantityValue) {
    updateCartItemQuantity(isbn, quantityValue);
  }
  function handleRemoveRow(isbn) {
    removeCartItem(isbn);
  }
  function handleClearCart() {
    clearCart();
  }

  // CONTENT TO BE RENDERED
  return (
    <div className="cart-list-container">
      {cartItems.length === 0 ? (
        <p>Din varukorg är tom.</p>
      ) : (
        <>
          <div className="cart-list-button-container">
            <button
              type="button"
              className="cart-list-top-button"
              onClick={handleClearCart}
              title="Töm varukorgen"
              aria-label="Töm varukorgen"
            >
              <img src={trashIcon} alt="" aria-hidden="true" />
              <span>Töm varukorgen</span>
            </button>
          </div>
          <div className="cart-list-table-container">
            <table className="cart-list-table">
              {/* cart-summary-table will follow the same setup to easier harmonize output */}
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
                  <th scope="col" className="th-1">
                    Titel
                  </th>
                  <th scope="col" className="th-2">
                    Författare
                  </th>
                  <th scope="col" className="th-3">
                    Antal
                  </th>
                  <th scope="col" className="th-4">
                    Pris/st
                  </th>
                  <th scope="col" className="th-5">
                    Summa
                  </th>
                  <th scope="col" className="th-6">
                    Ta bort
                  </th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.isbn}>
                    <td>{item.title}</td>
                    <td>{item.author}</td>
                    <td>
                      <input
                        type="number"
                        className="cart-qty-input"
                        min="1"
                        step="1"
                        value={item.quantity || 1}
                        onChange={(event) =>
                          handleQuantityChange(item.isbn, event.target.value)
                        }
                        aria-label={`Antal för ${item.title}`}
                      />
                    </td>
                    <td>{Number(item.price || 0)} kr</td>
                    <td>
                      {Number(item.price || 0) * Number(item.quantity || 1)} kr
                    </td>
                    <td>
                      <button
                        type="button"
                        className="cart-row-trash-button"
                        onClick={() => handleRemoveRow(item.isbn)}
                        title="Ta bort bok från varukorg"
                        aria-label={`Ta bort ${item.title} från varukorgen`}
                      >
                        <img src={trashIcon} alt="" aria-hidden="true" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

// EXPORT
export default CartList;
