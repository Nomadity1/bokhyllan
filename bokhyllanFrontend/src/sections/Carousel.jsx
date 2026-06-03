// SECTION FOR CAROUSEL TO DISPLAY BOOKS IN CATEGORIES
// IMPORT COMPONENT
import { useCallback, useEffect, useRef, useState } from "react";
import BookCard from "../components/home/BookCard";
import api from "../api";
import useAuth from "../hooks/useAuth";
import "./carousel.css";
// IMPORT FROM PUBLIC FOLDER
const caretLeftIcon = "/icons/caret-left-solid-full.svg";
const caretRightIcon = "/icons/caret-right-solid-full.svg";

function Carousel({ title, items }) {
  // State function to keep track on authentication
  const { authed } = useAuth();
  // State function to manage favourites and carousel scroll state
  const [favouriteSet, setFavouriteSet] = useState(new Set());
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  // Variable to reference the carousel container for scroll management
  const carouselRef = useRef(null);
  // Function to update the state of scroll buttons based on the current scroll position of the carousel
  const updateScrollState = useCallback(() => {
    const element = carouselRef.current;
    if (!element) return;
    // Function to check if the carousel can scroll left or right based
    // on the current scroll position and the maximum scroll position
    const maxScrollLeft = element.scrollWidth - element.clientWidth;
    setCanScrollLeft(element.scrollLeft > 2);
    setCanScrollRight(element.scrollLeft < maxScrollLeft - 2);
  }, []);

  useEffect(() => {
    if (!authed) {
      return;
    }

    async function loadFavourites() {
      try {
        const data = await api.getFavourites();
        const isbns = Array.isArray(data?.favourites) ? data.favourites : [];
        setFavouriteSet(new Set(isbns));
      } catch (error) {
        console.error("Could not load favourites", error);
      }
    }

    loadFavourites();
  }, [authed]);

  useEffect(() => {
    const element = carouselRef.current;
    if (!element) return;

    updateScrollState();

    element.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      element.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  async function toggleFavourite(book) {
    if (!authed) return;

    const isbn = Number(book.isbn);
    const isFavourite = favouriteSet.has(isbn);

    try {
      if (isFavourite) {
        const data = await api.removeFavourite(isbn);
        setFavouriteSet(new Set(data.favourites || []));
      } else {
        const data = await api.addFavourite(isbn);
        setFavouriteSet(new Set(data.favourites || []));
      }
    } catch (error) {
      console.error("Could not update favourite", error);
    }
  }

  function scrollCarousel(direction) {
    const element = carouselRef.current;
    if (!element) return;

    const scrollAmount = Math.max(220, Math.floor(element.clientWidth * 0.8));
    element.scrollBy({
      left: direction * scrollAmount,
      behavior: "smooth",
    });
  }

  // Retrieve data from frontend copy of dbBooks.json
  // CONTENT TO BE RENDERED
  return (
    <div className="carousel-container">
      <h2 className="carousel-title">{title}</h2>
      <div className="carousel-carets">
        <button
          type="button"
          className="carousel-caret-button"
          onClick={() => scrollCarousel(-1)}
          disabled={!canScrollLeft}
          aria-label="Scrolla åt vänster"
        >
          <img
            src={caretLeftIcon}
            alt=""
            aria-hidden="true"
            className="carousel-caret-icon"
          />
        </button>
        <div className="carousel-inner" ref={carouselRef}>
          <div className="carousel">
            {items.map((book) => (
              <BookCard
                key={book.isbn}
                book={book}
                authed={authed}
                isFavourite={favouriteSet.has(Number(book.isbn))}
                onToggleFavourite={toggleFavourite}
              />
            ))}
          </div>
        </div>
        <button
          type="button"
          className="carousel-caret-button"
          onClick={() => scrollCarousel(1)}
          disabled={!canScrollRight}
          aria-label="Scrolla åt höger"
        >
          <img
            src={caretRightIcon}
            alt=""
            aria-hidden="true"
            className="carousel-caret-icon"
          />
        </button>
      </div>
    </div>
  );
}

// EXPORT
export default Carousel;
