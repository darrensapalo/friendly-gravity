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
}

Entity.prototype.draw = function(context) {
	this.sprite.x = this.position.x;
	this.sprite.y = this.position.y;
	this.sprite.draw(context);
}