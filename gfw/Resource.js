function Resource(){
	
}
Resource.prototype.AddImage = function(){
	
	//background img
	resourcePreLoader.AddImage("img/background.png");
	
	//character
	resourcePreLoader.AddImage("img/left.png");
	resourcePreLoader.AddImage("img/right.png");
	
	//sample
	resourcePreLoader.AddImage("img/sample.png");
};

Resource.prototype.AddSound = function(){
	
	//soundSystem.AddSound();
	soundSystem.isLoadComplete = true;
};