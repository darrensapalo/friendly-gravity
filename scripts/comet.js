function Comet (world, type){
	Consumable.call(this, world, type);
}

Comet.prototype = Object.create(Consumable.prototype);
Comet.prototype.constructor = Comet;

Comet.prototype.initialize = function(){
	Consumable.initialize.call(this);

	var M = new MathHelper();

	this.kind = M.random(1, 4);

	// Vary in size
	var size = M.random(50, 75);

	if (Config.debug)
		console.log("Creating new comet of size " + size);

	// Create sprite
	this.sprite = new CenteredSprite("comet", this.position.x, this.position.y, size, size);

	this.trail = new Trail(this, this.kind);
}

Comet.prototype.draw = function (context) {
	Consumable.draw.call(this, context);

	if (Config.game.trail.isVisible)
		this.trail.draw(context);
}

Comet.prototype.update = function (){
	Consumable.update.call(this);
}