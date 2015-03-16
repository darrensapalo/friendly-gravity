function Game(canvasName) {
	this.canvasName = canvasName;
	this.ImageLoader   = new ImageLoader(resourceList);
	this.InputHandler  = new InputHandler();
	this.AudioManager  = new AudioManager();
}

Object.defineProperty(Game.prototype, "world", {
	get : function() {
		return this.worldReference;
	}
});

Game.prototype.start = function() {
	this.browserType = navigator.sayswho;

	var thisObj = this;

	this.ScreenManager = new ScreenManager(this, this.canvasName);
	
	this.ImageLoader.onComplete = function() { 
		thisObj.initGame();
		setTimeout( function() { thisObj.loop(thisObj.ScreenManager.context) }, 1000 / 30);
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
	setTimeout( function() { thisObj.loop() }, 1000 / 30);
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

Game.prototype.browser = function(type)
{
	if (game.browserType.search(type) >= 0)
		return true;

	return false;
}

navigator.sayswho= (function(){
    var ua= navigator.userAgent, tem, 
    M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
    if(/trident/i.test(M[1])){
        tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
        return 'IE '+(tem[1] || '');
    }
    if(M[1]=== 'Chrome'){
        tem= ua.match(/\bOPR\/(\d+)/)
        if(tem!= null) return 'Opera '+tem[1];
    }
    M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
    return M.join(' ');
})();

// Add contains
if ( !String.prototype.contains ) {
    String.prototype.contains = function() {
        return String.prototype.indexOf.apply( this, arguments ) !== -1;
    };
}