// COMPONENT FOR DISPLAYING DETAILED INFORMATION ABOUT A BOOK
// Takes the object book as a prop
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../../api";
// IMPORT STYLE
// import "../App.css";
import "./publics.css";

function BookDetails() {
  const { isbn } = useParams();
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
  }, [isbn]);

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

  return (
    <div className="publics-container book-details">
      <div className="book-details-media">
        <img
          src={coverSrc}
          alt={`${book.title} cover`}
          className="book-details-cover"
        />
      </div>
      <div className="book-details-content">
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
