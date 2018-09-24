const {Users} = require('./../models/Users');

const Authenticate = async (req, res, next) =>{
  const token = req.header('Bearer');
  try{
    const user = await Users.findByToken(token)
    if (!user){
      throw new Error();
    }
    return {'user' : user,
    'token' : token}
  }catch(e){
    return {message: 'Unauthorised access', Status: 401}
  }

};

module.exports = {Authenticate};