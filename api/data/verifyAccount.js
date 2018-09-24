const {email} = require('./../tasks/email');
const {Users} = require('./../models/Users');

async function verify(token, userEmail){
  var paramToken = token;
  let paramEmail = userEmail;
  try{
    let user = await Users.findOne({verificationToken: paramToken, email: paramEmail});
    
    await user.updateOne({$set:{verificationToken : 0}},{new:true});
    await email(paramEmail, 'Successful Verification', 'hi Dear, Thanks for verifying your account with us. We would be happy helping any time');
    return {message: 'Thanks for verifying your Account',Status: 200}
  }catch(e){
    return {message: 'Account Verification failed', Status: 400}
  }
};

module.exports = {verify}