// HOOK TO USE FAVOURITESCONTEXT in components
// PACKAGES & DEPENDENCIES
import { useContext } from "react";
import FavouriteContext from "../contexts/favouriteContext";

// Custom hook to use FavouriteContext
function useFavourites() {
  return useContext(FavouriteContext);
}

export default useFavourites;
export { useFavourites };
