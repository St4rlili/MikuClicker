const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(bodyParser.json());

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

let collection;

async function connectDB() {
    try{
        await client.connect();
        const db = client.db("ClickerDB")
        collection = db.collection("puntuaciones");
        console.log("Conectado a MongoDB")
    }
    catch (err) {
        console.error(err);
    }
}

connectDB();

app.get('/api/puntuaciones', async (req, res) => {
    try {
        const puntuaciones = await collection.find({}).toArray();
        res.json(puntuaciones);
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/api/puntuaciones', async (req, res) => {
    try {
        const { nombre, puntuacion } = req.body;

        if (!nombre || puntuacion === undefined) {
            return res.status(400).json({ error: 'Faltan datos' });
        }

        const result = await collection.updateOne(
            { nombre },
            { $set: { puntuacion }},
            { upsert: true }
        );
        res.json({ message: 'Puntuación añadida' });
    }
    catch (err) {
        res.status(500).json({ error: err.message });
    }
})

app.listen(PORT, () => {
    console.log('Servidor funcionando');
})