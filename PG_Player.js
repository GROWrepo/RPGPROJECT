function PGPlayer(){

	// 0 = stop / 1 = walk / 2 = dash / 3 = jump / 4 = Movingjump / 5 = attack
	this.idle = 0;	
	// 0 = left 1 = right
	this.position = 1;
	
	this.isDashing = false;
	this.isAttack = false;
	this.isJump = false;
	this.JumpHeight;
	this.JumpSpeed = 12.0;
	this.gravity = 6.0;
	this.accelate = 1;
	this.isDash
	= {left : false, right : false, left_toggle : false, right_toggle : false};
	
	this.preidle;
	
	this.sprplayer = new GraphicObjectAnimation("aki",0, 12, 12);
	
	this.leftBound = 0;
	this.rightBound = 1280 - 59 ;
	this.x = 0;
	this.y = 720 -256 -7;
	
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
	this.makeCollisition();
	
	this.Invalid(0);
	
	this.interval = 500;
	this.inputFrameSkipper = new FrameSkipper(this.interval);
	
}
PGPlayer.prototype.setPosition = function(x,y){
	this.x = x;
	this.y = y;
	this.isDashing = false;
	this.isAttack = false;
	this.isJump = false;
	this.idle = 0;
	this.position = 1;
		
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

//	this.CollisitionBox_26.push(makeBox("117,120,24,45,/104,168,44,50,/")); //0
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
};

