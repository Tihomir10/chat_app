const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ChatSchema = new Schema ({
  chatName: String,
  messages: { type : Array , "default" : [] },    
})

module.exports = mongoose.model('Chat', ChatSchema);