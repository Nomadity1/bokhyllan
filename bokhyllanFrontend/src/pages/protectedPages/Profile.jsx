import Favourites from "../../components/profile/Favourites";
import PurchaseHistory from "../../components/profile/PurchaseHistory";
import UserInformation from "../../components/profile/UserInformation";

function Profile() {
  return (
    <div>
      <h1>Profile Page</h1>
      <p>This is the profile page. Only authenticated users can see this.</p>
      <h2>Your Favourites</h2>
      <Favourites />
      <h2>Your Purchase History</h2>
      <PurchaseHistory />
      <h2>Your Information</h2>
      <UserInformation />
      <button onClick={() => alert("Edit profile functionality coming soon!")}>
        Edit Profile
      </button>
    </div>
  );
}

export default Profile;
