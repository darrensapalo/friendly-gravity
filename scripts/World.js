function World(game)
{
	this.game = game;

	this.player = new Player(game);

	this.emitter = new Emitter(world);

	this.comets = new Array();
	this.planets = new Array();

	this.isGameOver = false;

	// Drawing variables
	this.mapx = this.originalmapx = -120;
	this.mapy = this.originalmapy = -72;

}

World.prototype.draw = function(context) {
	context.drawImage(this.getBackground(), this.mapx, this.mapy, this.resizeWidth, this.resizeHeight);
}

World.prototype.update = function() {
	// update comets, planets, player

	this.emitter.update();
	this.bound();
}

World.prototype.bound = function()
{
	if (this.mapx < this.originalmapx)
		this.mapx += Math.abs(this.mapx - this.originalmapx) * 0.025;
	else if (this.mapx > this.originalmapx)
		this.mapx -= Math.abs(this.mapx - this.originalmapx) * 0.025;
		
	if (this.mapy < this.originalmapy)
		this.mapy += Math.abs(this.mapy - this.originalmapy) * 0.025;
	else if (this.mapy > this.originalmapy)
		this.mapy -= Math.abs(this.mapy - this.originalmapy) * 0.025;
		
}

World.prototype.entropy = function() {

	this.removeComet = function(target) {
	for (var i = 0; i < this.comets.length; i++){
		if (this.comets[i] == target) {
			this.comets.splice(i,1);
			return;
			}
		}
	}

	this.removePlanet = function(target) {
	for (var i = 0; i < this.planets.length; i++){
		if (this.planets[i] == target) {
			this.planets.splice(i,1);
			return;
			}
		}
	}
}

World.prototype.getBackground = function() {
	if (this.game.difficulty == 1)
		return this.game.ImageLoader.images["unlocked_background"];
	return this.game.ImageLoader.images["default_background"];
}

this.CheckGameOver = function(){
		
		if (this.countdownLeft <= 0)
		{
			this.game.changeScreen(2);
			if (this.gameOver)return;
			this.gameOver = true;
			this.game.currentScore = Math.floor(this.player.score);
			game.gameOverScreen.initialize();
		}
	}