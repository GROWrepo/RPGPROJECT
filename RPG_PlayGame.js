var playGameState;
var Status;
var Item;
function PlayGameState(stage)
{
	this.stage = 1;
	
	this.GAME_SPEED = 1.5;
	
	this.background = new PGbackground();
	this.player = new PGPlayer();
	this.monster = new PGMonster();
	this.Map = new MapTile(this.stage);
	this.Object = new PGObject();
	this.Menu = new PGMenu();
	Item = new PGItem();
	Status = new PGStatus(1, 100);
	
	this.isGameStop = false;
	this.InMenuState = false;
	this.time = new Timer();
	
	playGameState = this;
	
	this.Map.SetStage(this.stage);

/*	
	gfwSocket.On("control_in_game",function(msg)
	{
		switch(msg.key)
		{
			case "up": //38
			inputSystem.setKeyDown(0,msg.value);
			break;
			case "left": //37
			inputSystem.setKeyDown(37,msg.value);
			break;
			case "down":
			inputSystem.setKeyDown(0,msg.value);
			break;
			case "right": //39
			inputSystem.setKeyDown(39,msg.value);
			break;
			case "A": //88
			inputSystem.setKeyDown(88,msg.value);
			break;
			case "B":
			inputSystem.setKeyDown(0,msg.value);
			break;
			case "C":
			inputSystem.setKeyDown(38,msg.value);
			break;
			case "D":
			inputSystem.setKeyDown(0,msg.value);
			break;
			case "menu"://13
			inputSystem.setKeyDown(13,msg.value);
			break;
			case "enter":
			inputSystem.setKeyDown(0,msg.value);
			break;
		};
	});
*/	
	
}

PlayGameState.prototype.Init = function()
{
	soundSystem.PlayBackgroundMusic("sound/ElegantSummer.wav");
};
PlayGameState.prototype.Render = function()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	if(!this.InMenuState)
	{
		this.background.Render();
		this.Map.Render();
		this.player.Render();
		this.monster.Render();
	}
	Status.Render();
	
	//text filed x : 0 ~ 800 / y : 0 ~ 130
	Context.fillStyle = "#ffffff";
	Context.font = '28px Arial';
	Context.textBaseline = "top";

	if(this.isGameStop){
		this.Menu.Render(Context);
	}
};
PlayGameState.prototype.Update = function()
{
	if(!this.isGameStop)
	{
		var crashDirection = this.Map.CheckCollision();
		var mon_crashDirection = this.Map.Mon_CheckCollision();
		this.player.Update(crashDirection);
		this.monster.Update(mon_crashDirection);
		this.Object.Update();
	}
	else // menu
	{
		this.Menu.Update();
	}
	
	if(inputSystem.checkKeyDown(13))//enter
	{
		debugSystem.Log("LOG","ENTER");
		this.isGameStop =true;
	}	
	
};
PlayGameState.prototype.Notification = function(msg,value)
{
	
	switch(msg)
	{
//		case "GET_ONENTER":
//			return this.player.onEnter;
//		break;
		case "GOGAME":
			this.isGameStop = false;
		break;
		case "GET_STAGE":
			return this.stage;
		case "CHANGE_MAP":
			this.stage = value.stage;
			this.Object.reset();
			var backgroundImg = this.Map.SetStage(this.stage);
			this.background.ChangeBG(backgroundImg);
			this.player.setPosition(value.x,value.y);// init player
		break;
		case "MAKEGATE":
			this.Object.makeObject("gate",value);
		break;
		case "TIME_OVER":
			soundSystem.StopBackgroundMusic();
			soundSystem.PlaySound("sound/game_bgm_lose.ogg");
			ChangeGameState(new TransitionFadeOut(this,new TitleState,1.8));
		break;
		case "CRASH_L_ENEMY":
			this.player.Crash(1);
		break;
		case "GOAL":
			soundSystem.StopBackgroundMusic();
			soundSystem.PlaySound("sound/game_bgm_win.ogg");
			ChangeGameState(new TransitionFadeOut(this,new CreditState,1.6));
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
		if(value != 0)
			debugSystem.Log("LOG","crash vertical : " + value);
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
PlayGameState.prototype.GetMonsterBox =function()
{
	return this.monster.Box;
};
PlayGameState.prototype.GetMonsterAttackBox =function()
{
	return this.monster.AttackBox;
};
PlayGameState.prototype.mon_NotificationCrash = function(direction, value)
{
	if(direction){
		this.monster.x += value;
		this.monster.Invalid();
	}else{
		this.monster.y += value;
		this.monster.Invalid();
	}
};