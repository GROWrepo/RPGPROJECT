function PGMenu(isvillage){

	this.leftMenu = 1;
	this.leftOn = false;
	this.BoxMenu = new OKBox();
	this.BoxOn = false;
	this.width = 300;
	this.height = 720;

	this.image = resourcePreLoader.GetImage("img/point.png"); //get image
	this.fs = resourcePreLoader.GetImage("img/fs_akiha.png");
	
	this.x = 1280 - this.width;
	this.y = 720 - this.height;
	
	this.leftValue;
	this.leftType = 1;
	this.invenOn = false;
	this.invenValue;
	this.RightType = 1;
	this.RightPage = 0;
	
	this.leftImage = new Array();
	this.map = null;
	
	if(isvillage == undefined)
		this.isvillage = false;
	else
		this.isvillage = isvillage;
}
PGMenu.prototype.Init = function(){
	
	if(this.invenOn)
	{
		this.invenValue = Status.inventory.showItem(this.leftType-1);
	}
	else{
	this.leftValue = null;
	this.leftImage = new Array();
	
	switch(this.leftMenu)
	{
		case 1: //status
			this.leftValue = Status;
			
			for(var i = 0 ; i < this.leftValue.equipment.length; i++)
				{
					var item = Item.SearchItem(i,this.leftValue.equipment[i]);
					if(item != null)//find
						this.leftImage.push({img : item.img,x:item.x,y:item.y});
					else
						console.log("error");
				}
		break;
		case 2: //equipment
			this.leftValue = Status;
		break;
		case 3: //Map
		break;
		case 4: //Save
			if(!this.isvillage)
			{
				var information = playGameState.StageInfomation;
				this.leftValue = {time :time.GetTime(),name : information.name,stage:information.stage,x:playGameState.player.x,y:playGameState.player.y};
			}
			else
			{
				this.leftValue = {time :time.GetTime(),name : "village",stage:0,x:0,y:500};
			}
		break;
		case 5: //Quit
		break;
	};
	}
};
PGMenu.prototype.Render = function(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	var xIndex = 50;
	var yIndex = 100;
	var _x = this.x + 5;
	
	//draw box
	Context.save();
	Context.globalAlpha = 0.5;
	Context.fillStyle = "#000000"; // black
	Context.fillRect(this.x,this.y,this.width,this.height);
	DrawBorder(Context,"#ffffff",3,this.x,this.y,this.width,this.height);
	Context.restore();
	
	//draw icon
	switch(this.leftMenu)
	{
		case 1: //status
			Context.drawImage(this.image, _x  , this.y + yIndex*this.leftMenu );
		break;
		case 2: //equipment
			Context.drawImage(this.image, _x  , this.y + yIndex*this.leftMenu );
		break;
		case 3: //Map
			Context.drawImage(this.image, _x  , this.y + yIndex*this.leftMenu );
		break;
		case 4: //Save
			Context.drawImage(this.image, _x  , this.y + yIndex*this.leftMenu );
		break;
		case 5: //Quit
			Context.drawImage(this.image, _x  , this.y + yIndex*this.leftMenu );
		break;
	};
	
	_x = this.x + xIndex;

	//prepare text	

	Context.fillStyle = "#ffffff"; // white
	Context.font = '25px Arial';
	Context.textBaseline = "top";

	Context.fillText("Status" ,_x, this.y + yIndex * 1 );
	Context.fillText("Equip" ,_x, this.y + yIndex * 2 );
	Context.fillText("Map" ,_x, this.y + yIndex * 3 );
	Context.fillText("Save" ,_x, this.y + yIndex * 4 );
	Context.fillText("Quit" ,_x, this.y + yIndex * 5 );
	
	if(this.leftOn)
	{	
		Context.font = '20px Arial';
		switch(this.leftMenu)
		{
			case 1: //status
				var yIndex = 50;
				var xIndex = 100;
				if(!this.isvillage)
					playGameState.InMenuState = true;
				
				Context.save();
				var grd = Context.createLinearGradient(0,0,0,720 );
				grd.addColorStop(0,"black");
				grd.addColorStop(1,"blue");
				Context.fillStyle = grd;
				Context.fillRect(0,0,980,720);
				DrawBorder(Context,"#ffffff",3,0,0,980,720);
				Context.restore();
				
				Context.fillText("NAME : " + this.leftValue.Name,xIndex, 0 + yIndex * 1 );
				Context.fillText("LEVEL : " + this.leftValue.Level,xIndex, 0 + yIndex * 2 );
				Context.fillText("EXP : " + this.leftValue.Exp + " / "+this.leftValue.NextExp,xIndex, 0 + yIndex * 3 );
				Context.fillText("ATK : " + this.leftValue.Ability.Attack,xIndex, 0 + yIndex * 4 );
				Context.fillText("DEF : " + this.leftValue.Ability.Defense,xIndex, 0 + yIndex * 5 );
				Context.fillText("STR : " + this.leftValue.Ability.str,xIndex, 0 + yIndex * 6 );
				Context.fillText("DEX : " + this.leftValue.Ability.dex,xIndex, 0 + yIndex * 7 );	
				Context.fillText("BONUS : "+this.leftValue.Ability.bonus,xIndex, 0 + yIndex * 8 );
				
				if(this.leftType == 1)
					Context.drawImage(this.image,  xIndex - 30, yIndex * 6 );
				else if(this.leftType == 2)
					Context.drawImage(this.image,  xIndex - 30, yIndex * 7 );
					
				Context.fillText("STATE : " + "GOOD",xIndex, 0 + yIndex * 9 );	
				Context.fillText("TIME : " + time.GetTime() ,xIndex, 0 + yIndex * 11 );
				Context.fillText("GOLD : " + this.leftValue.gold,xIndex, 0 + yIndex * 12 );
				
				Context.drawImage(this.fs, 450  , 100 );
				//status.equipment
				Context.drawImage(this.leftImage[2].img,
					this.leftImage[2].x,this.leftImage[2].y,
					70,70,
					700,100,
					70,70);
				Context.drawImage(this.leftImage[0].img,
					this.leftImage[0].x,this.leftImage[0].y,
					70,70,
					600,200,
					70,70);
				Context.drawImage(this.leftImage[1].img,
					this.leftImage[1].x,this.leftImage[1].y,
					70,70,
					700,200,
					70,70);
				Context.drawImage(this.leftImage[3].img,
					this.leftImage[3].x,this.leftImage[3].y,
					70,70,
					600,300,
					70,70);
				Context.drawImage(this.leftImage[4].img,
					this.leftImage[4].x,this.leftImage[4].y,
					70,70,
					700,300,
					70,70);
			break;
			case 2: //equipment
				var xIndex = 100;
				var yIndex = 100;
				if(!this.isvillage)
					playGameState.InMenuState = true;
				Context.save();
				var grd = Context.createLinearGradient(0,0,0,720 );
				grd.addColorStop(0,"black");
				grd.addColorStop(1,"blue");
				Context.fillStyle = grd;
				Context.fillRect(0,0,980,720);
				DrawBorder(Context,"#ffffff",3,0,0,980,720);
				Context.restore();
				var Inven = this.leftValue.equipment;
				var item = Item.SearchItem(0,Inven[0]);
				Context.fillText("Weaphon : " + Inven[0],xIndex, 0 + yIndex * 1 );
				Context.drawImage(item.img,
					item.x,item.y,
					70,70,
					xIndex,yIndex*1+25,
					70,70);
				item = Item.SearchItem(1,Inven[1]);
				Context.fillText("Armer : " + Inven[1],xIndex, 0 + yIndex * 2 );
				Context.drawImage(item.img,
					item.x,item.y,
					70,70,
					xIndex,yIndex*2+25,
					70,70);
				item = Item.SearchItem(2,Inven[2]);
				Context.fillText("Neckless : " + Inven[2],xIndex, 0 + yIndex * 3 );
				Context.drawImage(item.img,
					item.x,item.y,
					70,70,
					xIndex,yIndex*3+25,
					70,70);
				item = Item.SearchItem(3,Inven[3]);
				Context.fillText("Ring : " + Inven[3],xIndex, 0 + yIndex * 4 );
				Context.drawImage(item.img,
					item.x,item.y,
					70,70,
					xIndex,yIndex*4+25,
					70,70);
				item = Item.SearchItem(4,Inven[4]);
				Context.fillText("Shoes : " + Inven[4],xIndex, 0 + yIndex * 5 );
				Context.drawImage(item.img,
					item.x,item.y,
					70,70,
					xIndex,yIndex*5+25,
					70,70);
				Context.fillText("Posion",xIndex, 0 + yIndex * 6 );
				
				Context.drawImage(this.image,  xIndex - 30, yIndex * this.leftType );
				DrawBorder(Context,"#ffffff",3,0,0,400,720);
				xIndex = 500;
				yIndex = 50;
				Inven = this.leftValue;
				Context.fillText("HP       "+Inven.HP+"       ->       ",xIndex, 0 + yIndex * 1 );
				Context.fillText("STR       "+Inven.Ability.str+"       ->       ",xIndex, 0 + yIndex * 2 );
				Context.fillText("DEF       "+Inven.Ability.dex+"       ->       ",xIndex, 0 + yIndex * 3 );
				Context.fillText("ATK       "+Inven.Ability.Attack+"       ->       ",xIndex, 0 + yIndex * 4 );
				Context.fillText("DEF       "+Inven.Ability.Defense+"       ->       ",xIndex, 0 + yIndex * 5 );
				DrawBorder(Context,"#ffffff",3,400,0,580,360);
				
				
				if(this.invenOn)
				{
					var item;
						
					yIndex = 70;
					xIndex += 60;
					
					for(var i = this.RightPage*8; i < this.invenValue.length; i++)
					{
						if(i<4)
							Context.fillText(this.invenValue[i].name+"   "+this.invenValue[i].num,400+50, 360 + yIndex * (i+1) );
						else
							Context.fillText(this.invenValue[i].name+"   "+this.invenValue[i].num,400+290+50,360 + yIndex * (i-3) );
					}
					
					if(this.RightType < 5)
						Context.drawImage(this.image, 400+20, 360 + yIndex * this.RightType );
					else
						Context.drawImage(this.image, 400+290+20, 360 + yIndex * (this.RightType-4) );
					
					var _rightType = this.RightPage*8 + this.RightType-1;
					
					if(_rightType < this.invenValue.length)
					{
					xIndex = 720;
					yIndex = 50;
					
					item = this.invenValue[_rightType].name;	
					var _item = Item.SearchItem(this.leftType-1,item);
					item = Inven.equipment[this.leftType-1];
					var pre_item = Item.SearchItem(this.leftType-1,item);
					
					if(this.leftType-1 == 5){
					if(Inven.HP == Inven.MaxHP)
					{
						Context.fillStyle = "gray";
						Context.fillText(""+Inven.MaxHP,xIndex, 0 + yIndex * 1 );
					}
					else
					{
						Context.fillStyle = "green";
						if(Inven.HP+_item.ability>=Inven.MaxHP)
							Context.fillText(""+Inven.MaxHP,xIndex, 0 + yIndex * 1 );
						else
							Context.fillText(""+(Inven.HP+_item.ability),xIndex, 0 + yIndex * 1 );
					}
					}
					else{
					if(Inven.Ability.str + _item.str == Inven.Ability.str + pre_item.str)
						Context.fillStyle = "gray";
					else if(Inven.Ability.str+_item.str > Inven.Ability.str+pre_item.str)
						Context.fillStyle = "green";
					else
						Context.fillStyle = "red";
					Context.fillText(""+(Inven.Ability.str+_item.str-pre_item.str),xIndex, 0 + yIndex * 2 );
					
					if(Inven.Ability.dex+_item.dex == Inven.Ability.dex+pre_item.dex)
						Context.fillStyle = "gray";
					else if(Inven.Ability.dex+_item.dex > Inven.Ability.dex+pre_item.dex)
						Context.fillStyle = "green";
					else
						Context.fillStyle = "red";
					Context.fillText(""+(Inven.Ability.dex+_item.dex-pre_item.dex),xIndex, 0 + yIndex * 3 );
					
					if(Inven.Ability.Attack+_item.atk == Inven.Ability.Attack+pre_item.atk)
						Context.fillStyle = "gray";
					else if(Inven.Ability.Attack+_item.atk > Inven.Ability.Attack+pre_item.atk)
						Context.fillStyle = "green";
					else
						Context.fillStyle = "red";
					Context.fillText(""+(Inven.Ability.Attack+_item.atk-pre_item.atk),xIndex, 0 + yIndex * 4 );
						
					if(Inven.Ability.Defense+_item.def == Inven.Ability.Defense+pre_item.def)
						Context.fillStyle = "gray";
					else if(Inven.Ability.Defense+_item.def > Inven.Ability.Defense+pre_item.def)
						Context.fillStyle = "green";
					else
						Context.fillStyle = "red";
					Context.fillText(""+(Inven.Ability.Defense+_item.def-pre_item.def),xIndex, 0 + yIndex * 5 );
					}
					}
				}
			break;
			case 3: //Map
				playGameState.InMenuState = true;
				Context.save();
				var grd = Context.createLinearGradient(0,0,0,720 );
				grd.addColorStop(0,"black");
				grd.addColorStop(1,"blue");
				Context.fillStyle = grd;
				Context.fillRect(0,0,980,720);
				DrawBorder(Context,"#ffffff",3,0,0,980,720);
				Context.restore();
				var x = 100, y = 100;
				for(var i = 0 ; i < this.map.length; i++ )
				{
					if(this.map[i] != 2){
						if(this.map[i] == 0)//not visible
							Context.fillStyle = "black";
						else//visible
							Context.fillStyle = "white";
							
						Context.fillRect(x+((i%6)*40),y,40,40);
					}
					if( i % 6 == 5)
						y += 40;
				}
			break;
			case 4: //Save
				if(!this.isvillage)
					playGameState.InMenuState = true;
				Context.save();
				var grd = Context.createLinearGradient(0,0,0,720 );
				grd.addColorStop(0,"black");
				grd.addColorStop(1,"blue");
				Context.fillStyle = grd;
				Context.fillRect(0,0,980,720);
				DrawBorder(Context,"#ffffff",3,0,0,980,720);
				Context.restore();
			
				yIndex = 30;
				Context.fillText("TIME : " + this.leftValue.time,xIndex, 0 + yIndex * 1 );
				Context.fillText("MAPNAME : " + this.leftValue.name,xIndex, 0 + yIndex * 2 );
				Context.fillText("MAPLOCATION : " + this.leftValue.stage,xIndex, 0 + yIndex * 3 );
				Context.fillText("PlayerXY : " + this.leftValue.x+" "+this.leftValue.y,xIndex, 0 + yIndex * 4 );

				
			break;
			case 5: //Quit
			break;
		};
	}
	if(this.BoxOn)
		this.BoxMenu.Render(Context);
	
};
PGMenu.prototype.Update = function(){
		
	if(this.BoxOn)
	{
		var choice_value = this.BoxMenu.Update();
		if(choice_value == undefined)
			;
		else
		{
			this.BoxOn = false;
			if(this.leftMenu == 4)
			{
				if(choice_value)
				{
					//send to server
					SaveData = ""+Status.SetStatus()+"@"+this.leftValue.time+"@"+this.leftValue.name+"@"+this.leftValue.stage+"@"+this.leftValue.x+"@"+this.leftValue.y;
					if(!this.isvillage)
						SaveData += "@"+this.Settingmap("save");
						
					gfwSocket.Emit("save", SaveData);
				}
				if(!this.isvillage)
					playGameState.InMenuState = false;
				this.leftOn = false;
			}
			else if(this.leftMenu == 5)
			{
				this.leftOn = false;
				if(choice_value && !this.isvillage)
				{
					playGameState.Notification("GOVILLIAGE");
				}
				else if(choice_value && this.isvillage)
				{
					soundSystem.StopBackgroundMusic();
					var ts = new TitleState();
					ChangeGameState(new TransitionFadeIn(ts,ts,6.0));
				}
			}
			else if(this.invenOn && choice_value) // change item
			{
				var _rightType = this.RightPage*8 + this.RightType -1;
				var name = this.invenValue[_rightType].name;
				Status.SetEquipment("in",this.leftType-1,name);
			}
		}
			
	}
	else if(!this.leftOn)
	{
		if(inputSystem.checkKeyDown(38))//up
		{
			this.leftMenu--;
			if(this.leftMenu < 1)
				this.leftMenu = 5;soundSystem.PlaySound("sound/menu.select.wav");
		}
		else if(inputSystem.checkKeyDown(40))//down
		{
			this.leftMenu++;
			if(this.leftMenu > 5)
				this.leftMenu = 1;soundSystem.PlaySound("sound/menu.select.wav");
		}
		else if(inputSystem.checkKeyDown(13))//enter
		{
			if(this.leftMenu == 3 && this.isvillage)// can't menu
				;
			else
			{
				this.leftOn = true;//test
				this.Init();soundSystem.PlaySound("sound/menu.select.wav");
			}
		}
		else if(inputSystem.checkKeyDown(90))//z , cancle
		{
			this.leftMenu = 1;
			if(!this.isvillage)
				playGameState.Notification("GOGAME");
			else
				return true;
		}
	}
	else
	{
		switch(this.leftMenu)
		{
			case 1: //status
			
				if(inputSystem.checkKeyDown(38))
				{
					this.leftType--;
					if(this.leftType < 1)
						this.leftType = 2;soundSystem.PlaySound("sound/menu.select.wav");
				}
				else if(inputSystem.checkKeyDown(40))
				{
					this.leftType++;
					if(this.leftType > 2)
						this.leftType = 1;soundSystem.PlaySound("sound/menu.select.wav");
				}
				else if( this.leftValue.Ability.bonus > 0 && inputSystem.checkKeyDown(13))
				{
					if(this.leftType == 1 )//str
						this.leftValue.GrowAbility("str");	
					else if(this.leftType == 2)//dex
						this.leftValue.GrowAbility("dex");soundSystem.PlaySound("sound/menu.select.wav");
				} 
				else if(inputSystem.checkKeyDown(90))
				{
					this.leftType = 1;
					if(!this.isvillage)
						playGameState.InMenuState = false;
					this.leftOn = false;
				}
			break;
			case 2: //equipment
				if(!this.invenOn)
				{
				if(inputSystem.checkKeyDown(38))
				{
					this.leftType--;
					if(this.leftType < 1)
						this.leftType = 6;soundSystem.PlaySound("sound/menu.select.wav");
				}
				else if(inputSystem.checkKeyDown(40))
				{
					this.leftType++;
					if(this.leftType > 6)
						this.leftType = 1;soundSystem.PlaySound("sound/menu.select.wav");
				}
				else if(inputSystem.checkKeyDown(13))
				{
					this.invenOn = true;
					this.Init();soundSystem.PlaySound("sound/menu.select.wav");
				}
				else if ( inputSystem.checkKeyDown(90))
				{
					if(!this.isvillage)
						playGameState.InMenuState = false;
					this.leftOn = false;
				}
				}
				else//inven
				{
					if(inputSystem.checkKeyDown(38)) // up
					{soundSystem.PlaySound("sound/menu.select.wav");
						this.RightType--;
						if(this.RightType < 1)
						{
							if(this.RightPage > 1)
							{
								this.RightPage--;
								this.RightType = 8;
							}
							else
								this.RightType = 1;
						}		
					}
					else if(inputSystem.checkKeyDown(40)) // down
					{soundSystem.PlaySound("sound/menu.select.wav");
						this.RightType++;
						if(this.RightType > 8)
						{
							if(this.invenValue.length > (this.RightPage+1) * 8)
							{
								this.RightPage++;
								this.RightType = 0;
							}
							else
								this.RightType = 8;
						}
							
					}
					else if(inputSystem.checkKeyDown(37)) // left
					{soundSystem.PlaySound("sound/menu.select.wav");
						var pre = this.RightType; 
						this.RightType -= 4;
						if(this.RightType < 1)
						{
							if(this.RightPage > 1)
							{
								this.RightPage--;
								this.RightType = 8-pre;
							}
							else
								this.RightType = pre;
						}
					}
					else if(inputSystem.checkKeyDown(39)) // right
					{soundSystem.PlaySound("sound/menu.select.wav");
						var pre = this.RightType;
						this.RightType += 4;
						if(this.RightType > 8)
						{
							if(this.invenValue.length > (this.RightPage+1) * 8)
							{
								this.RightPage++;
								this.RightType = 8-pre;
							}
							else
								this.RightType = pre;
						}
					}
					else if(inputSystem.checkKeyDown(13))//enter
					{soundSystem.PlaySound("sound/menu.select.wav");
						this.BoxOn = true;
						this.BoxMenu.SetSTR("Change");
					}
					else if (inputSystem.checkKeyDown(90))//cancle
					{
						this.invenOn = false;
						this.RightPage = 0;
						this.RightType = 1;
					}
					else if(inputSystem.checkKeyDown(65)) // a
						Status.SetEquipment("out",this.leftType-1);
				}
			break;
			case 3: //Map
				if(inputSystem.checkKeyDown(13) || inputSystem.checkKeyDown(90))
				{
					if(!this.isvillage)
						playGameState.InMenuState = false;
					this.leftOn = false;
				}
			break;
			case 4: //Save
				this.BoxOn = true;
				this.BoxMenu.SetSTR("Save");
			break;
			case 5: //Quit
				this.BoxOn = true;
				if(!this.isvillage)
					this.BoxMenu.SetSTR("던젼에서 나감?");
				else
					this.BoxMenu.SetSTR("타이틀로 나감?");
			break;	
		};
	}
};
PGMenu.prototype.Getmap = function(map){
	if(this.map == null)
		this.map = map;
};
PGMenu.prototype.Settingmap = function(state,value){
	if(state == "load")
	{
		for(var i = 0;i < value.length;i++)
			this.map[i] = value[i];
	}
	else if(state == "save")
	{
		var st = "";
		for(var i = 0 ; i < this.map.length; i++)
			st += this.map[i];
		return st;
	}
};
function OKBox(){
	this.x = 0;
	this.y = 420;
	this.width = 200;
	this.height = 100;
	this.image = resourcePreLoader.GetImage("img/point.png");
	this.type = true;

	this.str = "noSTR";
	this.q1 = "네";
	this.q2 = "아니요";
}
OKBox.prototype.SetSTR = function(str,q1,q2){
	this.str = str;
	if(q1 != undefined)
		this.q1 = q1;
	else
		this.q1 = "네";
		
	if(q2 != undefined)
		this.q2 = q2;
	else
		this.q2 = "아니요";
};
OKBox.prototype.Render = function(Context){

	var yIndex = 25;
	var xIndex = 30;
	var _x = this.x + 5;
	
	//draw box
	Context.fillStyle = "#000000"; // black
	Context.fillRect(this.x,this.y,this.width,this.height);
	DrawBorder(Context,"#ffffff",2,this.x,this.y,this.width,this.height);
	
	//draw icon
	if(this.type)
	{
		Context.drawImage(this.image, _x ,this.y + yIndex*2);
	}
	else
	{
		Context.drawImage(this.image, _x ,this.y + yIndex*3);
	}
	
	//prepare text
	Context.save();
	Context.fillStyle = "#ffffff"; // white

	Context.textBaseline = "top";

	_x = this.x + xIndex;
	Context.font = '20px Arial';
	Context.fillText(this.str+" ?", _x ,this.y+10);//yes
	Context.font = '15px Arial';
	Context.fillText(this.q1, _x ,this.y+yIndex*2);//yes
	Context.fillText(this.q2, _x ,this.y+yIndex*3);//no
	Context.restore();
};
OKBox.prototype.Update = function(){
	
	if(inputSystem.checkKeyDown(38) || inputSystem.checkKeyDown(40))//	up and down key
		this.type = !this.type;
	else if(inputSystem.checkKeyDown(90))//z , cancle
		{
			this.type = true;
			return 0;
		}
	else if(inputSystem.checkKeyDown(13))//enter
		{
			var value = this.type;
			this.type = true;
			return value;
		}
};