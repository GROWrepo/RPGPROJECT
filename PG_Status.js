function PGStatus(level,maxhp){

	this.Name = "Akiha";
	this.Level = level;
	this.MaxHP = maxhp;
	this.HP = this.MaxHP;
	this.dounsion =[1,0,0,0,0,0];
	
	this.Ability = {bonus:10,str:30,dex:30,Attack:30,Defense:10};
	
	this.gold = 0;
	this.Exp = 0;
	this.NextExp = 300;
	
	this.fs = new FrameSkipper(1000);
	this.hit = 0;
	
	this.inventory = new Inventory();
	//equip
	this.equipment = new Array();//w , a, n, r , s
	this.equipment.push("not");
	this.equipment.push("not");
	this.equipment.push("not");
	this.equipment.push("not");
	this.equipment.push("not");
	
	//img
	this.hpImg = resourcePreLoader.GetImage("img/hp.png");
	
	
	this.inventory.setItem(0,"sword");
	this.inventory.setItem(0,"spear");
	this.inventory.setItem(0,"bow");
	
	Status = this;
}
PGStatus.prototype.SetStatus = function(){
	var _dounsion ="";
	for(var i = 0; i < this.dounsion.length;i++)
		_dounsion += this.dounsion[i];
		
	return ""+this.Name+"/"+this.Level+"/"+this.MaxHP+"/"+this.HP+"/"+_dounsion+"/"+this.Ability.bonus+"/"+this.Ability.str+"/"+this.Ability.dex+"/"+this.Ability.Attack+"/"+this.Ability.Defense
	+"/"+this.gold+"/"+this.Exp+"/"+this.NextExp+"/"+this.equipment[0]+"/"+this.equipment[1]+"/"+this.equipment[2]+"/"+this.equipment[3]+"/"+this.equipment[4]+"/"+this.inventory.SetInventory();
};
PGStatus.prototype.GetStatus = function(Data){
	var strArray = Data.split("/");
	this.Name = strArray[0];
	this.Level = parseInt(strArray[1]);
	this.MaxHP = parseInt(strArray[2]);
	this.HP = parseInt(strArray[3]);
	
	var _dounsion = strArray[4];
	for(var i = 0; i < this.dounsion.length;i++)
		this.dounsion[i] = _dounsion[i];
	
	this.Ability.bonus = parseInt(strArray[5]);
	this.Ability.str = parseInt(strArray[6]);
	this.Ability.dex = parseInt(strArray[7]);
	this.Ability.Attack = parseInt(strArray[8]);
	this.Ability.Defense = parseInt(strArray[9]);
	
	this.gold = parseInt(strArray[10]);
	this.Exp = parseInt(strArray[11]);
	this.NextExp = parseInt(strArray[12]);
	this.equipment[0] = strArray[13];
	this.equipment[1] = strArray[14];
	this.equipment[2] = strArray[15];
	this.equipment[3] = strArray[16];
	this.equipment[4] = strArray[17];
	this.inventory.GetInventory(strArray[18]);
};
PGStatus.prototype.SetEquipment = function(inout,type,name){
	if(inout == "in")//in
	{
		if(name == "potion")
		{
			this.inventory.getItem(type,name);
			var _item = Item.SearchItem(type,name);	
			this.Healing(_item.ability);
			playGameState.StateLine.PushLine("Healing : "+_item.ability);
		}
		else
		{
		var item = this.equipment[type];
		
		if(item != "not")
		{			
			this.inventory.setItem(type,item);
			var pre_item = Item.SearchItem(type,item);
			this.Ability.str -= pre_item.str;
			this.Ability.dex -= pre_item.dex;
			this.Ability.Attack -= pre_item.atk;
			this.Ability.Defense -= pre_item.def;		
		}
		
		this.equipment[type] = this.inventory.getItem(type,name);		
		var _item = Item.SearchItem(type,name);
		this.Ability.str = this.Ability.str + _item.str;
		this.Ability.dex = this.Ability.dex + _item.dex;
		this.Ability.Attack = this.Ability.Attack + _item.atk;
		this.Ability.Defense = this.Ability.Defense + _item.def;
		}
	}
	else if(inout == "out")//out
	{
		var item = this.equipment[type];
		if(item != "not")
		{			
			this.inventory.setItem(type,item);
			var pre_item = Item.SearchItem(type,item);
			this.Ability.str -= pre_item.str;
			this.Ability.dex -= pre_item.dex;
			this.Ability.Attack -= pre_item.atk;
			this.Ability.Defense -= pre_item.def;
			this.equipment[type] = "not";
		}
	}
};
PGStatus.prototype.GETStatus = function(){
//	return {level:this.Level,maxhp : this.MaxHP,hp:this.HP,ability:this.Ability,attack:this.Attack,defense:this.Defense,gold:this.gold,exp:this.Exp,nextexp:this.NextExp};
};
PGStatus.prototype.Gold = function(type,value){
	if(type == "push")
	{
		this.gold += value;
		return true;
	}
	else if(type == "pop")
	{
		if(this.gold-value<0)
			return false;
		else
		{
			this.gold -= value;
			return true;
		}
	}
	
};
PGStatus.prototype.GetExp = function(value){
	
	this.Exp += value;
	if(this.Exp > this.NextExp) // levelUp
	{
		this.MaxHP += 100;
		this.HP = this.MaxHP;
		
		this.Level++;
		this.Ability.bonus += 3;
		this.Exp = 0;
		this.NextExp += this.Level*300;
	}
	
	playGameState.StateLine.PushLine("player get Exp : "+value);
};
PGStatus.prototype.Healing = function(value){
	
	this.HP += value;
	if(this.HP > this.MaxHP)
		this.HP = this.MaxHP;
};
PGStatus.prototype.Attacking = function(){
	
	this.fs.ReSet();
	this.hit++;
	var critical = 50*(this.Ability.dex*0.01)/100;
	if( RandomNextInt(0,100) < critical )
		return (this.Ability.Attack + this.Ability.str*0.1)*10+1;
	else
		return (this.Ability.Attack + this.Ability.str*0.1)*10+0;
};
PGStatus.prototype.Attacked = function(value){
	
	var avoid = 50*(this.Ability.dex*0.01)/100;
	
	if( RandomNextInt(0,100) < avoid )//avoid succ
		playGameState.StateLine.PushLine("player avoid");
	else
	{
//		console.log("player is attaked "+(value-this.Ability.Defense));
		if(value - this.Ability.Defense > 0)
		{
			this.HP -= (value - this.Ability.Defense);
			playGameState.StateLine.PushLine("player attacked : "+(value - this.Ability.Defense));
		}
		if(this.HP < 0)//dead
			;	
	}
};
PGStatus.prototype.GrowAbility = function(name){	
	switch(name){
		case "str":
			this.Ability.bonus--;
			this.Ability.str ++;
		break;
		case "dex":
			this.Ability.bonus--;
			this.Ability.dex ++;
		break;
	};
};
PGStatus.prototype.SetAbility = function(data){	
	var name = data.AbilityName;
	
	switch(name){
		case "str":
			this.Ability.f_str += data.value;
		break;
		case "dex":
			this.Ability.f_dex += data.value;
		break;
		case "att":
			this.Ability.f_att += data.value;
		break;
		case "def":
			this.Ability.f_def += data.value;
		break;
	};
};

