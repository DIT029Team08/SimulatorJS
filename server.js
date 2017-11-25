var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var path = require('path');
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server running ...');

app.use('/', express.static(__dirname));

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});
// app.use('/docs/resources/styles', express.static(path.join(__dirname, '/docs/resources/styles')));
// app.use("/docs/resources/styles", express.static( __dirname + '/docs/resources/styles'));

io.sockets.on('connection', function(socket) {
    connections.push(socket);
    console.log('One Connected: %s sockets connected', connections.length);

    //Disconnect
    socket.on('disconnect', function(socket) {
        connections.splice(connections.indexOf(socket), 1);
        console.log('One Disconnected: %s sockets connected', connections.length);
    });
});