import { useContext } from "react";
import { CartContext } from "../contexts/cartContext";

function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartContextProvider");
  }

  return context;
}

export default useCart;
