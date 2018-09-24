const {Users} = require('./../models/Users');

async function update(userEmail,password){
  try{
    const user = await Users.findOne({email: userEmail});
    if (!user.email){
      throw new Error()
    }
    user.set({
      password: password
    })
    await user.save();
    return {message: "User's password update successfully",Status: 200}
  }catch(e){
    return {message: "Unable to Update user's Data",Status: 404}
  }
}

module.exports = {update};