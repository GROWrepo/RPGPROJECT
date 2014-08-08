function onGameInit()
{
	//title
	document.title = "RPGPROJECT";
	
	GAME_FPS = 30;
	debugSystem.debugMode = true;
	
	//resource freeLoading
	var R = new Resource();
	R.AddImage();
	R.AddSound();

	//socket.io
	new gfwSocket("http://127.0.0.1:9892");

	//121.152.186.155
	//init state setting
//	after_loading_state = new PlayGameState("DarkCave",0,0,457);
	after_loading_state = new LoginState();
	
	setInterval(gameLoop, 1000/GAME_FPS);
}
function onGameDestroy()
{
	if(gfwSocket)
		gfwSocket.Disconnect();
}
//used global
var firstLoading = false;
window.addEventListener("load", onGameInit, false);
window.addEventListener("unload", onGameDestroy, false);