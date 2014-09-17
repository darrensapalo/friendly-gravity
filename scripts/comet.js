function Comet (world, type){
	Consumable.call(this, world, type);
}

Comet.prototype = Object.create(Consumable.prototype);
Comet.prototype.constructor = Comet;

Comet.prototype.initialize = function(){
	Consumable.prototype.initialize.call(this);

	var M = new MathHelper();

	this.kind = M.random(1, 4);

	// Vary in size
	var size = M.random(50, 75);

	if (Config.debug)
		console.log("Creating new comet of size " + size);

	// Create sprite
	this.sprite = new CenteredSprite("comet", this.position.x, this.position.y, size, size);

	console.log("Making a new trail");
	this.trail = new Trail(this, this.kind);
	this.trail.initialize();
}

Comet.prototype.update = function () {
	Consumable.prototype.update.call(this);

	if (Config.game.trail.isVisible)
		this.trail.update();
}

Comet.prototype.draw = function (context) {
	Consumable.prototype.draw.call(this, context);

	if (Config.game.trail.isVisible)
		this.trail.draw(context);
}