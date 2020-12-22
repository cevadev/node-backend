const fs = require("fs");

//vamos a leer los archivos dentro de un directorio
const files = fs.readdir(__dirname, (error, files) => {
  if (error) {
    throw new Error("se produjo un error");
  }
  console.info(files);
});
