const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const port = 5000;
const app = express();
app.use(bodyParser.json());
app.use(cors());

const password = "H7sQs30fcYaYyubL";


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://volunteeringDB:sBGcGnyRUjGPg3RI@cluster0.iyjwc.mongodb.net/Volunteering?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const eventCollection = client.db("Volunteering").collection("volunteerEvent");
  const userCollection = client.db("Volunteering").collection("volunteerUser");

  app.post("/addEvent", (req, res) => {
    const event = req.body;
    eventCollection.insertOne(event)
    .then(function(result) {
      // process result
    })
  })
 

  userCollection.insertOne({
    name: "Miti",
    email: "miti@gmail.com"
  })
  .then(res => {
    console.log(res)
  })
  
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

// New Code here


