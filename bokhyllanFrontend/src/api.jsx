// APPENS API: VÅR KNUTPUNKT FÖR NÅ DATABASEN GENOM HTTP-ANROP TILL OCH FRÅN FRONTEND

// IMPORTER
// Inga importer!

// VARIABLE for our base-URL to the app-API
const API_BASE = "http://localhost:3000/api";

// FUNCTIONS & PARAMETERS
// localStorage-keys to get and set token
export function getToken() {
  return localStorage.getItem("token"); // returnerar token eller null om den inte finns
}
export function saveToken(token) {
  localStorage.setItem("token", token); // sparar token i localStorage under nyckeln "token"
}
// Authentisation & token control
export function isAuthenticated() {
  // IF token exists, return true, otherwise false
  return !!getToken(); // One exclamation mark = token does not exist, two exclamation marks = token exists (converts to boolean)
} // Token = null => !!null = false
// Log out
export function logout() {
  // Removes token from localStorage
  localStorage.removeItem("token");
}

// GENERIC REQUEST-function - used below for all API calls
async function request(path, options = {}) {
  // Get headers from options, otherwise create empty object
  const headers = options.headers || {};
  // Get user's token from localStorage
  const token = getToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  headers["Content-Type"] = "application/json";
  // Send the actual HTTP request
  const response = await fetch(`${API_BASE}${path}`, {
    // Get from options (method, body, etc...)
    ...options,
    // ... and send with headers
    headers,
  });
  // Read text from response
  const text = await response.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null; // IF text is not empty, convert to JSON, otherwise set to null
  } catch {
    // IF conversion to JSON fails, keep it as text
    data = text;
  }
  // Example status codes: 404, 401, 500
  if (!response.ok) {
    throw new Error("Request failed.");
  }
  return data;
}

// LOGIN
export function login({ email, password }) {
  return request("/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
// REGISTER
export function register({
  firstname,
  surname,
  email,
  postaladdress,
  postalcode,
  city,
  phone,
  password,
}) {
  return request("/users/register", {
    method: "POST",
    body: JSON.stringify({
      firstname,
      surname,
      email,
      postalAddress: postaladdress,
      postalCode: postalcode,
      city,
      phone,
      password,
    }),
  });
}
// GET ALL FAVOURITES BY USER ID
export function getContacts() {
  return request("/contacts", { method: "GET" });
}
// GET ALL PURCHASES BY USER ID

// CREATE NEW CONTACT
export function createContact(contact) {
  return request("/contacts", {
    method: "POST",
    body: JSON.stringify(contact),
  });
}
// UPDATE A CONTACT
export function updateContact(contactId, contact) {
  return request(`/contacts/${contactId}`, {
    method: "PUT",
    body: JSON.stringify(contact),
  });
}
// DELETE A CONTACT
export function deleteContact(contactId) {
  return request(`/contacts/${contactId}`, { method: "DELETE" });
}
// HÄr ovan kan jag ta bort "export" framför varje funktion om jag fortsätter använda import api from "./api"

// EXPORTS
export default {
  login,
  register,
  logout,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
  saveToken,
  getToken,
  isAuthenticated,
};
