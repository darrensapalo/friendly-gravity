function Player (game, world){
	Entity.call(this);

	this.game = game;
	this.world = world;

	this.anotherSprite;
}

Player.prototype = Object.create(Entity.prototype);
Player.prototype.constructor = Player;



Player.prototype.initialize = function() {
	var canvas = game.ScreenManager.canvas;
	var size = Config.game.player.size;

	this.sprite = new CenteredSprite("player", canvas.width / 2, canvas.height / 2, size, size, 1, 1, 1);
	this.anotherSprite = new CenteredSprite("player", canvas.width / 2, canvas.height / 2, size, size, 1, 1, 1);
	this.sprite.opacity = 0.74;
}


Player.prototype.update = function(){
	Entity.prototype.update.call(this);
}

Player.prototype.draw = function (context) {
	Entity.prototype.draw.call(this, context);
	this.anotherSprite.draw(context);
}



Player.prototype.getHit = function ()
{
	if (this.currentScale > this.maxScale)this.currentScale = this.maxScale;
	this.setScale(this.currentScale += 0.01);
	this.game.AudioManager.play("vortex");
}


Player.prototype.rotatePlayer = function(){ this.sprite.rotation -= Math.PI / 86; this.anotherSprite.rotation += Math.PI / 86; }

Player.prototype.movePlayer = function() {
	var player = this.sprite;
	var shadow = this.anotherSprite;
	var playerSpeed = this.playerSpeed;
	var nextX = player.x;
	var nextY = player.y;

	var InputHandler = this.game.InputHandler;

	if (InputHandler.get(InputKey.LEFT).isPressed) {
		nextX -= playerSpeed;
		this.game.gameScreen.mapx += 0.575;
	};

	if (InputHandler.get(InputKey.RIGHT).isPressed) {
		nextX += playerSpeed;
		this.game.gameScreen.mapx -= 0.575;
	};

	if (InputHandler.get(InputKey.UP).isPressed) {
		nextY -= playerSpeed;
		this.game.gameScreen.mapy += 0.575;
	};

	if (InputHandler.get(InputKey.DOWN).isPressed) {
		nextY += playerSpeed;
		this.game.gameScreen.mapy -= 0.575;
	};

	if (nextX < 50)
		nextX = 50;
	else if (nextX > canvas.width - 50)
		nextX = canvas.width - 50;

	if (nextY < 50)
		nextY = 50;
	else if (nextY > canvas.height - 50)
		nextY = canvas.height - 50;

	shadow.x = player.x = nextX;
	shadow.y = player.y = nextY;
	shadow.opacity = 0.5;
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