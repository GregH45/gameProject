var express = require('express')
var app     = express()
var srv     = require('http').Server(app)
var io      = require('socket.io')(srv, {})

var users = []

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html')
});
app.use('/client', express.static(__dirname + '/client'))
srv.listen(2000)

console.log('Server is now up on port 2000')

io.sockets.on('connection', (socket) => {
	console.log('Socket connection')

	socket.on('connected', (data) => {
		console.log('User connected : ' + data.user.name)
		let userCo = false

		if( users.filter(user => data.user.name === user.name).length === 0) {
			console.log("pushing user")
			users.push(data.user)
			userCo = true
		}

		socket.emit('connectionStatus', {
			isConnected : userCo,
			user        : data.user.name
		})
	})
})