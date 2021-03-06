function PGObject(){
	
	this.gate = new Array();
	this.dialog = new Array();
	this.item = new Array();
}
PGObject.prototype.reset = function(){
	this.gate = new Array();
	this.dialog = new Array();
	this.item = new Array();
};
PGObject.prototype.makeObject = function(_obj){
	
	switch(_obj.name){
		case "gate":
			this.gate.push(_obj);
		break;
		case "dialog":
			this.dialog.push(_obj);
		break;
		case "item":
			this.item.push(_obj);
		break;
	};
};
PGObject.prototype.Render = function(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	for(var i = 0; i < this.item.length; i++)
	{
		Context.drawImage(this.item[i].img,
					this.item[i].x,this.item[i].y,
					70,70,
					this.item[i].left,this.item[i].top,
					70,70);	
	}
};
PGObject.prototype.Update = function(){

//	var onEnter = playGameState.Notification("GET_ONENTER");	
//	if(onEnter)
//	{
		var player = playGameState.GetPlayerUpCollsionBox();
		var Type = "no";
		var _Type;
		
		for(var j = 0; j < player.length; j++)
		{
			//console.log(player[j]);
			for(var i = 0; i < this.gate.length; i++)
			{
				var isCrash = ISIntersectRect(player[j],this.gate[i]);
				if(isCrash)// event
				{
					_Type = this.gate[i].type;
					Type = "gate";
				}
			}

			for(var i = 0; i < this.dialog.length; i++)
			{
				if(!this.dialog[i].isOn){
				var isCrash = ISIntersectRect(player[j],this.dialog[i]);
				if(isCrash)// event
				{
					this.dialog[i].isOn = true;
					_Type = this.dialog[i].num;
					Type = "dialog";
				}
				}
			}
			
			var _itemNum = -1;
			for(var i = 0; i < this.item.length; i++)
			{
				var isCrash = ISIntersectRect(player[j],this.item[i]);
				if(inputSystem.isKeyDown(86) && isCrash)// event
				{
					_itemNum = i;
				}
				
			}
			if(_itemNum != -1)
			{
				playGameState.StateLine.PushLine("item get : "+this.item[_itemNum].item);
				Status.inventory.setItem(this.item[_itemNum].type,this.item[_itemNum].item);
				this.item.splice(_itemNum,1);
			}
		}
		if(Type != "no")
		switch(Type){
			case "gate":
				this.getNextMapData(_Type);
			break;
			case "dialog":
				playGameState.Notification("DIALOG",_Type);
			break;
		};
			
//	}
};

PGObject.prototype.getNextMapData = function(_type){
	var x,y;
	var enemy;
	var infomation = playGameState.StageInfomation;
	var isValue = false;
	var _stage;
	
	if(infomation.name == "DarkCave")
	switch(infomation.stage)
	{
		case 0:
			if(_type == 'l');
			else if(_type == 'r')
			{
				_stage = 1;
				playGameState.Menu.map[_stage] = 1;
				x = 0-50;
				y = 720 -256 -7;
			}
			else if(_type == 't');
			else if(_type == 'b');
		break;
		case 1:
			if(_type == 'l')
			{
				_stage = 0;
				x = 1280-256+50;
				y = 720 -256 -7;
			}
			else if(_type == 'r');
			else if(_type == 't');
			else if(_type == 'b')
			{
				_stage = 2;
				playGameState.Menu.map[_stage] = 1;
				x = 40*26;
				y = 0;
			}
		break;
		case 2:
			if(_type == 'l');
			else if(_type == 'r');
			else if(_type == 't');
			else if(_type == 'b');
		break;
	};

	playGameState.Notification("CHANGE_MAP",{name :infomation.name ,stage:_stage, x : x, y : y});//ChangeMap();
};