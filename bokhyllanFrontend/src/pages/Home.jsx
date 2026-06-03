// IMPORT OF PACKAGES & DEPENDENCIES
import { useMemo, useState } from "react";

// IMPORT SECTIONS
import Hero from "../sections/Hero";
import Showcase from "../sections/Showcase";
import Carousel from "../sections/Carousel";
import books from "../dbBooks/dbBooks.json";
// IMPORT STYLE
import "../App.css";

// FUNCTION
function Home() {
  // Variable for showcase selection category
  const showcaseCategory = "Nyutkommet";
  // Filtration function to group books by category
  const booksByCategory = books.reduce((groups, book) => {
    // Fallback to "Övrigt" if mainCategory is missing or empty
    const category = book.mainCategory || "Övrigt";
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(book);
    return groups;
  }, {});

  const categories = useMemo(
    () => Object.keys(booksByCategory),
    [booksByCategory],
  );

  const audiences = useMemo(
    () => [...new Set(books.flatMap((b) => b.targetAudience || []))].sort(),
    [],
  );

  const subCategories = useMemo(
    () =>
      [
        ...new Set(
          books.flatMap((b) => b.subCategories || []).filter((s) => s !== ""),
        ),
      ].sort(),
    [],
  );

  const [selectedCategory, setSelectedCategory] = useState("Alla");
  const [selectedAudience, setSelectedAudience] = useState("Alla");
  const [selectedSubCategory, setSelectedSubCategory] = useState("Alla");

  const categoryEntries = useMemo(() => {
    const baseEntries = Object.entries(booksByCategory).filter(
      ([categoryName]) => categoryName !== showcaseCategory,
    );

    const categoryFiltered =
      selectedCategory === "Alla"
        ? baseEntries
        : baseEntries.filter(
            ([categoryName]) => categoryName === selectedCategory,
          );

    return categoryFiltered
      .map(([categoryName, categoryBooks]) => {
        let filtered = categoryBooks;
        if (selectedAudience !== "Alla") {
          filtered = filtered.filter((b) =>
            (b.targetAudience || []).includes(selectedAudience),
          );
        }
        if (selectedSubCategory !== "Alla") {
          filtered = filtered.filter((b) =>
            (b.subCategories || []).includes(selectedSubCategory),
          );
        }
        return [categoryName, filtered];
      })
      .filter(([, categoryBooks]) => categoryBooks.length > 0);
  }, [
    booksByCategory,
    selectedCategory,
    selectedAudience,
    selectedSubCategory,
  ]);

  // CONTENT TO BE RENDERED
  return (
    <div className="home-container">
      <Hero />
      <Showcase books={books} category={showcaseCategory} />

      <div className="home-filter-menu" aria-label="Filtrera böcker">
        <h3 className="home-filter-heading">Filtrera här</h3>
        <div className="home-filter-group">
          <span className="home-filter-label">Kategori</span>
          <button
            type="button"
            className={`home-filter-button ${selectedCategory === "Alla" ? "active" : ""}`}
            onClick={() => setSelectedCategory("Alla")}
          >
            Alla
          </button>
          {categories.map((categoryName) => (
            <button
              type="button"
              key={categoryName}
              className={`home-filter-button ${selectedCategory === categoryName ? "active" : ""}`}
              onClick={() => setSelectedCategory(categoryName)}
            >
              {categoryName}
            </button>
          ))}
        </div>

        <div className="home-filter-group">
          <span className="home-filter-label">Målgrupp</span>
          <button
            type="button"
            className={`home-filter-button ${selectedAudience === "Alla" ? "active" : ""}`}
            onClick={() => setSelectedAudience("Alla")}
          >
            Alla
          </button>
          {audiences.map((audience) => (
            <button
              type="button"
              key={audience}
              className={`home-filter-button ${selectedAudience === audience ? "active" : ""}`}
              onClick={() => setSelectedAudience(audience)}
            >
              {audience}
            </button>
          ))}
        </div>

        <div className="home-filter-group">
          <span className="home-filter-label">Underkategori</span>
          <button
            type="button"
            className={`home-filter-button ${selectedSubCategory === "Alla" ? "active" : ""}`}
            onClick={() => setSelectedSubCategory("Alla")}
          >
            Alla
          </button>
          {subCategories.map((sub) => (
            <button
              type="button"
              key={sub}
              className={`home-filter-button ${selectedSubCategory === sub ? "active" : ""}`}
              onClick={() => setSelectedSubCategory(sub)}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {categoryEntries.map(([categoryName, categoryBooks]) => (
        <Carousel
          key={categoryName}
          title={categoryName}
          items={categoryBooks}
        />
      ))}
    </div>
  );
}

// EXPORTS
export default Home;
