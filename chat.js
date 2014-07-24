function chat(str, Interval){
	this.str=str;
	this.Interval = Interval;
	this.NumofPrint = 0;
	this.fs = new FrameSkipper(this.Interval);
}
chat.prototype.getString = function(){
	
	return this.str.substr(0,this.NumofPrint);
};
chat.prototype.Counting = function(){
	if(this.fs.isWork()){
		if(this.nowPrint == ",")
			this.nowPrint = null;
		else if(this.nowPrint == ".")
			this.nowPrint = null;
		else if(this.NumofPrint <= this.str.length){
			this.NumofPrint++;
			this.nowPrint = this.str.substr(this.NumofPrint-1,1);
		}
	}
};

