function HPBar(target, offset, HP)
{
	ChildEntity.call(this, target, offset);
	this.maxHP = HP;
	this.currentHP = HP;

	var scalex = 0.08;
	var scaley = 0.25;
	var opacity = 1;

	this.sprite = new CenteredSprite("bar", 0, 0, 750, 38, opacity, scalex, scaley);
	this.holderSprite = new CenteredSprite("barHolder", 0, 0, 750, 38, opacity, scalex, scaley);
}

HPBar.prototype = Object.create(ChildEntity.prototype);
HPBar.prototype.constructor = HPBar;

HPBar.prototype.draw = function(context) {
	ChildEntity.prototype.draw.call(this, context);
	this.holderSprite.draw.call(this.holderSprite, context);
}

HPBar.prototype.update = function() {
	ChildEntity.prototype.update.call(this);
	this.holderSprite.setPosition(this.position);
}