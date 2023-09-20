const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const projectSchema = new Schema({
  projectId: String,
  name: String,
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