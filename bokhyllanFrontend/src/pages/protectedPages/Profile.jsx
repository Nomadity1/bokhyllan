// IMPORTS
import Favourites from "../../components/profile/Favourites";
import PurchaseHistory from "../../components/profile/PurchaseHistory";
import UserInformation from "../../components/profile/UserInformation";
import "./profile.css";

// FUNCTION
function Profile() {
  return (
    <div className="profile-container">
      <h2>Profilsida</h2>
      <p>Detta är profilsidan. Endast autentiserade användare kan se denna.</p>
      <Favourites />
      <PurchaseHistory />
      <UserInformation />
    </div>
  );
}
// EXPORT
export default Profile;
