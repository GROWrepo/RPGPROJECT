function PGObject(){
	
	this.gate = new Array();
	this.dialog = new Array();
	
}
PGObject.prototype.reset = function(){
	this.gate = new Array();
	this.dialog = new Array();
};
PGObject.prototype.makeObject = function(_obj){
	
	switch(_obj.name){
		case "gate":
			this.gate.push(_obj);
		break;
		case "dialog":
			this.dialog.push(_obj);
		break;
	};
};
PGObject.prototype.Render = function(){

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
	var stage = playGameState.Notification("GET_STAGE");
	var isValue = false;
	
	switch(stage)
	{
		case 1:
			if(_type == 'l');
			else if(_type == 'r')
			{
				stage = 2;
				x = 0-50;
				y = 720 -256 -7;
				isValue = true;
			}
			else if(_type == 't');
			else if(_type == 'b');
		break;
		case 2:
			if(_type == 'l')
			{
				stage = 1;
				x = 1280-256+50;
				y = 720 -256 -7;
				isValue = true;
			}
			else if(_type == 'r');
			else if(_type == 't');
			else if(_type == 'b')
			{
				stage = 3;
				x = 40*26;
				y = 0;
				isValue = true;
			}
		break;
		case 3:
			if(_type == 'l');
			else if(_type == 'r');
			else if(_type == 't');
			else if(_type == 'b');
		break;
	};
	
	if(isValue)
		playGameState.Notification("CHANGE_MAP",{stage : stage, x : x, y : y});//ChangeMap();
};