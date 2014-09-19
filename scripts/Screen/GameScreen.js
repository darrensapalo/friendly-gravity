function GameScreen(game){
	Screen.call(this, game);
}

GameScreen.prototype = Object.create(Screen.prototype);
GameScreen.prototype.constructor = GameScreen;


GameScreen.prototype.initialize = function () {
	Screen.prototype.initialize.call(this);
	this.world = new World(game);
	this.HUD = new HUD(this.world);
	
	this.world.initialize();
}

GameScreen.prototype.draw = function(context) {
	Screen.prototype.draw.call(this);
	this.world.draw(context);
	this.HUD.draw(context);
}

GameScreen.prototype.update = function() {
	Screen.prototype.update.call(this);
	this.world.update();
	this.HUD.update();
}
