function Trail (comet, kind, scale, opacity){
	Entity.call(this);
	this.comet = comet;
	this.kind = kind;

	var M = new MathHelper();
	this.sprite = new CenteredSprite('tail-' + this.kind, this.comet.position.x, this.comet.position.y, Config.game.trail.size, Config.game.trail.size, opacity, scale, scale);
	this.position = this.comet.position;

	createjs.Tween.get(this.sprite).to({ opacity:0 }, Config.game.trail.fadeDuration);
	createjs.Tween.get(this.sprite).to({ scalex:0.2 }, Config.game.trail.fadeDuration);
	createjs.Tween.get(this.sprite).to({ scaley:0.2 }, Config.game.trail.fadeDuration);

	this.acceleration = this.comet.acceleration.smultiply(-4);
}

Trail.prototype = Object.create(Entity.prototype);
Trail.prototype.constructor = Trail;

Trail.prototype.update = function (){
	Entity.prototype.update.call(this);
	
	
}

Trail.prototype.draw = function (context) {
	Entity.prototype.draw.call(this, context);
}