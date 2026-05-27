// PACKAGES & DEPENDENCIES
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";
// COMPONENTS - HOOK för att använda AuthContext
import { useAuth } from "../../hooks/useAuth";
// STYLING
import "../../App.css";

// FUNCTIONS & PARAMETERS
function Login() {
  // Stateful-variabler för att ta emot credentials och hantera error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Aktivera navigate för att kunna redirecta användaren efter inloggning
  const navigate = useNavigate();
  // useAuth hook hämtar login-funktion från AuthContext
  const { loginUser } = useAuth(); // useAuth sköter tokensparande och uppdaterar tillstånd för Auth

  // Funktion för eventhantering
  async function handleSubmit(e) {
    // Undvik att sidan laddas om när formuläret skickas
    e.preventDefault();
    setError("");
    // ANROPA API FÖR INLOGGNING (sköter fetch med mera)
    try {
      const data = await api.login({ email, password });
      // OM backend har returnerat en token, spara i localStorage
      if (data.accessToken) {
        // Namn på token som matchar backend
        loginUser(data.accessToken); // NU VIA KONTEXTEN istället för med api.saveToken
        // OM SUCCESS -->  skicka användaren till ("/contacts");
        navigate("/contacts");
      } else {
        setError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      // OM ERROR --> Sätt error state till error.message
      setError(error.message);
    }
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="email"
            // Binder inputfältet till email state
            value={email}
            placeholder="E-mail"
            // Eventhanterare som uppdaterar email state när användaren skriver i inputfältet
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            // Binder inputfältet till password state
            value={password}
            placeholder="Password"
            // Eventhanterare som uppdaterar password state när användaren skriver i inputfältet
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      {/* Villkorat felmeddelande */}
      {error && <p className="error-message">{error}</p>}
      <div className="login-navbar">
        <p>No account?</p>{" "}
        <p>
          <Link to="/register">Sign up</Link>
        </p>
        <p>Go back to start without logging in?</p>
        <p>
          <Link to="/">Home</Link>
        </p>
      </div>
    </div>
  );
}
// EXPORTS
export default Login;
