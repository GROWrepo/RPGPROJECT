window.addEventListener("load", onPageLoaded, false);
window.navigator = window.navigator || {};
//var lastPt = new Object();
var touchNum = new Array();
var connectOn= false;
var state = true;
var js;
var GAME_FPS = 20;
var real_imglength = 116;

function onPageLoaded()
{
	new gfwSocket("http://121.152.186.155:9892");
	
	js = new JoyStick();
	js.Init();

	
    setInterval(gameLoop, 1000/GAME_FPS);
}
function gameLoop(){
	js.Update();
	js.Render();
}
function onTouch(e){
	e.preventDefault();
	
	for(var i = 0; i < e.touches.length; i++){
        var id = e.touches[i].identifier;
        var plag = true;
        
        for(var j = 0 ; j< touchNum.length; j ++)
      		if(touchNum[j].id == id)
      			plag = false;
      	
      	if(plag)
			touchNum[touchNum.length] = {id : id, x : e.touches[i].pageX , y : e.touches[i].pageY};
		//touchNum.push(id);
	}
	
//	document.getElementById("_text").value = "s";
}
function endTouch(e){
	e.preventDefault();
	
	for(var i = 0; i < e.changedTouches.length; i++) {
      var id = e.changedTouches[i].identifier;
      var pos = -1;
      
      for(var j = 0 ; j< touchNum.length; j ++)
      	if(touchNum[j].id == id)
      		pos = j;
      
      if(pos != -1){
 //     delete lastPt[id];		
      touchNum.splice(pos,1);
      }
    }
    
//    document.getElementById("_text").value = "e";
}

