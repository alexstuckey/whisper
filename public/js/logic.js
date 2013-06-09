var socket = io.connect(window.location.origin);

socket.on('down', function (data) {
	var msg = JSON.parse(data);
	if (msg.message != ""){
		var userName = msg.user;
		var msgClass = "";
		if (msg.user == ""){
			userName = "Anonymous";
		} else if (msg.user == $('#nameEntry').val()) {
			msgClass = "myMessage"
		}
		if (msg.channel == $('#channelEntry').val()) {
			$('#msgLog > tbody:last').append('<tr class="' + msgClass + '"><td>' + userName + '</td><td>' + msg.message + '</td></tr>');
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