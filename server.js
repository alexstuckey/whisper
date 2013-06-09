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

	// A scheme of colours so that they remain constant throughout the app and can easily be changed
	colors.setTheme({
		userColor: 'bold',
		messageColor: 'blue',
		channelColor: 'magenta',
		connectedColor: 'green',
		disconnectedColor: 'red'
	})
})

app.get('/', function(req, res){
	res.sendfile(__dirname + '/public/index.html');
})

io.sockets.on('connection', function(socket){
	console.log('Client connected'.connectedColor);
	// Notify connect clients of number of users
	io.sockets.emit('users', io.sockets.clients().length);

	socket.on('up', function(data){
		var msg = JSON.parse(data);
		console.log(msg.user.userColor + ' said ' + msg.message.messageColor + ' on ' + msg.channel.channelColor);
		io.sockets.emit('down', JSON.stringify(msg));
	});

	socket.on('disconnect', function(socket){
	console.log('Client disconnected'.disconnectedColor);
});
});

server.listen(app.get('port'));
console.log('Listening on port ', app.get('port'));