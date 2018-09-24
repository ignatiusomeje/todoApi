const {pick, isBoolean} = require('lodash');
const {ObjectID} = require('mongodb');

const {Todo} = require('./../models/Todo');

async function updateTodo(todoId, data, creator) {

  let id = todoId;
  let body = pick(data,['activity','completed']);
  try{
    if (!ObjectID.isValid(id)){

      return {message: 'Invalid ID', Status: 400};

    };
    if (body.completed && isBoolean(body.completed)){
      body.completedAt = Date.now();
    }else{
      body.completed = false;
      body.completedAt = null;
    }
    const docs = await Todo.findByIdAndUpdate({
      _id: id,
      creator: creator
    },
      {$set:
        body
      },
      {new: true}
    );
    if (!docs){
      return {message: 'No Todo found to Update', Status: 404};
    }

    return {message: docs,Status: 200};
  }catch(e){
    return {message: 'Unable to Update your Todo',Status: 400}
  }
}

module.exports = {updateTodo}