const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;
var cors = require('cors')
app.use(cors())

app.use(express.json());
// MongoDB connection URL
const mongoUrl = 'mongodb+srv://root:root23@cluster0.rnxg0b2.mongodb.net/';
const dbName = 'eshop';
const collectionName = 'products';

app.get('/products', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    const db = client.db(dbName);

    // Get data from the collection
    const collection = db.collection(collectionName);
    const data = await collection.find().toArray();

    // Close the connection
    client.close();

    // Send the data as JSON response
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/products/:id', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    const db = client.db(dbName);

    // Get data from the collection
      const collection = db.collection(collectionName);
      const { id } = req.params;
      const data = await collection.findOne({ id: id });

    // Close the connection
    client.close();

    // Send the data as JSON response
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.delete('/products/:id', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    const db = client.db(dbName);

    // Get data from the collection
      const collection = db.collection(collectionName);
      const { id } = req.params;
      const data = await collection.deleteOne({ id: id });

    // Close the connection
    client.close();

    // Send the data as JSON response
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/products', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    const db = client.db(dbName);

    // Get data from the collection
      const collection = db.collection(collectionName);
      const newproduct= req.body;
      const data = await collection.insertMany(newproduct);

    // Close the connection
    client.close();

    // Send the data as JSON response
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/products/:id', async (req, res) => {
  try {
    // Connect to MongoDB
    const client = await MongoClient.connect(mongoUrl, { useNewUrlParser: true });
    const db = client.db(dbName);

    // Get data from the collection
      const collection = db.collection(collectionName);
      const { id } = req.params;
      const updateproduct = req.body;
      const data = await collection.updateOne({id:id},{$set: updateproduct});

    // Close the connection
    client.close();

    // Send the data as JSON response
    res.json(data);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
