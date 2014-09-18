function World(game)
{
	this.game = game;

	this.player = new Player(game, this);
	this.emitter = new Emitter(this);

	this.comets = new Array();
	this.planets = new Array();
	this.asteroids = new Array();

	this.isGameOver = false;

	// Drawing variables
	this.mapx = this.originalmapx = -120;
	this.mapy = this.originalmapy = -72;

	this.resizeWidth = 800 * 1.3;
	this.resizeHeight = 480 * 1.3;

	this.countdownLeft;
	this.score;
	this.eaten;
}

World.prototype.initialize = function()
{
	this.countdownLeft = 33 * 1000;
	this.score = 0;
	this.eaten = new Eaten();
	this.player.initialize();
}

World.prototype.draw = function(context) {
	context.drawImage(this.getBackground(), this.mapx, this.mapy, this.resizeWidth, this.resizeHeight);

	for (var i = 0; i < this.comets.length; i++) {
		this.comets[i].draw(context);
	};

	for (var i = 0; i < this.planets.length; i++) {
		this.planets[i].draw(context);
	};

	for (var i = 0; i < this.asteroids.length; i++) {
		this.asteroids[i].draw(context);
	};

	this.player.draw(context);
}

World.prototype.update = function() {
	// Create new comets and planets
	this.emitter.update();

	// update comets, planets, player
	for (var i = 0; i < this.comets.length; i++) {
		this.comets[i].update();
	};

	for (var i = 0; i < this.planets.length; i++) {
		this.planets[i].update();
	};

	for (var i = 0; i < this.asteroids.length; i++) {
		this.asteroids[i].update();
	};

	// update player
	this.player.update();

	// bound the world
	this.bound();

	this.entropy();

	// check if the game is
	this.checkGameOver();

	this.countdownLeft -= 33; // 33ms elapsed
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

	// Check if it is a comet
	for (var i = 0; i < this.comets.length; i++){
		if (this.comets[i].isDestroyed) {
			this.comets.splice(i,1);
			this.eaten.comets += 1;
			return;
		}
	}

	// Check if it is a planet
	for (var i = 0; i < this.planets.length; i++){
		if (this.planets[i].isDestroyed) {
			this.planets.splice(i,1);
			this.eaten.planets += 1;
			return;
		}
	}

	// Check if it is an asteroid
	for (var i = 0; i < this.asteroids.length; i++){
		if (this.asteroids[i].isDestroyed) {
			this.asteroids.splice(i,1);
			this.eaten.asteroids += 1;
			return;
		}
	}
}

World.prototype.getBackground = function() {

	var texture = (this.game.difficulty == 1) ? "unlocked_background" : "default_background";
	return this.game.ImageLoader.images[texture];
}

World.prototype.checkGameOver = function(){
	
	if (this.countdownLeft <= 0)
	{
		this.round = new Round(this.score, this.eaten);
		this.isGameOver = true;
	}
}