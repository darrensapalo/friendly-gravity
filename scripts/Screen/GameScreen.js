function GameScreen(game){
	this.game = game;
	
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

		this.gameOver = false;
		this.countdownTimeout = this.injectionTimeout = this.spawnTimeout = 4000;
		this.showMessage = 4000;
		
		this.tutorialText = new TextSprite("Avoid the asteroids and comets", 300, 270, 200, 40, Color.black, Color.light_gray);
		this.finishShowTutorial = false;

		game.timerWidth = 500;
		
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
	}
}