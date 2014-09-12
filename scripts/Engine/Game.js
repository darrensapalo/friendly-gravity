function Game(canvasname, resourceList) {
	this.context = new Object();
	this.canvas = new Object();

	this.ImageLoader = new ImageLoader(resourceList);
	this.InputHandler = new InputHandler();
	this.AudioManager = new AudioManager();

	this.gameScreen = new GameScreen(this);
	this.gameOverScreen = new GameOverScreen(this);
	this.mainMenuScreen = new MainMenuScreen(this);
	this.shopScreen = new ShopScreen(this);
	this.tutorialScreen = new TutorialScreen(this);
	this.aboutScreen = new AboutScreen(this);
	this.developScreen = new DevelopScreen(this);
	
	this.currentScore = 0;
	this.pressX;
	this.pressY;
	


	this.AudioManager.manage;

	this.cash;
	this.highScore;
	this.baseShockwaveCooldown;

	this.targetScreen;
	this.leaveScreen = false;
	this.arriveScreen = false;
	this.transferringScreens = false;

	
	this.forceChangeScreen = function(s){
		switch(s)
		{
			case 0: this.currentScreen = this.mainMenuScreen; break;
			case 1: this.currentScreen = this.gameScreen; break;
			case 2: this.currentScreen = this.gameOverScreen; break;
			case 3: this.currentScreen = this.shopScreen; break;
			case 4: this.currentScreen = this.tutorialScreen; break;
			case 5: this.currentScreen = this.aboutScreen; break;
			case 6:this.currentScreen = this.developScreen; break;
		}
	}

	this.updateScreenChangeHandler = function()
	{
	var rate = 0.04;
		if (this.leaveScreen)
		{
			if (changeScreenOpacity < 1)
				changeScreenOpacity += rate;
			if (changeScreenOpacity >= 1){
				changeScreenOpacity = 1;
				this.leaveScreen = false;
				this.arriveScreen = true;
				this.forceChangeScreen(this.targetScreen);
			}
		}
		
		if (this.arriveScreen)
		{
			if (changeScreenOpacity > 0)
				changeScreenOpacity -= rate;
			if (changeScreenOpacity <= 0){
				changeScreenOpacity = 0;
				this.arriveScreen = false;
				this.transferringScreens = false;
				this.context.globalAlpha = 1;
			}
		}
	}
	
	this.changeScreen = function(s){
	if (this.transferringScreens) return;
		this.targetScreen = s;
		this.leaveScreen = true;
		this.transferringScreens = true;
	}
	
	this.start = function() {
		
		var thisObj = this;
		this.canvas = document.getElementById(canvasname);
		this.context = document.getElementById(canvasname).getContext("2d");
		
		this.canvas.addEventListener("click", function(evt) { thisObj.onClick(evt); } );
		
		this.ImageLoader.onComplete = function() { 
			thisObj.initGame();
			setTimeout( function() { thisObj.loop(thisObj.context) }, 1000 / 60);
		};
		this.ImageLoader.load();
	}
	
	this.clearScreen = function (color) {
		this.context.fillStyle = color;
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
	}

	this.initGame = function () {
	}

	this.loop = function(context) {
		this.draw(context);
		this.update();
		var thisObj = this;
		setTimeout( function() { thisObj.loop(thisObj.context) }, 1000 / 60);
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