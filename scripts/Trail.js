function Trail (comet, kind, scale){
	Entity.call(this);
	this.comet = comet;
	this.kind = kind;

	var M = new MathHelper();
	this.sprite = new CenteredSprite('tail-' + this.kind, this.comet.position.x, this.comet.position.y, Config.game.trail.size, Config.game.trail.size, 1, scale, scale);
	this.position = this.comet.position;

	createjs.Tween.get(this.sprite).to({ opacity:0 }, Config.game.trail.fadeDuration).call(function(comet, trail) {comet.remove(trail); }, [this.comet, this]);
}

Trail.prototype = Object.create(Entity.prototype);
Trail.prototype.constructor = Trail;

Trail.prototype.update = function (){
	Entity.prototype.update.call(this);
	this.acceleration = this.comet.acceleration.smultiply(-0.5);
	
}

Trail.prototype.draw = function (context) {
	Entity.prototype.draw.call(this, context);
}