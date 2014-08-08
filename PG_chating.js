function ChatBoxs(){
	this.Storys = new Array();
	this.current = -1;
	
	this.AddDialog();
}
ChatBoxs.prototype.AddDialog = function(){
	this.Storys.push(new PG_chating(50,"f_akiha","아키하","Test..../엔터작동확인/대화..   동해물과백두산이마르고닳도록"));
	this.Storys.push(new PG_chating(40,"f_akiha","호랑이","Test2..../aaa"));
};
ChatBoxs.prototype.Render = function(){
	if(this.current != -1 && this.Storys[this.current] != null)
		this.Storys[this.current].Render();
};
ChatBoxs.prototype.Update = function(){	
	if(this.Storys[this.current] != null)
	{
		if(this.current != -1)
			this.Storys[this.current].Update();
	}
	else
	{	
		playGameState.isGameStop = false;playGameState.InChatState = false;this.current = -1;
	}
};
ChatBoxs.prototype.Event = function(state,NofStroy){
	if(state == "on")
	{
		this.current = NofStroy;
		playGameState.isGameStop = true;playGameState.InChatState = true;
	}
	else if(state == "off")
	{
		this.Storys[this.current] = null;
		this.current = -1;
		playGameState.isGameStop = false;playGameState.InChatState = false;
	}
};
function PG_chating(Speed,face,name,str){
	// 사용방법
	// 총 3개의 인자를 받는 스크립트로서
	// 첫번째는 말을 할 사람의 이미지 파일명 (확장자는 필요없이 이미지 파일 이름만)
	// 두번째는 말을 할 사람의 이름
	// 세번째는 말을 할 내용입니다.
	// 또한 이 스크립트를 사용할 경우 메인 스크립트 업데이트 메소드 안에
	//this.이 스크립트를 선언한 변수이름.chat[this.chating.nowrow].Counting();을 써주셔야 합니다.
	// 글씨를 입력할 때 슬래쉬(/)를 쓰면 줄바꿈 처리가 됩니다.
	this.Speed = Speed;
	this.name = name;
	this.str = str;
	this.enter = 0;
	this.chat = new Array();
	this.chat.push(new chat(this.str.substr(0,30),Speed));
	this.chatbox = new chatbox(face);
	this.row = Math.floor(this.str.length/30);
	this.nowrow = 0;
	this.firststr = 0;
	this.temporarydata;

	this.last = false;
}
PG_chating.prototype.Render = function(){
	this.chatbox.Render();
	this.chat[this.nowrow].Counting();
	
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	Context.fillStyle = "#ffffff";
	Context.font = '28px Arial';
	Context.fillText(this.name,100,515);
	
	if(this.chat[this.nowrow].nowPrint == "/"){
		this.temporarydata = this.chat[this.nowrow].NumofPrint;
		this.chat[this.nowrow] = new chat(this.str.substr(this.firststr,this.temporarydata-1),this.Speed);
		this.chat[this.nowrow].NumofPrint = this.chat[this.nowrow].str.length;
		this.firststr+=this.temporarydata;
		this.nowrow++;
		this.row++;
		this.chat.push(new chat(this.str.substr(this.firststr,30),this.Speed));
	}
	
	if(this.row == this.nowrow)
	{
		Context.fillText(this.chat[this.nowrow].getString(),75,570+this.nowrow*30);this.last = true;
	}
	else {
		if(this.chat[this.nowrow].NumofPrint > this.chat[this.nowrow].str.length){
			this.firststr +=30;
			this.nowrow++;
			this.chat.push(new chat(this.str.substr(this.firststr,30),this.Speed));
		}
		else
		{
			Context.fillText(this.chat[this.nowrow].getString(),75,570+this.nowrow*30);
				
		}
		
		
	}
	for(var i = 0;i<this.nowrow;i++)
		Context.fillText(this.chat[i].getString(),75,570+i*30);
	
	/* if(inputSystem.isKeyDown(13))//이건 스킵 기능 넣었을 때를 생각해서 구상한것
	 {
	 	for(this.nowrow;this.nowrow<=this.row;this.nowrow++)
	 		this.chat[this.nowrow].NumofPrint = this.chat[this.nowrow].str.length;
	 	this.nowrow--;
	 }*/

	
};
PG_chating.prototype.Update = function(){

	if(this.last && inputSystem.checkKeyDown(90))//z
	{	this.Reset();
		playGameState.ChatBoxs.Event("off");
	}
	
};
PG_chating.prototype.Reset = function(){// 이건 상점 등 같은 대화를 여러번 해야할 때 리셋 기능
	 for(var i = 0; i<=this.row;i++)
	 	this.chat[i].NumofPrint =0; 
};

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

function chatbox(face){
	this.face = face;
	this.faceImg = new GraphicObject(resourcePreLoader.GetImage("img/"+this.face+".png"));
	this.chatboxImg = new GraphicObject(resourcePreLoader.GetImage("img/chating_box.png"));
	this.chatboxImg.SetPosition(0,500);
	this.faceImg.SetPosition(768,200);
}
chatbox.prototype.Render = function(){
	var theCanvas = document.getElementById("GameCanvas");
	var Context = theCanvas.getContext("2d");
	this.faceImg.Render(Context);
	this.chatboxImg.Render(Context);
};
