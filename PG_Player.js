function PGPlayer(x,y){

	// 00 = stop / 26 = walk / 13 = dash / 17 = jump / 15 = Movingjump / 01 = attack / 피격 = 21 / 40 = 발공격
	// 47 = 앉아공격  / 23 = 앉아피격 / down = 28
	// 93 = 대기 / 91 = 대기2
	this.idle = 0;	
	// 0 = left 1 = right
	this.position = 1;
	
	this.isDashing = false;
	this.isAttack = false;
	this.isJump = false;
	this.isWait = false;
	
	this.JumpHeight;
	this.JumpSpeed = 12.0;
	this.gravity = 6.0;
	this.accelate = 1;
	this.isDash
	= {left : false, right : false, left_toggle : false, right_toggle : false};
	
	this.preidle;
	
	this.sprplayer = new GraphicObjectAnimation("aki",0, 12, 12);
	this.effect = new GraphicObjectAnimation("effect",10, 1, 1);
	this.bow = new GraphicObjectAnimation("bow",10,1,1);
	
	this.leftBound = 0;
	this.rightBound = 1280 - 59 ;
	this.x = x;
	this.y = y; 
//	this.onEnter = false;
	
	this.UpCollisitionBox = new Array();//	={left: this.x,top : this.y + 42,right : this.x+56,bottom : this.y+146 - 19};
	this.DownCollisitionBox = new Array();
	this.AttackCollisitionBox = new Array();
	
	this.CollisitionBox_00 = new Array();
	this.CollisitionBox_01 = new Array();
	this.CollisitionBox_13 = new Array();
	this.CollisitionBox_17 = new Array();
	this.CollisitionBox_26 = new Array();
	this.CollisitionBox_15 = new Array();
	this.CollisitionBox_40 = new Array();
	this.CollisitionBox_28 = new Array();
	this.CollisitionBox_47 = new Array();
	this.CollisitionBox_23 = new Array();
	this.CollisitionBox_93 = new Array();
	this.makeCollisition();
	
	this.Invalid(0);
	
	this.inputFrameSkipper = new FrameSkipper(500);
	this.stopTime = new FrameSkipper(8000);
	this.stopCount = 0;
}
PGPlayer.prototype.setPosition = function(x,y){
	this.x = x;
	this.y = y;
	this.isDashing = false;
	this.isAttack = false;
	this.isJump = false;
//	this.idle = 0;
//	this.position = 1;
		
	this.Invalid(0);
};
PGPlayer.prototype.makeCollisition = function(){

//	this.CollisitionBox_13.push(makeBox(""));
		
	this.CollisitionBox_00.push(makeBox("116,120,24,42,/101,165,45,52,/"));
	this.CollisitionBox_00.push(makeBox("115,120,27,43,/102,165,46,52,/"));
	this.CollisitionBox_00.push(makeBox("113,118,29,46,/104,165,44,52,/"));
	this.CollisitionBox_00.push(makeBox("116,117,25,45,/103,165,42,52,/"));
	this.CollisitionBox_00.push(makeBox("118,117,22,43,/105,165,37,52,/"));
	this.CollisitionBox_00.push(makeBox("119,118,23,42,/105,165,38,52,/"));
	this.CollisitionBox_00.push(makeBox("117,113,23,49,/103,165,40,52,/"));
	this.CollisitionBox_00.push(makeBox("113,114,27,44,/108,165,34,52,/"));
	this.CollisitionBox_00.push(makeBox("116,115,25,44,/106,165,37,52,/"));
	this.CollisitionBox_00.push(makeBox("106,119,41,42,/109,165,33,52,/"));
	this.CollisitionBox_00.push(makeBox("114,116,28,49,/103,165,43,52,/"));
	this.CollisitionBox_00.push(makeBox("113,115,31,49,/105,165,42,52,/"));//217
	
	this.CollisitionBox_01.push(makeBox("121,121,25,46,/101,165,46,52,/145,138,11,19,"));
	this.CollisitionBox_01.push(makeBox("122,120,25,41,/110,165,41,52,/149,130,41,21,"));
	this.CollisitionBox_01.push(makeBox("122,121,26,42,/113,165,38,52,/148,135,23,14,"));
	this.CollisitionBox_01.push(makeBox("124,118,25,50,/117,165,35,52,/150,137,12,15,"));
	this.CollisitionBox_01.push(makeBox("120,123,24,39,/112,165,34,52,/145,138,12,19,"));
	this.CollisitionBox_01.push(makeBox("120,121,20,43,/115,165,29,52,/144,133,8,27,"));
	
	this.CollisitionBox_13.push(makeBox("119,124,34,54,/110,170,34,47,/"));this.CollisitionBox_13.push(makeBox("123,131,31,42,/103,170,44,47,/"));
	this.CollisitionBox_13.push(makeBox("121,126,30,44,/112,170,36,47,/"));this.CollisitionBox_13.push(makeBox("111,124,31,48,/107,170,37,47,/"));
	this.CollisitionBox_13.push(makeBox("110,144,44,35,/104,170,39,47,/"));this.CollisitionBox_13.push(makeBox("117,150,42,33,/99,170,41,47,/"));
	this.CollisitionBox_13.push(makeBox("120,155,43,33,/92,170,49,47,/"));this.CollisitionBox_13.push(makeBox("117,155,48,25,/93,170,49,47,/"));
	this.CollisitionBox_13.push(makeBox("116,154,50,33,/93,170,48,47,/"));this.CollisitionBox_13.push(makeBox("109,149,43,39,/95,170,46,47,/"));
	this.CollisitionBox_13.push(makeBox("100,144,37,42,/99,170,61,47,/"));this.CollisitionBox_13.push(makeBox("97,145,33,43,/104,170,55,47,/"));
	this.CollisitionBox_13.push(makeBox("97,153,29,38,/102,170,58,47,/"));this.CollisitionBox_13.push(makeBox("114,138,29,43,/117,170,48,47,/"));
	this.CollisitionBox_13.push(makeBox("109,123,30,50,/112,170,47,47,/"));this.CollisitionBox_13.push(makeBox("116,117,25,51,/107,170,46,47,/"));//217
	
	this.CollisitionBox_17.push(makeBox("106,130,39,43,/100,177,46,40,/"));this.CollisitionBox_17.push(makeBox("108,156,45,21,/101,180,52,35,/"));
	this.CollisitionBox_17.push(makeBox("105,157,51,24,/102,184,53,32,/"));this.CollisitionBox_17.push(makeBox("108,130,48,39,/110,176,48,38,/"));
	this.CollisitionBox_17.push(makeBox("121,112,31,52,/113,172,42,45,/"));this.CollisitionBox_17.push(makeBox("123,108,28,50,/118,160,34,56,/"));
	this.CollisitionBox_17.push(makeBox("119,106,31,47,/117,158,34,57,/"));this.CollisitionBox_17.push(makeBox("122,106,28,48,/114,161,39,50,/"));
	this.CollisitionBox_17.push(makeBox("121,107,29,47,/117,160,44,51,/"));this.CollisitionBox_17.push(makeBox("116,109,28,47,/118,162,40,50,/"));
	this.CollisitionBox_17.push(makeBox("119,107,28,44,/120,159,40,38,/"));this.CollisitionBox_17.push(makeBox("116,112,31,37,/120,159,39,42,/"));
	this.CollisitionBox_17.push(makeBox("111,110,36,37,/108,154,48,49,/"));this.CollisitionBox_17.push(makeBox("108,114,40,32,/107,149,42,54,/"));
	this.CollisitionBox_17.push(makeBox("108,117,34,32,/105,150,45,60,/"));this.CollisitionBox_17.push(makeBox("110,114,39,36,/105,154,48,57,/"));
	this.CollisitionBox_17.push(makeBox("112,117,27,33,/106,153,46,60,/"));this.CollisitionBox_17.push(makeBox("107,125,41,34,/104,163,49,47,/"));
	this.CollisitionBox_17.push(makeBox("105,147,40,26,/101,173,49,32,/"));this.CollisitionBox_17.push(makeBox("104,167,37,17,/99,184,53,33,/"));
	this.CollisitionBox_17.push(makeBox("103,169,38,20,/101,194,52,24,/"));this.CollisitionBox_17.push(makeBox("104,171,39,22,/103,195,50,23,/"));
	this.CollisitionBox_17.push(makeBox("109,148,34,35,/110,187,38,25,/"));this.CollisitionBox_17.push(makeBox("113,129,31,43,/111,174,33,41,/"));
	this.CollisitionBox_17.push(makeBox("118,126,22,44,/113,173,31,42,/"));this.CollisitionBox_17.push(makeBox("116,124,26,50,/106,176,41,40,/"));
	this.CollisitionBox_17.push(makeBox("113,122,27,47,/107,177,39,39,/"));this.CollisitionBox_17.push(makeBox("117,119,23,46,/105,169,42,48,/"));

	this.CollisitionBox_26.push(makeBox("120,121,18,41,/104,173,44,44,/"));
	this.CollisitionBox_26.push(makeBox("118,116,20,46,/107,173,42,44,/"));this.CollisitionBox_26.push(makeBox("114,122,23,40,/108,173,39,44,/"));
	this.CollisitionBox_26.push(makeBox("116,123,23,41,/100,173,58,44,/"));this.CollisitionBox_26.push(makeBox("114,124,25,39,/98,173,59,44,/"));
	this.CollisitionBox_26.push(makeBox("116,125,24,37,/102,173,55,44,/"));this.CollisitionBox_26.push(makeBox("117,117,21,44,/108,173,43,44,/"));
	this.CollisitionBox_26.push(makeBox("117,119,19,44,/111,173,36,44,/"));this.CollisitionBox_26.push(makeBox("116,119,20,44,/109,173,35,44,/"));
	this.CollisitionBox_26.push(makeBox("114,122,24,43,/101,173,57,44,/"));this.CollisitionBox_26.push(makeBox("112,118,26,48,/102,173,55,44,/"));
	this.CollisitionBox_26.push(makeBox("117,119,20,45,/101,173,54,44,/"));//217
	
	this.CollisitionBox_15.push(makeBox("121,126,27,38,/123,166,17,51/"));this.CollisitionBox_15.push(makeBox("121,147,39,28,/115,166,30,51,/"));
	this.CollisitionBox_15.push(makeBox("122,151,39,27,/115,180,29,39,/"));this.CollisitionBox_15.push(makeBox("125,135,44,27,/109,163,35,54,/"));
	this.CollisitionBox_15.push(makeBox("124,127,46,34,/102,160,43,46,/"));this.CollisitionBox_15.push(makeBox("124,121,41,32,/99,154,49,47,/"));
	this.CollisitionBox_15.push(makeBox("125,118,39,34,/96,154,53,46,/"));this.CollisitionBox_15.push(makeBox("122,120,42,28,/101,152,46,50,/"));
	this.CollisitionBox_15.push(makeBox("137,136,36,18,/100,146,36,39,/"));this.CollisitionBox_15.push(makeBox("142,135,23,36,/101,135,38,37,/"));
	this.CollisitionBox_15.push(makeBox("131,160,32,24,/119,130,24,29,/"));this.CollisitionBox_15.push(makeBox("104,157,28,23,/131,132,23,39,/"));
	this.CollisitionBox_15.push(makeBox("104,131,24,31,/129,152,42,35,/"));this.CollisitionBox_15.push(makeBox("106,126,36,25,/114,158,46,31,/"));
	this.CollisitionBox_15.push(makeBox("116,128,36,25,/110,154,28,57,/"));this.CollisitionBox_15.push(makeBox("113,128,39,29,/107,159,39,51,/"));
	this.CollisitionBox_15.push(makeBox("118,130,35,23,/107,154,40,57,/"));this.CollisitionBox_15.push(makeBox("118,136,38,28,/113,165,33,50,/"));
	this.CollisitionBox_15.push(makeBox("117,143,36,29,/113,175,34,39,/"));this.CollisitionBox_15.push(makeBox("118,153,34,26,/113,163,33,54,/"));
	this.CollisitionBox_15.push(makeBox("114,159,38,23,/107,163,42,54,/"));this.CollisitionBox_15.push(makeBox("113,131,33,35,/109,163,28,54,/"));
	this.CollisitionBox_15.push(makeBox("118,123,25,43,/114,163,22,54,/"));this.CollisitionBox_15.push(makeBox("119,121,22,39,/116,163,23,54,/")); //217
	
	this.CollisitionBox_40.push(makeBox("117,115,30,53,/125,197,22,20,/149,162,12,23,"));this.CollisitionBox_40.push(makeBox("122,118,20,36,/118,197,24,20,/152,153,15,32,"));
	this.CollisitionBox_40.push(makeBox("119,117,20,37,/120,197,19,20,/154,146,20,29,"));this.CollisitionBox_40.push(makeBox("121,115,22,37,/116,197,21,20,/149,140,24,28,"));
	this.CollisitionBox_40.push(makeBox("123,123,25,37,/120,197,25,20,/163,153,37,25,"));this.CollisitionBox_40.push(makeBox("128,124,26,42,/123,197,21,20,/170,155,37,26,"));
	this.CollisitionBox_40.push(makeBox("123,121,36,49,/120,197,29,20,/181,156,28,27,"));this.CollisitionBox_40.push(makeBox("126,133,31,40,/123,197,25,20,/176,162,24,34,"));
	this.CollisitionBox_40.push(makeBox("125,121,30,50,/117,197,25,20,/165,186,17,26,"));this.CollisitionBox_40.push(makeBox("121,118,27,51,/118,197,41,20,/143,192,22,22,"));
	this.CollisitionBox_40.push(makeBox("114,120,36,53,/126,197,19,20,/135,199,8,18,"));
	
	this.CollisitionBox_28.push(makeBox("121,131,22,39,/113,197,26,20,/"));this.CollisitionBox_28.push(makeBox("118,136,28,44,/107,197,38,20,/"));
	this.CollisitionBox_28.push(makeBox("112,152,36,42,/105,197,43,20,/"));this.CollisitionBox_28.push(makeBox("123,160,23,30,/108,197,43,20,/"));
	this.CollisitionBox_28.push(makeBox("118,164,28,38,/107,197,38,20,/"));this.CollisitionBox_28.push(makeBox("114,162,31,30,/107,197,44,20,/"));
	this.CollisitionBox_28.push(makeBox("115,164,30,31,/105,197,43,20,/"));this.CollisitionBox_28.push(makeBox("119,161,26,33,/105,197,45,20,/"));
	this.CollisitionBox_28.push(makeBox("119,151,34,39,/110,197,41,20,/"));this.CollisitionBox_28.push(makeBox("116,139,38,44,/109,197,40,20,/"));
	this.CollisitionBox_28.push(makeBox("117,127,29,50,/108,197,36,20,/"));this.CollisitionBox_28.push(makeBox("115,122,34,45,/104,197,43,20,/"));
	this.CollisitionBox_28.push(makeBox("118,124,29,42,/116,197,27,20,/"));this.CollisitionBox_28.push(makeBox("113,122,31,43,/116,197,25,20,/"));
	
	this.CollisitionBox_47.push(makeBox("108,166,32,30,/103,204,48,13,/144,176,13,16,"));this.CollisitionBox_47.push(makeBox("105,158,25,39,/104,204,41,13,/131,167,37,27,"));
	this.CollisitionBox_47.push(makeBox("108,163,23,34,/103,204,40,13,/132,169,36,21,"));this.CollisitionBox_47.push(makeBox("112,160,27,36,/99,204,48,13,/136,179,14,27,"));
	this.CollisitionBox_47.push(makeBox("106,163,39,36,/106,204,45,13,/141,190,12,20,"));
	
	this.CollisitionBox_23.push(makeBox("107,164,28,30,/97,200,56,17,/"));this.CollisitionBox_23.push(makeBox("91,163,40,32,/101,200,47,17,/"));
	this.CollisitionBox_23.push(makeBox("87,166,37,34,/100,200,50,17,/"));this.CollisitionBox_23.push(makeBox("84,164,41,34,/99,200,55,17,/"));
	this.CollisitionBox_23.push(makeBox("101,158,25,43,/98,200,50,17,/"));this.CollisitionBox_23.push(makeBox("107,161,27,40,/100,200,46,17,/"));
	this.CollisitionBox_23.push(makeBox("104,164,34,38,/103,200,44,17,/"));
	
	this.CollisitionBox_93.push(makeBox("116,120,24,42,/101,165,45,52,/"));this.CollisitionBox_93.push(makeBox("115,120,27,43,/102,165,46,52,/"));
	this.CollisitionBox_93.push(makeBox("116,120,24,42,/101,165,45,52,/"));this.CollisitionBox_93.push(makeBox("115,120,27,43,/102,165,46,52,/"));
	this.CollisitionBox_93.push(makeBox("116,120,24,42,/101,165,45,52,/"));this.CollisitionBox_93.push(makeBox("115,120,27,43,/102,165,46,52,/"));
	this.CollisitionBox_93.push(makeBox("116,120,24,42,/101,165,45,52,/"));this.CollisitionBox_93.push(makeBox("115,120,27,43,/102,165,46,52,/"));
	this.CollisitionBox_93.push(makeBox("116,120,24,42,/101,165,45,52,/"));this.CollisitionBox_93.push(makeBox("115,120,27,43,/102,165,46,52,/"));
	this.CollisitionBox_93.push(makeBox("116,120,24,42,/101,165,45,52,/"));this.CollisitionBox_93.push(makeBox("115,120,27,43,/102,165,46,52,/"));
	this.CollisitionBox_93.push(makeBox("116,120,24,42,/101,165,45,52,/"));this.CollisitionBox_93.push(makeBox("115,120,27,43,/102,165,46,52,/"));
};

