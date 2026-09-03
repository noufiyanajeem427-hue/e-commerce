const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./db');
const authRoutes = require('./routes/authRoutes');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();

connectDB();

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Cartiva API Server Ready');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});