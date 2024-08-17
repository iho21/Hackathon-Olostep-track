const express = require('express');
const scrapeWebsite = require('../scraper');

function scrapeRoutes(db) {
  const router = express.Router();
  const collection = db.collection('scrapedData');

  router.post('/', async (req, res) => {
    const { url } = req.body;
    try {
      const scrapedData = await scrapeWebsite(url);
      await collection.insertOne({ url, ...scrapedData });
      res.status(200).json(scrapedData);
    } catch (error) {
      res.status(500).json({ error: 'Failed to scrape the website' });
    }
  });

  return router;
}

module.exports = scrapeRoutes;
