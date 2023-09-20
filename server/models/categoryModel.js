const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  categoryId: String,
  name: String,
  tasks: [{
    type: Schema.Types.ObjectId,
    ref: 'Task',
  }],
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;