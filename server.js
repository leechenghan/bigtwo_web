const fs = require('fs'),
      path = require('path'),
      express = require('express');

var app = express(),
    server = app.listen(3000),
    io = require('socket.io').listen(server),
    host = true,
    rooms = [],
    map = {};

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

io.on('connection', function(socket){
  if (host)
    rooms.push(rooms.length);

  socket.emit('init', { host: host });
  socket.join(rooms.length-1);
  map[socket.id] = rooms.length-1;

  host = !host;

  socket.on('firstGameState', (data) => {

    socket.broadcast.to(map[socket.id]).emit('firstGameState', data);
  });

  socket.on('gameState', (data) => {
    socket.broadcast.to(map[socket.id]).emit('gameState', data);
  });
});
