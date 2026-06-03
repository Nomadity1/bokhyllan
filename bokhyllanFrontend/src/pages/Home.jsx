// IMPORT OF PACKAGES & DEPENDENCIES
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../api";

// IMPORT SECTIONS
import Hero from "../sections/Hero";
import Showcase from "../sections/Showcase";
import Carousel from "../sections/Carousel";
import books from "../dbBooks/dbBooks.json";
// IMPORT STYLE
import "../App.css";

// FUNCTION
function Home() {
  const showcaseCategory = "Nyutkommet";

  const booksByCategory = books.reduce((groups, book) => {
    const category = book.mainCategory || "Övrigt";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(book);
    return groups;
  }, {});

  const categoryEntries = Object.entries(booksByCategory).filter(
    ([categoryName]) => categoryName !== showcaseCategory,
  );
  // CONTENT TO BE RENDERED
  return (
    <div className="home-container">
      <Hero />
      <Showcase books={books} category={showcaseCategory} />
      {categoryEntries.map(([categoryName, categoryBooks]) => (
        <Carousel
          key={categoryName}
          title={categoryName}
          items={categoryBooks}
        />
        // Produktlista
        // • Visa alla produkter
        // • Kunna filtrera på kategori (t.ex. kläder, teknik, mat etc.)
      ))}
    </div>
  );
}

// EXPORTS
export default Home;
