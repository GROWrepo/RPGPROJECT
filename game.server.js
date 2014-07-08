var http = require("http");
var socketio = require("socket.io");

var server = http.createServer(
function(request,response)
{
	response.end('Hello NodeJS');
});

server.listen(9892,function()
{
	console.log("AA_Game Server Start port:9892");
});

var io = socketio.listen(server);
io.set("log level", 1);
//connect
io.sockets.on("connection",function(socket)
{
	console.log("[Client Conneted]");
	var player = new Player(socket.id);
	socket.set("user_data",player);
	arrPlayers.push(player);
	
	//disconnect
	socket.on('disconnect',function()
	{
		var player;
		socket.get("user_data",function(error,user_data)
		{
			player = user_data;
		});
		for(var i = 0; i < arrPlayers.length; i++)
		{
			if(arrPlayers[i].id == player.id)
			{
				arrPlayers.splice(i, 1);
				console.log("[Client Disconnected] player's count:"+arrPlayers.length);
			}
		}
		
	});
	
	socket.on("want_game", function(data)
	{
		console.log(data);
		var player;
		socket.get("user_data",function(error,user_data)
		{
			player = user_data;
		});	
			
		player.isWantGame = true;
		for(var i = 0; i < arrPlayers.length; i++)
		{
			if(arrPlayers[i].id == player.id)
				continue;
			if(arrPlayers[i].isWantGame == true)
			{
				console.log("[Start Game]");
				player.isWantGame = false;
				arrPlayers[i].isWantGame = false;

				player.rival_id = arrPlayers[i].id;
				arrPlayers[i].rival_id = player.id;
				
				io.sockets.sockets[player.id].emit("start_game","display");
				io.sockets.sockets[arrPlayers[i].id].emit("start_game","joystick");
			}
		}
	});
	socket.on("control_in_game",function (msg,data)
	{
		var player;
		socket.get("user_data",function(error,user_data)
		{
			player = user_data;
		});
		io.sockets.sockets[player.rival_id].emit("control_in_game",data);
	});
});

function Player(id)
{
	this.id = id;
	this.isWantGame = false;
	this.rival_id = 0;
}
var arrPlayers = new Array();
