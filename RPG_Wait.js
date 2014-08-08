function WaitGame() {
	this.key;
	
	gfwSocket.On("start_game",function (msg)
	{
		if(msg != "fail")
			ChangeGameState(new LogoState());
		
	});
}

WaitGame.prototype.Init = function()
{
	this.key = RandomNextInt(0,1000);
	
	gfwSocket.Emit("want_game",this.key);	
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
};

