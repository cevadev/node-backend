/**
 * Creamos una funcion que recibe una cadena de texto y lo convierte en
 * camel case usando streams
 */
const { Transform } = require("stream");

const transformStream = new Transform({
  transform(chunk, encoding, callback) {
    this.push(toCamelCase(chunk.toString()));
    callback();
  },
});

function toCamelCase(str) {
  let wordsInCamelCase = str.split(" ").map((word) => {
    return word.charAt(0).toUpperCase() + word.slice(1);
  });
  return wordsInCamelCase.join("");
}

process.stdin.pipe(transformStream).pipe(process.stdout);
