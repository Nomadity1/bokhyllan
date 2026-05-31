// COMPONENT FOR DISPLAYING DETAILED INFORMATION ABOUT A BOOK
// Takes the object book as a prop
// IMPORT STYLE
import "../App.css";

function BookDetails({ book }) {
  return (
    <div className="book-details">
      <img
        src={book.coverImageUrl}
        alt={`${book.title} cover`}
        className="book-details-cover"
      />
      <h2>{book.title}</h2>
      <p>
        <strong>Author:</strong> {book.author}
      </p>
      <p>
        <strong>Description:</strong> {book.description}
      </p>
      <p>
        <strong>Publication Year:</strong> {book.publicationYear}
      </p>
      <p>
        <strong>ISBN:</strong> {book.isbn}
      </p>
      <p>
        <strong>Price:</strong> ${book.price}
      </p>
    </div>
  );
}
// EXPORT
export default BookDetails;
