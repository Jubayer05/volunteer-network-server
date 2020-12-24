const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const ObjectId = require('mongodb').ObjectID;
const port = 5000;
const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(express.static('VolunteerEvent'));
app.use(fileUpload());

const password = "H7sQs30fcYaYyubL";


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://volunteeringDB:sBGcGnyRUjGPg3RI@cluster0.iyjwc.mongodb.net/Volunteering?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
  const eventCollection = client.db("Volunteering").collection("volunteerEvent");
  const userCollection = client.db("Volunteering").collection("volunteerUser");

  app.post("/addEvent", (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const file = req.files.file;

    file.mv(`${__dirname}/VolunteerEvent/${file.name}`, err => {
      if(err) {
        console.log(err)
      }
      return res.send({name: file.name, path: `/${file.name}`})
    })
    eventCollection.insertOne({...file ,title, description})
    .then(function(result) {
      // process result
    })
  })

  app.get("/allEvent", (req, res) => {
    eventCollection.find({}).toArray((err, result) => {
      res.send(result);
    })
  })
 
  app.post("/addVolunteer", (req,res) => {
    const volunteerUser = req.body;
    userCollection.insertOne(volunteerUser)
    .then(res => {
      console.log(res)
    })
  })

  app.get("/registerEvent", (req, res) =>{
    userCollection.find({email: req.query.email}).toArray((err, result) => {
      res.send(result);
    })
  })

  app.get("/allUser", (req, res) => {
    userCollection.find({}).toArray((err, result) => {
      res.send(result);
    })
  })

  app.delete("/deleteUser/:id", (req, res) => {
    userCollection.deleteOne({_id: ObjectId(req.params.id)})
    .then((result) => {
      console.log(result)
    })
  })
  
  app.delete("/deleteRegisterDB/:id", (req, res) => {
    userCollection.deleteOne({ _id: ObjectId(req.params.id)})
    .then((result) => {
      console.log(result)
    })
  })
});

app.listen(port)

// New Code here


