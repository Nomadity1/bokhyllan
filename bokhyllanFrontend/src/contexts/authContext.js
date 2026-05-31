// CONTEXT OBJECT for authentication state and functions
// PACKAGES & DEPENDENCIES
import { createContext } from "react";
// CREATE CONTEXT with default values for authed, loginUser and logoutUser
export const AuthContext = createContext({
  authed: false,
  loginUser: () => {},
  logoutUser: () => {},
});
