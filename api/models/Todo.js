const mongoose = require('mongoose');

const TodosSchema = mongoose.Schema({
  activity:{
    type: String,
    required: true,
    trim: true,
    minlength: 1,
  },
  created: {
    type: Date,
    default: Date.now()
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Date,
    default: null
  },
  creator:{
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  deleted:{
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model('Todo',TodosSchema);

module.exports = {Todo};