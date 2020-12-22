const fs = require("fs");

const copy = process.argv[2];
const to = process.argv[3];

fs.copyFile(copy, to, (err) => {
  if (err) {
    throw new Error("Se produjo un error");
  }
  console.info(`El archivo ${copy} fue copiado como ${to}`);
});
