async function logOut(user,token){
  try{
    await user.signOut(token);
    return {message: 'User Signed Out Successfully',Status: 200};
  }catch(e){
    return {message: 'Unsuccessful Sign Out',Status: 400};
  }
}

module.exports = {logOut};