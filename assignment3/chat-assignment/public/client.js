// shorthand for $(document).ready(...)
$(function() {
    var socket = io();
	var chatHistory = [];
    $('form').submit(function(){
		socket.emit('chat', $('#m').val());
		$('#m').val('');
		return false;
    });

    socket.on('new message', function(msg){
		chat = '';
		chatHistory.push(msg.msg);
		for (i = 0; i < chatHistory.length; i++){
			chat += chatHistory[i];
		}
		$('#messages').html(chat);
		var d = document.getElementById("messageWrap");
		if (d.scrollHeight > d.clientHeight){
			d.scrollTop = d.scrollHeight - d.clientHeight;
		}
    });
    socket.on('new message2', function(msg){
		chat = '';
		chatHistory.push(msg.msg.bold());
		for (i = 0; i < chatHistory.length; i++){
			chat += chatHistory[i];
		}
		$('#messages').html(chat);
		var d = document.getElementById("messageWrap");
		if (d.scrollHeight > d.clientHeight){
			d.scrollTop = d.scrollHeight - d.clientHeight;
		}
    });
	socket.on('new name', function(msg){
		chat = '';
		chatHistory.push(msg.msg);
		for (i = 0; i < chatHistory.length; i++){
			chat += chatHistory[i];
		}
		$('#messages').html(chat);
		var d = document.getElementById("messageWrap");
		if (d.scrollHeight > d.clientHeight){
			d.scrollTop = d.scrollHeight - d.clientHeight;
		}
		listOfUsers = '';
		for (i = 0; i < msg.users.length; i++){
			listOfUsers += msg.users[i] + '<br/>';
		}
		$('#users').html(listOfUsers);
	});
	socket.on('new user', function(msg){
		chatHistory.push(msg.chat);
		chat = '';
		for (i = 0; i < msg.msg.length; i++){
			chatHistory[i] = msg.msg[i];
		}
		for (i = 0; i < msg.msg.length; i++){
			chat += msg.msg[i];
		}
		$('#messages').html(chat);
		var d = document.getElementById("messageWrap");
		if (d.scrollHeight > d.clientHeight){
			d.scrollTop = d.scrollHeight - d.clientHeight;
		}
		listOfUsers = '';
		for (i = 0; i < msg.users.length; i++){
			listOfUsers += msg.users[i] + '<br/>';
		}
		$('#users').html(listOfUsers);		
	});
	
	socket.on('get cookie', function(msg) {
		index = -1;
		for(i = 0; i < msg.name.length; i++){
			if (getCookie(msg.name[i]) != ""){
				index = i;
			}
		}
		if (index != -1){
			socket.emit('cookie', getCookie(msg.name[index]));
		}
		else{
			socket.emit('cookie', "");		
		}
		
	});
	
	socket.on('logged as', function(msg) {
		message = "You are " + msg;
		$('#userLogged').html(message.bold());
	});
	
	socket.on('set cookie', function(msg) {
		if(getCookie(msg) == ""){
			setCookie(msg, msg);
		}
		else{
			name = getCookie(msg);
		}
	});
	
	socket.on('edit cookie', function(msg) {
		setCookie(msg.msg, msg.newname);
	});
	
});

function setCookie(cname, cvalue) {
	document.cookie = cname + "=" + cvalue + ";";
}

function getCookie(cname) {
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i = 0; i < ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return "";
}