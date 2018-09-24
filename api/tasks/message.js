const errorMessage = (error,status)=>{
  let send = {
    STATUS: status,
    ERROR: error
  }
  return JSON.stringify(send);
};

const successMessage = (message,status) => {
  let send = {
    STATUS: status,
    MESSAGE: message
  }
  return JSON.stringify(send);
}

module.exports = {errorMessage, successMessage};