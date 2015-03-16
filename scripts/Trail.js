function Trail (comet, kind, scale, opacity){
	Entity.call(this);
	this.comet = comet;
	this.kind = kind;
	this.sprite = new CenteredSprite('tail-' + this.kind, this.comet.position.x, this.comet.position.y, Config.game.trail.size, Config.game.trail.size, opacity, scale, scale);
	this.position = this.comet.position;
	this.velocity = comet.velocity.smultiply(-0.3);
	createjs.Tween.get(this.sprite).to({ opacity:0 }, Config.game.trail.fadeDuration);
	createjs.Tween.get(this.sprite).to({ scalex:0.1 }, Config.game.trail.fadeDuration);
	createjs.Tween.get(this.sprite).to({ scaley:0.1 }, Config.game.trail.fadeDuration);
}

Trail.prototype = Object.create(Entity.prototype);
Trail.prototype.constructor = Trail;