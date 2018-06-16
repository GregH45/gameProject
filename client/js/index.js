var socket = io()

let connectionForm = document.getElementById('coForm')
connectionForm.addEventListener('submit', (event) => {
	console.log("hey")
	event.preventDefault()

	socket.emit('connected', {
		user : {
			name : document.getElementById('charname').value
		}
	})
})

socket.on('connectionStatus', (data) => {
	console.log(data.isConnected)
	if (data.isConnected)
		alert("Welcome " + data.user )
	else 
		alert("User " + data.user + " already connected")
	})
