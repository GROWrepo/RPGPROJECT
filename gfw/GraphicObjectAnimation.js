function GraphicObjectAnimation(name, type, totalFrameCount, fps)
{
	this.x = 0;
	this.y = 0;
	this.img;
	this.name=name;
	this.type = type;
	this.forward = true;
	
	this.totalFrameCount = totalFrameCount;
	this.currentFrame = 0;
	
	this.animationTimer = new Timer();
	this.fps = fps;

	
	this.Init();
	return this;
}
GraphicObjectAnimation.prototype.Init = function(){
	//aki 00 000
	
	this.img = null;
	this.img = new Array();
	
	var str = this.name;
	switch(this.type){
		case 0 : // stand
			str += "00";
			for (var i = 0; i< this.totalFrameCount ; i++){
				if(i<10)
					this.img.push(resourcePreLoader.GetImage("img/"+str+"00"+i+".png"));
				else if(i<100)
					this.img.push(resourcePreLoader.GetImage("img/"+str+"0"+i+".png"));
			}
		break;
		case 1: // walk
			str += "26";
			for (var i = 0; i< this.totalFrameCount ; i++){
				if((i+1)<10)
					this.img.push(resourcePreLoader.GetImage("img/"+str+"00"+(i+1)+".png"));
				else if((i+1)<100)
					this.img.push(resourcePreLoader.GetImage("img/"+str+"0"+(i+1)+".png"));
			}
		break;
		case 2: // dash
			str += "13";
			for (var i = 0; i< this.totalFrameCount ; i++){
				if(i<10)
					this.img.push(resourcePreLoader.GetImage("img/"+str+"00"+i+".png"));
				else if(i<100)
					this.img.push(resourcePreLoader.GetImage("img/"+str+"0"+i+".png"));
			}
		break;
		case 3: // jump
			str += "17";
			for (var i = 0; i< this.totalFrameCount ; i++){
				if(i<10)
					this.img.push(resourcePreLoader.GetImage("img/"+str+"00"+i+".png"));
				else if(i<100)
					this.img.push(resourcePreLoader.GetImage("img/"+str+"0"+i+".png"));
			}
		break;
		case 4: // Movingjump
			str += "15";
			for (var i = 0; i< this.totalFrameCount ; i++){
				if(i<10)
					this.img.push(resourcePreLoader.GetImage("img/"+str+"00"+i+".png"));
				else if(i<100)
					this.img.push(resourcePreLoader.GetImage("img/"+str+"0"+i+".png"));
			}
		break;
		case 5: // Attack
			str += "01";
			for (var i = 0; i< this.totalFrameCount ; i++){
				if(i<10)
					this.img.push(resourcePreLoader.GetImage("img/"+str+"00"+i+".png"));
				else if(i<100)
					this.img.push(resourcePreLoader.GetImage("img/"+str+"0"+i+".png"));
			}
		break;
	};
};
GraphicObjectAnimation.prototype.ChangeFrame = function(){
	if(this.type == 3)//j
		this.currentFrame = ((this.totalFrameCount - 8) - this.currentFrame);
	else if(this.type == 4)// mj
		this.currentFrame = ((this.totalFrameCount - 4) - this.currentFrame);
};
GraphicObjectAnimation.prototype.ChangeImage = function( type, totalFrameCount, fps)
{	
	this.type = type;
	this.totalFrameCount = totalFrameCount;
	this.currentFrame = 0;
	this.fps = fps;
	
	this.Init();
};
GraphicObjectAnimation.prototype.ChangeForward = function(forward)
{
	this.currentFrame = 0;//init
	
	if(forward == 1)
		this.forward = true;
	else
		this.forward = false;
};
GraphicObjectAnimation.prototype.Render = function (context)
{
	if(this.forward)
	{
		context.drawImage(this.img[this.currentFrame],this.x,this.y);
	}
	else
	{
		context.save();
		context.translate(256+this.x*2, 0);//img size 256
		context.scale(-1, 1);
		context.drawImage(this.img[this.currentFrame],this.x,this.y);
		context.restore();
	}
};

GraphicObjectAnimation.prototype.Update = function ()
{
	var info = {isLotate : false, current : null};
	
	if(this.animationTimer.nowFrame > 1000/this.fps)
	{	
		this.currentFrame++;
		if(this.currentFrame >= this.totalFrameCount){
			this.currentFrame = 0;
			info.isLotate = true;
		}
		this.animationTimer.Reset();
		
		info.current = this.currentFrame;
		
		return info;
	}
	return null;
};
GraphicObjectAnimation.prototype.Translate = function (x, y)
{
	this.x += x;
	this.y += y;
};

GraphicObjectAnimation.prototype.SetPosition = function (x, y)
{
	this.x = x;
	this.y = y;
};