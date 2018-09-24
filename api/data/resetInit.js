const {Users} = require('./../models/Users');
const {email} = require('./../tasks/email');

let url = 'http://localhost:3000'

async function initiate(userEmail){
  try{
    const user = await Users.findOne({email: userEmail});
    if (!user.email){
      throw new Error();
    }
    const token = await user.verifyToken();
    await email(userEmail, 'Account Password Reset Initiated on Your Account', `hi dear, A Password reset action was initiated on your account, if it was initiated by you then click on the link below or ignore this email. ${url}/validate/${token}/${userEmail}`);
    return {message: 'Check your Email to continue', Status: 200};
  }catch(e){
    return {message: "Unable to Proceed with user's Data Update",Status: 404};
  }
}

module.exports = {initiate};