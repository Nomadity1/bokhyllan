// PAGE COMPONENT FOR TERMS AND CONDITIONS
// IMPORTS
import { Link } from "react-router-dom";
import "./publics.css";

// FUNCTION
function Conditions() {
  return (
    <div className="publics-container">
      <h2 className="publics-title">Villkor och användarvillkor</h2>
      <p className="publics-info-message">
        Här kommer vi att publicera våra villkor och användarvillkor för att
        säkerställa en transparent och rättvis användarupplevelse. Vi uppmuntrar
        alla användare att läsa igenom dessa noggrant för att förstå sina
        rättigheter och skyldigheter när de använder vår tjänst.
      </p>
      <div className="publics-navbar">
        <p>
          <Link to="/" className="home-link">
            Tillbaka till start
          </Link>
        </p>
      </div>
    </div>
  );
}
// EXPORT
export default Conditions;
