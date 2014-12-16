function World(game, callback)
{
	this.game = game;
	this.checkGameOver = callback;
}

World.prototype.initialize = function()
{
	this.player =  new Player(game, this);
	// this.blackhole = new Blackhole(game, this);
	this.emitter = new Emitter(this);

	this.comets = new Array();
	this.planets = new Array();
	this.asteroids = new Array();

	var mapReduce = 0.5;

	this.width = 1782 / 1.05;
	this.height = 600 / 1.05;

	// Drawing variables
	this.mapx = this.originalmapx = -(this.width / 2) * mapReduce;
	this.mapy = this.originalmapy = (this.height / 200) * mapReduce;

	this.velocity = new Vector2D();


	this.countdownLeft = 33 * 10000;
	this.score = 0;
	this.eaten = new Eaten();
	// this.blackhole.initialize();
	this.player.initialize();

	this.isGameOver = false;
}

World.prototype.draw = function(context) {
	context.drawImage(this.getBackground(), this.mapx, this.mapy, this.width, this.height);
	context.drawImage(this.getBackground(), this.mapx + this.width, this.mapy, this.width, this.height);
	context.drawImage(this.game.ImageLoader.images['starfield'], this.mapx + this.width, this.mapy, this.width, this.height);



	for (var i = 0; i < this.comets.length; i++) {
		this.comets[i].draw(context);
	};

	for (var i = 0; i < this.planets.length; i++) {
		this.planets[i].draw(context);
	};

	for (var i = 0; i < this.asteroids.length; i++) {
		this.asteroids[i].draw(context);
	};

	// this.blackhole.draw(context);
	this.player.draw(context);
}

World.prototype.update = function() {
	// Create new comets and planets
	this.emitter.update();

	// update comets, planets, blackhole
	for (var i = 0; i < this.comets.length; i++) {
		this.comets[i].update();
	};

	for (var i = 0; i < this.planets.length; i++) {
		this.planets[i].update();
	};

	for (var i = 0; i < this.asteroids.length; i++) {
		this.asteroids[i].update();
	};

	this.player.update();
	// this.blackhole.update();

	this.mapx -= 0.3;
	this.mapy += this.velocity.y;


	// bound the world
	this.bound();

	this.entropy();

	// check if the game is
	this.checkGameOver();

	this.countdownLeft -= 33; // 33ms elapsed
}

World.prototype.bound = function()
{
	if (this.mapx <= this.originalmapx - this.width)
		this.mapx = this.originalmapx;
	/*
	if (this.mapx < this.originalmapx)
		this.mapx += Math.abs(this.mapx - this.originalmapx) * 0.35;
	else if (this.mapx > this.originalmapx)
		this.mapx -= Math.abs(this.mapx - this.originalmapx) * 0.35;
	*/
	if (this.mapy < this.originalmapy)
		this.mapy += Math.abs(this.mapy - this.originalmapy) * 0.55;
	else if (this.mapy > this.originalmapy)
		this.mapy -= Math.abs(this.mapy - this.originalmapy) * 0.55;
	
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
	return this.game.ImageLoader.images['farback'];
	// var texture = (session.account.difficulty == 1) ? "unlocked_background" : "default_background";
	// return this.game.ImageLoader.images[texture];
}