import express from 'express';
import {
  createChef,
  getAllChefs,
  getChefById
} from '../controllers/chefController.js';

const router = express.Router();

router.post('/', createChef);
router.get('/', getAllChefs);
router.get('/:id', getChefById);

export default router;