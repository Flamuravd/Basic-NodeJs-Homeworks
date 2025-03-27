import express from 'express';
import {
  getBooks,
  getBook,
  addBook,
  modifyBook,
  removeBook
} from '../controllers/booksController.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/:id', getBook);
router.post('/', addBook);
router.put('/:id', modifyBook);
router.delete('/:id', removeBook);

export default router;