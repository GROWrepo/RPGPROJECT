function Timer()
{
	this.nowFrame = 0;
	timerSystem.timers.push(this);
	
	this.isUpdate = true;
	
	return this;
}
Timer.prototype.Reset = function()
{
	this.nowFrame = 0;
};

Timer.prototype.Set = function()//on off
{
	this.isUpdate = !this.isUpdate;
};
Timer.prototype.SetTime = function(time)//Time
{
	var Frame = 0;
	var _time = time.split(":");
	if(_time[0] == "00")
		;
	else
	{
		Frame+=parseInt(_time[0])*3600;	
	}
	if(_time[1] == "00")
		;
	else
	{
		Frame+=parseInt(_time[1])*60;	
	}
	if(_time[2] == "00")
		;
	else
	{
		Frame+=parseInt(_time[1]);	
	}
	
	this.nowFrame = Frame;
};
Timer.prototype.GetTime = function()//Time
{

	var second = parseInt(this.nowFrame/1000);
	var minute = second/60;
	if(minute > 1)
	{
		minute = parseInt(minute);
		second -= minute * 60;
		var hour = minute/60;
		if(hour > 1)
		{
			hour = parseInt(hour);
			minute -= hour*60;
			return hour+":"+minute+":"+second;
		}
		else
			return "00:"+minute+":"+second;
	}
	else
		return "00:00:"+second;
};
function TimerSystem()
{
	this.timers = new Array();
	return this;
}
TimerSystem.prototype.Update = function ()
{
	for(var i = 0; i< this.timers.length; i++)
	{
		if(this.timers[i].isUpdate)
			this.timers[i].nowFrame += 1000 / GAME_FPS;
		
	}
};

var timerSystem = new TimerSystem();
