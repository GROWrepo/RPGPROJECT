function Resource(){
	
}
Resource.prototype.AddImage = function(){
	
	//background img
	resourcePreLoader.AddImage("img/blue_bg.png");
	resourcePreLoader.AddImage("img/castle_bg.png");
	resourcePreLoader.AddImage("img/formal_bg.png");
	
	//MapTile img
	resourcePreLoader.AddImage("img/1.png");
	resourcePreLoader.AddImage("img/2.png");
	resourcePreLoader.AddImage("img/3.png");
	
	//character
	resourcePreLoader.AddImage("img/l_idle.png");
	resourcePreLoader.AddImage("img/r_idle.png");
	resourcePreLoader.AddImage("img/l_walk.png");
	resourcePreLoader.AddImage("img/r_walk.png");
	resourcePreLoader.AddImage("img/l_jump.png");
	resourcePreLoader.AddImage("img/r_jump.png");
	resourcePreLoader.AddImage("img/l_dashJump.png");
	resourcePreLoader.AddImage("img/r_dashJump.png");
	resourcePreLoader.AddImage("img/l_dash.png");// 79 96 16
	resourcePreLoader.AddImage("img/r_dash.png");
	resourcePreLoader.AddImage("img/l_attack.png");// 92 102 6
	resourcePreLoader.AddImage("img/r_attack.png");
	
	
};

Resource.prototype.AddSound = function(){
	
	//soundSystem.AddSound();
	//soundSystem.isLoadComplete = true;
	soundSystem.AddSound("sound/ElegantSummer.wav",1);
};