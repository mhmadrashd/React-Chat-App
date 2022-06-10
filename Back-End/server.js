const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3001',
  }
});

io.on('connection', (socket) => {
  const username = socket.handshake.query.username;
  console.log(`${username || 'Anonymous'} connected`);

  socket.on('client:message', data => {
    console.log(`${data.username}: ${data.message}`);
    socket.broadcast.emit('server:message', data);
  });

  socket.on('disconnect', () => {
    console.log(`${username} disconnected`);
  });

});

server.listen(3000, () => {
  console.log('listening on *:3000');
});