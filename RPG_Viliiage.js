function VilliageState(){
	// this.img = new GraphicObject(resourcePreLoader.GetImage(“img/Logo.png”));
	// type
	this.Type = 0;//idle villiage
	this.Dialog = false;
	this.player = new player();
	
	this.Menu = new PGMenu(true);
	this.InMenuState = false;
	
	this.BoxMenu = new OKBox();
	this.BoxOn = false;
	this.image = resourcePreLoader.GetImage("img/point.png"); //get image
	this.leftValue = 0;
	this.RightPage = 0;
	this.RightType = 1;
	this.invenOn = false;
	
	this.NPCinventory = new Inventory();
	this.invenValue1;
	this.invenValue2;
	
	this.message = -1;
	this.StateLine = new RPG_StateLine();
	
	this.imgNPC = resourcePreLoader.GetImage("img/NPC.png");
	this.eventNPC = [{left:300,right:390,top:540,bottom:720},{left:600,right:690,top:540,bottom:720},{left:1050,right:1100,top:640,bottom:720}];
	
	this.Castle = new GraphicObject(resourcePreLoader.GetImage("img/Castle.png"));
	this.Castle.SetPosition(800,0);
	this.House = new GraphicObject(resourcePreLoader.GetImage("img/village_house.png"));
	this.House.SetPosition(100,720-341);
	this.House2 = new GraphicObject(resourcePreLoader.GetImage("img/village_house2.png"));
	this.House2.SetPosition(500,720-307);

	gfwSocket.On("control_in_game",function(msg)
	{
		switch(msg.key)
		{
			case "up": //38
			inputSystem.setKeyDown(38,msg.value);
			break;
			case "left": //37
			inputSystem.setKeyDown(37,msg.value);
			break;
			case "down": //40
			inputSystem.setKeyDown(40,msg.value);
			break;
			case "right": //39
			inputSystem.setKeyDown(39,msg.value);
			break;		
			case "menu"://13
			inputSystem.setKeyDown(13,msg.value);
			break;
		};
	});

}

