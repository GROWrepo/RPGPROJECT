function MapTile(x,y,Maptype,level)
{
	//map size
	this.x = x;
	this.y = y;
	//map type
	this.Maptype = Maptype;
	
	//map data
	this.Map = new Array();
	
	return this;
}

MapTile.prototype.AddMap = function()
{
	//map data
	
	/*
	this.Map[0] = [];
	this.Map[0] = [];
	this.Map[0] = [];
	this.Map[0] = [];
	this.Map[0] = [];
	*/
};

MapTile.prototype.LoadMap = function()
{
	//this.Maptype
	var indexX,indexY;
	
	for(var i = 0; i < ? ; i ++){
		
		drawImage( MapTile );
		
		indexX += MapSizeX;
		
		if(i % ? == ?)
			indexY += MapSizeY;
	}
	
};
