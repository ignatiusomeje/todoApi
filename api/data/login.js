const {Users} = require('./../models/Users');

async function login(userEmail, password){
  try{
    const user = await Users.findByCredentials(userEmail, password);
    if (!user.email){
      throw new Error();
    }
    if (user.verificationToken !== '0'){
      return {message: 'Activate your Account through the link sent to your email', Status: 401}
    }else{
      const token = await user.generateAuthToken();
      return {message: user,Status: 200}
    }
  }catch(e){
    return {message: 'Login Details Incorrect',Status: 401}

  }
}

module.exports = {login}