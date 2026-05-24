// CONTEXT - COMPONENT FOR MANAGING STATE AND SHARING DATA ACROSS THE APP
// PACKAGES & DEPENDENCIES
import { useState, createContext } from "react";
import { isAuthenticated, saveToken, logout as apiLogout } from "../api.jsx";

// Skapa Context för autentisering
// Null är standardvärde (innan Provider är på plats) - kan också sättas till en default user object eller liknande
const AuthContext = createContext(null);

// Skapa Provider-komponent som omsluter hela vår app (i main.jsx)
export function AuthProvider({ children }) {
  // State för att hålla reda på om användaren är inloggad eller inte
  const [authed, setAuthed] = useState(isAuthenticated());
  // Funktion för login
  function login(token) {
    saveToken(token); // Lagrar token i localStorage
    setAuthed(true); // Uppdaterar authed state till true
  }
  // Funktion för logout
  function logout() {
    apiLogout();
    setAuthed(false);
  }
  // Returnerar Provider med värdena som ska delas (authed, login, logout)
  // Här bestäms vad appen ska ha access till
  // Där children är alla komponenter som ligger inom AuthProvider i main.jsx (dvs hela appen)
  return (
    <AuthContext.Provider
      value={{ authed, loginUser: login, logoutUser: logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext };
