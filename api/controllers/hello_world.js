'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 http://www.w3schools.com/js/js_strict.asp
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');

// const mongoose = require('mongoose');
// const express = require('express');
// const bodyParser = require('body-parser');
// const {pick, isBoolean} = require('lodash');
// const {ObjectID} = require('mongodb');

// const {Todo} = require('./models/Todo');
// const {Users} = require('./models/Users');
// const {Authenticate} = require('./authenticator/authenticate');
// const {errorMessage, successMessage} = require('./tasks/message');
// const {email} = require('./tasks/email');

// mongoose.connect("mongodb://localhost:27017/TodoAPI",{ useNewUrlParser: true });
// const app = express();
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: false}));

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  hello: hello,

};

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function hello(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var name = req.swagger.params.name.value || 'stranger';
  var hello = util.format('Hello, %s!', name);

  // this sends back a JSON response which is a single string
  res.json(hello);
};

// function createUser(req, res){
//   try{
//     const user = new Users({
//       username: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//     });
    
//     const savedUser = await user.save();
//     const verifyToken = await user.verifyToken();
//     const token = await user.generateAuthToken();
//     try{
//       const check = await email(req.body.email, 'Account Verification Email', `hi ${req.body.username}, Thanks for signing up with us. We would like you to verify your account by click on this link: http://localhost:3000/${verifyToken}/${req.body.email}`);
//       res.status(200).send(savedUser);
//     }catch(e){
//       res.status(400).send(e);
//     }
//   }catch(e){
//     let messenger = await errorMessage('Username or Email Already exist',400);
//     res.status(400).send(messenger);
//   }
// }
