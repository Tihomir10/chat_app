require('dotenv').config()

const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server);
const mongoose = require('mongoose')
const PORT = process.env.PORT || 4001;

const indexRouter = require('./routes/index')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); 
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

io.use((socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error("invalid username"));
  }
  socket.username = username;
  next();
});

io.on('connection', (socket) => {
  const users = []
  for (let [id, socket] of io.of('/').sockets) {
    users.push({
      id: id,
      name: socket.username
    })
  }
  socket.emit('users', users)
})

app.use('/api', indexRouter)

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('connected to mongodb')
});

server.listen(PORT, console.log(`Listening on port: ${PORT}`))