const axios = require('axios');
const cheerio = require('cheerio');

async function scrapeWebsite(url) {
  try {
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);

    // Test with common selectors
    const title = $('h1').text() || $('title').text();
    const content = $('div.content').text() || $('article').text() || $('p').text();

    return { title, content };
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
}

module.exports = scrapeWebsite;
