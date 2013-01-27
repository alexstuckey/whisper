var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

// Defining configuration
app.configure(function(){
	app.set('port', 3000);
	app.use(express.static(__dirname + '/public'));
})

app.get('/', function(req, res){
	res.sendfile(__dirname + '/public/index.html');
})

io.sockets.on('connection', function(socket){
	console.log('Client connected');
	// Notify connect clients of number of users
	io.sockets.emit('users', io.sockets.clients().length);

	socket.on('up', function(data){
		console.log('Message uploaded: ', data);
		io.sockets.emit('down', data);
	});

	socket.on('disconnect', function(socket){
	console.log('Client disconnected');
});
});

server.listen(app.get('port'));
console.log('Listening on port ', app.get('port'));