require('dotenv').config();

const config = {
  /** cuando no esté en prodccion */
  dev: process.env.NODE_ENV !== 'production',
  port:
    process.env.PORT ||
    3000 /** buena practica tener una variable global para el puerto */,
  cors: process.env.CORS,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
};

module.exports = { config };
