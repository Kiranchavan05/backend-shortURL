const urlService = require('../services/urlService');

class UrlController {
  async shortenUrl(req, res) {
    try {
      const { originalUrl } = req.body;

      // Validate URL
      if (!urlService.validateUrl(originalUrl)) {
        return res.status(400).json({ error: 'Invalid URL' });
      }

      // Create short URL
      const url = await urlService.createShortUrl(originalUrl);

      res.json({
        originalUrl: url.originalUrl,
        shortUrl: url.shortCode
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  async redirectToUrl(req, res) {
    try {
      console.log('Request for shortCode:', req.params.shortCode);
      const url = await urlService.getUrlByShortCode(req.params.shortCode);
      console.log('Found URL document:', url);
      
      if (!url) {
        return res.status(404).json({ 
          success: false,
          error: 'URL not found' 
        });
      }

      // Redirect to the original URL
      res.redirect(url.originalUrl);
    } catch (error) {
      console.error('Error:', error);
      res.status(404).json({ 
        success: false,
        error: 'URL not found' 
      });
    }
  }
}

module.exports = new UrlController(); 