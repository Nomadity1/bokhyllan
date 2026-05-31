// HOOK to use AuthContext in components
// PACKAGES & DEPENDENCIES
import { useContext } from "react";
// CONTEXT
import { AuthContext } from "../contexts/authContext.js";

// Custom hook to use AuthContext
function useAuth() {
  return useContext(AuthContext);
}

export default useAuth;
export { useAuth };
