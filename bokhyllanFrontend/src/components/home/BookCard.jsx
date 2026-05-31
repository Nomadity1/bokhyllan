// COMPONENT FOR DISPLAYING A BOOK IN A CARD FORMAT
// Takes the object book as a prop
// IMPORT FROM PUBLIC FOLDER
const favouriteIconRegular = "/icons/heart-regular-full.svg";
const favouriteIconFull = "/icons/heart-solid-full.svg";
const buyButtonIconFull = "/icons/plus-solid-full.svg";
// IMPORT STYLE
import "./bookCard.css";
import useCart from "../../hooks/useCart";

function BookCard({ book, authed, isFavourite, onToggleFavourite }) {
  const { addCartItem } = useCart();
  const coverSrc = `/bookCovers/${book.imgId}`;

  return (
    <div className="book-card">
      <div className="book-card-upper">
        <img
          src={coverSrc}
          alt={`${book.title} cover`}
          className="book-cover"
          loading="lazy"
          onError={(event) => {
            event.currentTarget.style.visibility = "hidden";
          }}
        />
        {/* FAVOURITE TOGGLE BUTTON is visible for all users but only available to use for logged-in users */}
        <button
          type="button"
          className="favourite-button"
          onClick={() => onToggleFavourite(book)}
          disabled={!authed}
          title={authed ? "Hantera favorit" : "Logga in för att favoritmarkera"}
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
        {/* ADD ITEM TO CART BUTTON (visible for all users but not functional yet) */}
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
      <div className="book-card-lower">
        <div className="book-card-lower-title">
          <h3>{book.title}</h3>
        </div>
        <div className="book-card-lower-author">
          <p>{book.author}</p>
        </div>
        <div className="book-card-lower-price">
          <p>{book.price} kr</p>
        </div>
      </div>
    </div>
  );
}
export default BookCard;
