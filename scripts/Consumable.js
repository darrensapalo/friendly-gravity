ConsumableTypes = ["comet", "asteroid", "planet"];

function Consumable(world, type)
{
	Entity.call(this);

	this.world = world;
	this.type = type;

	this.isConsumed = false;
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

Consumable.prototype.consume = function() {

}

Consumable.prototype.update = function() {
	Entity.prototype.update.call(this);
	
	var player = this.world.player;
	var randx = Math.random() * 0.4;
	var randy = Math.random() * 0.4;
	var direction = new Vector2D(player.position.x - this.position.x + randx, player.position.y - this.position.y  + randy);
	this.acceleration = this.acceleration.add(direction.smultiply(0.0005));

	// Add some score
	if (this.world.isGameOver == false)
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
	if (this.isConsumed == false && this.sprite.collidesWith(target.sprite)) {

		// Create a decrease message
		this.decreased = new Tooltip(this.position, -this.deduction);
		target.getHit();
		
		this.isConsumed = true;
		this.startOpacityReduction = true;
		
		this.decreased.setOrigin("centered");
		this.decreased.x = this.sprite.x - 50;
		this.decreased.y = this.sprite.y - 25;

		world.score -= this.deduction;

		if (world.score < 0) world.score = 0;
	}
}

Consumable.prototype.updateDeduction = function(){
	this.decreased.y -= 1;
	this.decreased.opacity *= 0.9;

	if (this.decreased.opacity <= 0.02)
	{
		this.world.entropy(this); // remove from the list
	}
}