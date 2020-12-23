require('dotenv').config();

const config = {
  dev: process.env.NODE_ENV !== 'production' /** cuando no esté en prodccion */,
  port:
    process.env.PORT ||
    3000 /** buena practica tener una variable global para el puerto */,
};

module.exports = { config };
