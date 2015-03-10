function GameScreen(game){
	Screen.call(this, game);
}

GameScreen.prototype = Object.create(Screen.prototype);
GameScreen.prototype.constructor = GameScreen;


GameScreen.prototype.initialize = function () {
	Screen.prototype.initialize.call(this);
	this.world = new World(game, GameScreen.prototype.checkGameOver);
	game.worldReference = this.world;
	this.world.initialize();
	this.HUD = new HUD(this.world);
	this.camera = new Camera(-500, -300);
	
	
}

GameScreen.prototype.draw = function(context) {
	this.world.drawBackground(context);
	this.camera.start(context, -400, -240);
		this.world.draw(context);
	this.camera.end(context);
	
	this.HUD.draw(context);
}

GameScreen.prototype.update = function() {
	Screen.prototype.update.call(this);
	this.camera.x = this.world.player.position.x;
	this.camera.y = this.world.player.position.y;
	this.world.update();
	this.HUD.update();
}

GameScreen.prototype.checkGameOver = function(){
	if (this.countdownLeft <= 0)
	{
		this.round = new Round(Math.floor(this.score), this.eaten);
		this.isGameOver = true;
		this.game.ScreenManager.changeScreen("GameOverScreen");
	}
}