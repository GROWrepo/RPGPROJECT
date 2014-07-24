function chatbox(face){
	this.face = face;
	this.faceImg = new GraphicObject(resourcePreLoader.GetImage("img/"+this.face+".png"));
	this.chatboxImg = new GraphicObject(resourcePreLoader.GetImage("img/chating box.png"));
	this.chatboxImg.SetPosition(0,500);
	this.faceImg.SetPosition(768,200);
}
chatbox.prototype.Render = function(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	this.faceImg.Render(Context);
	this.chatboxImg.Render(Context);
	
};
