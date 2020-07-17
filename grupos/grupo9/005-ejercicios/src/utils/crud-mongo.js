import { MongoClient, ObjectId } from 'mongodb';

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
        // si se quisiera sin devolver _id
        //const result = await collection.find(params, { projection: { _id: 0 } }).toArray();
        return result;
    } catch (error) {
        console.log("No fue posible realizar la consulta! Error:  ", error);
    }
}

export async function findById(db, nameCollection, id) {
    if (!db || !nameCollection || !id) {
        console.log("BD, colección y/o id son incorrectos");
        return;
    }
    try {
        const collection = db.collection(nameCollection);
        const idObj = new ObjectId(id);
        return await collection.findOne({ _id: idObj });
    } catch (error) {
        console.log("No fue posible realizar la consulta! Error:  ", error);
    }
}

export async function insertarDoc(db, nameCollection, doc) {
    if (!db || !nameCollection || !doc) {
        console.log("BD o elemento incorrecto");
        return;
    }
    try {
        const collection = db.collection(nameCollection);
        const result = await collection.insertOne(doc);
        return result;
    } catch (error) {
        console.log("No fue posible realizar la insercion! Error:  ", error);
    }
}
