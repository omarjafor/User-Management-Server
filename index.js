const express = require("express");
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

const user = [
    { id: 1, name: 'Shakib', email: 'shakib@gmail.com' },
    { id: 2, name: 'Pmirkhan', email: 'dmirkhan@gmail.com' },
    { id: 3, name: 'Dalmankhan', email: 'salmankhan@gmail.com' },
    { id: 4, name: 'kbulkhan', email: 'fbulkhan@gmail.com' }
]

app.use(cors())
app.use(express.json());


const uri = "mongodb+srv://omarjaforchy:CfWN2W5mNjwsKttu@cluster0.21hcnfr.mongodb.net/?retryWrites=true&w=majority";

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

        const database = client.db("userDB");
        const userCollection = database.collection("user");

        app.get('/users', async(req, res) => {
            const cursor = userCollection.find()
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id : new ObjectId(id)}
            const user = await userCollection.findOne(query);
            res.send(user);
        })

        app.post('/user', async(req, res) => {
            const user = req.body;
            console.log('new user', user);
            const result = await userCollection.insertOne(user);
            res.send(result);
        });

        app.put('/users/:id', async(req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            console.log(updatedUser);
            const filter = {_id: new ObjectId(id)}
            const options = {upsert: true}
            const changeUser = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            }

            const result = await userCollection.updateOne(filter, changeUser, options);
            res.send(result);
        })

        app.delete('/users/:id', async(req, res) => {
            const id = req.params.id;
            console.log('Please Delete', id);
            const query = { _id: new ObjectId(id)}
            const result = await userCollection.deleteOne(query);
            res.send(result);
        })
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('User Management Server Running')
})

app.get('/user', (req, res) => {
    res.send(user)
})

// app.post('/user', (req, res) => {
//     console.log('Post Api Hitting...')
//     console.log(req.body);
//     const newUser = req.body;
//     newUser.id = user.length + 1
//     user.push(newUser);
//     res.send(newUser);
// })

app.listen(port, () => {
    console.log(`Server is running on PORT : ${port}`)
})