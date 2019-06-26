const fs = require('fs'),
      path = require('path'),
      express = require('express');

var app = express();
var server = app.listen(3000);
var io = require('socket.io').listen(server);

app.set('port', process.env.PORT || 3000);

app.use(express.static('public'));

io.on('connection', function(socket){
  console.log('made socket connection');
  socket.on('gameState', (data) => {
    io.sockets.emit('gameState', data);
  });
});
