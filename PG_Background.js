function PGbackground(){
	
	this.backgroundImg = new GraphicObject(resourcePreLoader.GetImage("img/cave_bg.png"));
}
PGbackground.prototype.ChangeBG = function(img){
	this.backgroundImg.ChangeImg(resourcePreLoader.GetImage("img/"+img+".png"));
};
PGbackground.prototype.Render = function(){
	
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	this.backgroundImg.Render(Context);
};
