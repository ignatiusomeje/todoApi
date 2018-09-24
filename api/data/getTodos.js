const {Todo} = require('../models/Todo');

async function getTodo(creator){
  try{
    const docs = await Todo.find({creator: creator, deleted:false}).sort({$natural: -1});
    return {message: docs,Status: 200};

  }catch(e){
    return {message: 'Unable to retrieve saved Todos',Status: 400};
  }
}

module.exports = {getTodo};