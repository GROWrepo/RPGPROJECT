var playGameState;
function PlayGameState(stage)
{
	this.stage = 1;
	
	this.GAME_SPEED = 1.5;
	
	this.background = new PGbackground();
	this.player = new PGPlayer();
	this.Map = new MapTile(this.stage);

	this.interval = 1000;
	this.inputFrameSkipper = new FrameSkipper(this.interval);

	this.isGameStop=false;
	
	this.waitInput= false;
	
	playGameState = this;
	
	this.Map.SetStage(this.stage);
	this.Map.Load();
}

PlayGameState.prototype.Init = function()
{
	soundSystem.PlayBackgroundMusic("sound/ElegantSummer.wav");
};
PlayGameState.prototype.Render = function()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	this.background.Render();
	this.Map.Render();
	this.player.Render();

	//text filed x : 0 ~ 800 / y : 0 ~ 130
	Context.fillStyle = "#ffffff";
	Context.font = '28px Arial';
	Context.textBaseline = "top";

	if(this.isGameStop){
		Context.save();
		Context.fillStyle = "#000000";
		Context.fillRect(350,300,120,30);//rect
		Context.restore();
		Context.fillText("PAUSE",365,300);
	}
};
PlayGameState.prototype.Update = function()
{
	var tic = this.inputFrameSkipper.isWork();
	
	if(!this.isGameStop){
	
		var crashDirection = this.Map.CheckCollision();
		this.player.Update(crashDirection);
		
	}
	
	if(inputSystem.isKeyDown(13))//enter
	{
		debugSystem.Log("LOG","ENTER");
		if(!this.waitInput){
//		soundSystem.PlaySound("sound/game_effect_pause.wav");
			this.isGameStop = !this.isGameStop;
			this.inputFrameSkipper.ReSet();//0
			this.waitInput = true;
		}
	}
	
	if(this.waitInput && tic){
		this.waitInput= false;
	}
	
	
};
PlayGameState.prototype.Notification = function(msg)
{
	/*
	switch(msg)
	{
		case "CHANGE_MAP_A":
			this.background.ChangeBG(0);
		break;
		case "CHANGE_MAP_B":
			this.background.ChangeBG(1);
		break;
		case "CHANGE_MAP_C":
			this.background.ChangeBG(2);
		break;
		case "CHANGE_MAP_D":
			this.background.ChangeBG(3);
		break;
		case "GET_SCORE":
			this.Score+= 50;
		break;
		case "TIME_OVER":
			soundSystem.StopBackgroundMusic();
			soundSystem.PlaySound("sound/game_bgm_lose.ogg");
			ChangeGameState(new TransitionFadeOut(this,new TitleState,1.8));
		break;
		case "CRASH_L_ENEMY":
			this.player.Crash(1);
		break;
		case "CRASH_R_ENEMY":
			this.player.Crash(0);
		break;
		case "CRASH_BIGHOLE":
			this.player.Down();
		break;
		case "GOAL":
			soundSystem.StopBackgroundMusic();
			soundSystem.PlaySound("sound/game_bgm_win.ogg");
			ChangeGameState(new TransitionFadeOut(this,new CreditState,1.6));
		break;
	};
	*/
};
PlayGameState.prototype.NotificationCrash = function(direction, value)
{
//	debugSystem.Log("LOG", "before "+this.player.y);
	if(direction){
		debugSystem.Log("LOG","crash horizonal");
		this.player.x += value;
		this.player.Invalid();
	}else{
		this.player.y += value;
		this.player.Invalid();
	}
//	debugSystem.Log("LOG", "after"+this.player.y);
};
PlayGameState.prototype.GetPlayerCollsionBox = function()
{
	return this.player.collisionBox;
};