VilliageState.prototype.Init = function(){
	//bgm
	soundSystem.PlayBackgroundMusic("sound/bgm_village.mp3");
	
	this.NPCinventory.setItem(0,"sword");this.NPCinventory.setItem(0,"longsword");
	this.NPCinventory.setItem(1,"dress");this.NPCinventory.setItem(1,"Bdress");
	this.NPCinventory.setItem(2,"Aneck");
	this.NPCinventory.setItem(4,"shoes");
	this.NPCinventory.setItem(5,"potion");
};
VilliageState.prototype.InitValue = function(){
	this.invenValue1 = this.NPCinventory.showItem(this.leftValue);	
	this.invenValue2 = Status.inventory.showItem(this.leftValue);	
};
VilliageState.prototype.Render = function(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");

	Context.fillStyle = "gray";
	Context.fillRect(0,0,1280,720);
	
	this.Castle.Render(Context);
	this.House.Render(Context);
	this.House2.Render(Context);
	
	Context.drawImage(this.imgNPC,
		0, 0,
		90, 180,
		300, 540,
		90, 180);
	Context.drawImage(this.imgNPC,
		90, 0,
		90, 180,
		600, 540,
		90, 180);	

	this.player.Render();
	Status.Render();
	this.StateLine.Render();
	
	if(this.Dialog)
	if(this.Type == 0)//INN
	{
		Context.save();
		var grd = Context.createLinearGradient(0,0,0,600 );
		grd.addColorStop(0,"black");
		grd.addColorStop(1,"blue");
		Context.fillStyle = grd;
		Context.fillRect(0,0,800,600);
		DrawBorder(Context,"#ffffff",3,0,0,800,600);		
		Context.restore();
		
		if(this.leftValue == 0)
			Context.drawImage(this.image, 10  , 140 );
		else
			Context.drawImage(this.image, 10  , 170 );
		
		var yIndex = 30;
		Context.fillStyle = "#ffffff"; // white
		Context.font = '25px Arial';
		Context.textBaseline = "top";
		Context.fillText("현재 체력 : "+Status.HP,50,50+(yIndex*0) );
		Context.fillText("돈 : "+Status.gold,50,50+(yIndex*1) );
		Context.fillText("휴식하기",50,50+(yIndex*3) );
		Context.fillText("나기기",50,50+(yIndex*4) );
		
		if(this.message == 1)
			Context.fillText("체력회복 성공",50,50+(yIndex*6) );
		else if(this.message == 0)
			Context.fillText("체력회복 실퍠(자금부족)",50,50+(yIndex*6) );
	}
	else if(this.Type == 1)//weaphone Store
	{
		Context.save();
		var grd = Context.createLinearGradient(0,0,0,800 );
		grd.addColorStop(0,"black");
		grd.addColorStop(1,"blue");
		Context.fillStyle = grd;
		Context.fillRect(0,0,800,600);
		DrawBorder(Context,"#ffffff",3,0,0,800,600);		
		Context.restore();
		
		Context.drawImage(this.image, 10  , 80*(this.leftValue+1) );
		
		Context.fillText("무기",30,(1*80) );
		Context.fillText("방어구",30,(2*80) );
		Context.fillText("먹걸이",30,(3*80) );
		Context.fillText("반지",30,(4*80) );
		Context.fillText("신발",30,(5*80) );
		Context.fillText("소모품",30,(6*80) );
		Context.fillText("골드 : "+Status.gold,10,(7*80) );
		
		DrawBorder(Context,"#ffffff",3,0,0,105,600);
		DrawBorder(Context,"#ffffff",3,100,0,700,300);
		if(this.invenOn)
		{
			Context.fillText("상점항목",120,20 );
			Context.fillText("인벤토리",120,320 );
			yIndex = 60;
			xIndex = 120;
					
			for(var i = this.RightPage*8; i < this.invenValue1.length; i++)
			{
				if(i<4)
					Context.fillText(this.invenValue1[i].name+"   "+this.invenValue1[i].num,xIndex+50,  yIndex * (i+1) );
				else
					Context.fillText(this.invenValue1[i].name+"   "+this.invenValue1[i].num,xIndex+290+50, yIndex * (i-3) );
			}
			
			for(var i = this.RightPage*8; i < this.invenValue2.length; i++)
			{
				if(i<4)
					Context.fillText(this.invenValue2[i].name+"   "+this.invenValue2[i].num,xIndex+50, 300 + yIndex * (i+1) );
				else
					Context.fillText(this.invenValue2[i].name+"   "+this.invenValue2[i].num,xIndex+290+50, 300 + yIndex * (i-3) );
			}
			
			if(this.purchase)
				var _yIndex = 0;
			else
				var _yIndex = 300;
			if(this.RightType < 5)
				Context.drawImage(this.image, xIndex+20, _yIndex + yIndex * this.RightType );
			else
				Context.drawImage(this.image, xIndex+290+20, _yIndex + yIndex * (this.RightType-4) );
		}	
	}
	else if(this.Type == 2)//dounsion
	{
		Context.save();
		var grd = Context.createLinearGradient(0,0,0,800 );
		grd.addColorStop(0,"black");
		grd.addColorStop(1,"blue");
		Context.fillStyle = grd;
		Context.fillRect(0,0,800,600);
		DrawBorder(Context,"#ffffff",3,0,0,800,600);		
		Context.restore();
	
		var yIndex = 30;
		Context.drawImage(this.image, 10  , 50 +(yIndex*this.leftValue));

		Context.fillStyle = "#ffffff"; // white
		Context.font = '25px Arial';
		Context.textBaseline = "top";
		
		Context.fillText("난이도 1 : Dark Cave",50,50+(yIndex*0) );
		Context.fillText("난이도 1 : ??",50,50+(yIndex*1) );
		Context.fillText("난이도 1 : ??",50,50+(yIndex*2) );
		Context.fillText("난이도 1 : ??",50,50+(yIndex*3) );
		Context.fillText("난이도 3 : ??",50,50+(yIndex*4) );
		Context.fillText("난이도 3 : ??",50,50+(yIndex*5) );
		Context.fillText("나가기 ",50,50+(yIndex*6) );
		
		for(var i = 0 ; i < Status.dounsion.length;i++)
			if(Status.dounsion[i]==1)
			{
				Context.fillStyle = "green";
				Context.fillText("열림",400,50+(yIndex*i) );
			}
			else
			{
				Context.fillStyle = "red";
				Context.fillText("닫힘",400,50+(yIndex*i) );
			}
	}
	
	if(this.BoxOn)
		this.BoxMenu.Render(Context);
	if(this.MenuOn)
		this.Menu.Render();
};
VilliageState.prototype.Update = function(){

	//collitionCheck

	if(!this.Dialog)
	{
		if(!this.MenuOn)
		if(this.player.Update())	
		for(var i = 0; i < this.eventNPC.length;i++)
			if(ISIntersectRect(this.player.CollisitionBox,this.eventNPC[i]))
			{
		
				this.Type = i;
				this.Dialog = true;
				soundSystem.PlaySound("sound/menu.select.wav");
			}
	}
	else
	{
	if(this.BoxOn)
	{
		var choice_value = this.BoxMenu.Update();
		if(choice_value == undefined)
			;
		else
		{
			this.BoxOn = false;
			if(this.Type == 0)
			{
				if(choice_value)
				{
					if(Status.Gold("pop",10))
					{
						this.StateLine.PushLine("INN 회복");
						Status.Healing(9999);
						this.message = 1;
					}
					else
						this.message = 0;
				}
			}
			if(this.Type == 1)//store
			{
				if(!this.invenOn)
				{
				if(choice_value)
					this.purchase = true;
				else
					this.purchase = false;
				
				this.InitValue();
				this.invenOn = true;
				}
				else if(this.invenOn && choice_value)
				{
					if(this.purchase)
					{
						var _rightType = this.RightPage*8 + this.RightType -1;
						var name = this.invenValue1[_rightType].name;
						var _item = Item.SearchItem(this.leftValue,name);
						if(Status.Gold("pop",_item.money))
						{
							this.StateLine.PushLine("구입 : "+name);
							Status.inventory.setItem(this.leftValue,name);
						}
					}
					else
					{
						var _rightType = this.RightPage*8 + this.RightType -1;
						var name = this.invenValue2[_rightType].name;
						var _item = Item.SearchItem(this.leftValue,name);
						if(Status.Gold("push",(_item.money/2)))
						{
							this.StateLine.PushLine("판매 : "+name);
							Status.inventory.getItem(this.leftValue,name);
						}
					}
					
				}
			}
			if(this.Type == 2)//ds
			{
				if(choice_value)
				{
					
				if(this.leftValue == 0)
				{
					soundSystem.StopBackgroundMusic();
					ChangeGameState(new TransitionFadeOut (this, new PlayGameState("DarkCave",0,0,457) ,6.0));
				}
				}
			}
		
		}	
	}	
		
	if(this.Type == 0)//INN
	{	

		if(inputSystem.checkKeyDown(38))//up
		{soundSystem.PlaySound("sound/menu.select.wav");
			this.leftValue--;
			if(this.leftValue < 0)
				this.leftValue = 0;	
		}
		else if(inputSystem.checkKeyDown(40))//down
		{soundSystem.PlaySound("sound/menu.select.wav");
			this.leftValue++;
			if(this.leftValue > 1)
				this.leftValue = 1;
		}
		else if(inputSystem.checkKeyDown(13))//enter
		{soundSystem.PlaySound("sound/menu.select.wav");
			if(this.leftValue == 0)
			{
				this.BoxOn = true;
				this.BoxMenu.SetSTR("정말?");
			}
			else
			{
				this.Dialog = false;
				this.message = -1;
				this.leftValue = 0;
			}
		}
	}
	else if(this.Type == 1)//weaphone Store
	{
		if(!this.invenOn)
		{
			if(inputSystem.checkKeyDown(38))//up
			{soundSystem.PlaySound("sound/menu.select.wav");
				this.leftValue--;
				if(this.leftValue < 0)
					this.leftValue = 0;	
			}
			else if(inputSystem.checkKeyDown(40))//down
			{soundSystem.PlaySound("sound/menu.select.wav");
				this.leftValue++;
					if(this.leftValue > 5)
					this.leftValue = 5;
			}
			else if(inputSystem.checkKeyDown(13))//enter
			{soundSystem.PlaySound("sound/menu.select.wav");
					this.BoxOn = true;
					this.BoxMenu.SetSTR("선택?","구입","판매");
			}
			else if(inputSystem.checkKeyDown(90))
			{
				this.leftValue = 0;
				this.Dialog = false;
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
						if(this.purchase)
						{
							if(this.invenValue1.length > (this.RightPage+1) * 8)
							{
								this.RightPage++;
								this.RightType = 0;
							}
							else
								this.RightType = 8;
						}
						else
						{
							if(this.invenValue2.length > (this.RightPage+1) * 8)
							{
								this.RightPage++;
								this.RightType = 0;
							}
							else
								this.RightType = 8;
						}
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
						if(this.purchase)
						{
							if(this.invenValue2.length > (this.RightPage+1) * 8)
							{
								this.RightPage++;
								this.RightType = 8-pre;
							}
							else
								this.RightType = pre;
						}
						else
						{
							if(this.invenValue2.length > (this.RightPage+1) * 8)
							{
								this.RightPage++;
								this.RightType = 8-pre;
							}
							else
								this.RightType = pre;
						}
					}
				}
				else if(inputSystem.checkKeyDown(13))//enter
				{soundSystem.PlaySound("sound/menu.select.wav");
					this.BoxOn = true;
					
					if(this.purchase)//구입
					{
						var _rightType = this.RightPage*8 + this.RightType -1;
						var name = this.invenValue1[_rightType].name;					
						var _item = Item.SearchItem(this.leftValue,name);
						this.BoxMenu.SetSTR(_item.money+"골드에 구입");
						}
					else
					{
						var _rightType = this.RightPage*8 + this.RightType -1;
						var name = this.invenValue2[_rightType].name;
						var _item = Item.SearchItem(this.leftValue,name);
						
						this.BoxMenu.SetSTR(_item.money/2+"골드에 판매");
					}
				}
				else if (inputSystem.checkKeyDown(90))//cancle
				{
					this.invenOn = false;
					this.RightPage = 0;
					this.RightType = 1;
				}
			}
		}
	else if(this.Type == 2)//dounsion
	{
		if(inputSystem.checkKeyDown(38))//up
		{soundSystem.PlaySound("sound/menu.select.wav");
			this.leftValue--;
			if(this.leftValue < 0)
				this.leftValue = 0;	
		}
		else if(inputSystem.checkKeyDown(40))//down
		{soundSystem.PlaySound("sound/menu.select.wav");
			this.leftValue++;
			if(this.leftValue > 6)
				this.leftValue = 6;
		}
		else if(inputSystem.checkKeyDown(13))//enter
		{soundSystem.PlaySound("sound/menu.select.wav");
			if(this.leftValue == 6)
			{
				this.Dialog = false;
				this.leftValue = 0;	
			}
			else
			{
				if(Status.dounsion[this.leftValue] == 1)
				this.BoxOn = true;
				this.BoxMenu.SetSTR("정말?");
			}
		}

	}
	}
	
	if(this.MenuOn)
	{
		if(this.Menu.Update())
			this.MenuOn = false;
	}
	if(inputSystem.checkKeyDown(13) )//enter
	{
		this.MenuOn = true;
		soundSystem.PlaySound("sound/menu.select.wav");
	}	
};

