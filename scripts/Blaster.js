function Blaster (game, world, pos, angle){
	Entity.call(this);
	this.game = game;
	this.world = world;
	this.position = pos;
	this.angle = angle;
	this.destroyed = false;
	this.initialize();
}

Blaster.prototype = Object.create(Entity.prototype);
Blaster.prototype.constructor = Blaster;

Blaster.prototype.initialize = function() {
	var canvas = game.ScreenManager.canvas;
	width = 15;
	height = 15;
	opacity = 1;
	scalex = scaley = 1;
	this.sprite = new CenteredSprite("blaster", this.position.x, this.position.y, width, height, opacity, scalex, scaley);

	var v = new Vector2D(Math.cos(this.angle), Math.sin(this.angle)).smultiply(0.9);
	this.acceleration = this.acceleration.add(v);
}

Blaster.prototype.update = function(){
	Entity.prototype.update.call(this);

	if (this.destroyed == false)
	for (var i = this.world.asteroids.length - 1; i >= 0; i--) {
		var currentAsteroid = this.world.asteroids[i];
		if (currentAsteroid.sprite.contains(this.position.x, this.position.y)){
			currentAsteroid.destroy();
			this.destroyed = true;
		}
	};
}


Blaster.prototype.draw = function (context) {
	if (this.destroyed == false)
		Entity.prototype.draw.call(this, context);
}
