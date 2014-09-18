function Planet (world, type){
	Consumable.call(this, world, type);

	this.stage       = 2;
	this.additionals = new Array();
	this.speed = 0.000007;
}

Planet.prototype = Object.create(Consumable.prototype);
Planet.prototype.constructor = Planet;

Planet.prototype.initialize = function(){
	Consumable.prototype.initialize.call(this);
	var M = new MathHelper();

	this.lifeSpan = M.random(7000, 15000);

	this.kind = M.random(1, 3);

	// Vary in size
	var width = 100;
	var height = 102;

	if (Config.debug)
		console.log("Creating new planet of kind " + kind);

	var opacity = 1;
	var scalex = scaley = 1;

	// Create sprite
	this.sprite = new CenteredSprite("planet" + this.kind + "-1", this.position.x, this.position.y, width, height, opacity, 0.8, 0.8);

	this.trail = new Trail(this, this.kind);

	this.additionals[0] = new CenteredSprite("planet" + this.kind + "-2", this.position.x, this.position.y, width, height, opacity, 1.1, 1.1); // fumes
	this.additionals[1] = new CenteredSprite("planet" + this.kind + "-3", this.position.x, this.position.y, width, height, opacity, 1.1, 1.1);

	createjs.Tween.get(this.sprite).wait(600).to({ scalex:1, scaley: 1}, this.lifeSpan, createjs.Ease.quadIn);
	createjs.Tween.get(this.additionals[0]).wait(600).to({ scalex:0.6, scaley: 0.6, opacity: 0.8 }, Config.game.planet.growthDuration*2, createjs.Ease.quadIn).wait(300).to({ scalex:0.8, scaley: 0.8, opacity: 0.4 }, Config.game.planet.growthDuration, createjs.Ease.quadIn);
	createjs.Tween.get(this.additionals[1]).wait(600).to({ scalex:0.7, scaley: 0.7, opacity: 0.7 }, Config.game.planet.growthDuration, createjs.Ease.quadIn).wait(600).to({ scalex:0.9, scaley: 0.9, opacity: 0.4 }, Config.game.planet.growthDuration, createjs.Ease.quadIn);
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

	this.additionals[0].rotation += Math.PI / 86;
	this.additionals[1].rotation -= Math.PI / 86; 
}