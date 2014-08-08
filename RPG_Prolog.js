function PrologState(){
	
	this.fs = new FrameSkipper(2000);
}
PrologState.prototype.Init = function(){
	Item = new PGItem();
	Status = new PGStatus(1, 100);
	time = new Timer();
	
	//test
	Status.Gold("push",500);
};
PrologState.prototype.Render = function(){	
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	var grd = Context.createLinearGradient(0,800/2+10,0,800/2-10 );
	grd.addColorStop(0,"white");
	grd.addColorStop(1,"blue");
	Context.fillStyle = grd;

	Context.font = '30px Arial';
	Context.textBaseline = "top";
	Context.fillText("Not Prepare",1280/2-100,800/2-20);
	
};
PrologState.prototype.Update = function(){
	if(this.fs.isWork())
		ChangeGameState(new TransitionFadeOut (this, new VilliageState(),5.0));
};
