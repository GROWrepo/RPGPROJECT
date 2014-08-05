function TitleState()
{
	this.imgBackground = resourcePreLoader.GetImage("img/title_bg.png");
	
	this.type = 0;
	return this;
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
				var vs = new VilliageState();
				ChangeGameState(new TransitionFadeOut (this, new TransitionFadeIn(vs,vs,5.0) ,5.0));
				soundSystem.StopBackgroundMusic();
			}
			else if(this.type == 1)//continue
			{
				var vs = new VilliageState();
				ChangeGameState(new TransitionFadeOut (this, new TransitionFadeIn(vs,vs,5.0) ,5.0));
				soundSystem.StopBackgroundMusic();
			}
			else if(this.type == 2)//exit
			{
				
			}

		}
};