function JoyStick()
{
	//canvas
	this.width;
	this.height;
	this.Landscape;
	this.Type = 1;
	this.vibration = false;
	
	this.onVibration = true;
	this.onSound = true;
	
	this.rate;
	this.imglength;
	this.jsIMG = new Image();
	this.imgIndex = 9;
	
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
	
	this.sound;
		
	this.Buttons = new Array();
	
	this.fs = new FrameSkipper(2000);
	this.load = false;
}
JoyStick.prototype.Init = function(){
	
	if (navigator.vibrate === undefined)
		this.vibration = false;
	else
		this.vibration = true;
	this.onVibration = true;
	this.onSound = true;
		
	this.width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	this.height = (window.innerHeight > 0) ? window.innerHeight : screen.Height;
	
	if(this.width > this.height) // LandScape 
		this.Landscape = true;		
	else						 // Portrait
		this.Landscape = false;		
	
	 var theCanvas = document.getElementById("GameCanvas"); 
	 theCanvas.addEventListener("touchstart", onTouch, false);
	 theCanvas.addEventListener("touchend", endTouch, false);
	 
	theCanvas.width = this.width;
	theCanvas.height = this.height;
//	document.getElementById("_text").value = "start";
	
	this.rate = this.width / 870;
	
//	console.log(rate);
	
	this.imglength = real_imglength * this.rate;
//	console.log(imglength);
	
	this.jsIMG.src = "img/ButtonImg.png";
	
	var img,img2;
	
	img = 0;
	img2 = img + this.imgIndex;
	var _x = this.imglength;
	var _y = 0;
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	img = 1;
	img2 = img + this.imgIndex;
	_x = 0;
	_y = this.imglength;
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	img = 2;
	img2 = img + this.imgIndex;
	_x = this.imglength;
	_y = 2*this.imglength;
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	img = 3;
	img2 = img + this.imgIndex;
	_x = 2*this.imglength;
	_y = this.imglength;
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	img = 4;
	img2 = img + this.imgIndex;
	_x = this.width- (2*this.imglength);
	_y = 0;
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	img = 5;
	img2 = img + this.imgIndex;
	_x = this.width- (3 * this.imglength);
	_y = this.imglength;
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	img = 6;
	img2 = img + this.imgIndex;
	_x = this.width- (2*this.imglength);
	_y = 2*this.imglength;
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	img = 7;
	img2 = img + this.imgIndex;
	_x = this.width- (1*this.imglength);
	_y = this.imglength;	
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	img = 8;
	img2 = img + this.imgIndex;
	_x = this.imglength/5 + 3*this.imglength;
	_y = this.imglength/5;
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});
	
	img = 8;
	img2 = img + this.imgIndex;
	_x = this.imglength/5 + 3*this.imglength;
	_y = this.imglength + this.imglength/5 * 2;
	this.Buttons.push({x: _x, y: _y, clicked: false, imgA: img , imgB : img2});

	var soundMusic = new Audio();
		soundMusic.src = "sound/Select.mp3";
		soundMusic.volume = 1;
		soundMusic.isPlayed = false;
		soundMusic.addEventListener("ended", function()
		{
			if(window.chrome) this.load();
			this.pause();
		}, false);
		
	document.body.appendChild(soundMusic);
	this.sound = soundMusic;
	
};
JoyStick.prototype.PlayEffect = function(){
	if(this.sound.ended == true || this.sound.isPlayed == false)
			{
				if(this.sound.paused)
				{
					this.sound.play();
					this.isPlayed = true;
				}
			}
};
JoyStick.prototype.Update = function(){
	
	if(this.Landscape){
		this.Buttons[0].clicked = false; 
		this.Buttons[1].clicked = false; 
		this.Buttons[2].clicked = false; 
		this.Buttons[3].clicked = false; 
		this.Buttons[4].clicked = false; 
		this.Buttons[5].clicked = false; 
		this.Buttons[6].clicked = false; 
		this.Buttons[7].clicked = false; 
		this.Buttons[8].clicked = false; 
		this.Buttons[9].clicked = false; 

//	if(this.fs.isWork())
//		gfwSocket.Emit("debug", touchNum );
	
	for(var i = 0 ; i < touchNum.length; i ++){
		var x = touchNum[i].x;
		var y = touchNum[i].y;
		
		if(x > this.Buttons[0].x && x < this.Buttons[0].x + this.imglength
			&& y > this.Buttons[0].y && y < this.Buttons[0].y + this.imglength){
			 if( !this.up){
			 	if(this.vibration && this.onVibration)navigator.vibrate(100);if(this.onSound)this.PlayEffect();
			 	gfwSocket.Emit("control_in_game", {key:"up",value:true} );
			 }
			 this.Buttons[0].clicked = true; this.up = true;
		}
			 
		if(x > this.Buttons[1].x && x < this.Buttons[1].x + this.imglength
			&& y > this.Buttons[1].y && y < this.Buttons[1].y + this.imglength){
			 if( !this.left){
			 	if(this.vibration && this.onVibration)navigator.vibrate(100);if(this.onSound)this.PlayEffect();
			 gfwSocket.Emit("control_in_game", {key:"left",value:true} );
			 }
			 this.Buttons[1].clicked = true; this.left = true;
		}

		if(x > this.Buttons[2].x && x < this.Buttons[2].x + this.imglength
			&& y > this.Buttons[2].y && y < this.Buttons[2].y + this.imglength){
			 if( !this.down){
			 	if(this.vibration && this.onVibration)navigator.vibrate(100);if(this.onSound)this.PlayEffect();
			 gfwSocket.Emit("control_in_game", {key:"down",value:true} );
			 }
			 this.Buttons[2].clicked = true; this.down = true;
		}

		if(x > this.Buttons[3].x && x < this.Buttons[3].x + this.imglength
			&& y > this.Buttons[3].y && y < this.Buttons[3].y + this.imglength){
			 if( !this.right){
			 	if(this.vibration && this.onVibration)navigator.vibrate(100);if(this.onSound)this.PlayEffect();
			 gfwSocket.Emit("control_in_game", {key:"right",value:true} );
			 }
			 this.Buttons[3].clicked = true; this.right = true;
		}

		if(x > this.Buttons[4].x && x < this.Buttons[4].x + this.imglength
			&& y > this.Buttons[4].y && y < this.Buttons[4].y + this.imglength){
			 if( !this.A_button){
			 	if(this.vibration && this.onVibration)navigator.vibrate(100);if(this.onSound)this.PlayEffect();
			 gfwSocket.Emit("control_in_game", {key:"A",value:true} );
			 }
			 this.Buttons[4].clicked = true; this.A_button = true;
		}

		if(x > this.Buttons[5].x && x < this.Buttons[5].x + this.imglength
			&& y > this.Buttons[5].y && y < this.Buttons[5].y + this.imglength){
			 if( !this.B_button){
			 	if(this.vibration && this.onVibration)navigator.vibrate(100);if(this.onSound)this.PlayEffect();
			 gfwSocket.Emit("control_in_game", {key:"B",value:true} );
			 }
			 this.Buttons[5].clicked = true; this.B_button = true;
		}
	 
		if(x > this.Buttons[6].x && x < this.Buttons[6].x + this.imglength
			&& y > this.Buttons[6].y && y < this.Buttons[6].y + this.imglength){
			 if( !this.C_button){
			 	if(this.vibration && this.onVibration)navigator.vibrate(100);if(this.onSound)this.PlayEffect();
			 gfwSocket.Emit("control_in_game", {key:"C",value:true} );
			 }
			 this.Buttons[6].clicked = true; this.C_button = true;
		}
	 
		if(x > this.Buttons[7].x && x < this.Buttons[7].x + this.imglength
			&& y > this.Buttons[7].y && y < this.Buttons[7].y + this.imglength){
			 if( !this.D_button){
			 	if(this.vibration && this.onVibration)navigator.vibrate(100);if(this.onSound)this.PlayEffect();
			 gfwSocket.Emit("control_in_game", {key:"D",value:true} );
			 }
			 this.Buttons[7].clicked = true; this.D_button = true;
		}
		 
		if(x > this.Buttons[8].x && x < this.Buttons[8].x + this.imglength
			&& y > this.Buttons[8].y && y < this.Buttons[8].y + this.imglength){
			 if( !this.Menu_button){
			 	if(this.vibration && this.onVibration)navigator.vibrate(100);if(this.onSound)this.PlayEffect();
			 gfwSocket.Emit("control_in_game", {key:"menu",value:true} );
			 }
			 this.Buttons[8].clicked = true; this.Menu_button = true;
		}

		if(x > this.Buttons[9].x && x < this.Buttons[9].x + this.imglength
			&& y > this.Buttons[9].y && y < this.Buttons[9].y + this.imglength){
			 if( !this.Enter_button){
			 	if(this.vibration && this.onVibration)navigator.vibrate(100);if(this.onSound)this.PlayEffect();
			 gfwSocket.Emit("control_in_game", {key:"enter",value:true} );
			 }
			 this.Buttons[9].clicked = true; this.Enter_button = true;
		}
	 		 			 			 
	}
	
	if(this.up)
		if(!this.Buttons[0].clicked){
			this.up = false; gfwSocket.Emit("control_in_game", {key:"up",value:false} );}
	if(this.left)
		if(!this.Buttons[1].clicked){
			this.left = false; gfwSocket.Emit("control_in_game", {key:"left",value:false} );}
	if(this.down)
		if(!this.Buttons[2].clicked){
			this.down = false; gfwSocket.Emit("control_in_game", {key:"down",value:false} );}
	if(this.right)
		if(!this.Buttons[3].clicked){
			this.right = false; gfwSocket.Emit("control_in_game", {key:"right",value:false} );}
	if(this.A_button)
		if(!this.Buttons[4].clicked){
			this.A_button = false; gfwSocket.Emit("control_in_game", {key:"A",value:false} );}
	if(this.B_button)
		if(!this.Buttons[5].clicked){
			this.B_button = false; gfwSocket.Emit("control_in_game", {key:"B",value:false} );}
	if(this.C_button)
		if(!this.Buttons[6].clicked){
			this.C_button = false; gfwSocket.Emit("control_in_game", {key:"C",value:false} );}
	if(this.D_button)
		if(!this.Buttons[7].clicked){
			this.D_button = false; gfwSocket.Emit("control_in_game", {key:"D",value:false} );}
	if(this.Menu_button)
		if(!this.Buttons[8].clicked){
			this.Menu_button = false; gfwSocket.Emit("control_in_game", {key:"menu",value:false} );}
	if(this.Enter_button)
		if(!this.Buttons[9].clicked){
			this.Enter_button = false; gfwSocket.Emit("control_in_game", {key:"enter",value:false} );}
	}
	else
	{
		if(touchNum[0]){
		var x = touchNum[0].x;
		var y = touchNum[0].y;
		
		var index = this.imglength;
		var index2 = index+150*this.rate;
		var x_cb = this.imglength;
		var y_cb = index2;
		
		if( !this.lock && x > x_cb && x < x_cb + index
			&& y > y_cb && y < y_cb + index){
				if(this.Type == 1)
					this.Type = 0;
				else
					this.Type = 1;
				
				this.lock = true;
		}
		y_cb += index2;
		if( !this.lock && x > x_cb && x < x_cb + index
			&& y > y_cb && y < y_cb + index){
				if(this.vibration)
					this.onVibration = !this.onVibration;
				this.lock = true;
		}
		y_cb += index2;
		if( !this.lock && x > x_cb && x < x_cb + index
			&& y > y_cb && y < y_cb + index){
				this.onSound = !this.onSound;
				this.lock = true;
		}
		}
	}
	
	
	if(this.fs.isWork()){
		state = true;
		this.lock = false;
	if(!this.load){
		this.load = true;
		this.loadSocket();
		}
	}
	timerSystem.Update();
	this.screenChange();
};
JoyStick.prototype.screenChange = function(){

	var _width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
	if(this.width !=_width){// sense different

	this.width = _width;
	this.height = (window.innerHeight > 0) ? window.innerHeight : screen.Height;
	
	var theCanvas = document.getElementById("GameCanvas"); 
	theCanvas.width = _width;
	theCanvas.height = this.height;
	
	this.rate = this.width / 870;
	this.imglength = real_imglength * this.rate;
	
//	console.log(this.width + " "+ this.height);
//	console.log(this.Landscape);
	if(this.width > this.height) // LandScape 
	{
	this.Landscape = true;
	
	var _x = this.imglength;
	var _y = 0;
	this.Buttons[0].x = _x;
	this.Buttons[0].y = _y;
	this.Buttons[0].clicked = false;
	
	_x = 0;
	_y = this.imglength;
	this.Buttons[1].x = _x;
	this.Buttons[1].y = _y;
	this.Buttons[1].clicked = false;
	
	_x = this.imglength;
	_y = 2*this.imglength;
	this.Buttons[2].x = _x;
	this.Buttons[2].y = _y;
	this.Buttons[2].clicked = false;
	
	_x = 2*this.imglength;
	_y = this.imglength;
	this.Buttons[3].x = _x;
	this.Buttons[3].y = _y;
	this.Buttons[3].clicked = false;
	
	_x = this.width- (2*this.imglength);
	_y = 0;
	this.Buttons[4].x = _x;
	this.Buttons[4].y = _y;
	this.Buttons[4].clicked = false;
	
	_x = this.width- (3 * this.imglength);
	_y = this.imglength;
	this.Buttons[5].x = _x;
	this.Buttons[5].y = _y;
	this.Buttons[5].clicked = false;
	
	_x = this.width- (2*this.imglength);
	_y = 2*this.imglength;
	this.Buttons[6].x = _x;
	this.Buttons[6].y = _y;
	this.Buttons[6].clicked = false;
	
	_x = this.width- (1*this.imglength);
	_y = this.imglength;	
	this.Buttons[7].x = _x;
	this.Buttons[7].y = _y;
	this.Buttons[7].clicked = false;
	
	_x = this.imglength/5 + 3*this.imglength;
	_y = this.imglength/5;
	this.Buttons[8].x = _x;
	this.Buttons[8].y = _y;
	this.Buttons[8].clicked = false;
	
	_x = this.imglength/5 + 3*this.imglength;
	_y = this.imglength + this.imglength/5 * 2;
	this.Buttons[9].x = _x;
	this.Buttons[9].y = _y;
	this.Buttons[9].clicked = false;
	}
	else // Portrait
	{
	this.PlayEffect();
	this.Landscape = false;
	}		
	}
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
	Context.fillText("Mobile Connect",this.imglength,this.imglength);
	
	if(state)
		Context.fillText("input key & send",this.imglength,this.imglength*2);
	else
		Context.fillText("connect fail",this.imglength,this.imglength*2);
	}
	else{
		
	if(this.Landscape){
	for(var i = 0 ; i < this.Buttons.length ; i ++){	
		var img;
		var x = this.Buttons[i].x;
		var y = this.Buttons[i].y;	
		var line;
	
		if(this.Buttons.clicked)
			img = this.Buttons[i].imgB;
		else
			img = this.Buttons[i].imgA;
		
		if(img >= this.imgIndex){
			line = real_imglength * 1;
			img -= img;
		}else
			line = 0;
			
		Context.save();
		Context.translate(x * (1 - this.rate), y * (1 - this.rate));
		Context.scale(this.rate,this.rate);
		
//		console.log(this.jsIMG +" "+real_imglength+" "+img+" "+line+" "+x+" "+y);
		Context.drawImage(this.jsIMG,
		real_imglength * img, line,
		real_imglength, real_imglength,
		x, y,
		real_imglength, real_imglength);	
			
		Context.restore();
	}
	}else{
		var index = this.imglength;
		Context.fillStyle = "#000000";
		Context.font = '20px Arial';
		Context.textBaseline = "top";
		
		var x = this.imglength;
		var y = index+150*this.rate;
		Context.fillText("Type : "+this.Type,x,index);
		Context.save();
		Context.translate(x * (1 - this.rate), y * (1 - this.rate));
		Context.scale(this.rate,this.rate);
		Context.drawImage(this.jsIMG,
		real_imglength * 8, 0,
		real_imglength, real_imglength,
		x, y,
		real_imglength, real_imglength);
		Context.restore();		
		Context.fillText("C",x,y);
		
		index = y + x;
		y = index+150*this.rate;
		if(!this.vibration)
			Context.fillText("Vibration : not Support",x,index);
		else
			Context.fillText("Vibration : "+this.onVibration,x,index);
		Context.save();
		Context.translate(x * (1 - this.rate), y * (1 - this.rate));
		Context.scale(this.rate,this.rate);
		Context.drawImage(this.jsIMG,
		real_imglength * 8, 0,
		real_imglength, real_imglength,
		x, y,
		real_imglength, real_imglength);
		Context.restore();	
		Context.fillText("V",x,y);
		
		index = y + x;
		y = index+150*this.rate;
		Context.fillText("Sound : "+this.onSound,x,index);
		Context.save();
		Context.translate(x * (1 - this.rate), y * (1 - this.rate));
		Context.scale(this.rate,this.rate);
		Context.drawImage(this.jsIMG,
		real_imglength * 8, 0,
		real_imglength, real_imglength,
		x, y,
		real_imglength, real_imglength);
		Context.restore();
		Context.fillText("S",x,y);
	}
	}
};
JoyStick.prototype.loadSocket = function()
{
	console.log("send");
	gfwSocket.On("start_game",function (msg)
	{
		if(msg == "fail")
			state = false;
		else{
			document.getElementById("_textBox").style.display = "none";
			connectOn = true;
		}
	});
//	gfwSocket.Emit("want_game","mobile");
};
function sendPacket(){
//	console.log("in");
	var key = document.getElementById("_text").value;
	gfwSocket.Emit("want_game",key);
}
