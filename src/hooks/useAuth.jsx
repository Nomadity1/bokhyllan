// PACKAGES & DEPENDENCIES
import { useContext } from "react";
// CONTEXT
import { AuthContext } from "../contexts/AuthContext.jsx";

// Custom hook för att använda AuthContext
function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
export { useAuth };
