const {Users} = require('./../models/Users');

async function validation(token, userEmail){
  try{
    const user = await Users.findOne({verificationToken: token, email: userEmail});
    if (user){
      await user.updateOne({$set:{verificationToken : 0}},{new:true});
      await user.save();
      return {isValid: true, Status: 200}
    }else{
      throw new Error()
    };
    
  }catch(e){
    return {isValid: false,Status: 404};
  }
}

module.exports = {validation};