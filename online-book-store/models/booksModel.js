import fs from 'fs';
import { v4 as uuidv4 } from 'uuid';

const DB_FILE = './books_store.db.json';

const readBooks = () => {
  try {
    if (!fs.existsSync(DB_FILE)) {
      fs.writeFileSync(DB_FILE, JSON.stringify([]));
      return [];
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch (error) {
    throw new Error("Failed to read books database");
  }
};

const writeBooks = (books) => {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(books, null, 2));
  } catch (error) {
    throw new Error("Failed to write books database");
  }
};

export const getAllBooks = () => readBooks();

export const getBookById = (id) => {
  const books = readBooks();
  return books.find(book => book.id === id);
};

export const createBook = (bookData) => {
  const books = readBooks();
  const newBook = {
    id: uuidv4(),
    isAvailable: true,
    ...bookData
  };
  books.push(newBook);
  writeBooks(books);
  return newBook;
};

export const updateBook = (id, updates) => {
  const books = readBooks();
  const index = books.findIndex(book => book.id === id);
  
  if (index === -1) return null;
  
  const updatedBook = {
    ...books[index],
    ...updates,
    id 
  };
  
  books[index] = updatedBook;
  writeBooks(books);
  return updatedBook;
};

export const deleteBook = (id) => {
  const books = readBooks();
  const index = books.findIndex(book => book.id === id);
  
  if (index === -1) return null;
  
  const [deletedBook] = books.splice(index, 1);
  writeBooks(books);
  return deletedBook;
};