var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

var path = require('path');
users = [];
connections = [];

server.listen(process.env.PORT || 3000);
console.log('Server running ...');


app.get('/', function(req, res) {

    if (connections.length === 0) {
        app.use('/', express.static(path.join(__dirname)));
        res.sendFile(__dirname + '/index.html');
    }
    else if(connections.length > 0) {
        app.use('/public', express.static(path.join(__dirname, '/public')));
        res.sendFile(__dirname + '/animationPage.html');
    }
});


io.sockets.on('connection', function(socket) {
    connections.push(socket);

    console.log('Socket ID is: %s', socket.id);

    console.log('One Connected: %s sockets connected', connections.length);

    //Disconnect
    socket.on('disconnect', function(socket) {
        connections.splice(connections.indexOf(socket), 1);
        users.splice(users.indexOf(socket.username), 1);
        console.log('One Disconnected: %s sockets connected', connections.length);
        console.log('Number of clients in chat room: ' + users.length);
        if(connections.length === 1){
            localStorage.removeItem("stringJSON");
            console.log("localStorage cleared");
        }
    });

    socket.on('begin animation', function (data) {
        console.log("Users after animation started " + connections.length);
        io.sockets.emit('begin animation', data.animator , stringifyArray(connections));
        // io.to(connections[0].id).emit('send message', data.animator.diagram.content[0].content[0].from.toString());
        // io.to(connections[0].id).emit('send message', data.animator.type.toString());
    });


    //New User
    socket.on('new user', function(data, callback){
        callback(true);
        socket.username = data;
        users.push(socket.username);
        console.log('Number of clients in chat room: ' + users.length);
    });

    //Send Message
    socket.on('send message', function(data){
        io.sockets.emit('new message', {msg: data, user: socket.username});
    });

    socket.on('arrow request', function (data) {
        //io.sockets.emit('arrow reply', {socketId: data.socketId, processName: data.processName});
        io.sockets.emit('arrow reply', {socketId: data.socketId});
    });

    function stringifyArray(Array) {
        var returnString = "";

        for(var i = 0; i < Array.length; i++){
            returnString += Array[i].id;
            if(i+1 < Array.length)
            returnString += ",";
        }
        console.log(returnString);
        return returnString;
    }



});