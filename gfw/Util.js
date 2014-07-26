function RandomNextInt(min, max){
	return min + 1 + Math.floor( Math.random() * max);
}

function IsCollisionRect(Pl, Pr, Pt, Pb, El, Er, Et, Eb){
	
	if(El < Pr && Eb > Pt
		&& Er > Pl && Et < Pb)
			return true;//crash
	else
		return false;//not
}

function IntersectRect(pRect1, pRect2){
	var bVertical = false;
	var bHorizontal = false;
	
	var collisionRect
		= {left:0,right:0,top:0,bottom:0};
	
	//Horizontal crash
	if(pRect1.left < pRect2.right && pRect1.right > pRect2.left){
		bHorizontal = true;
		collisionRect.left = (pRect1.left > pRect2.left) ? pRect1.left : pRect2.left;
		collisionRect.right = (pRect1.right < pRect2.right) ? pRect1.right : pRect2.right;	
	}
	
	if(pRect1.top < pRect2.bottom && pRect1.bottom >= pRect2.top){
		bVertical = true;
		collisionRect.top = (pRect1.top > pRect2.top) ? pRect1.top : pRect2.top;
		collisionRect.bottom = (pRect1.bottom < pRect2.bottom) ? pRect1.bottom : pRect2.bottom;	
	}
	
	if(bVertical && bHorizontal)
		return collisionRect;
		
	return null;
}

function ISIntersectRect(pRect1, pRect2){
	var bVertical = false;
	var bHorizontal = false;
	if(pRect1.left < pRect2.right && pRect1.right > pRect2.left)
		bHorizontal = true;
	if(pRect1.top < pRect2.bottom && pRect1.bottom >= pRect2.top)
		bVertical = true;
		
	if(bVertical && bHorizontal)
		return true;
		
	return false;	
}
function DrawBorder(Context,color,size,x,y,width,height)
{
//	Context.save();
	Context.strokeStyle = color;
	Context.lineWidth = size;
	Context.strokeRect(x+size,y+size,width-size*2,height-size*2);
//	Context.restore();
}

function makeBox(data){
	
	var UpRect = new Array();
	var DownRect = new Array();
	var AttackRect = new Array();
	
	var strArray = data.split("/");
		
	var preStr = strArray[0].split(",");
	for(var i = 0 ; i < preStr.length-1; i++)
			if(i%4 == 0){
				UpRect.push({left:0,top:0,right:0,bottom:0,x : parseInt(preStr[i+0]) , y : parseInt(preStr[i+1]) , w : parseInt(preStr[i+2]) , h : parseInt(preStr[i+3]) });
			}
			
		preStr = strArray[1].split(",");
		for(var i = 0 ; i < preStr.length-1; i++)
			if(i%4 == 0){
				DownRect.push({left:0,top:0,right:0,bottom:0,x : parseInt(preStr[i+0]) , y : parseInt(preStr[i+1]) , w : parseInt(preStr[i+2]) , h : parseInt(preStr[i+3]) });
			}
			
		preStr = strArray[2].split(",");
		for(var i = 0 ; i < preStr.length-1; i++)
			if(i%4 == 0){
				AttackRect.push({left:0,top:0,right:0,bottom:0,x : parseInt(preStr[i+0]) , y : parseInt(preStr[i+1]) , w : parseInt(preStr[i+2]) , h : parseInt(preStr[i+3]) });
			}		
				
	return {up : UpRect , down : DownRect , attack : AttackRect}; 
}
/*
function Display(img,x,y,interval){
	this.img = img;
	this.x = x;
	this.y = y;
	this.setting_x = x;
	this.setting_y = y;
	this.fs = new FrameSkipper(interval);
	this.flag = false;;
}
Display.prototype.Render = function(Context){
	
	if(this.flag)
	{
		if(this.img != null)
			Context.drawImage(this.img,x,y);
		
		Context.save();
		var y = this.UpCollisitionBox[0].top;
		var x = this.UpCollisitionBox[0].left;
	
		var length = 80*(this.life/this.totallife);
		Context.fillStyle = "red";
		Context.fillRect(x,y-10,length,10);
			
		Context.font = '20px Arial';
		Context.fillText(this.prograssbarOn,x+90,y-10);
		Context.restore();
	}
	if(fs.isWork())
	{
		this.flag = false;
	}
};
Display.prototype.flagOn = function(){
	this.flag = true;
};
*/