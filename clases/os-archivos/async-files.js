const fs = require("fs");

//leemos el tercer parametro que se ingresa por consola que es el nombre del archivo
const file = process.argv[2];

if (!file) {
  throw new Error("Debe indicar el archivo a leer");
}

const content = fs.readFile(file, function (error, content) {
  if (error) {
    return console.error(error);
  }
  //dividimos el contenido del archivo en cada salto de linea y contamos el contenido del array para saber el # de lineas
  const lines = content.toString().split("\n").length;
  console.info(`El numero de lineas del archivo es: ${lines}`);
});
