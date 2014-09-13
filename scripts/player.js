function Player (game){
	this.game = game;

	this.sprite;
	this.anotherSprite;

	this.xAcceleration = 0;
	this.yAcceleration = 0;

	this.score = 0;
	this.isGameOver = false;
	this.countdown = true;
	this.playerSpeed = 3;
	
	this.SHOCKWAVE_PULSE = 0.2; // This can increase the reflect of the stars
	this.cometMovementSpeed = 0.05; // This can decrease the acceleration of the stars
	this.MAX_ACCELERATION = 3; // This can be decreased to slow down the stars
	
	this.hasPulseNova = false;
	this.injectionTimeout = 0;
	
	this.maxOpacity = 0.98;
	this.minOpacity = 0.54;
	
	this.pulseScaling = 40;
	this.pulseOutwards = true;
	this.pulseScalingCounter = this.pulseScaling;
	
	this.playerSize = 50;
	
	this.currentScale = 1;
	this.maxScale = 3;
	this.opacityIncreasing = false;

	this.sprite = new CenteredSprite("player", this.game.canvas.width / 2, this.game.canvas.height / 2, this.playerSize, this.playerSize, 1, 1, 1);
	this.anotherSprite = new CenteredSprite("player", this.game.canvas.width / 2, this.game.canvas.height / 2, this.playerSize, this.playerSize, 1, 1, 1);
	this.sprite.opacity = 0.74;
}

Player.prototype.draw = function (context) {
	if (this.sprite.visible) {
		this.sprite.draw(context);
		this.anotherSprite.draw(context);
	}
}

Player.prototype.setScale = function (scale)
{
	this.sprite.scalex = scale;
	this.sprite.scaley = scale;
	this.sprite.changeOrigin();
	this.anotherSprite.scalex = scale * 0.8;
	this.anotherSprite.scaley = scale * 0.8;
}

Player.prototype.getHit = function ()
{
	if (this.currentScale > this.maxScale)this.currentScale = this.maxScale;
	this.SetScale(this.currentScale += 0.01);
	console.log(this.game);
	this.game.AudioManager.play("vortex");
}

Player.prototype.initialize = function() {
	
}

Player.prototype.rotatePlayer = function(){ this.sprite.rotation -= Math.PI / 86; this.anotherSprite.rotation += Math.PI / 86; }

Player.prototype.movePlayer = function() {
	var player = this.sprite;
	var shadow = this.anotherSprite;
	var playerSpeed = this.playerSpeed;
	var nextX = player.x;
	var nextY = player.y;

	var InputHandler = this.game.InputHandler;

	InputHandler.inputs[InputKey.LEFT].addKeyDownListener(function () {
		nextX -= playerSpeed;
		this.game.gameScreen.mapx += 0.575;
	});

	InputHandler.inputs[InputKey.RIGHT].addKeyDownListener(function () {
		nextX += playerSpeed;
		this.game.gameScreen.mapx -= 0.575;
	});

	InputHandler.inputs[InputKey.UP].addKeyDownListener(function () {
		nextY -= playerSpeed;
		this.game.gameScreen.mapy += 0.575;
	});

	InputHandler.inputs[InputKey.DOWN].addKeyDownListener(function () {
		nextY += playerSpeed;
		this.game.gameScreen.mapy -= 0.575;
	});

	if (nextX < 50)
		nextX = 50;
	else if (nextX > this.game.canvas.width - 50)
		nextX = this.game.canvas.width - 50;

	if (nextY < 50)
		nextY = 50;
	else if (nextY > this.game.canvas.height - 50)
		nextY = this.game.canvas.height - 50;

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

Player.prototype.update = function(){
	this.checkIfInjection();
	this.rotatePlayer();
	this.movePlayer();
	this.checkGameOver();
	this.updateScale();
	this.updateOpacity();
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
			currentComet.xAcceleration = -currentComet.xAcceleration + jitter(currentComet.xAcceleration);
			currentComet.yAcceleration = -currentComet.yAcceleration + jitter(currentComet.yAcceleration);
			
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