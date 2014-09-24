function ScreenManager(game, canvasName)
{
	this.game = game;

	this.canvas = document.getElementById(canvasName);
	this.context = this.canvas.getContext("2d");
	
	this.canvas.addEventListener("click", function(evt){
		var p = InputHandler.prototype.handleMouseClick(evt);
		game.onClick(p);
	});

	this.screens = new Array();

	this.tween = null;
	this.switching = false;

	this.opacity = 0;

	this.currentScreen = null;
}

ScreenManager.prototype.initialize = function(startScreen) {
	if (typeof startScreen === 'undefined') throw new Error("NullError: You did not specify the first screen of the game. The parameter was: '" + startScreen + "'.");
	this.changeScreen(startScreen, true);
};

ScreenManager.prototype.addScreen = function(name, screen) {
	if (typeof screen === 'undefined') throw new Error("NullError: Cannot null screen to the manager.");

	// check if it already exists
	if ($.inArray(screen, this.screens) > 0) throw new Error("Error: Cannot add '" + screen + "' screen because it already exists.");

	this.screens[name] = screen;
	if (Config.debug)
		console.log("Added screen " + name);
	return true;
};


ScreenManager.prototype.update = function() {
	if (typeof this.currentScreen !== 'undefined')
		this.currentScreen.update();
};

ScreenManager.prototype.draw = function() {
	// reset screen
	this.context.fillStyle = Color.black;
	this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

	if (typeof this.currentScreen !== 'undefined')
		this.currentScreen.draw(this.context);

	if (this.switching){
		this.context.globalAlpha = this.opacity;
		this.context.fillStyle = Color.black;
		this.context.fillRect(0, 0, 800, 480);
		this.context.globalAlpha = 1;
	}
};

ScreenManager.prototype.changeScreen = function(screen, isForced) {
	if (typeof isForced == 'boolean' && isForced == true)
	{
		this.currentScreen = this.screens[screen];
		if (typeof this.currentScreen === 'undefined') throw new Error("NullError: Cannot transition to an undefined screen called '" + screen + "'.");
		this.currentScreen.initialize();

		if (Config.debug)
			console.log("ScreenManger: Changed screen to '" + screen + "'.");

		this.tween = createjs.Tween.get(this).to({ opacity:0 }, 500, createjs.Ease.quadIn).call(function(SM) {
			SM.switching = false;
		}, [this], this);
	}
	else if(this.switching == false)
	{
		if (Config.debug)
			console.log("ScreenManger: Beginning to change to screen '" + screen + "'.");

		this.opacity = 0;
		this.tween = createjs.Tween.get(this).to({ opacity:1 }, 350, createjs.Ease.quadOut).call(ScreenManager.prototype.changeScreen, [screen, true], this);

		this.switching = true;
	}
};

ScreenManager.prototype.createButtons = function() {
	var x, y;
	var text = new Array();
	var button = new Array();

	x = 160;
	y = 420;
	text[0] = new TextSprite("", x, y, 40, -30);
	button[0] = new HoverableButton("button", "buttonHighlight", x, y, 255, 80);
	
	x += 250;
	text[1] = new TextSprite("", x, y, 40, -30);
	button[1] = new HoverableButton("button", "buttonHighlight", x, y, 255, 80);
	
	x += 250;
	text[2] = new TextSprite("", x, y, 40, -30);
	button[2] = new HoverableButton("button", "buttonHighlight", x, y, 255, 80);

	return {texts: text, buttons: button};
};

ScreenManager.prototype.createPanel = function() {
	return new Sprite("panel", 150, 70, 490, 305, 0.8);
}