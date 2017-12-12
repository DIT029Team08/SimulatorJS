/*
* Server.js acts as the server side of SimulatorJS web application. It uses express as it's standard sever framework.
* It also uses socket.io library to enable real-time, bi-directional communication with clients. Server.js allows
* clients to have a distributed simulation by dividing different arrows among users and specifying specific processes
* to each client.
* Server.js also manages the chat part of the application, allowing to add new users, removing users and spreading
* the messages.
*/

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

//Port 3000 is our web app's specific access port
server.listen(process.env.PORT || 3000);
console.log('Server running ...');

//Allows access to various resources for express.

app.get('/', function (req, res) {

    if (connections.length === 0) {
        app.use('/', express.static(path.join(__dirname)));
        res.sendFile(__dirname + '/index.html');
    }
    else if (connections.length > 0) {
        app.use('/public', express.static(path.join(__dirname, '/public')));
        res.sendFile(__dirname + '/animationPage.html');
    }
});

//Starts socket's connection with the server

io.sockets.on('connection', function (socket) {
    connections.push(socket);

    console.log('Socket ID is: %s', socket.id);

    console.log('One Connected: %s sockets connected', connections.length);

    //Disconnecting Sockets currently connected to the system
    socket.on('disconnect', function () {
        console.log(connections.indexOf(socket).id);
        connections.splice(connections.indexOf(socket), 1);
        users.splice(users.indexOf(socket.username), 1);
        console.log('One Disconnected: %s sockets connected', connections.length);
        console.log('Number of clients in chat room: ' + users.length);
        if (connections.length === 1) {
            localStorage.removeItem("stringJSON");
            console.log("localStorage cleared");
        }
    });

    //Begins the animation on each users browser also providing the number of current sockets connected to the system
    socket.on('begin animation', function (data) {
        console.log("Users after animation started " + connections.length);
        io.sockets.emit('begin animation', data.animator, stringifyArray(connections));
    });


    //New User
    socket.on('new user', function (data, callback) {
        callback(true);
        socket.username = data;
        users.push(socket.username);
        console.log('Number of clients in chat room: ' + users.length);
    });

    //Send Message
    socket.on('send message', function (data) {
        io.sockets.emit('new message', {msg: data, user: socket.username});
    });

    //Each socket requests specific arrows
    socket.on('arrow request', function (data) {
        io.sockets.emit('arrow reply', {socketId: data.socketId});
    });

    //Stringifies the connection array in order to be used in animator.js
    function stringifyArray(Array) {
        var returnString = "";

        for (var i = 0; i < Array.length; i++) {
            console.log("connections: " + connections[i].id);
            returnString += Array[i].id;
            if (i + 1 < Array.length)
                returnString += ",";
        }
        console.log("STRING: " + returnString);
        return returnString;
    }


});