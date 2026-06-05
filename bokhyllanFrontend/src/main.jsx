import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./main.css";
import App from "./App.jsx";
import { AuthProvider } from "./contexts/AuthContextProvider.jsx";
import CartContextProvider from "./contexts/CartContextProvider.jsx";
import FavouriteContextProvider from "./contexts/FavouriteContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <FavouriteContextProvider>
        <CartContextProvider>
          <App />
        </CartContextProvider>
      </FavouriteContextProvider>
    </AuthProvider>
  </StrictMode>,
);
