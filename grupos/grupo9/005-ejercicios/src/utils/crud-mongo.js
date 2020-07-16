import { MongoClient } from 'mongodb';

// Connection URL
const urlDefault = 'mongodb://localhost:27017';


// Create a new MongoClient
export async function connect(url = urlDefault) {
    try {
        const client = MongoClient.connect(url);
        console.log("Conexión exitosa!!! :D ");
        return client;
    } catch (error) {
        console.log("No fue posible conectarse!!! :/ ");
    }
}


export async function find(db, nameCollection, params) {
    if (!db || !nameCollection) {
        console.log("BD o colección incorrecta");
        return;
    }
    try {
        const collection = db.collection(nameCollection);
        const result = await collection.find(params).toArray();
        return result;
    } catch (error) {
        console.log("No fue posible realizar la consulta! Error:  ", error);
    }
}