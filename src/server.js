const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = 3003;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('src/public'));

// MongoDB Connection
const uri = process.env.MONGODB_URI;
let db;

MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(client => {
    db = client.db('webscraper');
    console.log('Connected to MongoDB');

    // Routes - only after the db is connected
    const scrapeRoutes = require('./routes/scrape')(db);
    app.use('/scrape', scrapeRoutes);

    // Start Server
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch(error => console.error(error));
