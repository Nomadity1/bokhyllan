// USER INFORMATION COMPONENT FOR PROFILE PAGE
// // IMPORT API
// import api from "../../api";

// FUNCTION GENERATING USER INFORMATION
function UserInformation() {
  // const userInfo = api.getUserInfo();
  return (
    <div className="user-information-container">
      <div className="user-information">
        <h3>Användarinformation</h3>
        <p>Snart kommer din användarinformation att visas.</p>
        {/* 
        <p>Användarnamn: {userInfo.username}</p>
        <p>Förnamn: {userInfo.firstname}</p>
        <p>Efternamn: {userInfo.surname}</p>
        <p>E-post: {userInfo.email}</p>
        <p>Postadress: {userInfo.postalAddress}</p>
        <p>Postnummer: {userInfo.postalCode}</p>
        <p>Stad: {userInfo.city}</p>
        <p>Telefon: {userInfo.phone}</p>
        <p>Medlem sedan: {userInfo.memberSince}</p> */}
      </div>
      <div className="update-button-column">
        <button
          type="button"
          onClick={() =>
            alert("Funktion för att redigera uppgifter kommer snart!")
          }
        >
          Redigera
        </button>
      </div>
    </div>
  );
}

// EXPORTS
export default UserInformation;
