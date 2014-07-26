function PG_chating(face,name,str){
	// 사용방법
	// 총 3개의 인자를 받는 스크립트로서
	// 첫번째는 말을 할 사람의 이미지 파일명 (확장자는 필요없이 이미지 파일 이름만)
	// 두번째는 말을 할 사람의 이름
	// 세번째는 말을 할 내용입니다.
	// 또한 이 스크립트를 사용할 경우 메인 스크립트 업데이트 메소드 안에
	//this.이 스크립트를 선언한 변수이름.chat[this.chating.nowrow].Counting();을 써주셔야 합니다.
	// 글씨를 입력할 때 슬래쉬(/)를 쓰면 줄바꿈 처리가 됩니다.
	this.name = name;
	this.str = str;
	this.enter = 0;
	this.chat = new Array();
	this.chat.push(new chat(this.str.substr(0,30),80));
	this.chatbox = new chatbox(face);
	this.row = Math.floor(this.str.length/30);
	this.nowrow = 0;
	this.firststr = 0;
	this.temporarydata;
	
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
		this.chat[this.nowrow] = new chat(this.str.substr(this.firststr,this.temporarydata-1),80);
		this.chat[this.nowrow].NumofPrint = this.chat[this.nowrow].str.length;
		this.firststr+=this.temporarydata;
		this.nowrow++;
		this.row++;
		this.chat.push(new chat(this.str.substr(this.firststr,30),80));
	}
	if(this.row == this.nowrow)
		Context.fillText(this.chat[this.nowrow].getString(),75,570+this.nowrow*30);
	else {
		if(this.chat[this.nowrow].NumofPrint > this.chat[this.nowrow].str.length){
			this.firststr +=30;
			this.nowrow++;
			this.chat.push(new chat(this.str.substr(this.firststr,30),80));
		}
		else
			Context.fillText(this.chat[this.nowrow].getString(),75,570+this.nowrow*30);	
	
		
		
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
