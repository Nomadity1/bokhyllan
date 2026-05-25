import api from "../../api";

// FUNCTION & PARAMETERS
function UserInformation() {
  const userInfo = api.getUserInfo();
  return (
    <div>
      <h2>User Information</h2>
      <p>Firstname: {userInfo.firstname}</p>
      <p>Surname: {userInfo.surname}</p>
      <p>Email: {userInfo.email}</p>
      <p>Postal Address: {userInfo.postalAddress}</p>
      <p>Postal Code: {userInfo.postalCode}</p>
      <p>Member since: {userInfo.memberSince}</p>
    </div>
  );
}

// EXPORTS
export default UserInformation;
