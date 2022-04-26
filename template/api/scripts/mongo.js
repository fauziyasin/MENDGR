const { MongoClient } = require('mongodb');
require('dotenv').config();
var ObjectId = require('mongodb').ObjectId

const init = async () => {
    let username = process.env.DB_USER
    let password = process.env.DB_KEY
    let port = process.env.DB_PORT
    let db = process.env.DB_NAME

    const uri = `mongodb://${username}:${password}@mongo:${port}/${db}`;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect()
    return client
}

const createNewDb = async(col) => {
 
    try {
        let client = await init();
        await client.connect();
        const collection = client.db(process.env.DB_NAME).collection(col);

        // Make the appropriate DB calls
        await  listDatabases(client);

        return collection
 
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

const listDatabases = async (client) => {
    databasesList = await client.db().admin().listDatabases();
    return databasesList
};

const query = async (col, query) => {

        let client = await init();
        await client.connect();
        const collection = client.db(process.env.DB_NAME).collection(col);

        // ------ Find Data
        const filterData = await collection.find({query}).toArray();
        return filterData
}

module.exports =  {
    init,
    createNewDb,
    query
} 
