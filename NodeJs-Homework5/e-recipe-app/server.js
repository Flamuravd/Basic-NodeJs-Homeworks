import express from 'express';
import connectDB from './config/db.js';
import recipeRoutes from './routes/recipeRoutes.js';
import chefRoutes from './routes/chefRoutes.js';

const app = express();

app.use(express.json());

connectDB();

app.use('/api/recipes', recipeRoutes);
app.use('/api/chefs', chefRoutes);

app.get('/', (req, res) => {
  res.send('E-Recipe API is running...');
});

const PORT = 5000;
const HOST = "localhost";
app.listen(PORT, () => {
  console.log(`Server running on port ${HOST} ${PORT}`);
});