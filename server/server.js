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
  socket.on('disconnect', () => {
    User.findOneAndRemove({userID: socket.id}, function (err) {
      if (err) { 
        console.log(err) 
      }
    })
  });
  socket.on('newUser', async (username) => {
    var user = await User.find({name: username});
    if (user.length == 0) {
      var user = new User({
        name: username,
        userID: socket.id
      });

      await user.save(function (err) {
        if (err) return err;
      });

      User.watch().on('change', async (change) => {
        var users = await User.find({});
        socket.emit('listOfUsers', {users, user});
      });
    } else {
      socket.emit('usernameTaken', 'Username is taken')
    }
  });
  socket.on('private message', (message) => {
    socket.to(message.receiverID).emit('message', message.text)
  });
});

server.listen(PORT, console.log(`Listening on port: ${PORT}`))