// SECTION FOR SHOWCASE TO DISPLAY A FEATURED CATEGORY THROUGH CAROUSEL
// IMPORT DEPENDENCIES
import Carousel from "./Carousel";
import "./showcase.css";

// FUNCTION TAKES BOOKS AND A CATEGORY AS PROPS,
function Showcase({ books, category = "Nyutkommet" }) {
  // Filtration
  const showcaseItems = books.filter((book) => book.mainCategory === category);
  // Just in case
  if (showcaseItems.length === 0) {
    return null;
  }
  // CONTENT TO BE RENDERED - CAROUSEL WITH BOOKS OF SELECTED CATEGORY
  return (
    <div className="showcase-container">
      <Carousel title={category} items={showcaseItems} />
    </div>
  );
}

// EXPORT
export default Showcase;
