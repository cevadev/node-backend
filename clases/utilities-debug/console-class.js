//en lugar de utilizar la consola tradicional que imprime por el stdout y los errores por el stderror
//vamos a scribir en un archiv de log todo lo que ocurre en nuestro programa

const fs = require("fs");

const out = fs.createWriteStream("./out.log");
const error = fs.createWriteStream("./error.log");

//creamos nuestra consola
const consoleFile = new console.Console(out, error);

setInterval(() => {
  consoleFile.info(new Date());
  consoleFile.error(new Error("se produjo un error"));
}, 2000);
