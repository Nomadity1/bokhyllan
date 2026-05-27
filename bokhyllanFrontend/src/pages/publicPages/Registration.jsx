// IMPORT OF PACKAGES & DEPENDENCIES
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../api";
// IMPORT OF STYLE
import "../../App.css";
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
    // ANROPA API FÖR REGISTRERING
    try {
      const data = await api.register({
        firstname,
        surname,
        email,
        postaladdress,
        postalcode,
        city,
        phone,
        password,
      });
      // OM backend har returnerat en token, spara i localStorage
      if (data.accessToken) {
        // Namn på token som matchar backend
        api.saveToken(data.accessToken);
        // OM SUCCESS -->  USENAVIGATE till ("/login");
        navigate("/login");
      }
    } catch (error) {
      // OM ERROR --> Sätt error state till error.message
      setError(error.message);
    }
  }

  // RENDER CONTENT
  return (
    <div>
      <h2>Registration</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            // Binder inputfältet till firstname state
            value={firstname}
            placeholder="Firstname"
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
            placeholder="Surname"
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
            placeholder="E-mail"
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
            placeholder="Postal Address"
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
            placeholder="Postal Code"
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
            placeholder="City"
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
            placeholder="Phone"
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
            placeholder="Password"
            // Eventhanterare som uppdaterar password state när användaren skriver i inputfältet
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="register-button">
          Register
        </button>
      </form>
      {/* Conditional error message */}
      {error && <p className="error-message">{error}</p>}
      <nav className="registration-navbar">
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
        <p>
          Go back to start without registering? <Link to="/">Home</Link>
        </p>
      </nav>
    </div>
  );
}
// EXPORTS
export default Register;
