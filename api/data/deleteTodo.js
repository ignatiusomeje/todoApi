const {ObjectID} = require('mongodb');

const {Todo} = require('./../models/Todo');

async function deleteTodo(creator, todoId){
  try{
    if (!ObjectID.isValid(todoId)){
      return {message: 'Invalid ID', Status: 400};
    };
    const docs = await Todo.findByIdAndUpdate({
      _id : todoId,
      creator: creator
    }, {$set:{deleted: true}},{new:true})
    if (!docs){
      return {message: 'No Todo found',Status: 404}
    }
    return {message: docs, Status: 200};
  }catch(e){
    return {message: 'Unable to Delete Todo', Status: 400};
  }
};

module.exports = {deleteTodo};