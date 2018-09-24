const {create} = require('./../data/createUser');
const {verify} = require('./../data/verifyAccount');
const {login} = require('./../data/login');
const {initiate} = require('./../data/resetInit');
const {validation} = require('./../data/validate');
const {update} = require('./../data/updateUser');
const {logOut} = require('./../data/logoutUser');
const {Authenticate} = require('./../authenticator/authenticate');

async function createUser(req,res) {
  try{
    const user = await create(req.body.username, req.body.email, req.body.password);
    res.json(user)
  }catch(e){
    res.json({message: 'Unable to save User', Status: 500})
  }
};

async function verifyAccount(req, res){
  try{
    const message = await verify(req.swagger.params.token.value,req.swagger.params.email.value)
    res.json(message)
  }catch(e){
    res.json({message: 'Account Verification Failed', Status: 500})
  }
}


async function userlogin(req,res){
  try{
    const user = await login(req.body.email, req.body.password);
    res.json(user);
  }catch(e){
    res.json({message: 'Login Failed', Status: 500})
  }
};

async function resetInitiate(req,res){
  try{
    const message = await initiate(req.swagger.params.email.value);
    res.json(message)
  }catch(e){
    res.json({message: 'reset initiation Failed', Status: 500})
  }
};

async function validate(req,res){
  try{
    const message = await validation(req.swagger.params.token.value,req.swagger.params.email.value);
    res.json(message);
  }catch(e){
    res.json({message: "User's validation Failed", Status: 500})
  }
}

async function updateUser(req, res){
  try{
    const message = await update(req.swagger.params.email.value, req.body.password);
    res.json(message);
  }catch(e){
    res.json({message: "User's Password Update Failed", Status: 500})
  }
}

  async function logOutUser(req, res){
  try{
    const users = await Authenticate(req,res);
    if (users.Status === 401){
     return res.json(users);
    }
    const message = await logOut(users.user,users.token);
    res.json(message);
  }catch(e){
    res.json({message: "Logout Failed", Status: 500})
  }
}

module.exports = {createUser, verifyAccount, userlogin, resetInitiate, validate, updateUser, logOutUser};