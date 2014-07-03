function SpriteAnimation( img, width, height, totalFrameCount, fps)
{
	this.x = 0;
	this.y = 0;
	this.img = img;
	
	this.width = width;
	this.height = height;
	
	this.totalFrameCount = totalFrameCount;
	this.currentFrame = 0;
	
	this.animationTimer = new Timer();
	this.fps = fps;
	
	this.backImage = false;
		
	return this;
}
SpriteAnimation.prototype.ChangeImage = function(img, width, height, totalFrameCount, fps, backImage)
{
	this.img = img;
	
	this.width = width;
	this.height = height;
	
	this.totalFrameCount = totalFrameCount;
	this.currentFrame = 0;
	this.fps = fps;
	

	if(backImage)
		this.backImage = true;
	else
		this.backImage = false;
	
};

SpriteAnimation.prototype.ChangeDirection = function(img, width, height, totalFrameCount, fps, backImage)
{
	this.img = img;
	
	this.width = width;
	this.height = height;
	
	this.totalFrameCount = totalFrameCount;
	this.fps = fps;
	

	if(backImage)
		this.backImage = true;
	else
		this.backImage = false;
	
};

SpriteAnimation.prototype.Render = function (context)
{
	var _currentFrame = Math.floor(this.currentFrame);
	
	if(this.backImage){
		_currentFrame = (this.totalFrameCount - 1) - _currentFrame;
//		debugSystem.Log("LOG",_currentFrame);
	}
	context.drawImage(this.img,
		this.width * _currentFrame, 0,
		this.width, this.height,
		this.x, this.y,
		this.width, this.height);
};

SpriteAnimation.prototype.Update = function ()
{
	var isLotate = false;
	
	if(this.animationTimer.nowFrame > 1000/this.fps)
	{	
		this.currentFrame++;
		if(this.currentFrame >= this.totalFrameCount){
			this.currentFrame = 0;
			isLotate = true;
		}
			
		this.animationTimer.Reset();
	}
	
	return isLotate;
};
SpriteAnimation.prototype.Translate = function (x, y)
{
	this.x += x;
	this.y += y;
};

SpriteAnimation.prototype.SetPosition = function (x, y)
{
	this.x = x;
	this.y = y;
};
SpriteAnimation.prototype.UpdateFPS = function (value)
{
	var _fps  = this.fps * value;
	
	if(this.animationTimer.nowFrame > 1000/_fps)
	{
		this.currentFrame++;
		if(this.currentFrame >= this.totalFrameCount){
			this.currentFrame = 0;
		}
			
		this.animationTimer.Reset();
	}
	
};
SpriteAnimation.prototype.SetFPS = function (fps)
{
	this.fps = fps;
};