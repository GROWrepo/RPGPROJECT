function RPG_StateLine(){
	
	this.line = new Array();

	this.x = 700;
	this.y = 775;
}

RPG_StateLine.prototype.PushLine = function (str){
	
	if(this.line.length > 2)
		this.line.splice(0,1);
	
	this.line.push(str);
};

RPG_StateLine.prototype.Render = function (){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	DrawBorder(Context,"green",1,685,725,590,70);
	Context.save();	
	Context.fillStyle = "green"; // white
	Context.textBaseline = "top";
	Context.font = '15px Arial';
	for(var i = this.line.length -1 ; i > -1 ; i--)
	{
		var index = (this.line.length -1 - i);
		Context.fillText(this.line[i], this.x, this.y - index*25);
	}
	Context.restore();
};