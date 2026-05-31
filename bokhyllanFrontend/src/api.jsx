// APP API: THE CENTRAL HUB FOR ACCESSING THE DATABASE THROUGH HTTP REQUESTS TO AND FROM THE FRONTEND

// IMPORTS
// No imports!

// VARIABLE for our base-URL to the app-API
const API_BASE = `${window.location.protocol}//${window.location.hostname}:3000/api`;
const CART_STORAGE_KEY = "bokhyllan_cart";

function readCartFromStorage() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveCartToStorage(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
}

// FUNCTIONS
// localStorage-keys to get and set token
export function getToken() {
  return localStorage.getItem("token"); // returns token or null if it doesn't exist
}
export function saveToken(token) {
  localStorage.setItem("token", token); // saves token in localStorage under the key "token"
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
function login({ email, password }) {
  return request("/users/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}
// REGISTER
function register({
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

// FAVOURITES (authenticated)
export function getFavourites() {
  return request("/users/favourites", { method: "GET" });
}

export function addFavourite(isbn) {
  return request("/users/favourites", {
    method: "POST",
    body: JSON.stringify({ isbn }),
  });
}

export function removeFavourite(isbn) {
  return request(`/users/favourites/${isbn}`, { method: "DELETE" });
}

// CART (localStorage-based)
export function getCartItems() {
  return readCartFromStorage();
}

export function addCartItem(book) {
  if (!book?.isbn) {
    return getCartItems();
  }

  const cartItems = getCartItems();
  const isbn = Number(book.isbn);
  const existingIndex = cartItems.findIndex(
    (item) => Number(item.isbn) === isbn,
  );

  if (existingIndex >= 0) {
    const updatedItems = cartItems.map((item, index) =>
      index === existingIndex
        ? { ...item, quantity: Number(item.quantity || 0) + 1 }
        : item,
    );
    saveCartToStorage(updatedItems);
    return updatedItems;
  }

  const updatedItems = [
    ...cartItems,
    {
      isbn,
      title: book.title,
      author: book.author,
      price: Number(book.price) || 0,
      quantity: 1,
    },
  ];

  saveCartToStorage(updatedItems);
  return updatedItems;
}

export function updateCartItemQuantity(isbn, quantity) {
  const parsedIsbn = Number(isbn);
  const parsedQuantity = Number(quantity);
  const cartItems = getCartItems();

  if (!Number.isFinite(parsedQuantity) || parsedQuantity <= 0) {
    return removeCartItem(parsedIsbn);
  }

  const updatedItems = cartItems.map((item) =>
    Number(item.isbn) === parsedIsbn
      ? { ...item, quantity: Math.max(1, Math.floor(parsedQuantity)) }
      : item,
  );

  saveCartToStorage(updatedItems);
  return updatedItems;
}

export function removeCartItem(isbn) {
  const parsedIsbn = Number(isbn);
  const cartItems = getCartItems();
  const updatedItems = cartItems.filter(
    (item) => Number(item.isbn) !== parsedIsbn,
  );

  saveCartToStorage(updatedItems);
  return updatedItems;
}

export function clearCart() {
  saveCartToStorage([]);
  return [];
}

export function placeOrder(orderPayload) {
  const items = Array.isArray(orderPayload?.items) ? orderPayload.items : [];
  const firstItem = items[0];

  return request("/orders", {
    method: "POST",
    body: JSON.stringify({
      ...orderPayload,
      isbn: orderPayload?.isbn ?? firstItem?.isbn,
      title: orderPayload?.title ?? firstItem?.title,
      author: orderPayload?.author ?? firstItem?.author,
      quantity: orderPayload?.quantity ?? firstItem?.quantity,
      price: orderPayload?.price ?? firstItem?.price,
    }),
  });
}

export function getUserOrders() {
  return request("/users/orders", { method: "GET" });
}

// EXPORTS
export default {
  login,
  register,
  getFavourites,
  addFavourite,
  removeFavourite,
  getCartItems,
  addCartItem,
  updateCartItemQuantity,
  removeCartItem,
  clearCart,
  placeOrder,
  getUserOrders,
  logout,
  saveToken,
  getToken,
  isAuthenticated,
};
