function Player (game, world){
	Entity.call(this);

	this.game = game;
	this.world = world;

	this.anotherSprite;
	this.scale = 1;
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;



Player.prototype.initialize = function() {
	var canvas = game.ScreenManager.canvas;
	var size = Config.game.player.size;
	this.position = new Vector2D(canvas.width / 2, canvas.height / 2);

	this.sprite = new CenteredSprite("player", this.position.x, this.position.y, size, size);
	this.anotherSprite = new CenteredSprite("player", this.position.x, this.position.y, size, size);

	this.variation
}

Player.prototype.variation = function() {
	this.sprite.opacity = Config.game.player.opacity.min;
	this.anotherSprite.opacity = Config.game.player.opacity.max;

	this.sprite.scale = Config.game.player.scale.min;
	this.anotherSprite.scale = Config.game.player.scale.max;

	var tweenOpacity = function(s, t){
		var M = new MathHelper();
		t = (t == Config.game.player.opacity.min) ? Config.game.player.opacity.max : Config.game.player.opacity.min;
		return createjs.Tween.get(s).to({ opacity: t }, M.random(1200, 2500), createjs.Ease.linear).call(tweenOpacity, [s, t]);
	}

	var tweenSize = function(s, t){
		var M = new MathHelper();
		t = (t == Config.game.player.scale.min * this.scale) ? Config.game.player.scale.max * this.scale: Config.game.player.scale.min * this.scale;
		return createjs.Tween.get(s).to({ scalex: t, scaley: t }, M.random(1200, 2500), createjs.Ease.linear).call(tweenSize, [s, t, this]);
	}

	this.tween = {
		opacity: 
		{
			first: tweenOpacity(this.sprite, Config.game.player.opacity.min),
			second: tweenOpacity(this.anotherSprite, Config.game.player.opacity.max)
		},
		scale: 
		{
			first: tweenSize(this.sprite, Config.game.player.scale.max),
			second: tweenSize(this.anotherSprite, Config.game.player.scale.min)
		}
	}
}


Player.prototype.update = function(){
	Entity.prototype.update.call(this);
	this.rotatePlayer();
	this.movePlayer();
}

Player.prototype.draw = function (context) {
	Entity.prototype.draw.call(this, context);

	this.anotherSprite.setPosition(this.position);
	this.anotherSprite.draw(context);
}

Player.prototype.getHit = function ()
{
	if (this.currentScale > this.maxScale)this.currentScale = this.maxScale;
	this.setScale(this.currentScale += 0.01);
	this.game.AudioManager.play("vortex");
}


Player.prototype.rotatePlayer = function()
{
	this.sprite.rotation -= Math.PI / 86;
	this.anotherSprite.rotation += Math.PI / 86; 
}

Player.prototype.movePlayer = function() {
	var player = this.sprite;
	var shadow = this.anotherSprite;

	var M = new MathHelper();
	var speed = Config.game.player.movement.acceleration;
	var maxSpeed = Config.game.player.movement.maxAcceleration;

	var InputHandler = this.game.InputHandler;

	if (InputHandler.get(InputKey.LEFT).isPressed) {
		this.acceleration.x = M.clamp(this.acceleration.x - speed, -maxSpeed, +maxSpeed);
		this.game.ScreenManager.currentScreen.mapx += 0.575;
	};

	if (InputHandler.get(InputKey.RIGHT).isPressed) {
		this.acceleration.x = M.clamp(this.acceleration.x + speed, -maxSpeed, +maxSpeed);
		this.game.ScreenManager.currentScreen.mapx -= 0.575;
	};

	if (InputHandler.get(InputKey.UP).isPressed) {
		this.acceleration.y = M.clamp(this.acceleration.y - speed, -maxSpeed, +maxSpeed);
		this.game.ScreenManager.currentScreen.mapy += 0.575;
	};

	if (InputHandler.get(InputKey.DOWN).isPressed) {
		this.acceleration.y = M.clamp(this.acceleration.y + speed, -maxSpeed, +maxSpeed);
		this.game.ScreenManager.currentScreen.mapy -= 0.575;
	};
	
}

Player.prototype.checkGameOver = function() {
	if (this.timer <= 0){
		// this.sprite.visible = false;
		this.isGameOver = true;
	}
}


Player.prototype.updateOpacity = function () {
	
	if (this.sprite.opacity > this.maxOpacity){
		this.sprite.opacity = this.maxOpacity;
		this.opacityIncreasing = false;
	}else if (this.sprite.opacity < this.minOpacity)
	{
		this.sprite.opacity =  this.minOpacity;
		this.opacityIncreasing = true;
	}
	
	if (this.opacityIncreasing)
		this.sprite.opacity += 0.005;
	else
		this.sprite.opacity -= 0.005;
}

Player.prototype.updateScale = function() {
	this.pulseScalingCounter -= 1;
	if (this.pulseScalingCounter <= 0){	
		this.pulseOutwards = !this.pulseOutwards;
		this.pulseScalingCounter = this.pulseScaling;
	}
	
	
	if (this.pulseOutwards)
	{
		this.sprite.scalex += 0.003;
		this.sprite.scaley += 0.003;
	}else{
		this.sprite.scalex -= 0.003;
		this.sprite.scaley -= 0.003;
	}
}


Player.prototype.jitter = function(s){
	return ((Math.random() > 5) ? 1 : -1 ) * Math.random() * s * 2;
}

Player.prototype.getShockwaveCooldown = function (){
	return Config.game.baseShockwaveCD + Math.random() * 2000;
}


Player.prototype.checkIfInjection = function(){

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
	/*
	if (isSpace){
	isSpace = false;
		for(var i=0; i < comets.length; i++){
			var v = comets[i];
			v.Rotate();
		}
	}
	*/
}