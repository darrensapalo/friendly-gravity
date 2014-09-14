function Entity()
{
	this.position = new Vector2D();
	this.velocity = new Vector2D();
	this.acceleration = new Vector2D();
	this.sprite;
}

Entity.prototype.update = function() {
	this.velocity = this.acceleration.add(this.velocity);
	this.position = this.velocity.add(this.position);

	// friction
	this.acceleration = this.acceleration.smultiply(Config.game.player.movement.friction);
	this.velocity = this.velocity.smultiply(Config.game.player.movement.friction);

	// friction bounds
	if (this.acceleration.x > -0.005 && this.acceleration.x < 0.005)
		this.acceleration.x = 0;
	
	if (this.acceleration.y > -0.005 && this.acceleration.y < 0.005)
		this.acceleration.y = 0;

	if (this.velocity.x > -0.005 && this.velocity.x < 0.005)
		this.velocity.x = 0;
	
	if (this.velocity.y > 0.005 && this.velocity.y < 0.005)
		this.velocity.y = 0;
}

Entity.prototype.bounds = function(rect){
	
}

Entity.prototype.draw = function(context) {
	if (typeof this.sprite === 'undefined') throw new Error("NullError: The sprite of this entity is undefined.");
	this.sprite.x = this.position.x;
	this.sprite.y = this.position.y;
	this.sprite.draw(context);
}