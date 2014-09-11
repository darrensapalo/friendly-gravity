function Game(canvasname, resourceList) {
	this.resourceList = resourceList;
	this.il = new ImageLoader(resourceList);
	this.context = new Object();
	this.canvas = new Object();

	

	this.targetScreen;
	this.leaveScreen = false;
	this.arriveScreen = false;
	this.transferringScreens = false;

	
	this.Start = function() {
		var thisObj = this;
		this.canvas = document.getElementById(canvasname);
		this.context = document.getElementById(canvasname).getContext("2d");
		
		this.canvas.addEventListener("click", function(evt) { thisObj.onClick(evt); } );
		
		this.il.OnComplete = function() { 
			thisObj.InitGame();
			setTimeout( function() { thisObj.Loop(thisObj.context) }, 1000 / 60);
		};
		this.il.Load();
	}
	
	this.ClearScreen = function (color) {
		this.context.fillStyle = color;
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
	}
	
	this.GetImage = function (name) {
		return this.il.GetImage(name);
	}

	this.InitGame = function () {
	}

	this.Loop = function(context) {
		this.Draw(context);
		this.Update();
		var thisObj = this;
		setTimeout( function() { thisObj.Loop(thisObj.context) }, 1000 / 60);
	}

	this.Draw = function(context) {
	}

	this.Update = function() {
		this.UpdateScreenChangeHandler();
	}
	
	this.onClick = function(evt){
		this.pressX = evt.x;
		this.pressY = evt.y;
	}
}