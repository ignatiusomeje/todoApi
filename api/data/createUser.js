const {Users} = require('./../models/Users');
const {email} =  require('./../tasks/email');

const url = 'http://localhost:3000'
async function create(username, userEmail, password){
  try{
    const user = new Users({
      username: username,
      email: userEmail,
      password: password,
    });
    
    const token = await user.generateAuthToken();
    const savedUser = await user.save();
    const verifyToken = await user.verifyToken();
    
    try{
      const check = await email(userEmail, 'Account Verification Email', `hi ${username}, Thanks for signing up with us. We would like you to verify your account by click on this link: ${url}/${verifyToken}/${userEmail}`);
      return {message: savedUser, Status: 200, 'email Status': check};
    }catch(e){
      return {message: 'Unable to send Email to the user', Status: 400};
    }
  }catch(e){
    return {message: 'Username or Email Already exist', Status: 400};
  }
}

module.exports = {create};