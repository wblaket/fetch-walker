import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';
import path from 'path';

const app = express();
const port = 8000;

app.use(express.static(path.join(__dirname, '/build')));
app.use(bodyParser.json());


// Respond to GET request for a random dog request.
app.get('/api/dogs/:dogid', async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost/27017', { useNewUrlParser: true});
    const db = client.db('dog-walker');
    console.log(`Test worked!`);
    const dogID = req.params.dogid;
    const dogInfo = await db.collection('dogs').findOne({ id: dogID });

    res.status(200).json(dogInfo);

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error});
    console.log("Something went wrong!");
  }
});


app.get('/api/dogs/', async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost/27017', { useNewUrlParser: true});
    const db = client.db('dog-walker');
    const size = await db.collection('dogs').count();
    console.log(`The size is: ${size}`);
    res.status(200).json({ size: size})

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error});
    console.log("Something went wrong!");
  }

});



app.get('/api/dogs/size', async (req, res) => {
  try {
    const client = await MongoClient.connect('mongodb://localhost/27017', { useNewUrlParser: true});
    const db = client.db('dog-walker');
    console.log("Testing...");

  //  res.status(200).json({ size: size})

  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error});
    console.log("Something went wrong!");
  }

});

app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname + '/build/index.html'));
	});


// Create listener.
app.listen(port, () => {
  console.log(`Express listening on port:${port}`);
  });
