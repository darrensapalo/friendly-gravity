function Planet (world, type){
	Consumable.call(this, world, type);

	this.stage       = 2;
	this.additionals = new Array();
}

Planet.prototype = Object.create(Consumable.prototype);
Planet.prototype.constructor = Planet;

Planet.prototype.initialize = function(){
	var M = new MathHelper();

	Consumable.prototype.initialize.call(this);

	this.kind = M.random(1, 3);

	// Vary in size
	var width = 395;
	var height = 410;

	if (Config.debug)
		console.log("Creating new planet of kind " + kind);

	var opacity = 1;
	var scalex = scaley = M.random(0.20, 0.4);

	// Create sprite
	this.sprite = new CenteredSprite("planet" + this.kind + "-1", this.position.x, this.position.y, width, height, opacity, scalex, scaley);

	this.trail = new Trail(this, this.kind);

	this.additionals[0] = new CenteredSprite("planet" + this.kind + "-2", this.position.x, this.position.y, width, height, opacity, scalex, scaley);
	this.additionals[1] = new CenteredSprite("planet" + this.kind + "-3", this.position.x, this.position.y, width, height, opacity, scalex, scaley);
}

Planet.prototype.draw = function (context) {
	Consumable.prototype.draw.call(this, context);

	this.additionals[0].draw(context);
	this.additionals[1].draw(context);
}


Planet.prototype.update = function (){
	Consumable.prototype.update.call(this);
	this.additionals[0].x = this.additionals[1].x = this.position.x;
	this.additionals[0].y = this.additionals[1].y = this.position.y;

	this.additionals[0].rotation -= Math.PI / 86;
	this.additionals[1].rotation += Math.PI / 86; 
}