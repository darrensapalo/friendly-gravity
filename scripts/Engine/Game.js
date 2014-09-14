function Game(canvasName) {
	this.canvasName = canvasName;
	this.ImageLoader   = new ImageLoader(resourceList);
	this.InputHandler  = new InputHandler();
	this.AudioManager  = new AudioManager();
}

Game.prototype.start = function() {
	var thisObj = this;

	this.ScreenManager = new ScreenManager(this, this.canvasName);
	
	this.ImageLoader.onComplete = function() { 
		thisObj.initGame();
		setTimeout( function() { thisObj.loop(thisObj.context) }, 1000 / 60);
	};
	this.ImageLoader.load();
}

Game.prototype.initGame = function (startScreen) {
	// List of screens
	var screens = [
		new GameScreen(this),
		new GameOverScreen(this),
		new MainMenuScreen(this),
		new ShopScreen(this),
		new TutorialScreen(this),
		new AboutScreen(this),
		new DevelopScreen(this)
	];

	// Add the screens
	for (var i = 0; i < screens.length; i++) {
		this.ScreenManager.addScreen( screens[i].constructor.name , screens[i]);
	};
	
	// Tell the manager to load the screen
	this.ScreenManager.initialize("MainMenuScreen");
}

Game.prototype.loop = function() {
	this.draw();
	this.update();
	var thisObj = this;
	setTimeout( function() { thisObj.loop() }, 1000 / 60);
}

Game.prototype.draw = function() {
	this.ScreenManager.draw();
}

Game.prototype.update = function() {
	this.ScreenManager.update();
}

Game.prototype.onClick = function(p){
	if (Config.debug)
		console.log("Clicked at " + p);

	if (this.ScreenManager.currentScreen)
		this.ScreenManager.currentScreen.onClick(p);
}