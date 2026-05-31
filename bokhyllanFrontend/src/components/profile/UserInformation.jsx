// USER INFORMATION COMPONENT FOR PROFILE PAGE
// IMPORT API
import api from "../../api";

// FUNCTION GENERATING USER INFORMATION
function UserInformation() {
  const userInfo = api.getUserInfo();
  return (
    <div>
      <h2>Användarinformation</h2>
      <p>Förnamn: {userInfo.firstname}</p>
      <p>Efternamn: {userInfo.surname}</p>
      <p>E-post: {userInfo.email}</p>
      <p>Postadress: {userInfo.postalAddress}</p>
      <p>Postnummer: {userInfo.postalCode}</p>
      <p>Stad: {userInfo.city}</p>
      <p>Telefon: {userInfo.phone}</p>
      <p>Medlem sedan: {userInfo.memberSince}</p>
      <p>
        Här kommer funktioner för att redigera användardata som förväntas i
        framtiden...
      </p>
    </div>
  );
}

// EXPORTS
export default UserInformation;
