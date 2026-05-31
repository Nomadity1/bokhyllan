// IMPORTS
import Favourites from "../../components/profile/Favourites";
import PurchaseHistory from "../../components/profile/PurchaseHistory";
import UserInformation from "../../components/profile/UserInformation";

// FUNCTION
function Profile() {
  return (
    <div>
      <h1>Profilsida</h1>
      <p>Detta är profilsidan. Endast autentiserade användare kan se detta.</p>
      <h2>Dina favoriter</h2>
      <Favourites />
      <h2>Din köphistorik</h2>
      <PurchaseHistory />
      <h2>Användarinformation</h2>
      <UserInformation />
      <button
        onClick={() => alert("Funktion för att redigera profil kommer snart!")}
      >
        Redigera
      </button>
    </div>
  );
}
// EXPORT
export default Profile;
