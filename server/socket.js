const socketConnection = (io) => {
  io.use((socket, next) => {
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error("invalid username"));
    }
    socket.username = username;
    next();
  });

  const findUsers = (users) => {
    for (let [id, socket] of io.of('/').sockets) {
      users.push({
        id: id,
        name: socket.username
      })
    }
    return users
  }
  
  io.on('connection', (socket) => {
    const users = []
    findUsers(users)
    io.emit('users', users)

    socket.on('disconnect', () => {
      const users = []
      findUsers(users)
      io.emit('users', users)
    })

    socket.on('private message', ({ chatName, id, messages }) => {
      socket.to(id).emit('private message', {
        chatName,
        messages
      })
    })
  })
}

module.exports = socketConnection