// PACKAGES & DEPENDENCIES
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";
// COMPONENTS - HOOK for using AuthContext
import { useAuth } from "../../hooks/useAuth";
// STYLING
import "./regandlogin.css";

// FUNCTION
function Login() {
  // Stateful-variables for receiving credentials and handling error
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Enable navigate to redirect the user after login
  const navigate = useNavigate();
  // useAuth hook retrieves the login function from AuthContext
  const { loginUser } = useAuth(); // useAuth handles token storage and updates Auth state

  // Function for event handling
  async function handleSubmit(e) {
    // Prevent the page from reloading when the form is submitted
    e.preventDefault();
    setError("");
    // CALL API for log in (handles fetch and other operations related to login)
    try {
      const data = await api.login({ username, password });
      // IF backend has returned a token, save it in localStorage
      if (data.accessToken) {
        // Token name matching backend
        loginUser(data.accessToken); // NOW VIA CONTEXT instead of api.saveToken
        // IF SUCCESS --> redirect user to HOME ("/");
        navigate("/");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // IF ERROR --> Set error state to error.message
      setError(error.message);
    }
  }

  return (
    <div className="login-container">
      <h2>Inloggning</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <input
            type="text"
            // Binds input field to username state
            value={username}
            placeholder="Användarnamn"
            // Event handler that updates username state when the user types in the input field
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            // Binds input field to password state
            value={password}
            placeholder="Lösenord"
            // Event handler that updates password state when the user types in the input field
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Logga in
        </button>
      </form>
      {/* Conditional error message */}
      {error && <p className="error-message">{error}</p>}
      <div className="login-navbar">
        <p>Har du inget konto?</p>
        <p>
          <Link to="/register" className="register-link">
            Registrering
          </Link>
        </p>
        <p>Till start utan att logga in?</p>
        <p>
          <Link to="/" className="home-link">
            Start
          </Link>
        </p>
      </div>
    </div>
  );
}
// EXPORTS
export default Login;
