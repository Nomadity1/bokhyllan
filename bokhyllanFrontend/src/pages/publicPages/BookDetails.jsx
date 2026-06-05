// COMPONENT FOR DISPLAYING DETAILED INFORMATION ABOUT A BOOK
// Takes the object book as a prop
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import useCart from "../../hooks/useCart";
import api from "../../api";
// IMPORT FROM PUBLIC FOLDER
const favouriteIconRegular = "/icons/heart-regular-full.svg";
const favouriteIconFull = "/icons/heart-solid-full.svg";
const buyButtonIconFull = "/icons/plus-solid-full.svg";
// IMPORT STYLE
import "./publics.css";

function BookDetails({ authed, isFavourite, onToggleFavourite }) {
  // Variable to fetch book by isbn
  const { isbn } = useParams();
  // Variable for add-to-cart function from cart context
  const { addCartItem } = useCart();
  // State variables to manage book data, loading state, and error messages
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadBook() {
      try {
        setLoading(true);
        const books = await api.getBooks();
        if (!isMounted) return;

        const parsedIsbn = Number(isbn);
        const match = Array.isArray(books)
          ? books.find((item) => Number(item.isbn) === parsedIsbn)
          : null;

        if (!match) {
          setBook(null);
          setError("Boken kunde inte hittas.");
          return;
        }

        setBook(match);
        setError("");
      } catch (loadError) {
        if (!isMounted) return;
        setBook(null);
        setError(loadError.message || "Kunde inte hämta bokens detaljer.");
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadBook();
    return () => {
      isMounted = false;
    };
  }, [isbn]); // Refetch book details if the isbn in the URL changes
  if (loading) {
    return <p>Laddar bokdetaljer...</p>;
  }
  if (error) {
    return (
      <div className="publics-container">
        <p>{error}</p>
        <p>
          <Link to="/">Tillbaka till startsidan</Link>
        </p>
      </div>
    );
  }
  const coverSrc = `/bookCovers/${book.imgId}`;

  // CONTENT TO RENDER
  return (
    <div className="publics-container book-details">
      <div className="book-details-left">
        <div className="book-details-media">
          <img
            src={coverSrc}
            alt={`${book.title} cover`}
            className="book-details-cover"
          />
          {/* FAVOURITE TOGGLE BUTTON is visible for all users but only available to use for logged-in users */}
          <button
            type="button"
            className="favourite-button"
            onClick={() => onToggleFavourite(book)}
            disabled={!authed}
            title={
              authed ? "Hantera favorit" : "Logga in för att favoritmarkera"
            }
            aria-label={
              authed
                ? isFavourite
                  ? "Ta bort bok från favoriter"
                  : "Lägg till bok i favoriter"
                : "Logga in för att favoritmarkera"
            }
          >
            <img
              src={isFavourite ? favouriteIconFull : favouriteIconRegular}
              className="favourite-icon"
              alt=""
              aria-hidden="true"
            />
          </button>
          {/* ADD ITEM TO CART BUTTON (visible for all users) */}
          <button
            type="button"
            className="buy-button"
            onClick={() => addCartItem(book)}
            title="Lägg till i varukorg"
            aria-label="Lägg till i varukorg"
          >
            <img
              src={buyButtonIconFull}
              className="buy-icon"
              alt=""
              aria-hidden="true"
            />
          </button>
        </div>
      </div>
      <div className="book-details-right">
        <h2>{book.title}</h2>
        <h3>
          <strong>Författare:</strong>
        </h3>
        <p>{book.author}</p>
        <h3>
          <strong>Beskrivning:</strong>
        </h3>
        <p>{book.description}</p>
        <h3>
          <strong>Utgivningsår:</strong>
        </h3>
        <p>{book.publicationYear}</p>
        <h3>
          <strong>ISBN:</strong>
        </h3>
        <p>{book.isbn}</p>
        <h3>
          <strong>Pris:</strong>
        </h3>
        <p>{book.price} kr</p>
        <p>
          <Link to="/">Tillbaka till start</Link>
        </p>
      </div>
    </div>
  );
}
// EXPORT
export default BookDetails;
