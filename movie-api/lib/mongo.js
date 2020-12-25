/**capa de bibliotecas donde creamos la conexion a MongoDB*/
const { MongoClient, ObjectId } = require('mongodb');
const { config } = require('../config/index.js');

//encodeURIComponent -> nos garantiza que si tenemos algunos caracteres especiales no tendremos problemas de conectarnos
const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const DB_NAME = encodeURIComponent(config.dbName);

const MONGO_URI = `mongodb+srv://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?retryWrites=true&w=majority`;

//Construimos la libreria de conexion mongo
class MongoLib {
  constructor() {
    //definimos quien es el cliente
    this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true });
    this.dbName = DB_NAME;
  }

  //implementamos el metodo connect
  connect() {
    //utilizamos el patron singleton. preguntamos si la clase MongoLib no tiene una conexion o no existe una conexion
    if (!MongoLib.connection) {
      //creamos una nueva conexion
      MongoLib.connection = new Promise((resolve, reject) => {
        this.client.connect((error) => {
          //si hay un error
          if (error) {
            reject(error);
          }

          //si no hay un error, resolvemos la promesa con nuestra conexion
          console.info('Successfully connected to MongoDB');
          //resolvemos una instancia a la BD y la retornamos como respuesta de la promesa
          resolve(this.client.db(this.dbName));
        });
      });
    }
    //si hay existe una conexion la retornamos
    return MongoLib.connection;
  }

  //implementamos las acciones sobre la coleccion de movies en nuestra bd en mongo

  //obtenemos todos los elementos de la coleccion movies
  getAll(collection, query) {
    //retornamos la conexion creada previamente (arriba)
    return this.connect().then((db) => {
      //retornamos la base de datos, pasamos el nombre de la collecion, pasamos un query opcional, lo convertimos a array
      //para el manejo tipo json
      return db.collection(collection).find(query).toArray();
    });
  }

  //obtenemos un elemento de la coleccion movies
  get(collection, id) {
    //retornamos la conexion creada previamente (arriba)
    return this.connect().then((db) => {
      //findOne()-> que busque por id y pasamos el objeto id
      return db.collection(collection).findOne({ _id: ObjectId(id) });
    });
  }

  //creamos un dato o elemento a nuestra coleccion
  create(coleccion, data) {
    //retornamos la conexion creada previamente (arriba)
    return this.connect()
      .then((db) => {
        //insertOne -> le pasamos los datos que recibimos
        return db.collection(collection).insertOne(data);
      })
      .then((result) => result.insertedId); //retornamos el ID
  }

  //actualizamos un elemento de la coleccion
  update(collection, id, data) {
    //retornamos la conexion creada previamente (arriba)
    return this.connect()
      .then((db) => {
        //si no existe el la pelicula entonces debemos hacer un insert
        //updateOne -> busca si existe, si existe entonces lo actualiza {$set: data}y si no existe inserta un nuevo item
        //{ upsert: true } -> habilitamos la actualizacion como insercion dependiendo del caso
        return db
          .collection(collection)
          .updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
      })
      .then((result) => result.upsertedId || id); //ya que puede ser un update or insert retornamos el upsertedId, si mo lo devuele, le pasamos le id del parametro
  }

  //eliminamos un elemento de la coleccion
  delete(collection, id) {
    //retornamos la conexion creada previamente (arriba)
    return this.connect()
      .then((db) => {
        return db.coleccion(collection).deleteOne({ _id: ObjectId(id) });
      })
      .then(() => id); //devolvemos el id como referencia del item que se elimino
  }
}

module.exports = MongoLib;
