//importamos file system fs
const fs = require("fs");

/**
 * en node la mayoria de utilidades pueden funcionar de manera sincrona (bloqueante) y asincrona (no bloqueante)
 * Cuando trabajamos de forma sincrona lo recomendable es utilizar un try catch
 */
try {
  //leemos el tercer parametro que se ingresa por consola que es el nombre del archivo
  const file = process.argv[2];
  const content = fs.readFileSync(file).toString();
  //dividimos el contenido del archivo en cada salto de linea y contamos el contenido del array para saber el # de lineas
  const lines = content.split("\n").length;
  console.info(`El numero de lineas del archivo es: ${lines}`);
} catch (error) {
  console.error(error);
}
