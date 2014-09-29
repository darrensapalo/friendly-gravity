var Consumable = require('./Consumable.js');
function Comet (world, type){
	Consumable.call(this, world, type);
	this.trails = new Array();
}

Comet.prototype = Object.create(Consumable.prototype);
Comet.prototype.constructor = Comet;

Comet.prototype.initialize = function(){
	Consumable.prototype.initialize.call(this);

	var M = new MathHelper();

	this.kind = M.random(1, 6);

	// Vary in size
	this.size = M.random(20, 35);

	if (Config.debug)
		console.log("Creating new comet of size " + this.size);

	// Create sprite
	this.sprite = new CenteredSprite("comet", this.position.x, this.position.y, this.size, this.size);
}

Comet.prototype.update = function () {
	Consumable.prototype.update.call(this);

	this.trail();

	if (Config.game.trail.isVisible)
	{
		for (var i = 0; i < this.trails.length; i++) {
			this.trails[i].update();
		}
	}
}

Comet.prototype.draw = function (context) {
	
	if (Config.game.trail.isVisible)
		for (var i = 0; i < this.trails.length; i++) {
			this.trails[i].draw(context);
		}
	
	Consumable.prototype.draw.call(this, context);
}

Comet.prototype.trail = function() {
	var emitAmount = Config.game.trail.emit;

	var scale = 0.5;
	for (var i = 0; i < emitAmount; i++) {
		this.trails.push(new Trail(this, this.kind, scale, this.sprite.opacity));
	}

	this.remove();
	
}

Comet.prototype.remove = function() {
	// Remove those with zero opacity
	for (var i = 0; i < this.trails.length; i++)
	{
		if( this.trails[i].sprite.opacity <= 0)
			this.trails.splice( i, 1 );
	}
};

module.exports = Comet;