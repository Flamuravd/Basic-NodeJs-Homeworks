import express from "express";
import fs from "fs";
import { v4 as uuidv4 } from 'uuid';

const server = express();

server.use(express.json());

const PORT = 3001;
const HOST = "localhost";

server.use((request, response, next) => {
  const url = request.url;
  const method = request.method;
  const timeOfRequest = new Date().toISOString();

  const logEntry = { timeOfRequest, method, url };

  let logs = [];
  try {
    if (fs.existsSync("logs.json")) {
      const logsData = fs.readFileSync("logs.json", "utf-8");
      logs = JSON.parse(logsData);
    }
  } catch (error) {
    console.error("Error reading logs:", error);
  }

  logs.push(logEntry);

  try {
    fs.writeFileSync("logs.json", JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error("Error writing logs:", error);
  }

  next();
});

const readBooks = () => {
  try {
    if (!fs.existsSync("books_store.db.json")) {
      fs.writeFileSync("books_store.db.json", JSON.stringify([]));
      return [];
    }

    const booksData = fs.readFileSync("books_store.db.json", "utf-8");
    return JSON.parse(booksData);
  } catch (error) {
    console.error("Error reading books:", error);
    throw error;
  }
};

const writeBooks = (books) => {
  try {
    fs.writeFileSync("books_store.db.json", JSON.stringify(books, null, 2));
  } catch (error) {
    console.error("Error writing books:", error);
  }
};

server.get("/books", (request, response) => {
  const books = readBooks();
  response.json(books);
});

server.post("/books", (request, response) => {
  const books = readBooks();
  const newBook = request.body;

  if (!newBook.bookTitle || !newBook.genre || !newBook.author || !newBook.pages) {
    return response.status(400).json({ error: "Missing required fields" });
  }

  newBook.id = uuidv4(); 

  if (typeof newBook.isAvailable !== 'boolean') {
    newBook.isAvailable = true;
  }

  books.push(newBook);
  writeBooks(books);

  return response.status(201).json({ 
    message: "Book added successfully", 
    book: newBook 
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
