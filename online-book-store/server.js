import express from 'express';
import booksRouter from './routes/booksRoutes.js';
import fs from 'fs';

const server = express();
const PORT = 3001;
const HOST = 'localhost';

server.use(express.json());

server.use((req, res, next) => {
  const logEntry = {
    time: new Date().toISOString(),
    method: req.method,
    url: req.url
  };

  let logs = [];
  try {
    if (fs.existsSync('logs.json')) {
      logs = JSON.parse(fs.readFileSync('logs.json', 'utf-8'));
    }
    logs.push(logEntry);
    fs.writeFileSync('logs.json', JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error('Error handling logs:', error);
  }

  next();
});

server.use('/books', booksRouter);

server.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error' });
});

server.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});