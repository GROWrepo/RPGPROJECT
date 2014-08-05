function MapTile(){
	
	this.T1 = new GraphicObject(resourcePreLoader.GetImage("img/1.png"));
	this.T2 = new GraphicObject(resourcePreLoader.GetImage("img/2.png"));
	this.T3 = new GraphicObject(resourcePreLoader.GetImage("img/3.png"));
	this.T6 = new GraphicObject(resourcePreLoader.GetImage("img/6.png"));
	
	this.NofTiles = 0;
	
	this.Nofw = 1280 / 40;
	this.Nofh = 720 / 40;
	this.w = 40;
	this.h = 40;
	
	this.Name;
	this.Stage;
	this.nStageLength = this.Nofw * this.Nofh;
	
	this.MapData = new Array();
	this.MapObject = new Array();
	
	this.SetStage();
}
MapTile.prototype.SetStage = function (){	
	//init value
	var _mapdata = new Array();
	var _monster = new Array();
	var _mapscreen;
	
	//Cave
	_mapdata.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,8,1,0,0,0,0,0,1000,0,0,0,0,0,0,0,0,0,0,0,1001,0,0,0,0,0,0,0,0,0,0,0,0,8,1,0,0,0,0,0,1000,0,0,0,0,0,0,0,0,0,0,0,1001,0,0,0,0,0,0,0,0,0,0,0,0,8,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,]); // 40 x 40
	_mapdata.push([6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,7,0,0,0,0,0,0,0,0,0,6,6,6,0,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,0,6,7,0,0,0,0,0,0,6,6,0,0,0,0,0,0,0,0,6,6,6,6,6,6,6,6,0,0,0,0,0,0,6,7,0,0,0,0,6,6,6,6,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,0,0,0,0,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,6,10,10,10,6]);
	_mapdata.push([1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,9,9,9,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,1,1,1,1,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,7,0,0,0,0,0,1,1,0,0,1,1,1,1,0,0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,1,7,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
	
	_monster.push([new monster("sk",400,720-256-14),new monster("test",900,720-256-14)]);
	_monster.push(null);
	_monster.push(null);
	
	_mapscreen = [1,0,-1,-1,-1,-1,-1,0];
	var Data = {Name:"DarkCave", Bg:"cave_bg", Mapdata:_mapdata, Mapscreen:_mapscreen, Monster:_monster};
	this.MapData.push(Data);
	//////
};
MapTile.prototype.LoadStage = function (name,stage){
	this.Name = name;
	this.Stage = stage;
	
	for(var i = 0 ; i < this.MapData.length; i++)
		if(this.MapData[i].Name == name)
		{
			playGameState.Object.reset();
			playGameState.Menu.Getmap(this.MapData[i].Mapscreen);
			playGameState.monster.GetMonster(this.MapData[i].Monster[stage]);
			playGameState.background.ChangeBG(this.MapData[i].Bg);
			this.Load(this.MapData[i].Mapdata[stage]);
			playGameState.Notification("SET_STAGE");
		}
};

MapTile.prototype.Load = function(nStage)
{
	var x = 0;
	var y = 0;
	
	this.MapObject = new Array(); 
	for(var i = 0; i < this.nStageLength; i++){
		switch(nStage[i]){
			case 0:
				this.MapObject[i] = null;
			break;
			case 1:
				this.MapObject[i] = {img : null, collisionBox : null};
				this.MapObject[i].img = new GraphicObject(resourcePreLoader.GetImage("img/1.png"));
				this.MapObject[i].img.SetPosition(x,y);
				this.MapObject[i].collisionBox = {left : x ,top: y ,right: x + this.w ,bottom: y + this.h }; 
			break;
			case 2:
				this.MapObject[i] = {img : null, collisionBox : null};
				this.MapObject[i].img = new GraphicObject(resourcePreLoader.GetImage("img/2.png"));
				this.MapObject[i].img.SetPosition(x,y);
				this.MapObject[i].collisionBox = {left : x ,top: y ,right: x + this.w ,bottom: y + this.h };
			break;
			case 3:
				this.MapObject[i] = {img : null, collisionBox : null};
				this.MapObject[i].img = new GraphicObject(resourcePreLoader.GetImage("img/3.png"));
				this.MapObject[i].img.SetPosition(x,y);
				this.MapObject[i].collisionBox = {left : x ,top: y ,right: x + this.w ,bottom: y + this.h };
			break;
			case 6:
				this.MapObject[i] = {img : null, collisionBox : null};
				this.MapObject[i].img = new GraphicObject(resourcePreLoader.GetImage("img/6.png"));
				this.MapObject[i].img.SetPosition(x,y);
				this.MapObject[i].collisionBox = {left : x ,top: y ,right: x + this.w ,bottom: y + this.h };
			break;
			case 7:
				playGameState.Notification("MAKEOBJECT",{name:"gate",type : "l",left : x ,top: y ,right: x + this.w ,bottom: y + this.h});
			break;
			case 8:
				playGameState.Notification("MAKEOBJECT",{name:"gate",type : "r",left : x ,top: y ,right: x + this.w ,bottom: y + this.h});
			break;
			case 9:
				playGameState.Notification("MAKEOBJECT",{name:"gate",type : "t",left : x ,top: y ,right: x + this.w ,bottom: y + this.h});
			break;
			case 10:
				playGameState.Notification("MAKEOBJECT",{name:"gate",type : "b",left : x ,top: y ,right: x + this.w ,bottom: y + this.h});
			break;			
		};
		if(nStage[i] >= 1000)//dialog
			playGameState.Notification("MAKEOBJECT",{name:"dialog",num : nStage[i] % 100 ,isOn:false,left : x ,top: y ,right: x + this.w ,bottom: y + this.h});
				
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
		this.MapObject[i].img.Render(Context);
};

MapTile.prototype.CheckCollision = function(){
	
	var crashDirection
		={left : false, top : false, right : false, bottom : false};
		
	for(var i = 0; i < this.MapObject.length ; i ++){

	if(this.MapObject[i] != null){
		var obj = this.MapObject[i];

		var collisionBox = this.MapObject[i].collisionBox;
		
		var player_up = playGameState.GetPlayerUpCollsionBox();
		for(var j = 0; j < player_up.length; j++){
			var collisionRect = IntersectRect(player_up[j],collisionBox);
			if(collisionRect != null){
			var nInterW = collisionRect.right - collisionRect.left;
			var nInterH = collisionRect.bottom - collisionRect.top;
			if(nInterW > nInterH){
				//top crash
				if(collisionRect.top == player_up[j].top){
					playGameState.NotificationCrash(false,nInterH);
					crashDirection.top = true;
				}	
			}
			else{
				//left crash
				if(collisionRect.left == player_up[j].left){
					playGameState.NotificationCrash(true,nInterW);	//	debugSystem.Log("LOG","crash horizonal Up");
					crashDirection.left = true;
				}
				//right crash
				else if(collisionRect.right == player_up[j].right){
					playGameState.NotificationCrash(true,-nInterW);	//	debugSystem.Log("LOG","crash horizonal Up");
					crashDirection.right = true;
				}			
				}
			}
		}
		
		var player_down = playGameState.GetPlayerDownCollsionBox();
		for(var j = 0; j < player_down.length; j++){
			var collisionRect = IntersectRect(player_down[j],collisionBox);
			if(collisionRect != null){
			var nInterW = collisionRect.right - collisionRect.left;
			var nInterH = collisionRect.bottom - collisionRect.top;
			if(nInterW > nInterH){
				//bottom crash
//				console.log(player_down[j].bottom);
				if(collisionRect.bottom == player_down[j].bottom){
					playGameState.NotificationCrash(false,-nInterH);
					crashDirection.bottom = true;
				}		
			}
			else{
				//left crash
				if(collisionRect.left == player_down[j].left){
					playGameState.NotificationCrash(true,nInterW);	//	debugSystem.Log("LOG","crash horizonal");
					crashDirection.left = true;
				}
				//right crash
				else if(collisionRect.right == player_down[j].right){
					playGameState.NotificationCrash(true,-nInterW);	//	debugSystem.Log("LOG","crash horizonal");
					crashDirection.right = true;
				}
				}
			}
		}
		}
	}
	// 0 = not crash
	return crashDirection;
};
MapTile.prototype.Mon_CheckCollision = function(Monster){
	
	var crashDirection
		={left : false, top : false, right : false, bottom : false};
		
	for(var i = 0; i < this.MapObject.length ; i ++){

	if(this.MapObject[i] != null){
		var obj = this.MapObject[i];
		var collisionBox = this.MapObject[i].collisionBox;
		
		for(var k = 0 ; k < Monster.length; k++)
		{
		var monster = Monster[k].UpCollisitionBox;
		for(var j = 0; j < monster.length; j++){
			var collisionRect = IntersectRect(monster[j],collisionBox);
			if(collisionRect != null){
			var nInterW = collisionRect.right - collisionRect.left;
			var nInterH = collisionRect.bottom - collisionRect.top;
			if(nInterW > nInterH){
				//top crash
				if(collisionRect.top == monster[j].top){
					playGameState.mon_NotificationCrash(false,nInterH,k);
					crashDirection.top = true;
				}	
			}
			else{
				//left crash
				if(collisionRect.left == monster[j].left){
					playGameState.mon_NotificationCrash(true,nInterW,k);		debugSystem.Log("LOG","crash horizonal");
					crashDirection.left = true;
				}
				//right crash
				else if(collisionRect.right == monster[j].right){
					playGameState.mon_NotificationCrash(true,-nInterW,k);		debugSystem.Log("LOG","crash horizonal");
					crashDirection.right = true;
				}			
			}
			}
		}
		}
	}
	}
	
	
	// 0 = not crash
	return crashDirection;
};