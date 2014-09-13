function GameScreen(game){
	Screen.call(this, game);

	this.world = new World(game);
	this.HUD = new HUD(this.world);
}

GameScreen.prototype = Object.create(Screen.prototype);
GameScreen.prototype.constructor = GameScreen;


GameScreen.prototype.initialize = function () {

}

GameScreen.prototype.draw = function(context) {
	this.world.draw(context);
	this.HUD.draw(context);
}

GameScreen.prototype.update = function() {
	this.world.update();
	this.HUD.update();
}
