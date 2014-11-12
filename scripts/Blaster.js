function Blaster (game, world, pos, angle){
	Entity.call(this);
	this.game = game;
	this.world = world;
	this.position = pos;
	this.angle = angle;
	this.initialize();
}

Blaster.prototype = Object.create(Entity.prototype);
Blaster.prototype.constructor = Blaster;

Blaster.prototype.initialize = function() {
	var canvas = game.ScreenManager.canvas;
	width = 15;
	height = 15;
	opacity = 1;
	scalex = scaley = 1;
	this.sprite = new CenteredSprite("blaster", this.position.x, this.position.y, width, height, opacity, scalex, scaley);

	var v = new Vector2D(Math.cos(this.angle), Math.sin(this.angle)).smultiply(0.7);
	this.acceleration = this.acceleration.add(v);
	var M = new MathHelper();
	createjs.Tween.get(this.sprite).to({ opacity: 0 }, M.random(1200, 1500), createjs.Ease.linear);
}

Blaster.prototype.update = function(){
	Entity.prototype.update.call(this);
}


Blaster.prototype.draw = function (context) {
	Entity.prototype.draw.call(this, context);
}
