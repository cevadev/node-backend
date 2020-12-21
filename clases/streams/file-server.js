const fs = require("fs");
const path = require("path");

const server = require("http").createServer();

server.on("request", (request, response) => {
  /**
   * leemos el archivo big como un readable stream, el tamaño del chunk por defecto es de 64kb para un fs
   * para un stream normal es de 16kb
   */
  const src = fs.createReadStream("./big");
  /**
   * la funcion pipe() permite limitar el almacenamiento en el buffer de datos a niveles aceptable de modo que no se
   * sobre carga la memoria disponible
   * el objeto response es un writeable stream
   */
  src.pipe(response);
});

server.listen(3000);
