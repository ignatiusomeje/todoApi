const axios  = require('axios');
const mailgun = require('mailgun-js')({apiKey:'key-02cf92f1c5f76e21ce0ceb9bfe44a287',domain:'sandbox31e29eef092e4198953c34cb27a9a0d0.mailgun.org'})

// const {errorMessage, successMessage} = require('./message');

const email = async (user_email,subject,message) => {
  try{
    var validate = await axios({
      url:'https://api.mailgun.net/v3/address/validate',
      params:{
        address: user_email,
        api_key:'pubkey-15b012fabba421f188bc0a0d722db5c4'
      }
    });
    try{
      if (validate.data && validate.data.is_valid){
        let data = {
          from: 'Support@sandbox31e29eef092e4198953c34cb27a9a0d0.mailgun.org',
          to: user_email,
          subject,
          text: message
        }
        mailgun.messages().send(data, async (error,body) => {
          if (error) {
            // let messenger = await errorMessage('Email Not Sent',400)
            return {message: 'Email Not Sent', Status: 400};
          }
        })
        // let messenger = await successMessage('Check your email to verify your account',200);
        return {message: 'Check your email to verify your account', Status: 200};
      }else{
        // let message = await errorMessage('Invalid Email, use a valid email for verification purpose',400)
        return {message: 'Invalid Email, use a valid email for verification purpose', Status: 400};
      }
    }catch(e){
      return {message: 'Email Validation failed', Status: 400};
    }
  }catch(e){
    // let messenger = await errorMessage('Email Not Sent',400)
    return {message: 'Email Server Unavailable', Status: 500};
  }
};

module.exports = {email}