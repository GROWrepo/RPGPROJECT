var titlestate;
function TitleState()
{
	titlestate = this;
	
	this.imgBackground = resourcePreLoader.GetImage("img/title_bg.png");
	this.title;
	this.type = 0;
	
	gfwSocket.On("control_in_game",function(msg)
	{
		switch(msg.key)
		{
			case "up": //38
			inputSystem.setKeyDown(38,msg.value);
			break;
			case "down": //40
			inputSystem.setKeyDown(40,msg.value);
			break;		
			case "menu"://13
			inputSystem.setKeyDown(13,msg.value);
			break;
		};
	});
}

TitleState.prototype.Init = function()
{
	soundSystem.PlayBackgroundMusic("sound/bgm_title.mp3");
};
TitleState.prototype.Render = function()
{
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	Context.drawImage(this.imgBackground,0,0);
	
	DrawBorder(Context,"goldenrod",4,850,400,300,200);
	Context.save();
	Context.globalAlpha = 0.8;
	var grd = Context.createLinearGradient(850,100,850,600);
	grd.addColorStop(0,"white");
	grd.addColorStop(1,"darkblue");
	Context.fillStyle = grd;
	Context.fillRect(855,405,290,190);
	Context.restore();
	
	var y;
	if(this.type == 0)
		y = 410;
	else if(this.type == 1)
		y = 470;
	else if(this.type == 2)
		y = 535;
		
	Context.save();
	Context.globalAlpha = 0.4;
	Context.fillStyle = "mediumblue";
	Context.fillRect(860,y,280,60);
	DrawBorder(Context,"white",2,860,y,280,60);
	Context.restore();
	
	Context.fillStyle = "#ffffff"; // white
	Context.font = '35px Arial';
	Context.textBaseline = "top";
	Context.fillText("새로하기",900,420);
	Context.fillText("이어하기",900,482);
	Context.fillText("끝내기",900,545);
};
TitleState.prototype.Update = function()
{	
	if(inputSystem.checkKeyDown(38))//up
		{
			this.type--;
			if(this.type < 0)
				this.type = 0;soundSystem.PlaySound("sound/menu.select.wav");
		}
		else if(inputSystem.checkKeyDown(40))//down
		{
			this.type++;
			if(this.type > 2)
				this.type = 2;soundSystem.PlaySound("sound/menu.select.wav");
		}
		else if(inputSystem.checkKeyDown(13))//enter
		{
			if(this.type == 0)//new
			{
				var vs = new PrologState();
				ChangeGameState(new TransitionFadeOut (this, new TransitionFadeIn(vs,vs,5.0) ,5.0));
				soundSystem.StopBackgroundMusic();
			}
			else if(this.type == 1)//continue
			{
				Item = new PGItem();
				Status = new PGStatus(1, 100);
				time = new Timer();
				
				gfwSocket.Emit("load",true);
				gfwSocket.On("_load",function (data)
				{
					var arr = data.split("@");
					
					Status.GetStatus(arr[0]);
					time.SetTime(arr[1]);
					
					if(arr[2] == "village")
					{
						ChangeGameState(new TransitionFadeOut (titlestate, new VilliageState() ,5.0));
					}
					else
					{
						ChangeGameState(new TransitionFadeOut (titlestate, new PlayGameState(arr[2],parseInt(arr[3]),parseInt(arr[4]),parseInt(arr[5]),arr[6]) ,6.0));
					}
				});
				
				soundSystem.StopBackgroundMusic();
			}
			else if(this.type == 2)//exit
			{
				ChangeGameState(new LoginState());
			}

		}
};