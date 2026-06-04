const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("../config/dbConnections");
const Book = require("../models/bookModel");

dotenv.config();

async function seedBooks() {
  await connectDB();

  const sourceFile = path.join(__dirname, "..", "dbBooks", "dbBooks.json");
  const raw = fs.readFileSync(sourceFile, "utf8");
  const books = JSON.parse(raw);

  if (!Array.isArray(books) || books.length === 0) {
    throw new Error("No books found in dbBooks.json");
  }

  const operations = books.map((book) => ({
    updateOne: {
      filter: { isbn: Number(book.isbn) },
      update: {
        $set: {
          title: String(book.title || "").trim(),
          author: String(book.author || "").trim(),
          publicationYear: Number(book.publicationYear),
          description: String(book.description || "").trim(),
          mainCategory: String(book.mainCategory || "").trim(),
          targetAudience: Array.isArray(book.targetAudience)
            ? book.targetAudience.filter(Boolean)
            : [],
          subCategories: Array.isArray(book.subCategories)
            ? book.subCategories.filter(Boolean)
            : [],
          isbn: Number(book.isbn),
          imgId: String(book.imgId || "").trim(),
          price: Number(book.price || 0),
        },
      },
      upsert: true,
    },
  }));

  const result = await Book.bulkWrite(operations);
  console.log("Seed complete", {
    upserted: result.upsertedCount,
    modified: result.modifiedCount,
    matched: result.matchedCount,
  });

  await mongoose.connection.close();
}

seedBooks()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Seed failed:", error.message);
    process.exit(1);
  });
