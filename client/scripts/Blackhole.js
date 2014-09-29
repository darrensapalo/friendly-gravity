function Blackhole (game, world){
	Entity.call(this);

	this.game = game;
	this.world = world;

	this.anotherSprite = null;
	this.scale = 1;

}

Blackhole.prototype = Object.create(Entity.prototype);
Blackhole.prototype.constructor = Blackhole;



Blackhole.prototype.initialize = function() {
	var canvas = game.ScreenManager.canvas;
	var size = Config.game.blackhole.size;
	this.position = new Vector2D(canvas.width / 2, canvas.height / 2);

	this.sprite = new CenteredSprite("blackhole", this.position.x, this.position.y, size, size);
	this.anotherSprite = new CenteredSprite("blackhole", this.position.x, this.position.y, size, size);
}

Blackhole.prototype.variation = function() {
	this.sprite.opacity = Config.game.blackhole.opacity.min;
	this.anotherSprite.opacity = Config.game.blackhole.opacity.max;

	this.sprite.scale = Config.game.blackhole.scale.min;
	this.anotherSprite.scale = Config.game.blackhole.scale.max;

	var tweenOpacity = function(s, t){
		var M = new MathHelper();
		t = (t == Config.game.blackhole.opacity.min) ? Config.game.blackhole.opacity.max : Config.game.blackhole.opacity.min;
		return createjs.Tween.get(s).to({ opacity: t }, M.random(1200, 2500), createjs.Ease.linear).call(tweenOpacity, [s, t]);
	}

	var tweenSize = function(s, t){
		var M = new MathHelper();
		t = (t == Config.game.blackhole.scale.min * this.scale) ? Config.game.blackhole.scale.max * this.scale: Config.game.blackhole.scale.min * this.scale;
		return createjs.Tween.get(s).to({ scalex: t, scaley: t }, M.random(1200, 2500), createjs.Ease.linear).call(tweenSize, [s, t, this]);
	}

	this.tween = {
		opacity: 
		{
			first:  tweenOpacity(this.sprite, Config.game.blackhole.opacity.min),
			second: tweenOpacity(this.anotherSprite, Config.game.blackhole.opacity.max)
		},
		scale: 
		{
			first:  tweenSize(this.sprite, Config.game.blackhole.scale.max),
			second: tweenSize(this.anotherSprite, Config.game.blackhole.scale.min)
		}
	}
}


Blackhole.prototype.update = function(){
	Entity.prototype.update.call(this);
	this.rotateBlackhole();
	this.bound();
	this.acceleration = this.acceleration.smultiply(0.8);
}

Blackhole.prototype.bound = function (context) {
	var M = new MathHelper();
	
	if (M.outsideClamp(this.position.x, 70, 730) || M.outsideClamp(this.position.y, 70, 410))
	{
		this.velocity.x     *= Config.game.blackhole.movement.spaceBound;
		this.acceleration.x *= Config.game.blackhole.movement.spaceBound;
		this.velocity.y     *= Config.game.blackhole.movement.spaceBound;
		this.acceleration.y *= Config.game.blackhole.movement.spaceBound;
	}

	this.position.x = M.clamp(this.position.x, 40, 760);
	this.position.y = M.clamp(this.position.y, 70, 440);
}

Blackhole.prototype.draw = function (context) {
	Entity.prototype.draw.call(this, context);

	this.anotherSprite.setPosition(this.position);
	this.anotherSprite.draw(context);
}

Blackhole.prototype.getHit = function ()
{
	if (this.currentScale > this.maxScale)this.currentScale = this.maxScale;
	this.setScale(this.currentScale += 0.01);
	this.game.AudioManager.play("vortex");
}


Blackhole.prototype.rotateBlackhole = function()
{
	this.sprite.rotation -= Math.PI / 86;
	this.anotherSprite.rotation += Math.PI / 86; 
}


Blackhole.prototype.jitter = function(s){
	return ((Math.random() > 5) ? 1 : -1 ) * Math.random() * s * 2;
}

Blackhole.prototype.getShockwaveCooldown = function (){
	return Config.game.baseShockwaveCD + Math.random() * 2000;
}


Blackhole.prototype.checkIfInjection = function(){

	this.injectionTimeout -= this.game.gameScreen.elapsedMs;
	
	if (this.isTutorial)
		var comets = this.game.tutorialScreen.asteroids;
	else
		var comets = this.game.gameScreen.comets;
	
	if (this.injectionTimeout <= 0)
		this.hasPulseNova = true;

	if (game.InputHandler.isPressed(InputKey.SPACE) && this.hasPulseNova){
		if (Config.musicEnabled)
			this.game.AudioManager.play("shockwave");
		this.hasPulseNova = false;
		this.injectionTimeout = this.getShockwaveCooldown();
		for (var i = 0; i < comets.length; i++)
		{
			var currentComet = comets[i];
			currentComet.xAcceleration = -currentComet.xAcceleration + this.jitter(currentComet.xAcceleration);
			currentComet.yAcceleration = -currentComet.yAcceleration + this.jitter(currentComet.yAcceleration);
			
			currentComet.xAcceleration *= this.SHOCKWAVE_PULSE;
			currentComet.yAcceleration *= this.SHOCKWAVE_PULSE;
			currentComet.Jiggle();
		}
	}
}