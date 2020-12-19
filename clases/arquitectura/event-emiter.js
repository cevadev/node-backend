// Creamos un Event Emitter por medio del modulo de node llamado events
const EventEmitter = require("events");

// Podemos crear un logger propio con el EventEmitter
class Logger extends EventEmitter {
  // Método execute recibe un callback
  execute(callback) {
    console.log("Before");
    // Emitimos un Evento
    this.emit("start");
    callback();
    // Emitimos otro evento
    this.emit("finish");
    console.log("Afther");
  }
}

const logger = new Logger();

// Cada vez que ocurra el evento start, hagá algo
logger.on("start", () => console.log("STARTING"));
// Podemos Suscribirnos al evento multiples veces sin niguna restricción
logger.on("finish", () => console.log("Finishing"));

logger.on("finish", () => console.log("It's Done"));

//logger.execute(() => console.log("Hello World"));

/*
Algo muy importante es que si ejecutamos código asincrono, como un setTimeout,
el orden no va ha permanecer, porque como es código asincrono precisamente se va 
ha ejecutar despues de todas las emisiones, en ese caso la manera de controlarlo es
usando callbacks, si lo ejecutamos veremos que nuestro hello world se ejecuta despues,
porque queda de manera asincrona.
*/
logger.execute(() => setTimeout(() => console.log("Hello World"), 500));
