// CONTEXT PROVIDER - Component for managing state and sharing data across the app
// PACKAGES & DEPENDENCIES
import { useState } from "react";
import { FavouriteContext } from "./favouriteContext.js";

// CREATE PROVIDER component that wraps the entire app (in main.jsx)
function FavouriteContextProvider({ children }) {
  // State for keeping track of user favourites
  const [favourites, setFavourites] = useState([]);
  // Function for adding item to favourites
  function addFavourite(item) {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.some((fav) => fav.isbn === item.isbn)) {
        return [...prevFavourites, item];
      }
      return prevFavourites;
    });
  }
  // Function for removing item from favourites
  function removeFavourite(isbn) {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((fav) => fav.isbn !== isbn),
    );
  }
  // Return Provider with values to be shared (favourites, addFavourite, removeFavourite)
  // Here we determine what the app will have access to
  // Where children are all components within FavouriteContextProvider in main.jsx (i.e., the entire app)
  return (
    <FavouriteContext.Provider
      value={{ favourites, addFavourite, removeFavourite }}
    >
      {children}
    </FavouriteContext.Provider>
  );
}

// EXPORT
export default FavouriteContextProvider;
