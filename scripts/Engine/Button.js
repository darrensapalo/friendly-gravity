function Button(spriteName, width, height)
{
	Entity.call(this);
	this.sprite = new CenteredSprite(this.spriteName, 0, 0, width, height);
}

Button.prototype = Object.create(Entity.prototype);
Button.prototype.constructor = Button;

