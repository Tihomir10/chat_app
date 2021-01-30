const app = require('express')();
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const mongoose = require('mongoose');
require('dotenv').config()

const PORT = process.env.PORT || 4001;
const User = require('./models/user')

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongodb')
});

io.on('connection', socket => {
  socket.on('message', (msg) => {
    console.log(msg);
  });
  socket.on('disconnect', () => {
    console.log('disconnected')
  });
  socket.on('newUser', (username) => {
    var user = new User({
      name: username,
      userID: socket.id
    })
    user.save(function (err) {
      if (err) return err;
    })
  });
});

server.listen(PORT, console.log(`Listening on port: ${PORT}`))