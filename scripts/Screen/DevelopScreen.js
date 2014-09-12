

function DevelopScreen(game){
	this.game = game;
		
	this.elapsedGameMilliseconds = 0;
	this.elapsedMs = 33;
	
	
	
	
	this.Initialize = function () {
		var myGame = this.game;
		this.player = myGame.gameScreen.player;
			
		var button = myGame.GetImage("Button");
		var x, y;

		
		x = 150;
		y = 380;
		this.newGame = new TextSprite("Play again", x + 20, y + 20, 255, 40, Color.black, Color.light_gray);
		this.newGame2 = new Sprite(button, x, y, 255, 80, 1);
		this.newGame2.SetBasicOrigin();
		

		x = 400;
		y = 380;
		this.returnMainMenu = new TextSprite("Main menu", x + 47, y + 20, 200, 40, Color.black, Color.light_gray);
		this.returnMainMenu2 = new Sprite(button, x, y, 255, 80, 1);
		this.returnMainMenu2.SetBasicOrigin();
		
		
				
		x = 150;
		y = 70;
		var panelTexture = myGame.GetImage("panel");
		this.panel = new Sprite(panelTexture, x, y, 489, 306, 0.8);
		/*
		y += 20;
		this.panelText = new TextSprite("Game over", x + 150, y, 200, 40, Color.black, Color.light_gray);
		*/
		y += 20;
		this.panelText7 = new TextSprite("Points: " + myGame.cash, x + 150, y, 200, 40, Color.black, Color.light_gray);
		y += 40;
		this.panelText3 = new TextSprite("More points " + getPointsLevel() + " / 50 (500)", x + 150, y, 200, 40, Color.black, Color.light_gray);
		this.morePoints = new Sprite(myGame.GetImage("morePoints"), x+ 50, y + 20, 40, 40, 1);
		y += 40;
		this.panelText5 = new TextSprite("Slower stars " + getSlowLevel()  + " / 50 (500)", x + 150, y, 200, 40, Color.black, Color.light_gray);
		this.slowerStars = new Sprite(myGame.GetImage("slowerStars"), x+ 50, y + 20, 50, 40, 1);
		y += 40;
		this.panelText2 = new TextSprite("More time (10000)", x + 150, y, 200, 40, Color.black, Color.light_gray);
		this.moreTime = new Sprite(myGame.GetImage("moreTime"), x + 50, y + 20, 40, 40, 1);
		y += 40;
		this.panelText4 = new TextSprite("More stars (50000)", x + 150, y, 200, 40, Color.black, Color.light_gray);
		this.moreStars = new Sprite(myGame.GetImage("moreStars"), x+ 50, y + 20, 40, 40, 1);
		y += 50;
		this.panelText6 = new TextSprite("click an icon to buy", x + 150, y, 200, 40, Color.black, Color.light_gray);
		

		this.UpdateOpacity();
		
		this.panel.SetBasicOrigin();
		
		this.textTimeout = 3000;
		// Thick white outside
		// thin black inside
		
	}

	function getPointsLevel() {
		var removeBase = myGame.pointsRange - 0.25;
		removeBase = removeBase / 0.005;
		return Math.ceil(removeBase);
	}

	function getMaxPoints(){
		return 0.25 + 0.005 * 50;
	}

	function getSlowLevel() {
		var removeBase = myGame.starMovementSpeed - 0.01;
		removeBase = removeBase / 0.0005;
		return -Math.ceil(removeBase);
	}


	function getMaxSlow(){
		return 0.01 - 0.0005 * 50;
	}

	this.UpdateOpacity = function(){
		if (myGame.pointsRange >= getMaxPoints()){
			this.panelText3.opacity = 0.5;
			this.morePoints.opacity = 0.5;
			// this.cantImprovePoints = true;
		}

		if (myGame.starMovementSpeed <= getMaxSlow()){
			this.panelText5.opacity = 0.5;
			this.slowerStars.opacity = 0.5;
			// this.cantSlowStars = true;
		}

		if (myGame.gameDuration >= 45){
			this.panelText2.opacity = 0.5;
			this.moreTime.opacity = 0.5;
			this.cantImproveTime = true;
		}

		if (myGame.difficulty >= 1){
			this.panelText4.opacity = 0.5;
			this.moreStars.opacity = 0.5;
			this.cantSpawnMoreStars = true;
		}
	}

	this.Draw = function(context) {
			// Background image
			context.drawImage(myGame.GetImage("bg1"), 0, 0, 800, 480);
			
			// Player
			// this.player.sprite.Draw(context);
			
			// Stars
			// for(var i=0;i<comets.length;i++)
			//	comets[i].sprite.Draw(context);
			
			
			this.panel.Draw(context);
			// this.panelText.Draw(context);
			this.panelText2.Draw(context);
			this.panelText3.Draw(context);
			this.panelText4.Draw(context);
			this.panelText5.Draw(context);
			this.panelText6.Draw(context);
			this.panelText7.Draw(context);

			console.log(this.moreTime);
			this.moreTime.Draw(context);
			this.morePoints.Draw(context);
			this.moreStars.Draw(context);
			this.slowerStars.Draw(context);
			
			
			this.newGame2.Draw(context);
			this.newGame.Draw(context);
			
			
			this.returnMainMenu2.Draw(context);
			this.returnMainMenu.Draw(context);
	}
	
	this.Update = function() {
		this.UpdateTimer();
		/*
		this.panelText2.text = "Your final score is " + this.game.currentScore + "!";
		this.panelText3.text = "Your current high score is " + this.game.highScore + "!";
		
		
		if (this.game.currentScore < 190) { 
			this.panelText5.text = "the World eater";
		}else if (this.game.currentScore < 500) {
			this.panelText5.text = "Neighborhood thug";
		}else if (this.game.currentScore < 750){
			this.panelText5.text = "average black hole";
		}else if (this.game.currentScore < 900){
			this.panelText5.text = "Friend of the galaxy";
		}else{
			this.panelText5.text = "Black hole of congeniality";
		}
		*/
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

	this.CheckText = function() {
		this.textTimeout -= 33;
		if (this.textTimeout <= 0){
			this.textTimeout = 3000;
			this.panelText6.text = "click an icon to buy";
		}
		

	};
	
	this.CheckIfPlayAgain = function(x, y){
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.newGame.IsInside(x, y)){
			this.game.ChangeScreen(1);
			this.game.gameScreen.Initialize();
			this.game.pressX = this.game.pressY = 0;
		}
	}
	
	this.CheckIfReturnMainMenu = function(x, y){
		if (!isEnter && (typeof x == 'undefined' || typeof y == 'undefined')) return;
		if (this.returnMainMenu.IsInside(x, y) || isEnter){
			this.game.ChangeScreen(0);
			this.game.pressX = this.game.pressY = 0;
		}
	}

	


	this.ResetPressedPos = function(){
		this.game.pressX = this.game.pressY = 0;
	}

	this.CheckIfMorePoints = function(x, y){
		if (this.cantImprovePoints) return;
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.morePoints.IsInside(x, y)){
			if (this.CheckIfHasCash(500) && getPointsLevel() - 1 < 50){
				this.DeductFromCash(500);
				myGame.pointsRange += 0.005;
				this.panelText6.text = "Double points!";
				myGame.Quit();
				this.Initialize();
			}else{
				this.panelText3.textColor = redColor;
				this.panelText6.text = "Not enough points.";
				this.textTimeout = 3000;
			}
			this.ResetPressedPos();
		}
	}


	this.CheckIfSlowerStars = function(x, y){
		if (this.cantSlowStars)return;
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.slowerStars.IsInside(x, y)){
			if (this.CheckIfHasCash(500) && getSlowLevel() - 1 < 50){
				this.DeductFromCash(500);
				myGame.starMovementSpeed -= 0.0005;
				this.panelText6.text = "Slower stars!";
				myGame.Quit();
				this.Initialize();
			}else{
				this.panelText5.textColor = redColor;
				this.panelText6.text = "Not enough points.";
				this.textTimeout = 3000;
			}
			this.ResetPressedPos();
		}
	}

	

	this.CheckIfMoreTime = function(x, y){
		if (this.cantImproveTime) return;
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.moreTime.IsInside(x, y)){
			if (this.CheckIfHasCash(10000)){
				this.DeductFromCash(10000);
				myGame.gameDuration = 45;
				this.panelText6.text = "+15 seconds!";
				myGame.Quit();
				this.Initialize();
			}else{
				this.panelText2.textColor = redColor;
				this.panelText6.text = "Not enough points.";
				this.textTimeout = 3000;
			}
			this.ResetPressedPos();
		}
	}

	this.CheckIfMoreStars = function(x, y){
		if (this.cantSpawnMoreStars)return;
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.moreStars.IsInside(x, y)){
			if (this.CheckIfHasCash(50000)){
				this.DeductFromCash(50000);
				myGame.difficulty = 1;
				this.panelText6.text = "Increased stars!";
				myGame.Quit();
				this.Initialize();
			}else{
				this.panelText4.textColor = redColor;
				this.panelText6.text = "Not enough points.";
				this.textTimeout = 3000;
			}
			this.ResetPressedPos();
		}
	}

	
	this.CheckIfHasCash = function(amount){
		return true;
		if (myGame.cash >= amount) return true;
	}

	this.DeductFromCash = function(amount){
		myGame.cash -= amount;
		myGame.Quit();
	}

	// TODO: Return to main menu
	
	this.updateTimerFunc = new function(){
		this.updateTimers = true;
	}
	
			
	this.UpdateTimer = function(){
		if (this.updateTimers){
			this.elapsedGameMilliseconds += 33;
			this.updateTimers = false;
			this.timerTimeout = setTimeout(this.updateTimerFunc, 33);
		}
	}
}