var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var users = [];
var cookieUsers = [];
var userColors = [];
var chatHistory = [];
var ownChatHistory = [];
var userCount = 0;

	
http.listen( port, function () {
    console.log('listening on port', port);
});

app.use(express.static(__dirname + '/public'));

// listen to 'chat' messages
io.on('connection', function(socket){
	socket.emit('get cookie', {name: cookieUsers});

	socket.on('cookie', function(msg){
		if(msg != ""){
			socket.nickname = msg;
			users.push(socket.nickname);
			justConnected = socket.nickname + " has just reconnected.";
			time = new Date().toTimeString().substr(0, 8);
			chat = time + " SERVER: " + justConnected + "<br/>";
			chatHistory.push(chat);
			socket.broadcast.emit('new name', {msg: chat, users: users});
			socket.emit('logged as', socket.nickname);
			socket.emit('new user', {chat: chat, msg: chatHistory, users: users});	
		}
		else{
			userCount++;
			socket.nickname = "user" + userCount;
			users.push(socket.nickname);
			cookieUsers.push(socket.nickname);
			socket.emit('set cookie', socket.nickname);
			justConnected = socket.nickname + " has just connected.";
			time = new Date().toTimeString().substr(0, 8);
			chat = time + " SERVER: " + justConnected + "<br/>";
			chatHistory.push(chat);
			socket.broadcast.emit('new name', {msg: chat, users: users});
			socket.emit('logged as', socket.nickname);
			socket.emit('new user', {chat: chat, msg: chatHistory, users: users});	
		}
	});
	
    socket.on('chat', function(msg){
		if (msg.indexOf('/nickcolor') >= 0){
			//fix that if a user changes color that is already set
			time = new Date().toTimeString().substr(0, 8);
			color = msg.replace('/nickcolor ', '');
			userColors.push(socket.nickname);
			userColors.push(color);
			colorChanged = "Your color text has changed to " + color;
			message = time + " SERVER: " + colorChanged + "<br/>";
			chatHistory.push(message);
			socket.emit('new message', {msg: message, users: users});
		}
		else if (msg.indexOf('/nick') >= 0){
			newName = msg.replace('/nick ', '');
			if ((cookieUsers.indexOf(newName) != -1) || (users.indexOf(newName) != -1)){
				time = new Date().toTimeString().substr(0, 8);
				notSuccessful = time + " SERVER: " + socket.nickname + newName + " is already taken.<br/>";
				chatHistory.push(notSuccessful);
				io.emit('new name', {msg: notSuccessful, users: users});
			}
			else{
				index = users.indexOf(socket.nickname);
				users[index] = newName;
				index = cookieUsers.indexOf(socket.nickname);
				socket.emit('edit cookie', {msg:socket.nickname, newname: newName});
				colorIndex = userColors.indexOf(socket.nickname);
				successful = time + " SERVER: " + socket.nickname + " has changed nickname to " + newName + "<br/>";
				chatHistory.push(successful);
				socket.nickname = newName;
				userColors[colorIndex] = socket.nickname;
				io.emit('new name', {msg: successful, users: users})
			}	
		}
		else if(msg == ' '|| msg == ''){
			// do nothing
		}
		else{
			time = new Date().toTimeString().substr(0, 8);
			if (userColors.indexOf(socket.nickname) != -1){
				color = userColors.indexOf(socket.nickname) + 1;
				name = socket.nickname.fontcolor(userColors[color]);
				message = time + " " + name + ": " + msg + "<br/>";
				chatHistory.push(message);
				socket.broadcast.emit('new message', {msg: message});
				socket.emit('new message2', {msg: message});
			}
			else{
				message = time + " " + socket.nickname + ": " + msg + "<br/>";
				chatHistory.push(message);
				socket.broadcast.emit('new message', {msg: message});
				socket.emit('new message2', {msg: message});
			}
		}
    });
	
	socket.on('disconnect', function(msg){
		users.splice(users.indexOf(socket.nickname), 1);
		time = new Date().toTimeString().substr(0, 8);
		disconnectMessage = time + " SERVER: " + socket.nickname + " has disconnected from the chat.<br/>"
		chatHistory.push(disconnectMessage);
		io.emit('new name', {msg: disconnectMessage, users: users});
	});

});


