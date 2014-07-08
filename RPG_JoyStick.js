window.addEventListener("load", onPageLoaded, false);

var lastPt = new Object();
var touchNum = new Array();
var connectOn= false;
var js;
var GAME_FPS = 30;
function onPageLoaded()
{
	new gfwSocket("http://127.0.0.1:9892");
	
	js = new JoyStick();
	js.Init();
    setInterval(gameLoop, 1000/30);
}
function gameLoop(){
	js.Update();
	js.Render();
}
function onTouch(e){
	e.preventDefault();
	
	for(var i = 0; i < e.touches.length; i++){
        var id = e.touches[i].identifier;
		lastPt[id] = {x : e.touches[i].pageX , y : e.touches[i].pageY};
		touchNum.push(id);
	}
	
//	document.getElementById("_text").value = "s";
}
function endTouch(e){
	e.preventDefault();
	
	for(var i = 0; i < e.changedTouches.length; i++) {
      var id = e.changedTouches[i].identifier;
      delete lastPt[id];
      var pos = touchNum.indexOf(id);
      touchNum.splice(pos,1);
    }
    
//    document.getElementById("_text").value = "e";
}

function JoyStick()
{
	//canvas
	this.width;
	this.rate;
	this.imglength;
	
	//key
	this.left = false;
	this.right = false;
	this.up = false;
	this.down = false;
	this.A_button = false;
	this.B_button = false;
	this.C_button = false;
	this.D_button = false;
	this.Menu_button = false;
	this.Enter_button = false;
	
	this.mouseDown = false;
	
	this.Buttons = new Array();
	
	this.fs = new FrameSkipper(2000);
	this.load = false;
}
JoyStick.prototype.Init = function(){
	
	this.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;

	 var theCanvas = document.getElementById("GameCanvas"); 
	 theCanvas.addEventListener("touchstart", onTouch, false);
	 theCanvas.addEventListener("touchend", endTouch, false);
	 
	 theCanvas.width = this.width;
	
//	document.getElementById("_text").value = "start";
	
	var real_imglength = 116;
	this.rate = this.width / 870;
	
//	console.log(rate);
	
	this.imglength = real_imglength * this.rate;
//	console.log(imglength);
	
	var img = new Image();
	var img2 = new Image();
	var _x = this.imglength;
	var _y = 0;
	img.src = "img/_up.png";
	img2.src = "img/_upE.png";	
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	var img = new Image();
	var img2 = new Image();
	var _x = 0;
	var _y = this.imglength;
	img.src = "img/_left.png";
	img2.src = "img/_leftE.png";	
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	var img = new Image();
	var img2 = new Image();
	var _x = this.imglength;
	var _y = 2*this.imglength;
	img.src = "img/_down.png";
	img2.src = "img/_downE.png";	
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	var img = new Image();
	var img2 = new Image();
	var _x = 2*this.imglength;
	var _y = this.imglength;
	img.src = "img/_right.png";
	img2.src = "img/_rightE.png";	
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	var img = new Image();
	var img2 = new Image();
	var _x = this.width- (2*this.imglength);
	var _y = 0;
	img.src = "img/_Abutton.png";
	img2.src = "img/_AbuttonE.png";	
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	var img = new Image();
	var img2 = new Image();
	var _x = this.width- (3 * this.imglength);
	var _y = this.imglength;
	img.src = "img/_Bbutton.png";
	img2.src = "img/_BbuttonE.png";	
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	var img = new Image();
	var img2 = new Image();
	var _x = this.width- (2*this.imglength);
	var _y = 2*this.imglength;
	img.src = "img/_Cbutton.png";
	img2.src = "img/_CbuttonE.png";	
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	var img = new Image();
	var img2 = new Image();
	var _x = this.width- (1*this.imglength);
	var _y = this.imglength;
	img.src = "img/_Dbutton.png";
	img2.src = "img/_DbuttonE.png";	
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	var img = new Image();
	var img2 = new Image();
	var _x = this.imglength/5 + 3*this.imglength;
	var _y = this.imglength/5;
	img.src = "img/_Menubutton.png";
	img2.src = "img/_MenubuttonE.png";	
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	var img = new Image();
	var img2 = new Image();
	var _x = this.imglength/5 + 3*this.imglength;
	var _y = this.imglength + this.imglength/5 * 2;
	img.src = "img/_Menubutton.png";
	img2.src = "img/_MenubuttonE.png";	
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
//	console.log(this.Buttons);
};
JoyStick.prototype.Update = function(){
	
	if(touchNum.length == 0){
		this.Buttons[0].clicked = false; this.up = false;
		this.Buttons[1].clicked = false; this.left = false;
		this.Buttons[2].clicked = false; this.down = false;
		this.Buttons[3].clicked = false; this.right = false;
		this.Buttons[4].clicked = false; this.A_button = false;
		this.Buttons[5].clicked = false; this.B_button = false;
		this.Buttons[6].clicked = false; this.C_button = false;
		this.Buttons[7].clicked = false; this.D_button = false;
		this.Buttons[8].clicked = false; this.Menu_button = false;
		this.Buttons[9].clicked = false; this.Enter_button = false;
	}else{
	for(var i = 0 ; i < touchNum.length; i ++){
		
		var id = touchNum[i];
		var x = lastPt[id].x;
		var y = lastPt[id].y;
		
		if(x > this.Buttons[0].x && x < this.Buttons[0].x + this.imglength
			&& y > this.Buttons[0].y && y < this.Buttons[0].y + this.imglength){
			 this.Buttons[0].clicked = true; this.up = true;gfwSocket.Emit("control_in_game", {key:"up",value:true} );}
			 else{this.Buttons[0].clicked = false;}		 
		if(x > this.Buttons[1].x && x < this.Buttons[1].x + this.imglength
			&& y > this.Buttons[1].y && y < this.Buttons[1].y + this.imglength){
			 this.Buttons[1].clicked = true; this.left = true;gfwSocket.Emit("control_in_game", {key:"left",value:true} );}
			 else{this.Buttons[1].clicked = false;}
		if(x > this.Buttons[2].x && x < this.Buttons[2].x + this.imglength
			&& y > this.Buttons[2].y && y < this.Buttons[2].y + this.imglength){
			 this.Buttons[2].clicked = true; this.down = true;gfwSocket.Emit("control_in_game", {key:"down",value:true} );}
			 else{this.Buttons[2].clicked = false;}
		if(x > this.Buttons[3].x && x < this.Buttons[3].x + this.imglength
			&& y > this.Buttons[3].y && y < this.Buttons[3].y + this.imglength){
			 this.Buttons[3].clicked = true; this.right = true;gfwSocket.Emit("control_in_game", {key:"right",value:true} );}
			 else{this.Buttons[3].clicked = false;}
		if(x > this.Buttons[4].x && x < this.Buttons[4].x + this.imglength
			&& y > this.Buttons[4].y && y < this.Buttons[4].y + this.imglength){
			 this.Buttons[4].clicked = true; this.A_button = true;gfwSocket.Emit("control_in_game", {key:"A",value:true} );}
			 else{this.Buttons[4].clicked = false;}
		if(x > this.Buttons[5].x && x < this.Buttons[5].x + this.imglength
			&& y > this.Buttons[5].y && y < this.Buttons[5].y + this.imglength){
			 this.Buttons[5].clicked = true; this.B_button = true;gfwSocket.Emit("control_in_game", {key:"B",value:true} );}
			 else{this.Buttons[5].clicked = false;}			 
		if(x > this.Buttons[6].x && x < this.Buttons[6].x + this.imglength
			&& y > this.Buttons[6].y && y < this.Buttons[6].y + this.imglength){
			 this.Buttons[6].clicked = true; this.C_button = true;gfwSocket.Emit("control_in_game", {key:"C",value:true} );}
			 else{this.Buttons[6].clicked = false;}			 
		if(x > this.Buttons[7].x && x < this.Buttons[7].x + this.imglength
			&& y > this.Buttons[7].y && y < this.Buttons[7].y + this.imglength){
			 this.Buttons[7].clicked = true; this.D_button = true;gfwSocket.Emit("control_in_game", {key:"D",value:true} );}
			 else{this.Buttons[7].clicked = false;}			 
		if(x > this.Buttons[8].x && x < this.Buttons[8].x + this.imglength
			&& y > this.Buttons[8].y && y < this.Buttons[8].y + this.imglength){
			 this.Buttons[8].clicked = true; this.Menu_button = true;gfwSocket.Emit("control_in_game", {key:"menu",value:true} );}
			 else{this.Buttons[8].clicked = false;}	 
		if(x > this.Buttons[9].x && x < this.Buttons[9].x + this.imglength
			&& y > this.Buttons[9].y && y < this.Buttons[9].y + this.imglength){
			 this.Buttons[9].clicked = true; this.Enter_button = true;gfwSocket.Emit("control_in_game", {key:"enter",value:true} );}
			 else{this.Buttons[9].clicked = false;}		 		 			 			 
	}
	}

	if(this.up)
		if(!this.Buttons[0].clicked){
			this.Buttons[0].clicked = false; this.up = false; gfwSocket.Emit("control_in_game", {key:"up",value:false} );}
	if(this.left)
		if(!this.Buttons[1].clicked){
			this.Buttons[1].clicked = false; this.left = false; gfwSocket.Emit("control_in_game", {key:"left",value:false} );}
	if(this.down)
		if(!this.Buttons[2].clicked){
			this.Buttons[2].clicked = false; this.down = false; gfwSocket.Emit("control_in_game", {key:"down",value:false} );}
	if(this.right)
		if(!this.Buttons[3].clicked){
			this.Buttons[3].clicked = false; this.right = false; gfwSocket.Emit("control_in_game", {key:"right",value:false} );}
	if(this.A_button)
		if(!this.Buttons[4].clicked){
			this.Buttons[4].clicked = false; this.A_button = false; gfwSocket.Emit("control_in_game", {key:"A",value:false} );}
	if(this.B_button)
		if(!this.Buttons[5].clicked){
			this.Buttons[5].clicked = false; this.B_button = false; gfwSocket.Emit("control_in_game", {key:"B",value:false} );}
	if(this.C_button)
		if(!this.Buttons[6].clicked){
			this.Buttons[6].clicked = false; this.C_button = false; gfwSocket.Emit("control_in_game", {key:"C",value:false} );}
	if(this.D_button)
		if(!this.Buttons[7].clicked){
			this.Buttons[7].clicked = false; this.D_button = false; gfwSocket.Emit("control_in_game", {key:"D",value:false} );}
	if(this.Menu_button)
		if(!this.Buttons[8].clicked){
			this.Buttons[8].clicked = false; this.Menu_button = false; gfwSocket.Emit("control_in_game", {key:"menu",value:false} );}
	if(this.Enter_button)
		if(!this.Buttons[9].clicked){
			this.Buttons[9].clicked = false; this.Enter_button = false; gfwSocket.Emit("control_in_game", {key:"enter",value:false} );}
			
	if( this.load == false && this.fs.isWork()){
		this.load = true;
		this.loadSocket();
	}
	
	timerSystem.Update();
};
JoyStick.prototype.Render = function(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	
	Context.fillStyle = "#ffffff";
	Context.fillRect(0,0,800,600);
	
	if(!connectOn){
	Context.fillStyle = "#000000";
	Context.font = '35px Arial';
	Context.textBaseline = "top";
	Context.fillText("Mobile Connect",300,250);
	}
	else{
	for(var i = 0 ; i < this.Buttons.length ; i ++){	
		var img;
		var x = this.Buttons[i].x;
		var y = this.Buttons[i].y;
		
		if(this.Buttons.clicked)
			img = this.Buttons[i].imgB;
		else
			img = this.Buttons[i].imgA;
		
		Context.save();
		Context.translate(x * (1 - this.rate), y * (1 - this.rate));
		Context.scale(this.rate,this.rate);
		Context.drawImage(img,x,y);		
		Context.restore();
	}
	}
};
JoyStick.prototype.loadSocket = function()
{
	console.log("send");
	gfwSocket.On("start_game",function (msg)
	{
		connectOn = true;
	});
	gfwSocket.Emit("want_game","mobile");
};