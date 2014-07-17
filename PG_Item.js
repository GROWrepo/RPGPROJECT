function PGItem(){
	
	this.itemImg = resourcePreLoader.GetImage("img/item.png");
	this.arrResource = new Array();
		
	this.Init();
}

PGItem.prototype.Init = function(){
	
	//wephon
	this.AddItem(0,0,"not",0,0,0,0,0,0);
	this.AddItem(0,1,"sword",2,2,3,0,0,0);
	this.AddItem(0,2,"longsword",0,0,8,0,0,0);
	//armer
	this.AddItem(1,0,"not",0,0,0,0,0,0);
	this.AddItem(1,1,"dress",0,1,0,3,0,0);
	this.AddItem(1,2,"Bdress",0,0,0,5,0,0);
	//neckless
	this.AddItem(2,0,"not",0,0,0,0,0,0);
	this.AddItem(2,1,"Aneck",2,2,0,0,0,0);
	//ring
	this.AddItem(3,0,"not",0,0,0,0,0,0);
	//shoes
	this.AddItem(4,0,"not",0,0,0,0,0,0);
	this.AddItem(4,1,"shoes",0,3,0,0,0,0);
	//potion
	this.AddItem(5,0,"potion",0,0,0,0,0,30);
	
};
PGItem.prototype.AddItem = function(type,number,ItemName,str,dex,atk,def,ability){
	
	var y = type * 70;
	var x = number * 70;
	var img = this.itemImg;
	this.arrResource.push({type: type,img:img,x:x,y:y,name: ItemName,str:str,dex:dex,atk:atk,def:def,ability:ability});
};

PGItem.prototype.SearchItem = function (Type,ItemName){
	
	for(var i = 0; i < this.arrResource.length; i++)
	{
		if(this.arrResource[i].name == ItemName && this.arrResource[i].type == Type)
		{
			return this.arrResource[i];
		}
	}
	return null;
};