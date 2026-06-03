// PAGE COMPONENT FOR USER INTEGRITY POLICY
// IMPORTS
import { Link } from "react-router-dom";
import "./publics.css";

// FUNCTION
function Integrity() {
  return (
    <div className="publics-container">
      <h2 className="publics-title">Integritetspolicy</h2>
      <p className="publics-info-message">
        Din integritet är viktig för oss. Vi samlar endast in den information
        som är nödvändig för att förbättra din upplevelse på vår webbplats och
        för att kunna erbjuda dig relevant innehåll och tjänster. Vi delar inte
        din information med tredje part utan ditt samtycke, och vi vidtar alla
        rimliga åtgärder för att skydda din information från obehörig åtkomst
        eller missbruk. För mer information om hur vi hanterar din data,
        vänligen läs vår fullständiga integritetspolicy.
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
export default Integrity;