function player(){
	
	this.preidle;
	this.idle = 0;
	this.position = 1;
	this.sprplayer = new GraphicObjectAnimation("aki",0, 12, 12);
	this.x = 0;
	this.y = 500;
	this.leftBound =  -100;
	this.rightBound = 1280 - 200;
	this.CollisitionBox = {left:this.x+116,right:this.x+116+24,top:this.y+120,bottom:this.y+120+42};
	this.Invalid();
}
player.prototype.Render = function(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	this.sprplayer.Render(Context);
};
player.prototype.Update = function(){
	var Speed = 12.0;
	var check = false;
	
	this.idle = 0;
	//걷는거 추가
	if(inputSystem.isKeyDown(38)) //up
	{
		check = true;
	}
	else if(inputSystem.isKeyDown(37))//left
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
			this.Invalid();
		}	
		if(this.leftBound<this.x)
			this.x -= Speed;
		else
			this.x = this.leftBound;			
		this.Invalid();
	}
	else if(inputSystem.isKeyDown(39))//right
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
			this.Invalid(0);
		}
		
		if(this.rightBound>this.x)
			this.x += Speed;
		else
			this.x = this.rightBound;			
		this.Invalid();
	}
	
	this.sprplayer.Update();
	
	//reset
	if(this.idle == 0 && this.preidle != this.idle)
	{
		this.sprplayer.ChangeImage(0, 12, 12);
		this.sprplayer.ChangeForward(this.position);
		this.Invalid();
	}
	this.preidle = this.idle;
	
	return check;
};
player.prototype.Invalid = function(){
	this.sprplayer.SetPosition( this.x, this.y);
	this.CollisitionBox = {left:this.x+116,right:this.x+116+24,top:this.y+120,bottom:this.y+120+42};
};