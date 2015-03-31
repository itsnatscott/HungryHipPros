//variables
var net = require('net');
var port = 3000;
var meetUp = ""
var rsvp = ""
var fs = require('fs');
fs.readFile ("meetUp.txt",function(err,data){
	if(err){ console.log(err)}
	else {meetUp = data.toString()}
});
fs.readFile ("rsvp.txt",function(err,data){
	if(err){ console.log(err)}
	else {rsvp = data.toString()}
});


//"Please input \"FirstName_LastName\" , \"EmailAddress\""



var server = net.createServer(function(socket) {
  console.log('client connected');
  socket.write('Welcome to the (knowledge)Hungry Hippros RSVP Server \n');
 socket.write('Input \"RSVP\", \"First&_LastName\", \"EmailAddress\" \nto attend the\n ' + meetUp + "\n");
 socket.write('Otherwise please input \"HC\" for a headcount of attendees');
  socket.on('data', function(data) {
    console.log(data.toString().trim());
 if (data.toString().trim()==="hc"){
	var line = rsvp.split("\n")
 	socket.write(line.length)
	}




  });

  socket.on('end', function() {
    console.log('client disconnected');
  });
});

server.listen(port, function() { 
  console.log('listening on port ' + port );
});
