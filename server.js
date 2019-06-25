//filewatcher.js

const fs = require('fs'),
      path = require('path'),
      express = require('express'),
      server = express();

server.set('port', process.env.PORT || 3000);

server.get('/', (req,res)=>{
  res.sendFile('index.html', {root: 'js/'});
});

server.get('/about', (req,res)=>{
  res.sendFile('index.html', {root: 'js/'});
});

server.use(express.static(__dirname + '/js'));

server.use((req,res)=>{
   res.type('text/plain');
   res.status(505);
   res.send('Error page');
});

server.on('data', (data) => {
    console.log('received some shit');
});

//Binding to a port
server.listen(3000, ()=>{
  console.log('Express server started at port 3000');
});
