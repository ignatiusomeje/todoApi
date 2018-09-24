const {Todo} = require('./../models/Todo');

async function createTodo (activity, creator){

  try{
    const todo = new Todo({
      activity: activity,
      creator: creator
    });

    var doc = await todo.save();
    return {message: doc, Status: 200};
  } catch(e){
    return {message: 'Unable to save Todo', Status: 400};
  }
};

module.exports = {createTodo}