const asyncHandler = require("express-async-handler");
const Book = require("../models/bookModel");

// @desc Get all books
// @route GET /api/books
// @access public
const getBooks = asyncHandler(async (_req, res) => {
  const books = await Book.find().sort({ mainCategory: 1, title: 1 });
  res.status(200).json(books);
});

module.exports = {
  getBooks,
};
