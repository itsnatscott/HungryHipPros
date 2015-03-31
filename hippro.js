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
var meetUp = ""
console.log(rsvp)



//"Please input \"FirstName_LastName\" , \"EmailAddress\""



var server = net.createServer(function(socket) {
	console.log('client connected');
	socket.write('Welcome to the (knowledge)Hungry Hippros RSVP Server \n');
	socket.write('Input \"rsvp\", \"First&_LastName\", \"EmailAddress\" \nto attend the\n' + meetUp + "\n");
	socket.write('\nOtherwise please input \"hc\" for a headcount of attendees\n');

//recieve data
socket.on('data', function(data) {
	var temp=data.toString().trim();
	var temp2=temp.split(" ");
	var temp3=rsvp + "\n" + temp + "**";
	
	//headcount
	if (temp === "hc") {
		var line = rsvp.split("\n").length;
		var line2 = line.toString();
		fs.readFile ("rsvp.txt",function(err,data){
			if(err){ console.log(err)}
				else {rsvp = data.toString()}
			});
		socket.write(line2+" attendees.\n(ctrl + ]) to exit\n");

		///RSVPing
	}else if (temp2[0] === "rsvp"){fs.writeFile("rsvp.txt",temp3,function(err)
		{ if(err)
			{ console.log(err);
			}
			else {
				console.log("logged");
				socket.write("\n"+temp + "\nadded! A confirmation email with \nfurther information will be sent.\n\n (ctrl + ]) to exit\n")
			}
		});


//Admin

} else if (temp2[0]==="/admin/"){socket.write("password:\n")
socket.on('data', function(data) {
	var inPut=data.toString().trim();
	if (inPut=== "puppies") {socket.write("\nrsvp_list\nnew_meet\nclear\n")
}

socket.on('data', function(data) {
	var inPut=data.toString().trim();
	//readRSVP
	if (inPut=== "rsvp_list") {fs.readFile ("rsvp.txt",function(err,data){
	if(err){ console.log(err)}
		else {socket.write(data.toString()+"\n(ctrl + ]) to exit\n")
		};
	});
	
//clearRSVP
	}else if (inPut==="clear"){ rsvp = ""
	{fs.writeFile("rsvp.txt",rsvp,function(err)
		{ if(err)
			{ console.log(err);}
			else {
				socket.write("cleared\n(ctrl + ]) to exit\n");
			}
		});
}
} else if(inPut==="new_meet"){socket.write("please enter new info"); socket.on('data', function(data) {
	newMeetUp=data.toString().trim();
	{fs.writeFile("meetUp.txt",newMeetUp,function(err)
		{ if(err)
			{ console.log(err);}
			else {
				socket.write('message has been switched to\n' +newMeetup " (ctrl + ]) to exit\n");
			}
		});
}

});
};

});
});






socket.on('end', function() {
	console.log('client disconnected');
});
};
});
});

server.listen(port, function() { 
	console.log('listening on port ' + port );
});