PGPlayer.prototype.Render = function(){
	
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	this.sprplayer.Render(Context);
	
};
PGPlayer.prototype.Update = function(crashDirection){
	
	var Speed = 3.0;
	var isLand = crashDirection.bottom;
	this.idle = 0;

	if(this.inputFrameSkipper.isWork())
	{
//		this.onEnter = false;
		this.isDash.left = false; this.isDash.right = false;
		this.isDash.left_toggle = false; this.isDash.right_toggle = false;
	}
	
	if(isLand && (this.preidle == 0 || this.preidle == 1 || this.preidle == 2) )
	{
		if(inputSystem.isKeyDown(38))//up
		{
			if(inputSystem.isKeyDown(37) || inputSystem.isKeyDown(39))//MovingJump
			{
				if(inputSystem.isKeyDown(37))
					this.position = 0;
				else if(inputSystem.isKeyDown(39))
					this.position = 1;
	
				debugSystem.Log("LOG","MovingJump");
				this.sprplayer.ChangeImage(4,24,24);
				this.sprplayer.ChangeForward(this.position);
				this.preidle = 4;this.idle = 4;
				this.isJump = true;
				this.JumpHeight = this.y - 108 ;
				this.y -= this.JumpSpeed;
				this.Invalid(4);
			}
			else if(this.preidle != 2)
			{
				debugSystem.Log("LOG","Jump");
				this.sprplayer.ChangeImage(3,28,28);
				this.sprplayer.ChangeForward(this.position);		
				this.idle = 3;
				this.isJump = true;
				this.JumpHeight = this.y - 108 ;
				this.y -= this.JumpSpeed;
				this.Invalid(3);
			}
		}
		else if(inputSystem.isKeyDown(88) && this.preidle != 2)//x : attack
		{
			this.idle = 5;
			this.sprplayer.ChangeImage(5, 6, 6);
			this.sprplayer.ChangeForward(this.position);
		
			this.Invalid(5);
		}
//		else if(inputSystem.isKeyDown(90) && !this.onEnter)//z : enter	{this.onEnter = true;			debugSystem.Log("LOG","z : "+this.onEnter);}
		else if(inputSystem.isKeyDown(37) && this.preidle != 2)//left
		{
			
			if(this.isDash.left)// dash
			{
				this.accelate = 1.5;
				this.idle = 2;
				if(this.preidle != 2)
				{
					this.sprplayer.ChangeImage(2,16,16);
					this.sprplayer.ChangeForward(this.position);
					this.Invalid(2);
				}
			}
			else
			{
				this.idle = 1;
				if(this.position == 1)// change
				{
					this.position = 0;this.sprplayer.ChangeForward(this.position);
				}	
			
				if(this.preidle != 1)
				{
					this.sprplayer.ChangeImage(1,12,12);
					this.sprplayer.ChangeForward(this.position);
					this.Invalid(1);
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
		else if(inputSystem.isKeyDown(39) && this.preidle != 2)//right
		{
			if(this.isDash.right)// dash
			{
				this.accelate = 1.5;
				this.idle = 2;
				if(this.preidle != 2)
				{
					this.sprplayer.ChangeImage(2,16,16);
					this.sprplayer.ChangeForward(this.position);
					this.Invalid(2);
				}
			}
			else
			{
				this.idle = 1;
				if(this.position == 0)// change
				{
					this.position = 1;this.sprplayer.ChangeForward(this.position);
				}
			
				if(this.preidle != 1)
				{
					this.sprplayer.ChangeImage(1,12,12);
					this.sprplayer.ChangeForward(this.position);
					this.Invalid(1);
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
	}
	else if(!isLand)
	{	
		if(this.preidle == 4)
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
	}
	
	if (this.preidle == 2)
	{
		this.idle = 2;
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
	}
	if (this.preidle == 3)this.idle = 3;	
	if (this.preidle == 4)this.idle = 4;
	if (this.preidle == 5)this.idle = 5;
		
	var info = this.sprplayer.Update();
	if(info != null){
		//change collisition
		this.Invalid(info.current);
		
		if(info.isLotate && this.preidle == 5)//attack
			this.idle = 0;				
		else if(info.isLotate && this.preidle == 2)//dash
		{
			this.accelate = 1;
			this.idle = 0;	
		}
		else if(info.isLotate && this.preidle == 3)//jump
			this.idle = 0;
		else if(info.isLotate && this.preidle == 4)//MovingJump
		{
			this.accelate = 1;
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
	this.preidle = this.idle;
	
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
};
PGPlayer.prototype.Invalid = function(NumOfcollisition)
{
	this.sprplayer.SetPosition( this.x, this.y);

	if(NumOfcollisition != undefined)
	{
		var CollisitionArray;
		
		switch(this.idle){
			case 0: // stop
			CollisitionArray = this.CollisitionBox_00;
			break;
			case 1: // walk
			CollisitionArray = this.CollisitionBox_26;
			break;
			case 2: // dash
			CollisitionArray = this.CollisitionBox_13;
			break;
			case 3: // jump
			CollisitionArray = this.CollisitionBox_17;
			break;
			case 4: // Movingjump
			CollisitionArray = this.CollisitionBox_15;	
			break;
			case 5: // Attack
			CollisitionArray = this.CollisitionBox_01;	
			break;
		};
		
		this.UpCollisitionBox = CollisitionArray[NumOfcollisition].up;
//		console.log(NumOfcollisition+ " "+ this.idle);
		this.DownCollisitionBox = CollisitionArray[NumOfcollisition].down;
		this.AttackCollisitionBox = CollisitionArray[NumOfcollisition].attack;
		
	}
	
	for(var i = 0 ; i < this.UpCollisitionBox.length; i++){
		this.UpCollisitionBox[i].left = this.x + this.UpCollisitionBox[i].x;
		this.UpCollisitionBox[i].top = this.y + this.UpCollisitionBox[i].y;
		this.UpCollisitionBox[i].right = this.UpCollisitionBox[i].left + this.UpCollisitionBox[i].w;
		this.UpCollisitionBox[i].bottom = this.UpCollisitionBox[i].top + this.UpCollisitionBox[i].h;
	}
	for(var i = 0 ; i < this.DownCollisitionBox.length; i++){
		this.DownCollisitionBox[i].left = this.x + this.DownCollisitionBox[i].x;
		this.DownCollisitionBox[i].top = this.y + this.DownCollisitionBox[i].y;
		this.DownCollisitionBox[i].right = this.DownCollisitionBox[i].left + this.DownCollisitionBox[i].w;
		this.DownCollisitionBox[i].bottom = this.DownCollisitionBox[i].top + this.DownCollisitionBox[i].h;
	}
	for(var i = 0 ; i < this.AttackCollisitionBox.length; i++){
		this.AttackCollisitionBox[i].left = this.x + this.AttackCollisitionBox[i].x;
		this.AttackCollisitionBox[i].top = this.y + this.AttackCollisitionBox[i].y;
		this.AttackCollisitionBox[i].right = this.AttackCollisitionBox[i].left + this.AttackCollisitionBox[i].w;
		this.AttackCollisitionBox[i].bottom = this.AttackCollisitionBox[i].top + this.AttackCollisitionBox[i].h;
	}
	
	this.leftBound =  0 - this.DownCollisitionBox[0].x;
	this.rightBound = 1280 - 256 + this.DownCollisitionBox[0].x+this.DownCollisitionBox[0].w;
	
//	console.log(this.leftBound);
};