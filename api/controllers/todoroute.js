const {Authenticate} = require('./../authenticator/authenticate');
const {createTodo} = require('./../data/createTodo');
const {getTodo} = require('./../data/getTodos');
const {getTodoById} = require('./../data/getTodo');
const {updateTodo} = require('./../data/updateTodo');
const {deleteTodo} = require('./../data/deleteTodo');

async function create(req,res) {
  try{
    const users = await Authenticate(req,res);
    const message = await createTodo (req.body.activity, users.user._id);
    res.json(message);
  }catch(e){
    res.status(401).json({message: 'unauthorised access', status: 401});
  }
}

async function read(req,res){
  try{
    const users = await Authenticate(req,res);
    const message = await getTodo(users.user._id);
    res.json(message);
  }catch(e){
    res.status(401).json({message: 'unauthorised access', status: 401});
  }
}

async function readById(req,res){
  try{
    const users = await Authenticate(req,res);
    const message = await getTodoById(users.user._id, req.swagger.params.id.value);
    res.json(message);
  }catch(e){
    res.status(401).json({message: 'unauthorised access', status: 401});
  }
}
async function update(req, res){
  try{
    const users = await Authenticate(req,res);
    const message = await updateTodo(req.swagger.params.id.value,req.body, users.user._id);
    res.json(message);
  }catch(e){
    res.status(401).json({message: 'unauthorised access', status: 401});
  }
};

async function del(req, res){
  try{
    const users = await Authenticate(req,res);
    const message = await deleteTodo(users.user._id,req.swagger.params.id.value);
    res.json(message);
  }catch(e){
    res.status(401).json({message: 'unauthorised access', status: 401});
  }
}
module.exports = {create, read, readById, update, del};