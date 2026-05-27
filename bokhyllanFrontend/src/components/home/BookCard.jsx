function BookCard({ book }) {
  return (
    <div className="book-card">
      <img
        src={book.coverImage}
        alt={`${book.title} cover`}
        className="book-cover"
      />
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <p>Published: {book.publishedDate}</p>
      <p>Description: {book.description}</p>
      <p>ISBN: {book.isbn}</p>
    </div>
  );
}

export default BookCard;
