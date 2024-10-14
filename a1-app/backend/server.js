const express = require('express');
const app = express();
const port = 3000;

const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'chatApp';

const client = new MongoClient(url);

async function connectToDatabase() {
    try {
      await client.connect();
      console.log('Connected to MongoDB');
      const db = client.db(dbName);
      return db;
    } catch (err) {
      console.error('Error connecting to MongoDB', err);
      process.exit(1);
    }
}


connectToDatabase().then((db) => {
  app.get('/', (req, res) => {
    res.send('Hello MEAN Stack!');
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});
