function PG_Village(){
	// this.img = new GraphicObject(resourcePreLoader.GetImage(“img/Logo.png”));
	// type
	this.Type = 0;//idle villiage
}
PG_Village.prototype.Init = function(){
	//bgm
	//soundSystem.BackgroundSound(“sound/logo.wav”);
};
PG_Village.prototype.Render = function(){
	var theCanvas = document.getElementById(“GameCanvas”);
	var Context = theCanvas.getContext(“2d”);

	if(this.Type == 0)//idle
	{
		//background Img

		//Character

	}
	else if(this.Type == 1)//weaphone Store
	{}
	else if(this.Type == 2)//amer Store
	{}
	else if(this.Type == 3)//INN
	{}
	else if(this.Type == 4)//dounsion
	{
		//D&F style
	}
};
PG_Village.prototype.Update = function(){

	if(this.Type == 0)//idle
	{
		//Character key (l,r,t,b,enter,x)
		//same PlayGame

	}
	else if(this.Type == 1)//weaphone Store
	{}
	else if(this.Type == 2)//amer Store
	{}
	else if(this.Type == 3)//INN
	{}
	else if(this.Type == 4)//dounsion
	{
		//D&F style
	}
};