var socket = io.connect(window.location.origin);

socket.on('down', function (data) {
	var msg = JSON.parse(data);
	if (msg.message != ""){
		var userName = msg.user;
		if (msg.user == ""){
			userName = "Anonymous";
		}
		if (msg.channel == $('#channelEntry').val() && msg.subChannel == "") {
			 	$('#msgLog > tbody:last').append('<tr><td>' + userName + '</td><td>' + msg.message + '</td></tr>');
		};
		if (msg.channel == $('#channelEntry').val()) {
			$('#msgLog > tbody:last').append('<tr><td><font color=3399FF>' + userName + '</td><td><font color=3399FF>' + msg.message + '</td></tr>');
		};
	};
  });

socket.on('users', function (data) {
	console.log('Connected users: ' + data);
	var userText = "users"
	if (data == 1) {
		userText = "user"
	}
	$('#connectedUsersCell').text(data + " " + userText);
});

function SendMessage(){
	var msgToSend = {
		user: $('#nameEntry').val(),
		message: $('#textEntry').val(),
		channel: $('#channelEntry').val()
	};

	if(msgToSend.message.length != 0) {
		socket.emit('up', JSON.stringify(msgToSend));
		console.log('Sent message!');
	
		// Clear textEntry
		$('#textEntry').val('');
	}

  };

$(document).ready(function(){
	// This runs when the page is ready, interface code should be inside here
	$('#textEntry').keyup(function(event){
	event = event || window.event;
	if (event.keyCode == 13) {
		// on enter key
		$('#textButton').click();
		}
	  });
  });