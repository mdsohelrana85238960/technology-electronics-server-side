const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// 1iL64ekpTp5cVTA7
// mdsohelrana85238960

const port = process.env.PORT || 5000;






const uri = "mongodb+srv://mdsohelrana85238960:1iL64ekpTp5cVTA7@cluster0.nliodki.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);





app.get("/", (req, res) => {
    res.send("Crud id running...");
  });
  
  
app.listen(port, () => {
    console.log(`Simple Crud id Running on port ${port}`);
  });
  
  