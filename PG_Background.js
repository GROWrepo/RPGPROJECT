function PGbackground(){
	
	this.backgroundImg = new GraphicObject(resourcePreLoader.GetImage("img/castle_bg.png"));
}
PGbackground.prototype.Render = function(){
	
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	this.backgroundImg.Render(Context);
};
