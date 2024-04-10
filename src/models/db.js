//senha db atlas
//IP address (45.227.142.134)
//mongodb+srv://ChatUser:<password>@clusterapi.muiuigt.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAPI
//base de dados ChatUser
//senha: chat&&
const { MongoClient, ObjectId } = require("mongodb");
//const uri = "mongodb+srv://ChatUser:chat&&@clusterapi.muiuigt.mongodb.net/?retryWrites=true&w=majority&appName=ClusterAPI";

let singleton;

async function connect(){
    if(singleton) return singleton;

    const client = new MongoClient(process.env.DB_HOST);
    await client.connect();

    singleton = client.db(process.env.DB_DATABASE);
    return singleton;
}

async function findAll(collection){
    const db = await connect();
    return db.collection(collection).find().toArray();
}

async function insertOne(collection, objeto){
    const db = await connect();
    return db.collection(collection).insertOne(objeto);
}

let findOne = async (colletcion, _id) => {
    const db = await connect();
    let obj = await db.collection(colletcion).find({'_id': new ObjectId(_id)}).toArray();
    if(obj){
        return obj[0];
    }
    return false;
}

let updateOne = async (collection, object, param) => {
    const db = await connect();
    let result = await db.collection(collection).updateOne(param, {$set: object})
    return result;
}

module.exports = { findAll, insertOne }