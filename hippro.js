//variables
var net = require('net');
var port = 3000;
var fs = require('fs');
fs.readFile ("meetUp.txt",function(err,data){
	if(err){ console.log(err)}
		else {meetUp = data.toString()}
	});
var rsvp = ""
fs.readFile ("rsvp.txt",function(err,data){
			if(err){ console.log(err)}
				else {rsvp = data.toString()}
			});
var line = rsvp.split("**").length
var line2 = line.toString()
var meetUp = ""



//"Please input \"FirstName_LastName\" , \"EmailAddress\""



var server = net.createServer(function(socket) {
	console.log('client connected');
	socket.write('Welcome to the (knowledge)Hungry Hippros RSVP Server \n');
	socket.write('Input \"RSVP\", \"First&_LastName\", \"EmailAddress\" \nto attend the\n ' + meetUp + "\n");
	socket.write('\nOtherwise please input \"hc\" for a headcount of attendees\n');

//recieve data
socket.on('data', function(data) {
	var temp=data.toString().trim();
	var temp2=temp.split(" ");
	var temp3=rsvp + "\n" + temp + "**";
	
	//headcount
	if (temp === "hc") {
		fs.readFile ("rsvp.txt",function(err,data){
			if(err){ console.log(err)}
				else {rsvp = data.toString()}
			});
		socket.write(line2)
	
		///RSVPing
	}else if (temp2[0] === "RSVP"){fs.writeFile("rsvp.txt",temp3,function(err)
		{ if(err)
			{ console.log(err);
			}
			else {
				console.log("logged");
				socket.write(temp + "added! A confirmation email with further information willbe sent.")

			}
		});
}
});






socket.on('end', function() {
	console.log('client disconnected');
});
});

server.listen(port, function() { 
	console.log('listening on port ' + port );
});
