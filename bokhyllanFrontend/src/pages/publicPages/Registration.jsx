// IMPORT OF PACKAGES & DEPENDENCIES
import { useState } from "react"; // React hook för att hantera state
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";
// IMPORT OF STYLE
import "./regandlogin.css";

// FUNCTIONS & PARAMETERS
function Register() {
  // Stateful-variabler för att ta emot credentials och hantera error
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [postaladdress, setPostaladdress] = useState("");
  const [postalcode, setPostalcode] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  // Aktivera navigate för att kunna redirecta användaren efter inloggning
  const navigate = useNavigate();

  // Funktion för eventhantering
  async function handleSubmit(e) {
    // Undvik att sidan laddas om när formuläret skickas
    e.preventDefault();
    setError("");
    // CALL API TO REGISTER
    try {
      await api.register({
        firstname,
        surname,
        email,
        postaladdress,
        postalcode,
        city,
        phone,
        password,
      });
      // Registration succeeds without token response; continue to login page.
      navigate("/login");
    } catch (error) {
      // IF ERROR --> Set error state to error.message
      setError(error.message);
    }
  }

  // RENDER CONTENT
  return (
    <div className="registration-container">
      <h2>Registrering</h2>
      <form onSubmit={handleSubmit} className="registration-form">
        <div>
          <input
            type="text"
            // Binder inputfältet till firstname state
            value={firstname}
            placeholder="Förnamn"
            // Eventhanterare som uppdaterar firstname state när användaren skriver i inputfältet
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            // Binder inputfältet till surname state
            value={surname}
            placeholder="Efternamn"
            // Eventhanterare som uppdaterar surname state när användaren skriver i inputfältet
            onChange={(e) => setSurname(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="email"
            // Binder inputfältet till email state
            value={email}
            placeholder="E-post"
            // Eventhanterare som uppdaterar email state när användaren skriver i inputfältet
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            // Binder inputfältet till postaladdress state
            value={postaladdress}
            placeholder="Postadress"
            // Eventhanterare som uppdaterar postaladdress state när användaren skriver i inputfältet
            onChange={(e) => setPostaladdress(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            // Binder inputfältet till postalcode state
            value={postalcode}
            placeholder="Postnummer"
            // Eventhanterare som uppdaterar postalcode state när användaren skriver i inputfältet
            onChange={(e) => setPostalcode(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            // Binder inputfältet till city state
            value={city}
            placeholder="Ort"
            // Eventhanterare som uppdaterar city state när användaren skriver i inputfältet
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="text"
            // Binder inputfältet till phone state
            value={phone}
            placeholder="Telefonnummer"
            // Eventhanterare som uppdaterar phone state när användaren skriver i inputfältet
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            type="password"
            // Binder inputfältet till password state
            value={password}
            placeholder="Lösenord"
            // Eventhanterare som uppdaterar password state när användaren skriver i inputfältet
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Registrera
        </button>
      </form>
      {/* Conditional error message */}
      {error && <p className="error-message">{error}</p>}
      <nav className="registration-navbar">
        <p>Är du redan registrerad?</p>
        <p>
          <Link to="/login" className="login-link">
            Inloggning
          </Link>
        </p>
        <p>Till start utan att registrera dig?</p>
        <p>
          <Link to="/" className="home-link">
            Start
          </Link>
        </p>
      </nav>
    </div>
  );
}
// EXPORTS
export default Register;
