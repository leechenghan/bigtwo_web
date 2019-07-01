// TODO: 1. look into websocket rooms
// TODO: 2. why does first instantiation always = undefined?

const fs = require('fs'),
      path = require('path'),
      express = require('express');

var app = express(),
    server = app.listen(3000),
    io = require('socket.io').listen(server),
    host = true;

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));
app.use(express.static('public/img'));

io.on('connection', function(socket){
  socket.emit('init', { host: host });
  console.log('new connection with id: ' + host);
  host = !host;

  socket.on('firstGameState', (data) => {
    socket.broadcast.emit('firstGameState', data);
  });

  socket.on('gameState', (data) => {
    socket.broadcast.emit('gameState', data);
  });
});

//io.sockets.connected[socketId]
