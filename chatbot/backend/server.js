const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();

const app = express();

app.use(cors({ origin: '*' }));
app.use(express.json());

// MongoDB connection (Optional if using store context from DB)
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/ecommerce';
mongoose.connect(MONGO_URI)
  .then(() => console.log('✅ Connected to MongoDB for Chatbot Context'))
  .catch((err) => console.warn('⚠️ MongoDB Connection Notice:', err.message));

// Chatbot Route
app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Cartiva AI Chatbot Backend is running!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🤖 Chatbot Server listening on port ${PORT}`);
});
