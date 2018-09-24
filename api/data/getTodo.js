const {ObjectID} = require('mongodb');
const {Todo} = require('./../models/Todo');

async function getTodoById(creator,todoId){
  try{
    if (!ObjectID.isValid(todoId)){
      return {message: 'Invalid ID',Status: 400};
    };
    const docs = await Todo.findOne({creator: creator, _id: todoId, deleted: false});
    if (!docs){
      return {message: 'No todo Found, Create one',Status: 404}
    }
    return {message: docs, Status: 200};
  
  }catch(e){
    return {message: 'Unable to Get Todo', Status: 500};
  }
}

module.exports = {getTodoById};