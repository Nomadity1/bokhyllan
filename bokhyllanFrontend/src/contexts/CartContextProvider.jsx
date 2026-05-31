// CONTEXT PROVIDER - Component for managing state and sharing data across the app
// PACKAGES & DEPENDENCIES
import { useMemo, useState } from "react";
import api from "../api";
import { CartContext } from "./cartContext.js";

// CREATE PROVIDER component that wraps the entire app (in main.jsx)
function CartContextProvider({ children }) {
  // State for keeping track of cart items (hydrated from localStorage through api)
  const [cartItems, setCartItems] = useState(api.getCartItems());

  function addCartItem(book) {
    const updatedItems = api.addCartItem(book);
    setCartItems(updatedItems);
  }

  function updateCartItemQuantity(isbn, quantityValue) {
    const updatedItems = api.updateCartItemQuantity(isbn, quantityValue);
    setCartItems(updatedItems);
  }

  function removeCartItem(isbn) {
    const updatedItems = api.removeCartItem(isbn);
    setCartItems(updatedItems);
  }

  function clearCart() {
    const updatedItems = api.clearCart();
    setCartItems(updatedItems);
  }

  function refreshCart() {
    setCartItems(api.getCartItems());
  }

  const cartTotal = useMemo(
    () =>
      cartItems.reduce(
        (sum, item) =>
          sum + Number(item.price || 0) * Number(item.quantity || 1),
        0,
      ),
    [cartItems],
  );

  const value = {
    cartItems,
    cartTotal,
    addCartItem,
    updateCartItemQuantity,
    removeCartItem,
    clearCart,
    refreshCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// EXPORT
export default CartContextProvider;
