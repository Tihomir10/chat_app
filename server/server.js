const { Socket } = require('dgram');

const app = require('express')();
const server = require('http').createServer(app)
const io = require('socket.io')(server);

const PORT = process.env.PORT || 4001;

io.on('connection', socket => {
  console.log(socket.id);
  socket.on('disconnect', () => {
    console.log('disconnected')
  })
});

server.listen(PORT, console.log(`Listening on port: ${PORT}`))