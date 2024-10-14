const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'chatApp';
let db;



async function connectToDatabase() {
    if (db) {
        return db; 
    }

    try {
        const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log('Connected to MongoDB');
        db = client.db(dbName);
        return db;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

module.exports = connectToDatabase;