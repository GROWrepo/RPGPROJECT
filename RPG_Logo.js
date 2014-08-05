function LogoState(){
	this.img = new GraphicObject(resourcePreLoader.GetImage("img/Logo.png"));
}
LogoState.prototype.Init = function(){
	this.img.SetPosition(450,330);	
	//bgm
	soundSystem.PlaySound("sound/logo.wav");
};
LogoState.prototype.Render = function(){	
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	Context.fillStyle = "white";
	Context.fillRect(0,0,1280,800);
	
	this.img.Render(Context);
	
	var grd = Context.createLinearGradient(0,800/2+10,0,800/2-10 );
	grd.addColorStop(0,"white");
	grd.addColorStop(1,"blue");
	Context.fillStyle = grd;

	Context.font = '30px Arial';
	Context.textBaseline = "top";
	Context.fillText("RPG PROJECT",1280/2-100,800/2-20);
	
};
LogoState.prototype.Update = function(){
		ChangeGameState(new TransitionFadeIn (this, new TransitionFadeOut(this,new TitleState,5.0),5.0));
};
