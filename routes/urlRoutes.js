const express = require('express');
const router = express.Router();
const urlController = require('../controllers/urlController');

// Root route
router.get('/', (req, res) => {
  res.json({ message: 'URL Shortener API is running' });
});

// API routes
router.post('/shorten', urlController.shortenUrl);

module.exports = router; 