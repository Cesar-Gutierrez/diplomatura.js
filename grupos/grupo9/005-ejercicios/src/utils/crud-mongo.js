import { MongoClient, ObjectId } from 'mongodb';

// Connection URL
const urlDefault = 'mongodb://localhost:27017';
//const urlDefault = process.env.BASEDATOS || 'mongodb://localhost:27017';

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
        return;
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

export async function updateDoc(db, nameCollection, id, doc) {
    if (!db || !nameCollection || !id || !doc) {
        console.log("BD o elemento incorrecto");
        return;
    }
    let elem = await findById(db, nameCollection, id);
    if (!elem) {

        return { codigo: 400, mensaje: "Elemento no encontrado" }
    }
    try {
        const collection = db.collection(nameCollection);

        const idObj = new ObjectId(id);
        const result = await collection.findOneAndUpdate({ _id: idObj }, { $set: doc }, { returnOriginal: false });
        if (result.lastErrorObject.n === 1 && result.lastErrorObject.updatedExisting) {
            return { codigo: 200, mensaje: "Elemento actualizado con éxito", result: result.value }
        }
        else {
            return { codigo: 500, mensaje: "No fue posible realizar la actualización" }
        }

    } catch (error) {
        return { codigo: 500, mensaje: "Error: No fue posible realizar la actualización" }
    }
}

export async function deleteByID(db, nameCollection, id) {
    if (!db || !nameCollection || !id) {
        return { Codigo: 500, Mensaje: "BD, colección y/o id son incorrectos" };
    }
    const collection = await db.collection(nameCollection);
    try {
        const elem = await findById(db, nameCollection, id);
        if (!elem) {
            return { codigo: 404, mensaje: "No existe el elemento que intenta eliminar" };
        }
    }
    catch (err) {
        return { Codigo: 400, Mensaje: "Error interno al intentar recuperar el elemento a eliminar" };
    }
    try {
        const respDel = await collection.deleteOne({ "_id": ObjectId(id) });

        return (respDel.deletedCount === 1) ?
            { codigo: 200, mensaje: "Eliminación exitosa." } :
            { codigo: 500, mensaje: "Error mongo interno en el proceso de eliminación." };
    } catch (error) {
        return { codigo: 500, mensaje: "Error no se pudo eliminar el elemento." };
    }
}

// async function respuestaDelete(result) {
//     // console.log(result);
//     if (result.deletedCount === 1) {
//         //    console.log("despues de eliminar",result);
//         // console.log("Eliminación exitosa.");
//         return { codigo: 200, mensaje: "Eliminación exitosa." };
//     }
//     else {
//         // console.log("Error base:No fue posible eliminar el elemento! Error:  ");
//         return { codigo: 500, mensaje: "Error mongo interno en el proceso de eliminación." };
//     }

// }
