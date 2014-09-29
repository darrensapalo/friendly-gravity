function Game(canvasName, resourceList) {
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
		this.canvas = document.getElementById(canvasName);
		this.context = document.getElementById(canvasName).getContext("2d");
		
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
		this.draw(context);
		this.update();
		var thisObj = this;
		setTimeout( function() { thisObj.Loop(thisObj.context) }, 1000 / 60);
	}

	this.draw = function(context) {
	}

	this.update = function() {
		this.updateScreenChangeHandler();
	}
	
	this.onClick = function(evt){
		this.pressX = evt.x;
		this.pressY = evt.y;
	}
}