PGPlayer.prototype.Render = function(){
	
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	this.sprplayer.Render(Context);
	this.effect.Render(Context);
	this.bow.Render(Context);
	
	
};
PGPlayer.prototype.Update = function(crashDirection){
	
	var Speed = 3.0;
	var isLand = crashDirection.bottom;
	this.idle = 0;

	if(this.preidle == 0 && this.idle == 0)
	{
		if(!this.isWait)
			this.stopTime.ReSet();
		this.isWait = true;
	}
	else
		this.isWait = false;
		
	if(this.isWait && this.stopTime.isWork())
	{
		
		if(this.stopCount)
		{
			this.sprplayer.ChangeImage(93,14,9);
			this.sprplayer.ChangeForward(this.position);		
			this.idle = 93;
			this.Invalid(0);this.EffectSound();
		}
		else
		{
			this.sprplayer.ChangeImage(91,6,6);
			this.sprplayer.ChangeForward(this.position);		
			this.idle = 91;
			this.Invalid(0);this.EffectSound();
		
		}
		this.stopCount = !this.stopCount;
		this.effect.ChangeImage(10,1,1);
		this.bow.ChangeImage(10,1,1);
	}	
	if(this.inputFrameSkipper.isWork())
	{
//		this.onEnter = false;
		this.isDash.left = false; this.isDash.right = false;
		this.isDash.left_toggle = false; this.isDash.right_toggle = false;
	}
	
	if(isLand && (this.preidle == 0 || this.preidle == 26 || this.preidle == 13 || this.preidle == 28) )
	{
		if(inputSystem.isKeyDown(67) && this.preidle != 28)//c
		{
			if(inputSystem.isKeyDown(37) || inputSystem.isKeyDown(39))//MovingJump
			{
				if(inputSystem.isKeyDown(37))
					this.position = 0;
				else if(inputSystem.isKeyDown(39))
					this.position = 1;
	
				debugSystem.Log("LOG","MovingJump");
				this.sprplayer.ChangeImage(15,24,24);
				this.sprplayer.ChangeForward(this.position);
				this.preidle = 15;this.idle = 15;
				this.isJump = true;
				this.JumpHeight = this.y - 108 ;
				this.y -= this.JumpSpeed;
				this.Invalid(0);this.EffectSound();
			}
			else if(this.preidle != 13)
			{
				debugSystem.Log("LOG","Jump");
				this.sprplayer.ChangeImage(17,28,28);
				this.sprplayer.ChangeForward(this.position);		
				this.idle = 17;
				this.isJump = true;
				this.JumpHeight = this.y - 108 ;
				this.y -= this.JumpSpeed;
				this.Invalid(0);this.EffectSound();
			}
		}
		else if(inputSystem.isKeyDown(37) && this.preidle != 13 && this.preidle != 28)//left
		{
			
			if(this.isDash.left)// dash
			{
				this.accelate = 1.5;
				this.idle = 13;
				if(this.preidle != 13)
				{
					this.sprplayer.ChangeImage(13,16,16);
					this.sprplayer.ChangeForward(this.position);
					this.Invalid(0);this.EffectSound();
				}
			}
			else
			{
				this.idle = 26;
				if(this.position == 1)// change
				{
					this.position = 0;this.sprplayer.ChangeForward(this.position);
				}	
			
				if(this.preidle != 26)
				{
					this.sprplayer.ChangeImage(26,12,12);
					this.sprplayer.ChangeForward(this.position);
					this.Invalid(0);this.EffectSound();
				}	

	
				if(this.leftBound<this.x)
				{
					if(!crashDirection.left)
						this.x -= Speed;
				}
				else
					this.x = this.leftBound;
				
				this.Invalid();
			}
		}
		else if(inputSystem.isKeyDown(39) && this.preidle != 13 && this.preidle != 28)//right
		{
			if(this.isDash.right)// dash
			{
				this.accelate = 1.5;
				this.idle = 13;
				if(this.preidle != 13)
				{
					this.sprplayer.ChangeImage(13,16,16);
					this.sprplayer.ChangeForward(this.position);
					this.Invalid(0);this.EffectSound();
				}
			}
			else
			{
				this.idle = 26;
				if(this.position == 0)// change
				{
					this.position = 1;this.sprplayer.ChangeForward(this.position);
				}
			
				if(this.preidle != 26)
				{
					this.sprplayer.ChangeImage(26,12,12);
					this.sprplayer.ChangeForward(this.position);
					this.Invalid(0);this.EffectSound();
				}

	
				if(this.rightBound>this.x)
				{
					if(!crashDirection.right)
						this.x += Speed;
				}
				else
					this.x = this.rightBound;
				
				this.Invalid();
			}
		}
		else if(inputSystem.isKeyDown(40) && this.preidle != 13)//down
		{
			if(!this.sitting)
			{
			this.sitting = true;
			this.idle = 28;
			this.sprplayer.ChangeImage(28, 14, 28);
			this.sprplayer.ChangeForward(this.position);
		
			this.Invalid(0);this.EffectSound();
			}
		}
		else
		{
			this.sitting = false;
		}
		this.effect.ChangeImage(10,1,1);
		this.bow.ChangeImage(10,1,1);
	}
	else if(!isLand)
	{	
		if(this.preidle == 15)
		{
			if(this.position == 1)
			{
				if(this.rightBound>this.x)
				{
					if(!crashDirection.right)
						this.x += Speed*this.accelate;
				}
				else
					this.x = this.rightBound;
				this.Invalid();
			}
			else
			{
				if(this.leftBound<this.x)
				{
					if(!crashDirection.left)
						this.x -= Speed*this.accelate;
				}
				else
					this.x = this.leftBound;
				this.Invalid();
			}
		}
		
		if(crashDirection.top)
		{
			this.isJump = false;
			this.sprplayer.ChangeFrame();
		}
		
		if(this.JumpHeight < this.y)
		{
			if(this.isJump)
			{
				this.y -= this.JumpSpeed;
			}
		}
		else
			this.isJump = false;
			
		this.y += this.gravity;this.Invalid();
		this.effect.ChangeImage(10,1,1);
		this.bow.ChangeImage(10,1,1);
	}
	
	if (this.preidle == 13)
	{
		this.idle = 13;
		if(this.position == 1)
			{
				if(this.rightBound>this.x)
				{
					if(!crashDirection.right)
						this.x += Speed;
				}
				else
					this.x = this.rightBound;
				this.Invalid();
			}
		else
			{
				if(this.leftBound<this.x)
				{
					if(!crashDirection.left)
						this.x -= Speed;
				}
				else
					this.x = this.leftBound;
				this.Invalid();
			}
			this.effect.ChangeImage(10,1,1);
			this.bow.ChangeImage(10,1,1);
	}
	
	if(this.sitting && inputSystem.checkKeyDown(88) && this.preidle != 47)//x 앉아공격
	{
			this.idle = 47;this.preidle = 47;
			this.sprplayer.ChangeImage(47, 5, 10);
			this.sprplayer.ChangeForward(this.position);
			this.effect.ChangeImage(10,1,1);
			this.bow.ChangeImage(10,1,1);
			this.Invalid(0);this.EffectSound();
	}
	else if(inputSystem.checkKeyDown(88) && this.preidle != 1)//x : attack
		{
			
			this.idle = 1;this.preidle = 1;
			this.sprplayer.ChangeImage(1, 6, 12);
			this.sprplayer.ChangeForward(this.position);
				this.effect.ChangeImage(10,1,1);
				this.bow.ChangeImage(10,1,1);
			if(Status.equipment[0]=="bow")
			{
				this.bow.ChangeImage(0,7,14);
				this.bow.ChangeForward(this.position);
			}
			this.Invalid(0);this.EffectSound();
		}
	else if(inputSystem.checkKeyDown(90) && this.preidle != 40)//z : 발공격
		{
			this.idle = 40;this.preidle = 40;
			this.sprplayer.ChangeImage(40, 11, 22);
			this.sprplayer.ChangeForward(this.position);
			console.log(Status.equipment[0]);
			if(Status.equipment[0]=="sword")
			{
			this.effect.ChangeImage(0,11,22);
			this.effect.ChangeForward(this.position);
			}
			else if(Status.equipment[0]=="spear")
			{
			this.effect.ChangeImage(01,11,22);
			this.effect.ChangeForward(this.position);
			}
			this.Invalid(0);this.EffectSound();
	}
	this.bow.Update();
	this.effect.Update();
	if (this.preidle == 17)this.idle = 17;	
	if (this.preidle == 15)this.idle = 15;
	if (this.preidle == 1)this.idle = 1;
	if (this.preidle == 21)this.idle = 21;
	if (this.preidle == 40)this.idle = 40;
	if (this.preidle == 28)this.idle = 28;
	if (this.preidle == 47)this.idle = 47;
	if (this.preidle == 23)this.idle = 23;
	if (this.preidle == 93)this.idle = 93;if (this.preidle == 91)this.idle = 91;
	
	var info = this.sprplayer.Update();
	if(info != null){
		//change collisition
		this.Invalid(info.current);
		
		if(info.isLotate && this.preidle == 1)//attack
			this.idle = 0;
		else if(info.isLotate && (this.preidle == 47 || this.preidle == 23))
		{
			this.sitting = true;
			this.idle = 28;	this.preidle = 28;
			this.sprplayer.ChangeImage(28, 14, 28);
			this.sprplayer.ChangeForward(this.position);
			this.sprplayer.ChangeFrame();
			this.Invalid(0);
		}	
		else if(info.isLotate && this.preidle == 13)//dash
		{
			this.accelate = 1;
			this.idle = 0;	
		}
		else if(info.isLotate && this.preidle == 17)//jump
			this.idle = 0;
		else if(info.isLotate && this.preidle == 15)//MovingJump
		{
			this.accelate = 1;
			this.idle = 0;
		}
		else if(info.isLotate && this.preidle == 21)
		{
			this.idle = 0;
		}
		else if(info.isLotate && this.preidle == 40)
		{
			this.idle = 0;
		}
		else if(this.preidle == 28 && info.current == 6 && this.sitting)
		{
			this.sprplayer.ChangeFrame();
		}
		else if(info.isLotate && this.preidle == 28)
		{
			this.idle = 0;
		}
		else if(info.isLotate && ( this.preidle == 93 || this.preidle == 91 ))
		{
			this.idle = 0;
		}
	}
	//reset
	if(this.idle == 0 && this.preidle != this.idle)
	{
		this.sprplayer.ChangeImage(0, 12, 12);
		this.sprplayer.ChangeForward(this.position);
		
		this.Invalid(0);
	}
	
	//dash
	if(inputSystem.isKeyDown(37))
	{
		this.isDash.left_toggle = true;
	}
	else
	{
		if(this.isDash.left_toggle)
		{
			this.isDash.left_toggle = false;
			this.isDash.left = true;
		}
	}
	if(inputSystem.isKeyDown(39))
	{
		this.isDash.right_toggle = true;
	}
	else
	{
		if(this.isDash.right_toggle)
		{
			this.isDash.right_toggle = false;
			this.isDash.right = true;
		}
	}
	
	//monster process
	if(info != null && (this.preidle == 1 || this.preidle == 40 || this.preidle == 47))
	{
		this.preidle = this.idle;	
		return info.current;
	}	
	this.preidle = this.idle;
};
PGPlayer.prototype.Dameged = function()
{
	if(this.sitting)
	{
		this.idle = 23;this.preidle = 23;
		this.sprplayer.ChangeImage(23, 7, 21);
		this.Invalid(0);this.EffectSound();
	}
	else
	{
		this.idle = 21;this.preidle = 21;
		this.sprplayer.ChangeImage(21, 7, 21);
		this.Invalid(0);this.EffectSound();
	}
};
PGPlayer.prototype.EffectSound = function(){
	switch(this.idle)
	{
		case 91:
			soundSystem.PlaySound("sound/Akiha.snd_000117.wav");
		break;
		case 93:
			soundSystem.PlaySound("sound/Akiha.snd_000116.wav");
		break;
		case 1:
		case 47:
			soundSystem.PlaySound("sound/Akiha.attack1.wav");
		break;
		case 40:
			soundSystem.PlaySound("sound/Akiha.attack2.wav");
		break;
		case 21:
			soundSystem.PlaySound("sound/Akiha.snd_000056.wav");
		break;
		case 23:
			soundSystem.PlaySound("sound/Akiha.snd_000151.wav");
		break;
		case 13:
			soundSystem.PlaySound("sound/Akiha.snd_000011.wav");
		break;
		case 17:
			soundSystem.PlaySound("sound/Akiha.jump1.wav");
		break;
		case 15:
			soundSystem.PlaySound("sound/Akiha.jump2.wav");
		break;
	}
};
PGPlayer.prototype.Invalid = function(NumOfcollisition)
{
	if(Status.equipment[0]=="bow")
	{
		if(this.position==0)
			this.bow.SetPosition(this.x-180, this.y+20);
		else if(this.position==1)
			this.bow.SetPosition(this.x+180, this.y+20);
	}
	this.sprplayer.SetPosition( this.x, this.y);
	if(Status.equipment[0]=="sword")
	{
		if(this.position==0)
			this.effect.SetPosition(this.x-40, this.y);
		else if(this.position==1)
			this.effect.SetPosition(this.x+40, this.y);
	}
	else if(Status.equipment[0]=="spear")
	{
		if(this.position==0)
			this.effect.SetPosition(this.x-160, this.y+40);
		else if(this.position==1)
			this.effect.SetPosition(this.x+160, this.y+40);
	}
	
	if(NumOfcollisition != undefined)
	{
		var CollisitionArray;
		
		switch(this.idle){
			case 0: // stop
			case 91: // 대기2
			case 21: // 피격
			CollisitionArray = this.CollisitionBox_00;
			break;	
			case 26: // walk
			CollisitionArray = this.CollisitionBox_26;
			break;
			case 13: // dash
			CollisitionArray = this.CollisitionBox_13;
			break;
			case 17: // jump
			CollisitionArray = this.CollisitionBox_17;
			break;
			case 15: // Movingjump
			CollisitionArray = this.CollisitionBox_15;	
			break;
			case 1: // Attack
			CollisitionArray = this.CollisitionBox_01;	
			break;
			case 23: // 앉아피격
			CollisitionArray = this.CollisitionBox_23;
			break;
			case 40: //발 공격
			CollisitionArray = this.CollisitionBox_40;
			break;
			case 28: // 앉기
			CollisitionArray = this.CollisitionBox_28;
			break;
			case 47: // 앉아공격
			CollisitionArray = this.CollisitionBox_47;
			break;
			case 93: // 대기
			CollisitionArray = this.CollisitionBox_93;
			break;
		};
		
		this.UpCollisitionBox = CollisitionArray[NumOfcollisition].up;
		this.DownCollisitionBox = CollisitionArray[NumOfcollisition].down;
		this.AttackCollisitionBox = CollisitionArray[NumOfcollisition].attack;
		
	}
	
	for(var i = 0 ; i < this.UpCollisitionBox.length; i++){
		if(this.position == 0)
			this.UpCollisitionBox[i].left = this.x + (256 - this.UpCollisitionBox[i].x - this.UpCollisitionBox[i].w);
		else
			this.UpCollisitionBox[i].left = this.x + this.UpCollisitionBox[i].x;
		this.UpCollisitionBox[i].top = this.y + this.UpCollisitionBox[i].y;
		this.UpCollisitionBox[i].right = this.UpCollisitionBox[i].left + this.UpCollisitionBox[i].w;
		this.UpCollisitionBox[i].bottom = this.UpCollisitionBox[i].top + this.UpCollisitionBox[i].h;
	}
	for(var i = 0 ; i < this.DownCollisitionBox.length; i++){
		if(this.position == 0)
			this.DownCollisitionBox[i].left = this.x + (256 - this.DownCollisitionBox[i].x - this.DownCollisitionBox[i].w);
		else
			this.DownCollisitionBox[i].left = this.x + this.DownCollisitionBox[i].x;
		this.DownCollisitionBox[i].top = this.y + this.DownCollisitionBox[i].y;
		this.DownCollisitionBox[i].right = this.DownCollisitionBox[i].left + this.DownCollisitionBox[i].w;
		this.DownCollisitionBox[i].bottom = this.DownCollisitionBox[i].top + this.DownCollisitionBox[i].h;
	}
	for(var i = 0 ; i < this.AttackCollisitionBox.length; i++){
		if(Status.equipment[0]=="sword")
		{
			if(this.position == 0)
				this.AttackCollisitionBox[i].left = this.x + (256 - 150 - 130);
			else
				this.AttackCollisitionBox[i].left = this.x + 150;
				this.AttackCollisitionBox[i].top = this.y + 105;
				this.AttackCollisitionBox[i].right = this.AttackCollisitionBox[i].left + 130;
				this.AttackCollisitionBox[i].bottom = this.AttackCollisitionBox[i].top + 100;
		}
		else if(Status.equipment[0]=="spear")
		{
			if(this.position == 0)
				this.AttackCollisitionBox[i].left = this.x + (256 - 150 - 170);
			else
				this.AttackCollisitionBox[i].left = this.x + 150;
				this.AttackCollisitionBox[i].top = this.y + 161;
				this.AttackCollisitionBox[i].right = this.AttackCollisitionBox[i].left + 170;
				this.AttackCollisitionBox[i].bottom = this.AttackCollisitionBox[i].top + 14;
		}
		else
		{
			if(this.position == 0)
				this.AttackCollisitionBox[i].left = this.x + (256 - this.AttackCollisitionBox[i].x - this.AttackCollisitionBox[i].w);
			else
				this.AttackCollisitionBox[i].left = this.x + this.AttackCollisitionBox[i].x;
				this.AttackCollisitionBox[i].top = this.y + this.AttackCollisitionBox[i].y;
				this.AttackCollisitionBox[i].right = this.AttackCollisitionBox[i].left + this.AttackCollisitionBox[i].w;
				this.AttackCollisitionBox[i].bottom = this.AttackCollisitionBox[i].top + this.AttackCollisitionBox[i].h;
		}
	}
	
	this.leftBound =  0 - this.DownCollisitionBox[0].x;
	this.rightBound = 1280 - 256 + this.DownCollisitionBox[0].x+this.DownCollisitionBox[0].w;
	
//	console.log(this.leftBound);
};