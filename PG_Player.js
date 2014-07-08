function PGPlayer(){

	// 0 = stop 1 = walk 2 = dash 3 = jump 4 = dashJump 5 = attack
	this.idle = 1;	
	// 0 = left 1 = right
	this.position = 1;
	
	this.isDashing = false;
	this.isAttack = false;
	this.isJump = false;
	this.JumpHeight;
	this.JumpSpeed = 11.0;
	this.gravity = 6.0;
	this.accelate;
	this.isDash
	= {left : false, right : false, left_toggle : false, right_toggle : false};
	
	this.preidle;
	
	this.sprplayer = new SpriteAnimation(resourcePreLoader.GetImage("img/r_idle.png")
	,56,146
	,12,12);
	
	this.leftBound = 0;
	this.rightBound = 1280 - 59 ;
	this.x = 0;
	this.y = 720 - 40 - 146;
	
	this.life = 10;
	
	this.BodycollisionBox
	={left: this.x,top : this.y + 42,right : this.x+56,bottom : this.y+146 - 19};
	this.LegcollisionBox
	={left: this.x + 19 ,top : this.y + 146 - 19,right : this.x + 19 + 19,bottom : this.y+146};
	
	this.Invalid();
	
	this.interval = 500;
	this.inputFrameSkipper = new FrameSkipper(this.interval);
}

