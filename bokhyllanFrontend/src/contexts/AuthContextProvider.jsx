// CONTEXT PROVIDER - Component for managing state and sharing data across the app
// PACKAGES & DEPENDENCIES
import { useState } from "react";
import { isAuthenticated, saveToken, logout as apiLogout } from "../api.jsx";
import { AuthContext } from "./authContext.js";

// CREATE PROVIDER component that wraps the entire app (in main.jsx)
export function AuthProvider({ children }) {
  // State for keeping track of whether the user is authenticated or not
  const [authed, setAuthed] = useState(isAuthenticated());
  // Function for login
  function login(token) {
    saveToken(token); // Save token in localStorage
    setAuthed(true); // Update authed state to true
  }
  // Function for logout
  function logout() {
    apiLogout();
    setAuthed(false);
  }
  // Return Provider with values to be shared (authed, login, logout)
  // Here we determine what the app will have access to
  // Where children are all components within AuthProvider in main.jsx (i.e., the entire app)
  return (
    <AuthContext.Provider
      value={{ authed, loginUser: login, logoutUser: logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}
