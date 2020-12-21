//importamos la clase Writeable del modulo stream de nodejs
const { Writable } = require("stream");

//creamos un Writable Stream, y lo asignamos a la constante writableStream
const writableStream = new Writable({
  defaultEncoding: "utf-8",
  /**
   *
   * @param {*} chunk -> representa al buffer de entrada (input)
   * @param {*} encoding -> el encoding del buffer. si el chunk es un string, el encoding es la codificacion en caracteres
   * de esa cadena, si la codificacion es un buffer esta se puede ignorar.
   * @param {*} callback -> es a funcion llamada cuando se complete el procesamiento para el chunk proporcionado.
   */
  write(chunk, encoding, callback) {
    console.log(chunk.toString());
    callback();
  },
});

process.stdin.pipe(writableStream);
