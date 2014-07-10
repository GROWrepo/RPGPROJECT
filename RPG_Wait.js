function WaitGame() {
	this.fs = new FrameSkipper(2000);
	this.load = false;
	this.key;
}

WaitGame.prototype.Init = function()
{
	this.key = RandomNextInt(0,1000);
};
WaitGame.prototype.Render = function()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	Context.fillStyle = "#ffffff";
	Context.font = '35px Arial';
	Context.textBaseline = "top";
	Context.fillText("PC Connect",300,250);
	Context.fillText("KEY : " + this.key,300,350);
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
	gfwSocket.Emit("want_game",this.key);	
	
	gfwSocket.On("start_game",function (msg)
	{
		if(msg != "fail")
			ChangeGameState(new PlayGameState(2));
		
	});
};
