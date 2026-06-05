// HOOK TO USE FAVOURITESCONTEXT in components
// PACKAGES & DEPENDENCIES
import { useContext } from "react";
import { FavouriteContext } from "../contexts/favouriteContext";

// FUNCTION defining custom hook to use FavouriteContext
function useFavourites() {
  return useContext(FavouriteContext);
}
// EXPORT
export default useFavourites;
export { useFavourites };
