//importamos la clase Readable del modulo stream de nodejs
const { Readable } = require("stream");

//instanciamos un Readable stream
const readableStream = new Readable();

/**
 * cuando se ejecuta el metodo push, los datos son almacenados en el buffer, si no se consumen los datos en el buffer
 * estos se almacenan en la cola interna hasta que son consumidos
 */
readableStream.push(`${0 / 0} `.repeat(10).concat(` Batman, Batman!`));

/**
 * el stream de lectura se da por terminado cuando el buffer recibe un null en este caso con el metodo push(null)
 */
readableStream.push(null);

/**
 * pipe(writable) este metodo nos permite encadenar diferentes streams para su manipulación por medio de computos.
 * Lo que hace es recibir un stream de entrada, realiza una operacion sobre dicho stream y retorna un nuevo stream
 * con dicha transformacion.
 * "stdout" es un writable stream que toma el buffer y lo muestra en la consola
 */
readableStream.pipe(process.stdout);
