// COMPONENT FOR AUTHENTICATION (WRAPPER) (RequireAuth is parent to other components -> Use the keyword children as an object)

// IMPORT OF PACKAGES & DEPENDENCIES
import { Navigate } from "react-router-dom";
// IMPORT OF API
import { isAuthenticated } from "../api";

// FUNCTION & PARAMETERS
function RequireAuth({ children }) {
  // Controls if the user is logged in (authenticated)
  if (!isAuthenticated()) {
    return <Navigate to="/" replace />; // See path in App.jsx
  } // "replace" replaces the current entry in the history stack instead of adding a new one
  return children; // Login page loads again
}

// EXPORT
export { RequireAuth };
