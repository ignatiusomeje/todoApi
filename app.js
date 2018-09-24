'use strict';

var a127 = require('a127-magic');
var express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
var app = express();

const {create, read, readById, update, del} = require('./api/controllers/todoroute');
const {createUser, verifyAccount, userlogin, resetInitiate, validate, updateUser, logOutUser} = require('./api/controllers/userroute')

mongoose.connect("mongodb://mrexcel:jesuse153@ds259732.mlab.com:59732/todo-api");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

module.exports = app; // for testing

// initialize a127 framework
a127.init(function(config) {

  // include a127 middleware
  app.use(a127.middleware(config));

  // error handler to emit errors as a json string
  app.use(function(err, req, res, next) {
    if (typeof err !== 'object') {
      // If the object is not an Error, create a representation that appears to be
      err = {
        message: String(err) // Coerce to string
      };
    } else {
      // Ensure that err.message is enumerable (It is not by default)
      Object.defineProperty(err, 'message', { enumerable: true });
    }

    // Return a JSON representation of #/definitions/ErrorResponse
    res.set('Content-Type', 'application/json');
    res.end(JSON.stringify(err));
  });

  app.post('/todos',create);
  app.get('/todos',read);
  app.get('/todos/:id',readById);
  app.put('/todos/:id',update);
  app.delete('/todos/:id',del);

  app.post('/users',createUser);
  app.get('/users/:token/:email',verifyAccount);
  app.post('/login',userlogin);
  app.get('/users/:email',resetInitiate);
  app.get('/validate/:token/:email',validate);
  app.put('/users/:email',updateUser);
  app.delete('/users',logOutUser)

  var ip = process.env.IP || 'localhost';
  var port = process.env.PORT || 3000;
  // 10010;
  // begin listening for client requests
  app.listen(port, ip);

  console.log('try this:\ncurl http://' + ip + ':' + port + '/hello?name=Scott');
});
