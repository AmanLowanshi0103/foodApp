const { MongoClient } = require('mongodb');

async function fetchData() {
    const uri = "mongodb://localhost:27017/"; // Replace with your MongoDB URI
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        const database = client.db('foodApp');
        const collection1 = database.collection('FoodData');

        // Fetch all documents
        const documents1 = await collection1.find({}).toArray();
        // console.log('All Documents:', documents);
        const collection2 = database.collection('FoodCategory');
        const documents2 = await collection2.find({}).toArray();
        global.FoodData=documents1;
        global.FoodCategory=documents2;
    }
    finally {
        await client.close();
    }
}

fetchData().catch(console.error);

module.exports=fetchData();