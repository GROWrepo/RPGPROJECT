function MapTile(stage){
	
	this.T1 = new GraphicObject(resourcePreLoader.GetImage("img/1.png"));
	this.T2 = new GraphicObject(resourcePreLoader.GetImage("img/2.png"));
	this.T3 = new GraphicObject(resourcePreLoader.GetImage("img/3.png"));
	
	this.NofTiles = 0;
	
	this.Nofw = 1280 / 40;
	this.Nofh = 720 / 40;
	this.w = 40;
	this.h = 40;
	
	this.Stage1_1 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,2,3,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]; // 40 x 40
	
	this.nStage = new Array();
	this.nStageLength = this.Nofw * this.Nofh;
	
	this.MapObject = new Array();
}

MapTile.prototype.SetStage = function (stage){
	switch(stage){
		case 1:
		this.nStage = this.Stage1_1;
		break;
		case 2:
		this.nStage = this.Stage1_2;
		break;
		case 3:
		this.nStage = this.Stage1_3;
		break;
	};
};

MapTile.prototype.Load = function()
{
	var x = 0;
	var y = 0;
	
	for(var i = 0; i < this.nStageLength; i++){
		switch(this.nStage[i]){
			case 0:
				this.MapObject[i] = null;
			break;
			case 1:
//				debugSystem.Log("LOG", x +" " + y);
				this.MapObject[i] = new GraphicObject(resourcePreLoader.GetImage("img/1.png"));
				this.MapObject[i].SetPosition(x,y);
			break;
			case 2:
//				debugSystem.Log("LOG", x +" " + y);
				this.MapObject[i] = new GraphicObject(resourcePreLoader.GetImage("img/2.png"));
				this.MapObject[i].SetPosition(x,y);
			break;
			case 3:
//				debugSystem.Log("LOG", x +" " + y);
				this.MapObject[i] = new GraphicObject(resourcePreLoader.GetImage("img/3.png"));
				this.MapObject[i].SetPosition(x,y);
			break;
		};
			
		if((i + 1) % this.Nofw == 0){
			x = 0;
			y += this.h;
		}
		else
			x += this.w;
	}
	
};

MapTile.prototype.Render = function(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	for(var i = 0; i < this.nStageLength; i++)
	if(this.MapObject[i] != null)
		this.MapObject[i].Render(Context);
};

MapTile.prototype.CheckCollision = function(){
	
	var crashDirection
		={left : false, top : false, right : false, bottom : false};
		
	for(var i = 0; i < this.MapObject.length ; i ++){

	if(this.MapObject[i] != null){
		var obj = this.MapObject[i];
		var player = playGameState.GetPlayerBodyCollsionBox();
		var player2 = playGameState.GetPlayerLegCollsionBox();
		
		var collisionBox
			={left :obj.x ,top:obj.y ,right:obj.x + this.w ,bottom:obj.y + this.h };
			
		var collisionRect = IntersectRect(player,collisionBox);
		if(collisionRect != null){
			
			var nInterW = collisionRect.right - collisionRect.left;
			var nInterH = collisionRect.bottom - collisionRect.top;
			
			if(nInterW > nInterH){
				//top crash
				if(collisionRect.top == player.top){
					playGameState.NotificationCrash(false,nInterH);
//					player.y -= nInterH;
					crashDirection.top = true;
				}
				//bottom crash
				else if(collisionRect.bottom == player.bottom && player2 == null){
					playGameState.NotificationCrash(false,-nInterH);
//					player.y += nInterH;
					crashDirection.bottom = true;
				}		
			}
			else{
				//left crash
				if(collisionRect.left == player.left){
					playGameState.NotificationCrash(true,nInterW);
//					player.x -= nInterW;
					crashDirection.left = true;
				}
				//right crash
				else if(collisionRect.right == player.right){
					playGameState.NotificationCrash(true,-nInterW);
//					player.x += nInterW;
					crashDirection.right = true;
				}
				
			}
			
		}
		if(player2 != null){
		var collisionRect = IntersectRect(player2,collisionBox);
		if(collisionRect != null){
			var nInterW = collisionRect.right - collisionRect.left;
			var nInterH = collisionRect.bottom - collisionRect.top;
			
			if(nInterW > nInterH){
				
				//bottom crash
				if(collisionRect.bottom == player2.bottom){
					playGameState.NotificationCrash(false,-nInterH);
//					player.y += nInterH;
					crashDirection.bottom = true;
				}		
			}
		}
		}
//		if(i == 544)
//			debugSystem.Log("LOG", player.bottom + " " + collisionBox.top + " " + nInterH);
/*
		if(IsCollisionRect(player.left,player.right,player.top,player.bottom, collisionBox.left,collisionBox.right,collisionBox.top,collisionBox.bottom)){//l r t b
//			debugSystem.Log("LOG", "crash");	

			if(collisionBox.left < player.right && player.right < collisionBox.right 
				&& player.left < collisionBox.left)//crash right
				debugSystem.Log("LOG",i);//crashDirection.right = true;
			if(collisionBox.left < player.left && player.left < collisionBox.right
				&& collisionBox.right < player.right)//crash left
				crashDirection.left = true;
			if(collisionBox.bottom > player.top && player.top > collisionBox.top
				&& player.bottom > collisionBox.bottom)//crash top
				crashDirection.top = true;
			if(collisionBox.bottom > player.bottom && player.bottom > collisionBox.top
				&& collisionBox.top > player.top)//crash bottom
				crashDirection.bottom = true;
		}
		*/
	}
	}
	// 0 = not crash
	return crashDirection;
};