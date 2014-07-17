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
//	new gfwSocket("http://121.152.186.155:9892");

	//121.152.186.155
	//init state setting
//	after_loading_state = new TitleState();
	after_loading_state = new LogoState();
	
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