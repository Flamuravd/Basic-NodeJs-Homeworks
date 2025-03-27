import {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook
} from '../models/booksModel.js';

export const getBooks = (req, res) => {
  try {
    res.json(getAllBooks());
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBook = (req, res) => {
  try {
    const book = getBookById(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const addBook = (req, res) => {
  try {
    const { bookTitle, genre, author, pages } = req.body;
    if (!bookTitle || !genre || !author || !pages) {
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const newBook = createBook(req.body);
    res.status(201).json({
      message: "Book added successfully",
      book: newBook
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const modifyBook = (req, res) => {
  try {
    const updatedBook = updateBook(req.params.id, req.body);
    if (!updatedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({
      message: "Book updated successfully",
      book: updatedBook
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const removeBook = (req, res) => {
  try {
    const deletedBook = deleteBook(req.params.id);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({
      message: "Book deleted successfully",
      book: deletedBook
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};