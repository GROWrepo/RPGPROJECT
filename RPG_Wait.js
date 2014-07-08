function WaitGame() {
	this.fs = new FrameSkipper(2000);
	this.load = false;
}

WaitGame.prototype.Init = function()
{
};
WaitGame.prototype.Render = function()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	Context.fillStyle = "#ffffff";
	Context.font = '35px Arial';
	Context.textBaseline = "top";
	Context.fillText("PC Connect",300,250);

};
WaitGame.prototype.Update = function()
{
	if( this.load == false && this.fs.isWork() ){
		this.load = true;
		this.loadSocket();
	}
};

WaitGame.prototype.loadSocket = function()
{
	gfwSocket.Emit("want_game","display");	
	
	gfwSocket.On("start_game",function (msg)
	{
		ChangeGameState(new PlayGameState(2));
	});
};
