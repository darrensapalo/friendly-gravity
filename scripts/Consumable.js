var ConsumableTypes = ["comet", "asteroid", "planet"];

function Consumable(world, type)
{
	Entity.call(this);

	this.world = world;
	this.type = type;

	this.isConsumed = false;
	this.isDestroying = false; 
	this.isDestroyed = false;
	this.speed = 0.007;

	this.points = Config.game.points; // default points
	this.deduction = Config.game.deduction; // default deduction
}

Consumable.prototype = Object.create(Entity.prototype);
Consumable.prototype.constructor = Consumable;

Consumable.prototype.initialize = function()
{
	var M = new MathHelper();

	// select type or randomize
	this.type = this.type || ConsumableTypes[ M.random(3) ];

	// Select random spawn point
	do{	
		this.position.x = M.random(game.ScreenManager.canvas.width + 100, game.ScreenManager.canvas.width + 250);
		this.position.y = M.random(70, game.ScreenManager.canvas.height - 70);

	}while( this.checkNear( this.world.blackhole ) );

	this.velocity.x = -0.05;

	this.velocity.y += M.random(-4, 4) * 0.2;
}

Consumable.prototype.gravitate = function(target) {
	if (this.checkGravitate(target))
	{
		var direction = new Vector2D(target.position.x - this.position.x, target.position.y - this.position.y);
		var speed = 0.0005;

		this.acceleration = this.acceleration.smultiply(0.35);
		this.velocity = this.velocity.smultiply(0.995);
		this.acceleration = this.acceleration.add(direction.smultiply(speed));


		if (this.checkNear(target))
		{
			this.destroy();
		}
	}
	
};

Consumable.prototype.update = function() {
	Entity.prototype.update.call(this);
	
	var blackhole = this.world.blackhole;

	if (this.position.distance(this.world.player.position) > 10000)
		this.destroy();
	
	if (blackhole !== undefined){
		this.checkConsumed(blackhole);
		this.gravitate(blackhole);
	}
}

Consumable.prototype.draw = function(context) {
	Entity.prototype.draw.call(this, context);
	if (false && typeof this.decreased !== 'undefined')
		this.decreased.draw(context);
}

Consumable.prototype.checkNear = function(target)
{
	var threshold = 100;
	return this.position.distance(target.position) < threshold;
}

Consumable.prototype.checkGravitate = function(target)
{
	var threshold = 300;
	return this.position.distance(target.position) < threshold;
}

Consumable.prototype.checkConsumed = function(target){
	if (this.world.isTutorial) return false;

	if (this.isConsumed == false)
	{
		if (this.sprite.collidesWith(target.sprite)) {

			// Create a decrease message
			this.decreased = new Tooltip(this.position, -this.deduction);
			
			this.isConsumed = true;
			
			this.decreased.x -= this.decreased.width / 2;
			this.decreased.y = this.position.y - 50;

			var targety = this.decreased.y - 30;
			createjs.Tween.get(this.decreased).wait(400).to({ opacity:0, y: targety }, Config.game.trail.fadeDuration * 2);
			// this.destroy();
			this.world.score -= this.deduction;

			if (this.world.score < 0) this.world.score = 0;
		}
	}
}

Consumable.prototype.destroy = function(target){
	if (this.isDestroying == false){
		this.isDestroying = true;
		createjs.Tween.get(this.sprite).wait(4900).to({ opacity:0, scalex:2.0, scaley:2.00 }, Config.game.trail.fadeDuration).call(function(cons) {cons.isDestroyed = true;}, [this]);
	}
}