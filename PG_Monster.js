function PGMonster(){
	// 0 = stop 1 = walk 2 = attack
	this.idle = 1;	
	// 0 = left 1 = right
	this.position = 1;
	
	this.leftBound = 0;
	this.rightBound = 1280 - 56 ;
	
	this.sprmonster= new GraphicObjectAnimation("sk",1, 4, 4);
	this.life = 20;
	this.Attackdamage = 1;
	this.Box = new Array();
	this.AttackBox = new Array();
	this.AttackBox[0]= {left: 0, top:0, right: 0, bottom:0, x : 0 ,y:0,w:0,h:0};
	this.AttackBox[1]={left: 0, top:0, right: 0, bottom:0, x : 0 ,y:0,w:0,h:0};

	
	this.array  ={left: 0, top:0, right: 0, bottom:0};
	this.CollisitionBox_01 = new Array();
	this.CollisitionBox_02 = new Array();
	this.makeCollisition();
	this.leftBound = 0;
	this.rightBound = 1280 - 140 ;
	this.x = 800;
	this.y = 720-256-14;
	this.isAttack=false;
	
	this.interval = 1300;
	this.inputFrameSkipper = new FrameSkipper(this.interval);
}


PGMonster.prototype.makeCollisition = function(){
	this.CollisitionBox_01.push(Mon_makeBox("90,132,85,93,/"));
	this.CollisitionBox_01.push(Mon_makeBox("90,132,87,93,/"));
	this.CollisitionBox_01.push(Mon_makeBox("90,132,86,93,/"));
	this.CollisitionBox_01.push(Mon_makeBox("90,132,85,93,/"));

	this.CollisitionBox_02.push(Mon_makeBox("90,134,75,93,/165,150,25,60,/"));
	this.CollisitionBox_02.push(Mon_makeBox("90,134,75,93,/165,150,25,60,/"));
	this.CollisitionBox_02.push(Mon_makeBox("90,134,75,93,/165,150,25,60,/"));
	this.CollisitionBox_02.push(Mon_makeBox("90,134,75,93,/165,150,25,60,/"));	
	
};
function Mon_makeBox(data){
	
	var Rect = new Array();
	var AttackRect = new Array();
	var strArray = data.split("/");
	var preStr = strArray[0].split(",");
	for(var i = 0 ; i < preStr.length-1; i++)
			if(i%4 == 0){
				
				Rect.push({left:0,top:0,right:0,bottom:0,x : parseInt(preStr[i+0]) , y : parseInt(preStr[i+1]) , w : parseInt(preStr[i+2]) , h : parseInt(preStr[i+3]) });
			}
			
		preStr = strArray[1].split(",");
	for(var i = 0 ; i < preStr.length-1; i++)
			if(i%4 == 0){
				
				AttackRect.push({left:0,top:0,right:0,bottom:0,x : parseInt(preStr[i+0]) , y : parseInt(preStr[i+1]) , w : parseInt(preStr[i+2]) , h : parseInt(preStr[i+3]) });
			}		
				
	return {box : Rect , attack : AttackRect}; 
}
PGMonster.prototype.Render = function(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	this.sprmonster.Render(Context);
};
PGMonster.prototype.Update = function(mon_crashDirection){
	var Speed = 2;
	var isLand = mon_crashDirection.bottom;
	if(this.idle==1 && this.position== 1 )
	{
		this.sprmonster.Mon_ChangeForward(this.position);
		this.sprmonster.Mon_ChangeImage(1,4,4);
		if(mon_crashDirection.right)
		{
			this.position=0;
			this.sprmonster.Mon_ChangeForward(this.position);
		}
		if(this.rightBound>this.x)
				this.x += Speed;
		else
		{
			this.position=0;
			this.sprmonster.Mon_ChangeForward(this.position);
			this.x = this.rightBound;
		}
		this.Invalid(1);
	}
	else if(this.idle==1 && this.position ==0)
	{
		
		this.sprmonster.Mon_ChangeForward(this.position);
		this.sprmonster.Mon_ChangeImage(1,4,4);
		if(mon_crashDirection.left)
		{	
			this.position=1;
			this.sprmonster.Mon_ChangeForward(this.position);
		}
		if(this.leftBound<this.x)
			this.x -= Speed;
		else
		{
			this.position=1;
			this.sprmonster.Mon_ChangeForward(this.position);
			this.x = this.leftBound;
		}
		this.Invalid(1);
	}
	

	
	//Attack's array
	var player_down= playGameState.GetPlayerDownCollsionBox();
	var player_up =playGameState.GetPlayerUpCollsionBox();
	if(IntersectRect(this.array,player_down[0]))
	{
		if(BoolIntersectRect(this.array,player_down[0]).left)
		{
			this.position=0;
			
		}
		if(BoolIntersectRect(this.array,player_down[0]).right)
		{
			this.position=1;
		}
	}
	//Attack
	if(!IntersectRect(this.Box[0],player_down[0]))
	{
		this.idle=1;
	}
	
	if(IntersectRect(this.Box[0],player_down[0]))
	{
		
		this.idle=2;
		
		if(BoolIntersectRect(this.Box[0],player_down[0]).left)
		{
			
			this.position=0;
			this.sprmonster.Mon_ChangeForward(this.position);
			this.sprmonster.Mon_ChangeImage(5,4,4);
			this.Invalid(2);
			if(IntersectRect(this.AttackBox[0],player_down[0]))
			{
				this.isAttack=true;
			}
		}
		if(BoolIntersectRect(this.Box[0],player_down[0]).right)
		{
			this.position=1;
			this.sprmonster.Mon_ChangeForward(this.position);
			this.sprmonster.Mon_ChangeImage(5,4,4);
			this.Invalid(2);
			if(IntersectRect(this.AttackBox[1],player_down[0]))
			{
				this.isAttack=true;
			}
		}
		
		
				
		
	
	}
	if(this.inputFrameSkipper.isWork()){
	if(this.isAttack==true){
			Status.HP-= this.Attackdamage;
			console.log(Status.HP);
		}
	}
	this.isAttack=false;
	
	
	this.sprmonster.Update();
};
PGMonster.prototype.Invalid = function(NumOfcollisition)
{	
	this.sprmonster.SetPosition( this.x, this.y);

	if(NumOfcollisition != undefined)
	{
		var CollisitionArray;
		
		switch(this.idle){
			case 0: // stop
			CollisitionArray = this.CollisitionBox_01;
			break;
			case 1: // walk
			CollisitionArray = this.CollisitionBox_01;
			break;
			case 2: // Attack
			CollisitionArray = this.CollisitionBox_02;
			break;
		};
		
		this.Box = CollisitionArray[NumOfcollisition].box;
//		console.log(NumOfcollisition+ " "+ this.idle);
	
		if(this.idle==2){
		this.AttackBox = CollisitionArray[NumOfcollisition].attack;
		}
	
	}
	
	for(var i = 0 ; i < this.Box.length; i++){
		this.Box[i].left = this.x + this.Box[i].x;
		this.Box[i].top = this.y + this.Box[i].y;
		this.Box[i].right = this.Box[i].left + this.Box[i].w;
		this.Box[i].bottom = this.Box[i].top + this.Box[i].h;	
	}
	if(this.idle==2){
		this.AttackBox[1]={left: 0, top:0, right: 0, bottom:0, x : 0 ,y:0,w:0,h:0};
		this.AttackBox[0].left = this.x+ 256 - (this.AttackBox[0].w+this.AttackBox[0].x);
		this.AttackBox[0].top=this.y + this.AttackBox[0].y;
		this.AttackBox[0].right=this.AttackBox[0].left + this.AttackBox[0].w;
		this.AttackBox[0].bottom = this.AttackBox[0].top + this.AttackBox[0].h;
		this.AttackBox[1].left = this.x + this.AttackBox[0].x;
		this.AttackBox[1].top = this.AttackBox[0].top;
		this.AttackBox[1].right = this.AttackBox[1].left + this.AttackBox[0].w;
		this.AttackBox[1].bottom = this.AttackBox[0].bottom;
		
	}
	
	this.array={left : this.Box[0].left-120, top : this.Box[0].top, right : this.Box[0].right+120, bottom : this.Box[0].bottom};
};


