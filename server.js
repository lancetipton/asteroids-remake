var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);



// Set directorys for the server to see:
app.use(express.static(__dirname + '/'));
app.use(express.static(__dirname + '/public/images/'));
app.use(express.static(__dirname + '/public/javascripts/'));
app.use(express.static(__dirname + '/public/stylesheets'));


// Rout to set your main index.html file:
app.get('/', function(req, res){
  res.sendFile(__dirname + '/views/index.html');
});



// Server gets messages from client:
io.on('connection', function(socket){


  socket.on('disconnect', function() {

  });






});

// the server
http.listen(8080, function(){
  console.log('listening on *:8080');
});


