var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);
var colors = require('colors');

// Defining configuration
app.configure(function(){
	app.set('port', 3000);
	app.use(express.static(__dirname + '/public'));
	io.set('log level', 2);
})

app.get('/', function(req, res){
	res.sendfile(__dirname + '/public/index.html');
})

io.sockets.on('connection', function(socket){
	console.log('Client connected');
	// Notify connect clients of number of users
	io.sockets.emit('users', io.sockets.clients().length);

	socket.on('up', function(data){
		var msg = JSON.parse(data);
		console.log(msg.user.bold + ' said ' + msg.message.blue + ' on ' + msg.channel.magenta);
		io.sockets.emit('down', JSON.stringify(msg));
	});

	socket.on('disconnect', function(socket){
	console.log('Client disconnected');
});
});

server.listen(app.get('port'));
console.log('Listening on port ', app.get('port'));