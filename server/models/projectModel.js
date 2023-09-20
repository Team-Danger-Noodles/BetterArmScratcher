const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: {type: String, unique: true, required: true},
  users: [{
    type: Schema.Types.ObjectId,
    ref: 'User',
  }],
  categories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }]
});

const Project = mongoose.model('project', projectSchema);

module.exports = Project;