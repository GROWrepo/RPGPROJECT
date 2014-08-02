function PGMonster(){

	this.monsterArray = new Array();
	
	this.GetMonster();
}
PGMonster.prototype.GetMonster = function(){
	//test
	this.monsterArray.push(new monster("sk",900,720-256-14));
};
PGMonster.prototype.DelMonster = function(index){
	this.monsterArray.splice(index,1);
};
PGMonster.prototype.Render = function(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	for(var i = 0 ; i < this.monsterArray.length ; i++)
		this.monsterArray[i].Render(Context);
	
};
PGMonster.prototype.Update = function(mon_crashDirection,attackNumber){
	for(var i = 0 ; i < this.monsterArray.length ; i++)
		this.monsterArray[i].Update(mon_crashDirection,attackNumber);	
};

function monster(name, x, y){
	
	this.name = name;
	
	// stop(search) = 0 / moving = 1 / attacking = 5 / backmoving = 4
	this.idle = 0;
	// 0 = left 1 = right
	this.position = 0;
	
	this.totallife;
	this.life;
	this.Damage;
	this.exp;

	this.alpha = 1.0;
	this.dead = false;
	this.sprmonster;
	this.sea;
	
	this.UpCollisitionBox = new Array();//	={left: this.x,top : this.y + 42,right : this.x+56,bottom : this.y+146 - 19};
	this.DownCollisitionBox = new Array();
	this.AttackCollisitionBox = new Array();
	this.SeaCollisitionBox;
	
	this.CollisitionBox_00 = new Array(); // wait
	this.CollisitionBox_26 = new Array(); // walk
	this.CollisitionBox_01 = new Array(); // attack
	
	this.x = x;
	this.y = y;
	this.f_x = x;
	this.f_y = y;
	this.leftBound = 0;
	this.rightBound = 1280 - 140 ;

	this.inputFrameSkipper = new FrameSkipper(500);
	this.prograssbar;
	this.prograssbarOn = 0 ;
	this.count = 0;
	
	this.damaging = false;
	this.damaged = false;
	this.nuckback = 0;
	
	this.inputFrameSkipper_wait;
	this.Icon = new icon();
	
	this.Init();
}
monster.prototype.Init = function(){
	switch(this.name){
		case "sk":
			this.totallife = 100;
			this.life = 100;
			this.Damage = 12;
			this.exp = 20;
			this.sea = 100;
			this.sprmonster= new GraphicObjectAnimation("sk", 0, 1, 1);
					
			this.inputFrameSkipper_wait = new FrameSkipper(5000);
			this.inputFrameSkipper_wait.Set();
			this.prograssbar = new FrameSkipper(800);
			this.prograssbar.Set();
			
			this.CollisitionBox_00.push(makeBox("90,132,85,93,//"));
			
			this.CollisitionBox_26.push(makeBox("90,132,85,93,//165,150,25,60,"));
			this.CollisitionBox_26.push(makeBox("90,132,87,93,//165,150,25,60,"));
			this.CollisitionBox_26.push(makeBox("90,132,86,93,//165,150,25,60,"));
			this.CollisitionBox_26.push(makeBox("90,132,85,93,//165,150,25,60,"));

			this.CollisitionBox_01.push(makeBox("90,134,75,93,//165,150,25,60,"));
			this.CollisitionBox_01.push(makeBox("90,134,75,93,//165,150,25,60,"));
			this.CollisitionBox_01.push(makeBox("90,134,75,93,//165,150,25,60,"));
			this.CollisitionBox_01.push(makeBox("90,134,75,93,//165,150,25,60,"));
		break;
	};
	
	this.sprmonster.ChangeForward(this.position);
	this.Invalid(0);
};
monster.prototype.Attacked = function(value){
	var critical = value % 10;
	
	if(critical == 0)
		playGameState.StateLine.PushLine("player attack : "+value/10);
	else
		playGameState.StateLine.PushLine("Critical! player attack : "+value/10);
		
	this.prograssbar.Set();
	this.prograssbarOn = value;
	
	this.life -= value / 10;
	if(this.life < 0)//dead
	{
		Status.GetExp(this.exp);
		this.dead = true;
	}
};
monster.prototype.Render = function(Context,index){
	if(this.dead)
	{
		this.alpha -= 0.05;
		Context.save();
		Context.globalAlpha = this.alpha;
		this.sprmonster.Render(Context);
		Context.restore();
		
		if(this.alpha < 0)
			playGameState.Notification("DELETE_MONSTER",index);
	}
	else
	{
		var y = this.UpCollisitionBox[0].bottom;
		var x = this.UpCollisitionBox[0].left;
		
		//bar
		Context.save();
		var length = 100*(this.life/this.totallife);
		Context.fillStyle = "red";
		DrawBorder(Context,"white",2,x-2,y+3,104,14);
		Context.fillRect(x,y+5,length,10);
		
		Context.fillStyle = "white";
		Context.font = '20px Arial';
		Context.fillText(this.name,x+20,this.UpCollisitionBox[0].top-20);
		Context.restore();
		
		this.sprmonster.Render(Context);
		
		this.Icon.Render(Context,this.UpCollisitionBox[0].left,this.UpCollisitionBox[0].top);
		
		if(this.prograssbar.isWork())
		{
			this.count = 0 ;
			this.prograssbarOn = 0;
			this.prograssbar.ReSet();
			this.prograssbar.Set();
		}	
		if(this.prograssbarOn != 0)//dameged
		{
			y = this.UpCollisitionBox[0].top;
			this.count += 0.5;
			Context.save();	
			Context.font = '30px Arial';
			Context.globalAlpha = 1.0-(this.count/20);
			
			if(this.prograssbarOn % 10 == 1)
				Context.fillStyle = "red";
			else
				Context.fillStyle = "blue";
			
			Context.fillText(this.prograssbarOn/10,x+20,y-50-this.count);
			Context.restore();
		}
	}
};
monster.prototype.Update = function(mon_crashDirection,attackNumber){

	if(!this.dead)
	{	
	var Speed = 2;
	var player_UpCollisitionBox = playGameState.GetPlayerUpCollsionBox();
	var player_AttackCollisitionBox = playGameState.GetPlayerAttackCollsionBox();

	if(attackNumber == 1)
		this.damaged = true;
		
	if(this.damaged && player_AttackCollisitionBox[0] != undefined && ISIntersectRect(this.UpCollisitionBox[0] , player_AttackCollisitionBox[0]))
	{
		this.nuckback = 0;
		this.damaged = false;
		this.Attacked(Status.Attacking());
	}
	
	if(this.prograssbarOn != 0 && this.nuckback < 10)//nuckback
	{
		if(this.position == 1)
			this.x -= 2;
		else
			this.x += 2;
		
		this.Invalid();
		this.nuckback += 2;		
	}
	
	if(this.idle == 4)//backmoving
	{
		Speed = 4.0;

		if(this.position == 1)
		{
		if(this.f_x > this.x)
		{
			this.x += Speed;
			this.Invalid();
		}
		else
		{
			this.idle = 0;
			this.position = 0;
			this.sprmonster.ChangeForward(this.position);
			this.sprmonster.ChangeImage(0,1,1);
			this.Invalid(0);
		}
		}
		
		if(this.position == 0)
		{
		if( this.f_x < this.x)
		{
			this.x -= Speed;
			this.Invalid();
		}
		else
		{
			this.idle = 0;
			this.position = 0;
			this.sprmonster.ChangeForward(this.position);
			this.sprmonster.ChangeImage(0,1,1);
			this.Invalid(0);
		}
		}
	}
	else
	{
		if(ISIntersectRect(this.SeaCollisitionBox , player_UpCollisitionBox[0]) )//search
		{
			if(this.idle == 0)
			{
				this.idle = 1;
			
				this.sprmonster.ChangeForward(this.position);
				this.sprmonster.ChangeImage(1,4,4);
				this.Invalid(0);
			
				this.inputFrameSkipper_wait.Set();
				
				if(this.x == this.f_x)
					this.Icon.on();
			}
		}
		else if(this.idle == 1)//search fail!
		{
			this.idle = 4;
			this.position = Math.abs(this.position - 1);
			
			this.sprmonster.ChangeForward(this.position);
			this.sprmonster.ChangeImage(1,4,4);
			this.Invalid(0);
			
			this.inputFrameSkipper_wait.Set();
			this.inputFrameSkipper_wait.ReSet();
		}
	
		if(this.idle == 1) // moving
		{
			if(player_UpCollisitionBox[0].left < this.UpCollisitionBox[0].left)//left range
					this.position = 0;
				else//right range
					this.position = 1;
			
			if(this.position == 1 )
			{
				if(this.rightBound>this.x)
						this.x += Speed;
				else
					this.x = this.rightBound;
			
				this.Invalid();
			}
			else
			{
				if(this.leftBound<this.x)
					this.x -= Speed;
				else
					this.x = this.leftBound;		

				this.Invalid();
			}
		
			//Monster Attack
			if(ISIntersectRect(this.AttackCollisitionBox[0] , player_UpCollisitionBox[0]))
			{
				console.log("on");
				this.inputFrameSkipper_wait.Set();
				this.inputFrameSkipper_wait.ReSet();
				this.idle = 5;
				this.sprmonster.ChangeImage(5,4,4);
				this.Invalid(0);
				
				this.damaging = true;
			}
		}
		
	}

	if(this.inputFrameSkipper_wait.isWork() || (this.x > this.f_x + this.sea*2 || this.x < this.f_x - this.sea*2))
	{
		this.idle = 4;
		this.position = Math.abs(this.position - 1);
		this.sprmonster.ChangeForward(this.position);
		this.sprmonster.ChangeImage(1,4,4);
		this.Invalid(0);
			
		this.inputFrameSkipper_wait.Set();
		this.inputFrameSkipper_wait.ReSet();	
	}

	var info = this.sprmonster.Update();
	
	if(info != null){
		//change collisition
		
		if(this.idle == 5)
		{
		if(info.current == 0)
			this.damaging = true;
		
		if(this.damaging && ISIntersectRect(this.AttackCollisitionBox[0] , player_UpCollisitionBox[0]))
		{
			Status.Attacked(this.Damage);
			this.damaging = false;
		}
		
		if(info.isLotate)//attack
		{
			this.idle = 0;
			this.inputFrameSkipper_wait.Set();
			this.damaging = false;
		}
		}
	}
	}
};
monster.prototype.Invalid = function(NumOfcollisition)
{	
	this.sprmonster.SetPosition( this.x, this.y);

	if(NumOfcollisition != undefined)
	{
		var CollisitionArray;
		
		switch(this.idle){
			case 0: // stop
			CollisitionArray = this.CollisitionBox_00;
			break;
			case 1: // walk
			case 4: // backmoving
			CollisitionArray = this.CollisitionBox_26;
			break;
			case 5: // Attack
			CollisitionArray = this.CollisitionBox_01;
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
		this.DownCollisitionBox[i].left = this.x + this.DownCollisitionBox[i].x;
		this.DownCollisitionBox[i].top = this.y + this.DownCollisitionBox[i].y;
		this.DownCollisitionBox[i].right = this.DownCollisitionBox[i].left + this.DownCollisitionBox[i].w;
		this.DownCollisitionBox[i].bottom = this.DownCollisitionBox[i].top + this.DownCollisitionBox[i].h;
	}
	for(var i = 0 ; i < this.AttackCollisitionBox.length; i++){
		if(this.position == 0)
			this.AttackCollisitionBox[i].left = this.x + (256 - this.AttackCollisitionBox[i].x - this.AttackCollisitionBox[i].w);
		else
			this.AttackCollisitionBox[i].left = this.x + this.AttackCollisitionBox[i].x;
		this.AttackCollisitionBox[i].top = this.y + this.AttackCollisitionBox[i].y;
		this.AttackCollisitionBox[i].right = this.AttackCollisitionBox[i].left + this.AttackCollisitionBox[i].w;
		this.AttackCollisitionBox[i].bottom = this.AttackCollisitionBox[i].top + this.AttackCollisitionBox[i].h;
	}
	
	this.SeaCollisitionBox = {left : this.UpCollisitionBox[0].left-this.sea,right : this.UpCollisitionBox[0].right+ this.sea, top : this.UpCollisitionBox[0].top-this.sea, bottom : this.UpCollisitionBox[0].bottom+this.sea};
	this.leftBound =  0 - this.UpCollisitionBox[0].x;
	this.rightBound = 1280 - 256 + this.UpCollisitionBox[0].x+this.UpCollisitionBox[0].w;
};
function icon(){
	this.plag = false;
	this.fs = new FrameSkipper(1000);
	this.count = 0;
}
icon.prototype.Render = function(Context,x,y){

	if(this.fs.isWork())
	{
		this.plag = false;
		this.count = 0;
	}	
	if(this.plag)
	{
		this.count += 0.005;
		Context.save();
		Context.fillStyle = "yellow";
		Context.font = '40px Arial bold';
		Context.globalAlpha = 1.0 - this.count;
		Context.fillText("!",x+30,y-50);
		Context.restore();
	}
};
icon.prototype.on = function(){this.plag = true;};