function PGPlayer(){

	// 0 = stop 1 = right 2 = left
	this.idle = 1;	
	this.preidle;
	
	this.frameSpeed = 3.0;
	
	this.sprplayer = new SpriteAnimation(resourcePreLoader.GetImage("img/right.png")
	,31,31
	,3,this.frameSpeed);
	
	this.leftBound = 0;
	this.rightBound = 800 - 31 ;
	this.x = 0;
	this.y = 300;
	
	this.life = 10;
	
	this.collisionBox
	={left: this.x,top : this.y,right : this.x+31,bottom : this.y+31};
	this.Invalid();
}

PGPlayer.prototype.Render = function(){
	
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	this.sprplayer.Render(Context);
	
};
PGPlayer.prototype.Update = function(){
	
	var Speed = 3.0;
	
	this.idle = 0;
	
	if(inputSystem.isKeyDown(37))//left
	{
		this.idle = 2;
		if(this.preidle != this.idle){
			this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/left.png")
				,31,31
				,3,this.frameSpeed);
			}
		if(this.leftBound<this.x)
			this.x -= Speed;
		else
			this.x = this.leftBound;
			
		this.Invalid();
	}
	if(inputSystem.isKeyDown(39))//right
	{
		this.idle = 1;
		if(this.preidle != this.idle){
			this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/right.png")
				,31,31
				,3,this.frameSpeed);
			}
		if(this.rightBound>this.x)
			this.x += Speed;
		else
			this.x = this.rightBound;
			
		this.Invalid();	
	}

	if(this.idle == 0)
		this.sprplayer.StopPosition();
	else{
		this.sprplayer.GoPosition();
		this.sprplayer.Update();
	}
	
	this.preidle = this.idle;
};
PGPlayer.prototype.Invalid = function()
{
	this.sprplayer.SetPosition( this.x, this.y);
	this.collisionBox
	={left: this.x,top : this.y,right : this.x+31,bottom : this.y+31};
};
