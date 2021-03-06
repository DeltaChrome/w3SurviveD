const express = require('express');
const app = express();
const http = require("http");
const server = http.createServer(app);

const socketIO  = require('socket.io')(server);
const LISTEN_PORT = 8080;

let inventory;

 app.use(express.static(__dirname + '/public'));

 app.get('/' , function(req, res)
{
    res.sendFile(__dirname + '/public/index.html');
})

//-----------------------------------

//routes
app.get('/color', function(req,res) {
    res.sendFile(__dirname + '/public/color.html');
});

app.get('/controller', function(req,res) {
    res.sendFile(__dirname + '/public/controller.html');
});

app.get('/axe', function(req,res) {
    res.sendFile(__dirname + '/public/axe.html');
});

app.get('/firebow', function(req,res) {
    res.sendFile(__dirname + '/public/firebow.html');
});

app.get('/hammer', function(req,res) {
    res.sendFile(__dirname + '/public/hammer.html');
});

//websocket stuff
socketIO.on('connection', function(socket) {
    console.log(socket.id + ' has connected!');

    socket.on('disconnect', function(data) {
        console.log(socket.id + ' has disconnected');
    });

    //custom events
    //socket = one client
    //socketIO.sockets = all clients
    socket.on('red', function(data) {
        console.log('red event heard');
        socketIO.sockets.emit('color_change', {r:255, g:0, b:0});
    });

    socket.on('green', function(data) {
        console.log('green event heard');
        socketIO.sockets.emit('color_change', {r:0, g:255, b:0});
    });

    socket.on('blue', function(data) {
        console.log('blue event heard');
        socketIO.sockets.emit('color_change', {r:0, g:0, b:255});
    });

    socket.on('SpwnObj', function(data) {
        console.log('SpwnObj event heard');
        socketIO.sockets.emit('Spawn_Object', data);
    });

    socket.on('createObject', function(data) {
        console.log('create event heard');

        socketIO.sockets.emit('Spawn_Object', data);
    });

    socket.on('update', function(data) {
        console.log('update event heard');

        inventory = data;
        console.log(inventory);
        //socketIO.sockets.emit('updateGame', data);
    });
    socket.on('pullData', function() {
        console.log('pull event heard');
        console.log(inventory);
        socketIO.sockets.emit('updateGame', inventory);
    });
});


//-----------------------------------------

server.listen(LISTEN_PORT);

console.log('Listening to port' + LISTEN_PORT);