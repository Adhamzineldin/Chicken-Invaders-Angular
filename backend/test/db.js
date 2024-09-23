const express = require('express');
const app = express();
const port = 1338;
const {MongoClient} = require('mongodb');


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


const client = new MongoClient('mongodb://localhost:27017')

async function main() {
  try {
    await client.connect();
    console.log('Connected to the database');
    const db = client.db('ODC');
    const users = db.collection('Users');
    let data = await users.find({"name": "Adham"}).toArray();
    console.log(data);
    await users.deleteMany({});
    await users.insertMany([{"name": 'Adham', "age": 26, "address": 'Cairo'}], (err, result) => {
      console.log(result);
    });

  } catch (error) {
    console.error(error);
  }
}

main().catch(console.error);