PGStatus.prototype.Render = function(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	var x = 22;
	var y = 720+4;
	var w = 120;
	var h = 66;
	var length = h*(this.HP/this.MaxHP);
	
	Context.save();	
	var grd = Context.createLinearGradient(0,y,0,y+h );
	grd.addColorStop(0,"white");
	grd.addColorStop(1,"red");

	Context.fillStyle = grd;
	Context.fillRect(x,y+h-length,w,length);
	Context.restore();
	
	Context.drawImage(this.hpImg,0,720);
	
	DrawBorder(Context,"#ffffff",3,0,720,1280,80);
	
	Context.fillStyle = "#ffffff"; // white
	Context.textBaseline = "top";
	Context.font = '20px Arial';
	
	Context.fillText("LEV : " + this.Level, 180 ,720 + 10);
	Context.fillText("HP : " + this.HP+" / "+this.MaxHP, 300 ,720 + 10);
	Context.fillText("EXP : " + this.Exp+" / "+this.NextExp, 500 ,720 + 10);
	
	if(this.fs.isWork())
		this.hit = 0;
	if(this.hit > 0)
	{
		Context.font = '40px Arial';
		Context.fillText("Hit", 800 ,200);
		Context.font = '30px Arial';
		Context.fillText(this.hit +"  COMBO!", 800 ,250);
	}
};

