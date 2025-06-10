const { nanoid } = require('nanoid');
const Url = require('../models/Url');

class UrlService {
  async createShortUrl(originalUrl) {
    try {
      // Format the URL
      let formattedUrl = originalUrl;
      if (!formattedUrl.startsWith('http://') && !formattedUrl.startsWith('https://')) {
        formattedUrl = 'https://' + formattedUrl;
      }

      // Generate 5-character short code
      const shortCode = nanoid(5);

      // Create new URL document
      const url = new Url({
        originalUrl: formattedUrl,
        shortCode
      });

      await url.save();
      return url;
    } catch (error) {
      throw error;
    }
  }

  async getUrlByShortCode(shortCode) {
    try {
      if (!shortCode) {
        throw new Error('Short code is required');
      }

      const url = await Url.findOne({ shortCode }).lean();
      console.log(url, 'urlllll')
      if (!url) {
        throw new Error('URL not found');
      }
      
      return url;
    } catch (error) {
      throw error;
    }
  }

  validateUrl(url) {
    // More permissive URL validation
    const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;
    return urlRegex.test(url);
  }
}

module.exports = new UrlService(); 