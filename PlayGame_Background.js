function PGbackground(){
	
	this.backgroundImg = new GraphicObject(resourcePreLoader.GetImage("img/background.png"));
	this.sample = new GraphicObject(resourcePreLoader.GetImage("img/sample.png"));
	this.sample.SetPosition(0,600-80);
}
PGbackground.prototype.Render = function(){
	
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	this.backgroundImg.Render(Context);
	this.sample.Render(Context);
};