function Inventory(){
	this.i_weaphon = new Array();
	this.i_armer = new Array();
	this.i_neckless = new Array();
	this.i_ring = new Array();
	this.i_shoes = new Array();
	this.i_potion = new Array();
}
Inventory.prototype.SetInventory = function(){
	var str = "";
	
	str += "-";
	for(var i = 0 ; i < this.i_weaphon.length; i++)
		str += this.i_weaphon[i].name+","+this.i_weaphon[i].num+"*";
	str += "-";
	for(var i = 0 ; i < this.i_armer.length; i++)
		str += this.i_armer[i].name+","+this.i_armer[i].num+"*";
	str += "-";
	for(var i = 0 ; i < this.i_neckless.length; i++)
		str += this.i_neckless[i].name+","+this.i_neckless[i].num+"*";
	str += "-";
	for(var i = 0 ; i < this.i_ring.length; i++)
		str += this.i_ring[i].name+","+this.i_ring[i].num+"*";
	str += "-";
	for(var i = 0 ; i < this.i_shoes.length; i++)
		str += this.i_shoes[i].name+","+this.i_shoes[i].num+"*";
	str += "-";
	for(var i = 0 ; i < this.i_potion.length; i++)
		str += this.i_potion[i].name+","+this.i_potion[i].num+"*";
	str += "-";
	
	return str;
};
Inventory.prototype.GetInventory = function(Data){
	
	var kind = Data.split("-");
	
	var _weaphone = kind[0].split("*");
	var _armer= kind[1].split("*");
	var _neckless= kind[2].split("*");
	var _ring= kind[3].split("*");
	var _shoes= kind[4].split("*");
	var _potion= kind[5].split("*");
	
	for(var i = 0 ; i < _weaphone.length; i++)
	{var item = _weaphone[i].split(",");var num = parseInt(item[1]);	
	while(num--)this.setItem(0,item[0]);}
	for(var i = 0 ; i < _armer.length; i++)
	{var item = _armer[i].split(",");var num = parseInt(item[1]);	
	while(num--)this.setItem(1,item[0]);}
	for(var i = 0 ; i < _neckless.length; i++)
	{var item = _neckless[i].split(",");var num = parseInt(item[1]);	
	while(num--)this.setItem(2,item[0]);}
	for(var i = 0 ; i < _ring.length; i++)
	{var item = _ring[i].split(",");var num = parseInt(item[1]);	
	while(num--)this.setItem(3,item[0]);}
	for(var i = 0 ; i < _shoes.length; i++)
	{var item = _shoes[i].split(",");var num = parseInt(item[1]);	
	while(num--)this.setItem(4,item[0]);}
	for(var i = 0 ; i < _potion.length; i++)
	{var item = _potion[i].split(",");var num = parseInt(item[1]);	
	while(num--)this.setItem(5,item[0]);}	
};
Inventory.prototype.setItem = function(type,name){
	
	switch(type){
		case 0:
			var search = false;
			for(var i = 0 ; i < this.i_weaphon.length; i++)
				if(this.i_weaphon[i].name == name)
				{
					this.i_weaphon[i].num++;
					search = true;
				}
			if(!search)
			{
				this.i_weaphon.push({name:name,num:1});
			}
		break;
		case 1:
			var search = false;
			for(var i = 0 ; i < this.i_armer.length; i++)
				if(this.i_armer[i].name == name)
				{
					this.i_armer[i].num++;
					search = true;
				}
			if(!search)
			{
				this.i_armer.push({name:name,num:1});
			}
		break;
		case 2:
			var search = false;
			for(var i = 0 ; i < this.i_neckless.length; i++)
				if(this.i_neckless[i].name == name)
				{
					this.i_neckless[i].num++;
					search = true;
				}
			if(!search)
			{
				this.i_neckless.push({name:name,num:1});
			}
		break;
		case 3:
			var search = false;
			for(var i = 0 ; i < this.i_ring.length; i++)
				if(this.i_ring[i].name == name)
				{
					this.i_ring[i].num++;
					search = true;
				}
			if(!search)
			{
				this.i_ring.push({name:name,num:1});
			}
		break;
		case 4:
			var search = false;
			for(var i = 0 ; i < this.i_shoes.length; i++)
				if(this.i_shoes[i].name == name)
				{
					this.i_shoes[i].num++;
					search = true;
				}
			if(!search)
			{
				this.i_shoes.push({name:name,num:1});
			}
		break;
		case 5:
			var search = false;
			for(var i = 0 ; i < this.i_potion.length; i++)
				if(this.i_potion[i].name == name)
				{
					this.i_potion[i].num++;
					search = true;
				}
			if(!search)
			{
				this.i_potion.push({name:name,num:1});
			}
		break;
	};
};
Inventory.prototype.getItem = function(type,name){
	switch(type)
	{
		case 0:
		for(var i = 0 ; i < this.i_weaphon.length;i++)
			if(this.i_weaphon[i].name == name)
			{
				var str = this.i_weaphon[i].name;
				if(this.i_weaphon[i].num == 1)
					this.i_weaphon.splice(i,1);
				else
					this.i_weaphon[i].num--;
				return str;
			}
		break;
		case 1:
		for(var i = 0 ; i < this.i_armer.length;i++)
			if(this.i_armer[i].name == name)
			{
				var str = this.i_armer[i].name;
				if(this.i_armer[i].num == 1)
					this.i_armer.splice(i,1);
				else
					this.i_armer[i].num--;
				return str;
			}
		break;
		case 2:
		for(var i = 0 ; i < this.i_neckless.length;i++)
			if(this.i_neckless[i].name == name)
			{
				var str = this.i_neckless[i].name;
				if(this.i_neckless[i].num == 1)
					this.i_neckless.splice(i,1);
				else
					this.i_neckless[i].num--;
				return str;
			}
		break;
		case 3:
		for(var i = 0 ; i < this.i_ring.length;i++)
			if(this.i_ring[i].name == name)
			{
				var str = this.i_ring[i].name;
				if(this.i_ring[i].num == 1)
					this.i_ring.splice(i,1);
				else
					this.i_ring[i].num--;
				return str;
			}
		break;
		case 4:
		for(var i = 0 ; i < this.i_shoes.length;i++)
			if(this.i_shoes[i].name == name)
			{
				var str = this.i_shoes[i].name;
				if(this.i_shoes[i].num == 1)
					this.i_shoes.splice(i,1);
				else
					this.i_shoes[i].num--;
				return str;
			}
		break;
		case 5:
		for(var i = 0 ; i < this.i_potion.length;i++)
			if(this.i_potion[i].name == name)
			{
				var str = this.i_potion[i].name;
				if(this.i_potion[i].num == 1)
					this.i_potion.splice(i,1);
				else
					this.i_potion[i].num--;			
				return str;
			}
		break;
	};
};
Inventory.prototype.showItem = function(type){
	switch(type){
		case 0:
		return this.i_weaphon;
		break;
		case 1:
		return this.i_armer;
		break;
		case 2:
		return this.i_neckless;
		break;
		case 3:
		return this.i_ring;
		break;
		case 4:
		return this.i_shoes;
		break;
		case 5:
		return this.i_potion;
		break;
	};
};