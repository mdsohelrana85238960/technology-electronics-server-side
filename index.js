
const express = require("express");
const app = express();
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');



app.use(cors());
app.use(express.json());



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
    // await client.connect();

    const productsCollection = client.db("productDB").collection("product");

    const cartCollection = client.db("productDB").collection("carts");


    app.get("/products/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        "_id" : new ObjectId(id)
      };
      const result = await productsCollection.findOne(query);
      
      res.send(result);
    });

   


    app.post('/products', async(req,res)=>{
      const user = req.body;
      const result = await productsCollection.insertOne(user);
      res.send(result)
    })

    app.get('/products', async(req,res) =>{
      const result = await productsCollection.find().toArray();
      console.log(result);
      res.send(result)
    })

          // cart 

          app.get('/carts', async(req,res) =>{
            const result = await cartCollection.find().toArray();
            console.log(result);
            res.send(result)
          })

          app.post('/carts', async(req,res)=>{
            const user = req.body;
            const result = await cartCollection.insertOne(user);
            res.send(result)
          })
      
        
          app.delete("/carts/:id", async (req, res) => {
            const id = req.params.id;
            console.log("delete", id);
            const query = {
              _id: new ObjectId(id),
            };
            const result = await cartCollection.deleteOne(query);
            console.log(result);
            res.send(result);
          });
        

    app.put("/products/:id", async (req, res) => {
      const id = req.params.id;
      const data = req.body;
      console.log("id", id, data);
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedUSer = {
        $set: {
          name: data.name,
          description: data.description,
          rating: data.rating,
          price: data.price,
          technology: data.technology,
          brand: data.brand,
          photo: data.photo,

          
        },
      };
      const result = await productsCollection.updateOne(
        filter,
        updatedUSer,
        options
      );
      res.send(result);
    });





    app.get('/products/brandProduct/:brand',async(req,res)=>{
      const brand=req.params.brand;
      const query={brand}
      const result=await productsCollection.find(query).toArray()
       res.send(result)
    })

    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
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
  
  