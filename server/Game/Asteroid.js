var Consumable = require('./Consumable.js');
function Asteroid(world, type)
{
	Consumable.call(this, world, type);
}

Asteroid.types = [
	{
		sprite: "asteroid-1",
		width: 66,
		height: 45
	},
	{
		sprite: "asteroid-2",
		width: 34,
		height: 31
	},
	{
		sprite: "asteroid-3",
		width: 179,
		height: 123
	}
];

Asteroid.prototype = Object.create(Consumable.prototype);
Asteroid.prototype.constructor = Asteroid;

Asteroid.prototype.initialize = function () {
	Consumable.prototype.initialize.call(this);

	var M = new MathHelper();

	// Vary from asteroid 1 to 3
	var kind = M.random(2);

	if (Config.debug)
		console.log("Creating new asteroid of type " + kind);

	var sprite = Asteroid.types[kind];

	// Create sprite
	this.sprite = new CenteredSprite(sprite.sprite, this.position.x, this.position.y, sprite.width,  sprite.height);
}

Asteroid.prototype.update = function() {
	Consumable.prototype.update.call(this);
	this.sprite.rotation -= Math.PI / 164;
};

module.exports = Asteroid;