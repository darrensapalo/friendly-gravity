function Asteroid(world, type)
{
	Consumable.call(this, world, type);
}

Asteroid.prototype = Object.create(Consumable.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.initialize = function () {
	Consumable.prototype.initialize.call(this);

	var M = new MathHelper();

	// Vary from asteroid 1 to 3
	var kind = M.random(1, 3);

	if (Config.debug)
		console.log("Creating new asteroid of type " + kind);

	// Vary in size
	var size = M.random(25, 50);

	// Create sprite
	this.sprite = new CenteredSprite("asteroid-" + kind, this.position.x, this.position.y, size, size);
}