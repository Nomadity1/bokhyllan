// COMPONENT FOR CONFIRMING ORDER AND SENDING TO API
// IMPORTS
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import useAuth from "../../hooks/useAuth";
import api from "../../api";
import { cartRows } from "../../pages/purchasePages/Checkout";
import "./cartCheckoutConfirm.css";

// FUNCTION
function CartConfirmation() {
    // Activate navigate to redirect the user after confirmation
    const navigate = useNavigate();
    }
  // CONTENT TO BE RENDERED
  return (          
  <button
            type="submit"
            className="place-order-button"
            disabled={cartRows.length === 0}
          >
            Bekräfta beställning
          </button>
                  navigate("/confirmation");

);
// EXPORT
export default CartConfirmation;
