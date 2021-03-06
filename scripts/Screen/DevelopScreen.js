function DevelopScreen(game){
	this.game = game;

	this.elapsedGameMilliseconds = 0;
	this.elapsedMs = 33;
}	

DevelopScreen.prototype.initialize = function () {
	this.background = new Background();
	var game = this.game;
	this.blackhole = game.gameScreen.blackhole;

	var x, y;
	x = 150;
	y = 380;
	this.newGame = new TextSprite("Play again", x + 20, y + 20, 255, 40, Color.black, Color.light_gray);
	this.newGame2 = new Sprite("button", x, y, 255, 80, 1);


	x = 400;
	y = 380;
	this.returnMainMenu = new TextSprite("Main menu", x + 47, y + 20, 200, 40, Color.black, Color.light_gray);
	this.returnMainMenu2 = new Sprite("button", x, y, 255, 80, 1);



	x = 150;
	y = 70;
	this.panel = new Sprite("panel", x, y, 489, 306, 0.8);
		/*
		y += 20;
		this.panelText = new TextSprite("Game over", x + 150, y, 200, 40, Color.black, Color.light_gray);
		*/
		y += 20;
		this.panelText7 = new TextSprite("Points: " + game.cash, x + 150, y, 200, 40, Color.black, Color.light_gray);
		y += 40;
		this.panelText3 = new TextSprite("More points " + this.getPointsLevel() + " / 50 (500)", x + 150, y, 200, 40, Color.black, Color.light_gray);
		this.morePoints = new Sprite("morePoints", x + 50, y + 20, 40, 40, 1);
		y += 40;
		this.panelText5 = new TextSprite("Slower stars " + this.getSlowLevel()  + " / 50 (500)", x + 150, y, 200, 40, Color.black, Color.light_gray);
		this.slowerStars = new Sprite("slowerStars", x + 50, y + 20, 50, 40, 1);
		y += 40;
		this.panelText2 = new TextSprite("More time (10000)", x + 150, y, 200, 40, Color.black, Color.light_gray);
		this.moreTime = new Sprite("moreTime", x + 50, y + 20, 40, 40, 1);
		y += 40;
		this.panelText4 = new TextSprite("More stars (50000)", x + 150, y, 200, 40, Color.black, Color.light_gray);
		this.moreStars = new Sprite("moreStars", x + 50, y + 20, 40, 40, 1);
		y += 50;
		this.panelText6 = new TextSprite("click an icon to buy", x + 150, y, 200, 40, Color.black, Color.light_gray);
		

		this.updateOpacity();
		
		this.textTimeout = 3000;
		// Thick white outside
		// thin black inside
		
	}

	DevelopScreen.prototype.getPointsLevel = function() {
		var removeBase = game.points - 0.25;
		removeBase = removeBase / 0.005;
		return Math.ceil(removeBase);
	}

	DevelopScreen.prototype.getMaxPoints = function(){
		return 0.25 + 0.005 * 50;
	}

	DevelopScreen.prototype.getSlowLevel = function() {
		var removeBase = game.speed - 0.01;
		removeBase = removeBase / 0.0005;
		return -Math.ceil(removeBase);
	}


	DevelopScreen.prototype.getMaxSlow = function(){
		return 0.01 - 0.0005 * 50;
	}

	DevelopScreen.prototype.updateOpacity = function(){
		if (game.points >= this.getMaxPoints()){
			this.panelText3.opacity = 0.5;
			this.morePoints.opacity = 0.5;
			// this.cantImprovePoints = true;
		}

		if (game.speed <= this.getMaxSlow()){
			this.panelText5.opacity = 0.5;
			this.slowerStars.opacity = 0.5;
			// this.cantSlowStars = true;
		}

		if (game.duration >= 45){
			this.panelText2.opacity = 0.5;
			this.moreTime.opacity = 0.5;
			this.cantImproveTime = true;
		}

		if (game.difficulty >= 1){
			this.panelText4.opacity = 0.5;
			this.moreStars.opacity = 0.5;
			this.cantSpawnMoreStars = true;
		}
	}

	DevelopScreen.prototype.draw = function(context) {
			this.background.draw(context);
			
			this.panel.draw(context);

			this.panelText2.draw(context);
			this.panelText3.draw(context);
			this.panelText4.draw(context);
			this.panelText5.draw(context);
			this.panelText6.draw(context);
			this.panelText7.draw(context);

			this.moreTime.draw(context);
			this.morePoints.draw(context);
			this.moreStars.draw(context);
			this.slowerStars.draw(context);
			
			
			this.newGame2.draw(context);
			this.newGame.draw(context);
			
			
			this.returnMainMenu2.draw(context);
			this.returnMainMenu.draw(context);
		}

		DevelopScreen.prototype.update = function() {
			this.updateTimer();
		

		var x = this.game.pressX;
		var y = this.game.pressY;

		
		this.CheckIfPlayAgain(x, y);
		this.CheckIfReturnMainMenu(x, y);

		this.CheckIfMoreTime(x, y);
		this.CheckIfMorePoints(x, y);
		this.CheckIfMoreStars(x, y);
		this.CheckIfSlowerStars(x, y);

		this.CheckText();
		
	}

	DevelopScreen.prototype.CheckText = function() {
		this.textTimeout -= 33;
		if (this.textTimeout <= 0){
			this.textTimeout = 3000;
			this.panelText6.text = "click an icon to buy";
		}
		

	};
	
	DevelopScreen.prototype.CheckIfPlayAgain = function(x, y){
		if (this.newGame.contains(x, y)){
			this.game.changeScreen(1);
			this.game.gameScreen.initialize();
			this.game.pressX = this.game.pressY = 0;
		}
	}
	
	DevelopScreen.prototype.CheckIfReturnMainMenu = function(x, y){
		if (this.returnMainMenu.contains(x, y) || this.game.InputHandler.isPressed(InputKey.ENTER)){
			this.game.changeScreen(0);
			this.game.pressX = this.game.pressY = 0;
		}
	}

	


	DevelopScreen.prototype.ResetPressedPos = function(){
		this.game.pressX = this.game.pressY = 0;
	}

	DevelopScreen.prototype.CheckIfMorePoints = function(x, y){
		if (this.cantImprovePoints) return;
		if (this.morePoints.contains(x, y)){
			if (this.CheckIfHasCash(500) && this.getPointsLevel() - 1 < 50){
				this.DeductFromCash(500);
				game.points += 0.005;
				this.panelText6.text = "Double points!";
				game.quit();
				this.initialize();
			}else{
				this.panelText3.textColor = Color.red;
				this.panelText6.text = "Not enough points.";
				this.textTimeout = 3000;
			}
			this.ResetPressedPos();
		}
	}


	DevelopScreen.prototype.CheckIfSlowerStars = function(x, y){
		if (this.cantSlowStars)return;
		if (this.slowerStars.contains(x, y)){
			if (this.CheckIfHasCash(500) && this.getSlowLevel() < 50){
				this.DeductFromCash(500);
				game.speed -= 0.0005;
				this.panelText6.text = "Slower stars!";
				game.quit();
				this.initialize();
			}else{
				this.panelText5.textColor = Color.red;
				this.panelText6.text = "Not enough points.";
				this.textTimeout = 3000;
			}
			this.ResetPressedPos();
		}
	}

	

	DevelopScreen.prototype.CheckIfMoreTime = function(x, y){
		if (this.cantImproveTime) return;
		if (this.moreTime.contains(x, y)){
			if (this.CheckIfHasCash(10000)){
				this.DeductFromCash(10000);
				game.duration = 45;
				this.panelText6.text = "+15 seconds!";
				game.quit();
				this.initialize();
			}else{
				this.panelText2.textColor = Color.red;
				this.panelText6.text = "Not enough points.";
				this.textTimeout = 3000;
			}
			this.ResetPressedPos();
		}
	}

	DevelopScreen.prototype.CheckIfMoreStars = function(x, y){
		if (this.cantSpawnMoreStars)return;
		if (this.moreStars.contains(x, y)){
			if (this.CheckIfHasCash(50000)){
				this.DeductFromCash(50000);
				game.difficulty = 1;
				this.panelText6.text = "Increased stars!";
				game.quit();
				this.initialize();
			}else{
				this.panelText4.textColor = Color.red;
				this.panelText6.text = "Not enough points.";
				this.textTimeout = 3000;
			}
			this.ResetPressedPos();
		}
	}

	
	DevelopScreen.prototype.CheckIfHasCash = function(amount){
		if (Config.cheat.no_cost)
			return true;
		if (this.game.cash >= amount)
			return true;
		
		return false;
	}

	DevelopScreen.prototype.DeductFromCash = function(amount){
		this.game.cash -= amount;
		this.game.quit();
	}

	// TODO: Return to main menu
	
	this.updateTimerFunc = new function(){
		this.updateTimers = true;
	}
	

	DevelopScreen.prototype.updateTimer = function(){
		if (this.updateTimers){
			this.elapsedGameMilliseconds += 33;
			this.updateTimers = false;
			this.timerTimeout = setTimeout(this.updateTimerFunc, 33);
		}
	}