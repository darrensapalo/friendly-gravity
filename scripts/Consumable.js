ConsumableTypes = ["comet", "asteroid", "planet"];

function Consumable(world, type)
{
	Entity.call(this);

	this.world = world;
	this.type = type;

	this.isConsumed = false;
	this.isDestroyed = false;
	this.trail;

	this.points = Config.game.points; // default points
	this.deduction = Config.game.deduction; // default deduction

	// art
	this.decreased;
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

		this.position.x = M.random(25, game.ScreenManager.canvas.width - 50);
		this.position.y = M.random(25, game.ScreenManager.canvas.height - 50);

	}while( this.checkNear( this.world.player ) );

}


Consumable.prototype.update = function() {
	Entity.prototype.update.call(this);
	
	var player = this.world.player;
	var randx = Math.random() * 0.4;
	var randy = Math.random() * 0.4;
	var direction = new Vector2D(player.position.x - this.position.x + randx, player.position.y - this.position.y  + randy);

	if (this.isConsumed == false)
		this.acceleration = this.acceleration.add(direction.smultiply(0.0005));
	else
		this.acceleration = this.acceleration.add(direction.smultiply(0.01));

	this.checkConsumed(player);

	// Add some score
	if (this.world.isGameOver == false && this.isConsumed == false)
		this.world.score += Math.random() * Config.game.points;
}

Consumable.prototype.draw = function(context) {
	Entity.prototype.draw.call(this, context);
	if (typeof this.decreased !== 'undefined')
		this.decreased.draw(context);
}

Consumable.prototype.checkNear = function(target)
{
	var threshold = 100;
	return (Math.sqrt(Math.pow(this.position.x - target.position.x, 2) + Math.pow(this.position.y - target.position.y, 2)) < threshold);
}

Consumable.prototype.checkConsumed = function(target){
	if (this.isConsumed == false)
	{
		if (this.sprite.collidesWith(target.sprite)) {

			// Create a decrease message
			this.decreased = new Tooltip(this.position, -this.deduction);
			
			this.isConsumed = true;
			
			this.decreased.x -= this.decreased.width / 2;
			this.decreased.y = this.position.y - 50;

			var targety = this.decreased.y - 30;

			createjs.Tween.get(this.sprite).wait(1200).to({ opacity:0, scalex:0.01, scaley:0.01 }, Config.game.trail.fadeDuration).call(function(cons) {cons.isDestroyed = true;}, [this]);
			createjs.Tween.get(this.decreased).wait(400).to({ opacity:0, y: targety }, Config.game.trail.fadeDuration * 2);

			this.world.score -= this.deduction;

			if (this.world.score < 0) this.world.score = 0;
		}
	}
}