//este Server levanta un servidor para pruebas

const express = require('express');
const supertest = require('supertest');

function testServer(route) {
  //app que sera distinta de la principal
  const app = express();
  route(app);
  return supertest(app);
}

module.exports = testServer;
