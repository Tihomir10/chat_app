const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const User = new Schema({
  name: String,
  userID: String,
});

const User = mongoose.model('User', User);