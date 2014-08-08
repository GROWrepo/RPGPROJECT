var playGameState;
var Status;
var Item;
var time;
function PlayGameState(name,stage,x,y,map)
{	
	playGameState = this;
	this.StageInfomation;
	this.GAME_SPEED = 1.5;
	
	this.background = new PGbackground();
	this.player = new PGPlayer(x,y);
	this.monster = new PGMonster();
	this.Object = new PGObject();
	this.Map = new MapTile();
	this.Menu = new PGMenu();
	this.StateLine = new RPG_StateLine();
	
	this.ChatBoxs = new ChatBoxs();
	
	this.isGameStop = false;
	this.InMenuState = false;
	this.InChatState = false;
	
	this.Map.LoadStage(name,stage);
	
	if(map != undefined)
		this.Menu.Settingmap("load",map);
	
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
			case "A": //88
			inputSystem.setKeyDown(0,msg.value);
			break;
			case "B": // z
			inputSystem.setKeyDown(90,msg.value);
			break;
			case "C": // x
			inputSystem.setKeyDown(88,msg.value);
			break;
			case "D": // c
			inputSystem.setKeyDown(67,msg.value);
			break;
			case "menu":
			inputSystem.setKeyDown(0,msg.value);
			break;
			case "enter":
			inputSystem.setKeyDown(13,msg.value);
			break;
		};
	});	
}

PlayGameState.prototype.Init = function()
{
	soundSystem.PlayBackgroundMusic("sound/bgm_darkcave.mp3");
};
PlayGameState.prototype.Render = function()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	if(!this.InMenuState)
	{
		this.background.Render();
		this.Map.Render();
		this.Object.Render();
		this.monster.Render();
		this.player.Render();

	}
	Status.Render();
	this.StateLine.Render();
	this.ChatBoxs.Render();
	
	//text filed x : 0 ~ 800 / y : 0 ~ 130
	Context.fillStyle = "#ffffff";
	Context.font = '28px Arial';
	Context.textBaseline = "top";

	if(this.MenuOn)
		this.Menu.Render();
	
};
PlayGameState.prototype.Update = function()
{
	if(!this.isGameStop)
	{
		var crashDirection = this.Map.CheckCollision();
		var mon_crashDirection = this.Map.Mon_CheckCollision(this.monster.monsterArray);
		var attackNumber = this.player.Update(crashDirection);

		if(attackNumber == undefined)
			attackNumber = -1;
			
		this.monster.Update(mon_crashDirection,attackNumber);
		this.Object.Update();
	}
	else // menu
	{
		if(this.InChatState)
			this.ChatBoxs.Update();
		
		if(this.MenuOn)
			this.Menu.Update();
	}
	
	if(!this.InChatState && inputSystem.checkKeyDown(13) )//enter
	{
		this.isGameStop =true;
		this.MenuOn = true;
		soundSystem.PlaySound("sound/menu.select.wav");
	}	
	
};
PlayGameState.prototype.Notification = function(msg,value)
{
	
	switch(msg)
	{
		case "GOVILLIAGE":
			soundSystem.StopBackgroundMusic();
			ChangeGameState(new TransitionFadeOut (this, new VilliageState() ,6.0));
		break;
		case "GOGAME":
			this.isGameStop = false;this.MenuOn = false;
		break;
		case "SET_STAGE":
			this.StageInfomation = {name:this.Map.Name,stage:this.Map.Stage};
		break;
		case "CHANGE_MAP":
			this.Map.LoadStage(value.name,value.stage);
			this.player.setPosition(value.x,value.y);// init player
		break;
		case "MAKEOBJECT":
			this.Object.makeObject(value);
		break;
		case "DELETE_MONSTER":
			this.monster.DelMonster(value);
		break;
		case "DIALOG":
			this.ChatBoxs.Event("on",value);
		break;
	};
	
};
PlayGameState.prototype.NotificationCrash = function(direction, value)
{
//	debugSystem.Log("LOG", "before "+this.player.y);
	if(direction){
		this.player.x += value;
		this.player.Invalid();
	}else{
//		if(value != 0)
//			debugSystem.Log("LOG","crash vertical : " + value);
		this.player.y += value;
		this.player.Invalid();
	}
//	debugSystem.Log("LOG", "after"+this.player.y);
};
PlayGameState.prototype.GetPlayerUpCollsionBox = function()
{
	return this.player.UpCollisitionBox;
};
PlayGameState.prototype.GetPlayerDownCollsionBox = function()
{
	return this.player.DownCollisitionBox;
};
PlayGameState.prototype.GetPlayerAttackCollsionBox = function()
{
	return this.player.AttackCollisitionBox;
};

PlayGameState.prototype.mon_NotificationCrash = function(direction, value, Number)
{
	if(direction){
		this.monster.monsterArray[Number].x += value;
		this.monster.monsterArray[Number].Invalid();
	}else{
		this.monster.monsterArray[Number].y += value;
		this.monster.monsterArray[Number].Invalid();
	}
};