PGPlayer.prototype.Render = function(){
	
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	this.sprplayer.Render(Context);
	
};
PGPlayer.prototype.Update = function(crashDirection){
	
	var Speed = 3.0;
	var isLand = crashDirection.bottom;
	
//	debugSystem.Log("LOG",crashDirection);
	if(this.inputFrameSkipper.isWork()){
		this.isDash.left = false; this.isDash.right = false;
		this.isDash.left_toggle = false; this.isDash.right_toggle = false;
		}
	
	this.idle = 0;
	
	if(this.preidle != 4 && this.preidle != 2){
	if(inputSystem.isKeyDown(37))//left
	{
		this.idle = 1;
//		debugSystem.Log("LOG",this.preidle);
		if(this.isDash.left){
			this.idle = 2;
			if(this.preidle != 2 && !this.isDashing){
			this.isDashing = true;
			this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/l_dash.png")
				,79,146
				,16,16,true);
			}
		}
		else if((this.preidle != this.idle || (this.preidle == 1 && this.position == 1)) && isLand){
			this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/l_walk.png")
				,59,146
				,11,11,true);
			}
		if(!isLand){
			if(this.position == 1)
			this.sprplayer.ChangeDirection(
				resourcePreLoader.GetImage("img/l_jump.png")
				,78,146
				,28,28,true);
			Speed -= 1.0;//decrease SpeedValue
		}
		this.position = 0;
		
		if(this.leftBound<this.x){
			if(!crashDirection.left)
				this.x -= Speed;
		}
		else
			this.x = this.leftBound;
			
		this.Invalid();
	}
	if(inputSystem.isKeyDown(39))//right
	{
		this.idle = 1;
		if(this.isDash.right){
			this.idle = 2;
			if(this.preidle != 2 && !this.isDashing){
			this.isDashing = true;
			this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/r_dash.png")
				,79,146
				,16,16,false);
			}
		}
		else if((this.preidle != this.idle || (this.preidle == 1 && this.position == 0)) && isLand){
			this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/r_walk.png")
				,59,146
				,11,11,false);
			}
		if(!isLand){
			if(this.position == 0)
			this.sprplayer.ChangeDirection(
				resourcePreLoader.GetImage("img/r_jump.png")
				,78,146
				,28,28,false);
			Speed -= 1.0;//decrease SpeedValue
		}
		this.position = 1;
				
		if(this.rightBound>this.x){
			if(!crashDirection.right)
				this.x += Speed;
		}
		else
			this.x = this.rightBound;
			
		this.Invalid();	
	}
	}
	if(this.isAttack)
		this.idle = 5;
	else if(this.isDashing){
		this.idle = 2;
			if(this.position == 1){//right
		if(this.rightBound>this.x){
			if(!crashDirection.right)
				this.x += Speed;
		}
		else
			this.x = this.rightBound;
		}
		else if(this.position == 0){
		if(this.leftBound<this.x){
			if(!crashDirection.left)
				this.x -= Speed;
		}
		else
			this.x = this.leftBound;
		}
		this.Invalid();
	}
		
	if(inputSystem.isKeyDown(88) && !this.isAttack){//z : attack
		this.isAttack = true;
		if(this.preidle != 5){
		if(this.position == 1)//right
		this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/r_attack.png")
				,92,146
				,6,6,false);
		else if(this.position == 0)
		this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/l_attack.png")
				,92,146
				,6,6,true);
		}
	}
	
	if(isLand){
		if(inputSystem.isKeyDown(38)){
//		debugSystem.Log("LOG","Jump");

		if(inputSystem.isKeyDown(39)){// jump + right
			this.idle= 4;
			this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/r_dashJump.png")
				,93,146
				,23,23,false);
		}else if(inputSystem.isKeyDown(37)){// jump + left
			this.idle= 4;
			this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/l_dashJump.png")
				,93,146
				,23,23,true);
		}else{
			if(this.position == 1)
			this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/r_jump.png")
				,78,146
				,28,28,false);
			else
			this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/l_jump.png")
				,78,146
				,28,28,true);
				
			this.idle = 3;
		}
		this.isJump = true;
		this.JumpHeight = this.y - 104 ;
		this.y -= this.JumpSpeed;this.Invalid();
		}	
	}else{
		if(this.preidle == 4){
		this.idle = 4;
		if(this.position == 1){//right
		if(this.rightBound>this.x){
			if(!crashDirection.right)
				this.x += Speed;
		}
		else
			this.x = this.rightBound;
		}
		else if(this.position == 0){
		if(this.leftBound<this.x){
			if(!crashDirection.left)
				this.x -= Speed;
		}
		else
			this.x = this.leftBound;
		}
		this.Invalid();
		}
		else if (this.preidle == 3){
		this.idle = 3;	
		}
		
		if(this.JumpHeight < this.y){
//		if(inputSystem.isKeyDown(38)){
		if(this.isJump){
//			debugSystem.Log("LOG","JumpBounus");
			this.y -= this.JumpSpeed;this.Invalid();
		}
		}
//		else
//			this.isJump = false;
//		}
		else
			this.isJump = false;
	}
	
	if(!isLand){
		this.y += this.gravity;this.Invalid();
	}
	
	if(this.idle == 0)
	if(this.preidle != this.idle){
	if(this.position == 0){
		this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/l_idle.png")
				,56,146
				,12,12,true);
	}
	else{
		this.sprplayer.ChangeImage(
				resourcePreLoader.GetImage("img/r_idle.png")
				,56,146
				,12,12,false);
	}
	}
	
	this.preidle = this.idle;
	var isLotate = this.sprplayer.Update();
	
	if(isLotate && this.preidle == 5)//attack
		this.isAttack = false;//reset	
	else if(isLotate && this.isDashing){//dash
		debugSystem.Log("LOG","stop");
		this.isDashing = false;
	}
	
	if(inputSystem.isKeyDown(37)){
		this.isDash.left_toggle = true;
	}else {
		if(this.isDash.left_toggle){
			this.isDash.left_toggle = false;
			this.isDash.left = true;
		}
	}
	if(inputSystem.isKeyDown(39)){
		this.isDash.right_toggle = true;
	}else{
		if(this.isDash.right_toggle){
			this.isDash.right_toggle = false;
			this.isDash.right = true;
//			debugSystem.Log("LOG",this.isDash.right);
		}
	}

};
PGPlayer.prototype.Invalid = function()
{
	var l,r,t,b;
	
	this.sprplayer.SetPosition( this.x, this.y);
	
	switch(this.idle){
		case 0:// stop
		l = this.x; t = this.y + 42; r = this.x + 56; b = this.y + 104 + 42 - 19;
		this.LegcollisionBox
		={left: this.x + 19 ,top : this.y + 146 - 19,right : this.x + 19 + 19,bottom : this.y+146};
		break;
		case 1:// walk
		l = this.x; t = this.y + 45; r = this.x + 59; b = this.y + 101 + 45 ;
		this.LegcollisionBox = null;
		break;
		case 2:// dash
		l = this.x; t = this.y + 50; r = this.x + 79; b = this.y + 96 + 50 ;
		this.LegcollisionBox = null;
		break;
		case 3:// jump
		l = this.x; t = this.y; r = this.x + 78; b = this.y + 146 ;
		this.LegcollisionBox = null;
		break;
		case 4:// dashJump
		l = this.x + (93/4); t = this.y + 28; r = this.x + 93 - (93/4); b = this.y + 118 + 28 ;
		this.LegcollisionBox = null;
		break;
		case 5: // attack
		l = this.x; t = this.y + 44; r = this.x + 92; b = this.y + 102 + 44 ;
		this.LegcollisionBox = null;
		break;
	};
	
	this.BodycollisionBox
	={left: l,top : t,right : r,bottom : b};
};