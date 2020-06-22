var app = require('express')();
var http = require('http').createServer(app);
var io = require('socket.io')(http);

app.get('/chatroom', (req, res) => {
	res.sendFile(__dirname + '/choose_room.html');
});

app.get('/room', (req, res) => {
	res.setHeader('Location', 'http://www.room.com');  	
	res.sendFile(__dirname + '/index.html');
	// res.end();
});


const chat = io.of('chat')

chat.on('connect', (socket) => {
	socket.emit('welcome', {
		msg: 'welcome'
	})
	
	console.log('chat connect')
	socket.on('chat message', (req) => {
		console.log(req)
		socket.broadcast.emit('a message', {
			msg: req.v
		});
	})
})



http.listen(80, () => {
	console.log('listening on *:80');
});