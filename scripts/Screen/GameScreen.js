function GameScreen(game){
	this.game = game;
	this.player;
	this.playerSpeed = 3;
	this.willSpawn = false;
	this.hasInjection = true;
	this.countdown = true;
	this.spawnTimeout;
	this.injectionTimeout;
	this.countdownTimeout;
	this.timerTimeout;
	this.updateTimers;
	
	this.comets = new Array();
	this.planets = new Array();

	this.countdownLeft;
	
	this.elapsedGameMilliseconds = 0;
	this.elapsedMs = 33;
	this.starSpawnTimer = 2000;
	this.starSpawnRandom = 500;
	this.planetSpawnTimeout = 5000;
	
	this.gameOver = false;
	
	
	// TODO: bar cooldown
	
	this.resizeWidth = 800 * 1.3;
	this.resizeHeight = 480 * 1.3;
	
	this.mapx = this.originalmapx = -120;
	this.mapy = this.originalmapy = -72;

	this.initialize = function () {
		// Initialize player
		
		this.mapx = this.originalmapx;
		this.mapy = this.originalmapy;
		
		this.player = new Player(this.game);
		this.player.initialize();
		
		// Initialize game countdown
		this.countdownLeft = parseInt(game.duration) * 1000 + 4000;
		this.comets = new Array();
		this.planets = new Array();

		this.gameOver = false;
		this.countdownTimeout = this.injectionTimeout = this.spawnTimeout = 4000;
		this.showMessage = 4000;
		
		this.tutorialText = new TextSprite("Avoid the asteroids and comets", 300, 270, 200, 40, Color.black, Color.light_gray);
		this.finishShowTutorial = false;

		game.timerWidth = 500;
		
	}

	this.ComputeTimerWidth = function() {
		var val;
		
		/* Player score
		val = this.player.score / 1200 * 500;
		return val;
		*/

		/* Timer
		var x = this.countdownLeft / game.duration / 1000 * 500;

		game.timerWidth = x;
		return x;

		*/

		x = (this.player.baseShockwaveCD - this.player.injectionTimeout) /  this.player.baseShockwaveCD * 500;


		if (x >= 500)
			x = 500;
		if (x <= 0)
			x = 0;

		return x;
	}

	this.getBackground = function() {
		if (this.game.difficulty == 1)
			return this.game.ImageLoader.images["unlocked_background"];

		return this.game.ImageLoader.images["default_background"];
	}

	this.draw = function(context) {
			// Background image
			context.drawImage(this.getBackground(), this.mapx, this.mapy, this.resizeWidth, this.resizeHeight);
			
			// Player
			this.player.draw(context);
			
			// Stars
			for(var i=0;i<this.comets.length;i++)
				this.comets[i].draw(context);

			// Planets
			for(var i=0;i<this.planets.length;i++)
				this.planets[i].draw(context);
			
			// HUD
			this.drawHUD(context);
			
			this.drawTimer(context);

			if (!this.finishShowTutorial)
				this.tutorialText.draw(context);
	}
	
	this.CheckGameOver = function(){
		
		if (this.countdownLeft <= 0)
		{
			this.game.changeScreen(2);
			if (this.gameOver)return;
			this.gameOver = true;
			this.game.currentScore = Math.floor(this.player.score);
			game.gameOverScreen.initialize();
		}
	}

	this.update = function() {
		this.CheckGameOver();
		this.updateTimer();
		
		this.CheckSpawn();
		this.CheckSpawnPlanet();

		this.updatePlayer();
		this.updateComet();
		
		this.CountdownUpdater();
		this.updateTutorial();

		game.timerWidth = this.ComputeTimerWidth();
		
		
		if (this.mapx < this.originalmapx)
			this.mapx += Math.abs(this.mapx - this.originalmapx) * 0.025;
		else if (this.mapx > this.originalmapx)
			this.mapx -= Math.abs(this.mapx - this.originalmapx) * 0.025;
			
		if (this.mapy < this.originalmapy)
			this.mapy += Math.abs(this.mapy - this.originalmapy) * 0.025;
		else if (this.mapy > this.originalmapy)
			this.mapy -= Math.abs(this.mapy - this.originalmapy) * 0.025;
			
		
	}
	
	this.updateTimerFunc = function(){
		this.updateTimers = true;
	}
	
			
	this.updateTimer = function(){
		if (this.updateTimers){
			this.elapsedGameMilliseconds += 33;
			this.updateTimers = false;
			timerTimeout = setTimeout(this.updateTimerFunc, 33);
		}

	}
	
	this.updateTutorial = function(){
		this.showMessage -= this.elapsedMs;
		if (this.showMessage < 0){
			// decrease opacity of text message
			this.tutorialText.opacity -= 0.025;
			if (this.tutorialText.opacity < 0)
				this.finishShowTutorial = true;
		}
	}
	
	this.CountdownUpdater = function(){
		this.countdownLeft -= this.elapsedMs;
	}
	
	this.removeComet = function(target) {
	for (var i = 0; i < this.comets.length; i++){
		if (this.comets[i] == target) {
			this.comets.splice(i,1);
			return;
			}
		}
	}

	this.removePlanet = function(target) {
	for (var i = 0; i < this.planets.length; i++){
		if (this.planets[i] == target) {
			this.planets.splice(i,1);
			return;
			}
		}
	}
	
	this.updateComet = function(){
		for (var i = 0; i < this.comets.length; i++)
			this.comets[i].Update(this.player);

		for (var i = 0; i < this.planets.length; i++)
			this.planets[i].Update(this.player);
	}
	
	this.updatePlayer = function(){
		this.player.update();
	}

	this.drawTimer = function(context) {
		var x, y;
		y = 10;
		x = 150;
		context.drawImage(this.game.ImageLoader.images["bar"], x, y, game.timerWidth, 25);
		context.drawImage(this.game.ImageLoader.images["barHolder"], x, y, 500, 25);
	}
	
	this.drawHUD = function(context){
		context.strokeStyle = 'black';
		context.lineWidth = 3;
		context.fillStyle = "#fff";
		context.font = Config.fontSize + " " + Config.font + ", regular"
		context.textBaseline = "top";
		context.textAlign = "center";
		var x, y;
		x = 75;
		y = 13;
		// context.strokeText("Time left: " + this.countdownLeft, 100, 20);
		context.strokeText("Score: " + Math.floor(this.player.score), x, y);
		// context.fillText("Time left: " + this.countdownLeft, 100, 20);
		context.fillText("Score: " + Math.floor(this.player.score), x, y);


		x = 725;
		y = 13;
		var time = Math.floor(this.countdownLeft / 1000);
		if (time < 0)
			time = 0;
		context.strokeText("Time: " + time, x, y);
		// context.fillText("Time left: " + this.countdownLeft, 100, 20);
		context.fillText("Time: " + time, x, y);
		
		
	}
	

	this.CheckSpawnPlanet = function(){
		this.planetSpawnTimeout -= this.elapsedMs;
			if (this.planetSpawnTimeout <= 0)
				var willSpawn = true;
			
				if (willSpawn) {
				
					// Create a new comet
					var p = new Planet();
					
					// Initialize 
					p.initialize();
					this.planets.push(p);
					willSpawn = false;
					this.planetSpawnTimeout = Math.random() * this.starSpawnRandom + this.starSpawnTimer * 5;
					
				}
	}

	
	this.CheckSpawn  = function(){
		this.spawnTimeout -= this.elapsedMs;
		if (this.spawnTimeout <= 0)
			var willSpawn = true;
		
			if (willSpawn) {
			
				// Create a new comet
				var v = new Comet();
				
				// Initialize 
				v.initialize(-1);
				if (v.isAsteroid())
					this.spawnTimeout = 100;
				
				this.comets.push(v);
				willSpawn = false;
				if (game.difficulty == 1)
					this.spawnTimeout = Math.random() * this.starSpawnRandom / 1.5 + this.starSpawnTimer;
				else 
					this.spawnTimeout = Math.random() * this.starSpawnRandom + this.starSpawnTimer;
				
			}
	}
	
	
}