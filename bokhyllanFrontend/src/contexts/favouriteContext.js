// CONTEXT OBJECT for handling user favourites state and functions
// PACKAGES & DEPENDENCIES
import { createContext } from "react";
// CREATE CONTEXT with default values for favourites state and functions
export const FavouriteContext = createContext({
  favourites: [],
  addFavourite: () => {},
  removeFavourite: () => {},
});
