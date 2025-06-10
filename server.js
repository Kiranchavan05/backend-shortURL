const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const urlRoutes = require('./routes/urlRoutes');
require('dotenv').config();

const app = express();

// CORS configuration
app.use(cors());

app.use(express.json());

// Connect to MongoDB
connectDB();

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'URL Shortener API is running' });
});

// API routes
app.use('/api', urlRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
