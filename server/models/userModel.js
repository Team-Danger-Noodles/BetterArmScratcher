const mongoose = require('mongoose');

const userModelSchema = new mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true}
});

const User = mongoose.model('User', userModelSchema);

module.exports = User;