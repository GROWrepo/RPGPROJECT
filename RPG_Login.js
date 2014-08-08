var Socket_load = false;
function LoginState(){
	this.fs = new FrameSkipper(2000);
}
LoginState.prototype.Init = function(){
	
	var canvas = document.getElementById("GameCanvas");
	canvas.width = 0;
	canvas.height = 0;
	
	var _id = document.createElement('input');
	var _pw = document.createElement('input');
	var _ch = document.createElement('input');
	var _button = document.createElement('input');
	
	_id.id = "ID";
	_id.type = "text";
	_id.style.width = 300+'px';
	
	_pw.id = "PW";
	_pw.type = "password";
	_pw.style.width = 300+'px';
	
	_ch.id = "CH";
	_ch.type = "checkbox";
	_ch.style.width = 100+'px';
	
	_button.id = "BT";
	_button.type = "button";
	_button.style.width = 100+'px';
	_button.value = "connet";
	
	var bd = document.getElementById("BODY");
	bd.appendChild(_id);
	bd.appendChild(_pw);
	bd.appendChild(_ch);
	bd.appendChild(_button);
	
	_button.onclick = function(){
		
		var i = document.getElementById("ID").value;
		var p = document.getElementById("PW").value;
		
		gfwSocket.Emit("login",{id:i,pw:p});
	};
};
LoginState.prototype.Render = function(){
	
};
LoginState.prototype.Update = function(){
	if( Socket_load== false && this.fs.isWork() ){
		Socket_load = true;
		this.loadSocket();
	}
};

LoginState.prototype.loadSocket = function()
{
	gfwSocket.On("_login",function (msg)
	{
		if(msg)
		{
			var bd = document.getElementById("BODY");
			var isJS = document.getElementById("CH").checked;
			
			bd.removeChild(document.getElementById("ID"));
			bd.removeChild(document.getElementById("PW"));
			bd.removeChild(document.getElementById("CH"));
			bd.removeChild(document.getElementById("BT"));
			
			var canvas = document.getElementById("GameCanvas");
			canvas.width = 1280;
			canvas.height = 800;
				
			if(isJS)
				ChangeGameState(new WaitGame());
			else
				ChangeGameState(new LogoState());
		}
		else
		{
			alert("로그인 실패");
		}
		
	});
};