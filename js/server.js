//filewatcher.js

const net = require('net')

server = net.createServer((connection)=>{
 console.log('Player connected');
 connection.write(`You have connected`);

connection.on('close',()=>{
  console.log('Player disconnected');
  watcher.close();
 });

});
server.listen(3000,()=>console.log('server is created'));
