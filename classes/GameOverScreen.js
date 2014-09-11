

function GameOverScreen(game){
	this.game = game;
	this.countdown = true;
	this.countdownTimeout = 0;
	this.timerTimeout;
	this.updateTimers;
		
	this.elapsedGameMilliseconds = 0;
	this.elapsedMs = 33;
	
	
	
	
	this.Initialize = function () {
	this.ranking = 0;

	if (myGame.highScore < myGame.currentScore)
	{
		myGame.highScore = myGame.currentScore;
	}
	
	myGame.gameScreen.player.cash = myGame.cash = parseInt(myGame.cash) + parseInt(myGame.currentScore);
	myGame.Quit();
	
		
	var button = myGame.GetImage("Button");
	this.newGame = new TextSprite("Play again", 263, 200, 255, 40, blackColor, lightColor);
	
	var x, y;
	
	x = 50;
	y = 380;
	this.newGame = new TextSprite("Play again", x + 20, y + 20, 255, 40, blackColor, lightColor);
	this.newGame2 = new Sprite(button, x, y, 255, 80, 1);
	this.newGame2.SetBasicOrigin();
	

	x += 250;
	y = 380;
	this.returnMainMenu = new TextSprite("Main menu", x + 47, y + 20, 200, 40, blackColor, lightColor);
	this.returnMainMenu2 = new Sprite(button, x, y, 255, 80, 1);
	this.returnMainMenu2.SetBasicOrigin();
	
	x += 250;
	this.shopButtonCaption = new TextSprite("Shopping", x + 47, y + 20, 200, 40, blackColor, lightColor);
	this.shop = new Sprite(myGame.GetImage("shopButton"), x, y, 255, 80, 1);
	this.shop.SetBasicOrigin();

			
	x = 150;
	y = 70;
	var panelTexture = myGame.GetImage("panel");
	this.panel = new Sprite(panelTexture, x, y, 489, 306, 0.8);
	
	y += 40;
	this.panelText2 = new TextSprite("", x + 150, y, 200, 40, blackColor, lightColor);
	y += 40;
	this.panelText3 = new TextSprite("Your current high score is ", x + 150, y, 200, 40, blackColor, lightColor);
	y += 40;
	this.panelText4 = new TextSprite("You are classified as ", x + 150, y, 200, 40, blackColor, lightColor);
	y += 40;
	this.panelText5 = new TextSprite("Chat...", x + 150, y, 200, 40, blackColor, lightColor);
	y += 40;
	this.panelText = new TextSprite("Rank: ", 130, y + 10, 200, 40, blackColor, lightColor);
	

	this.panel.SetBasicOrigin();



	var starImage = myGame.GetImage("yellowStar");
	x = 300;
	y = 300;
	this.star1 = new Sprite(starImage, x, y, 50, 50, 1); x += 60;
	this.star2 = new Sprite(starImage, x, y, 50, 50, 1); x += 60;
	this.star3 = new Sprite(starImage, x, y, 50, 50, 1); x += 60;
	this.star4 = new Sprite(starImage, x, y, 50, 50, 1); x += 60;
	this.star5 = new Sprite(starImage, x, y, 50, 50, 1);
	
	// Thick white outside
	// thin black inside


	
		
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
			this.panelText.Draw(context);
			this.panelText2.Draw(context);
			this.panelText3.Draw(context);
			this.panelText4.Draw(context);
			this.panelText5.Draw(context);
			

			this.drawStars(context);

			this.newGame2.Draw(context);
			this.newGame.Draw(context);
			
			
			this.returnMainMenu2.Draw(context);
			this.returnMainMenu.Draw(context);

			this.shop.Draw(context);
			this.shopButtonCaption.Draw(context);
	}

	this.drawStars = function (context){
		if (this.ranking >= 1)
			this.star1.Draw(context);
		if (this.ranking >= 2)
			this.star2.Draw(context);
		if (this.ranking >= 3)
			this.star3.Draw(context);
		if (this.ranking >= 4)
			this.star4.Draw(context);
		if (this.ranking >= 5)
			this.star5.Draw(context);
	}
	
	this.Update = function() {
		this.UpdateTimer();
		this.panelText2.text = "Score: " + this.game.currentScore + "";
		this.panelText3.text = "High Score: " + this.game.highScore + "";
		
		
		 if (this.game.currentScore < 0) { 
			this.panelText5.text = "the World eater";
			this.ranking = 0;
		}else if (this.game.currentScore < 190) { 
			this.panelText5.text = "Sinister black hole";
			this.ranking = 1;
		}else if (this.game.currentScore < 500) {
			this.panelText5.text = "Neighborhood thug";
			this.ranking = 2;
		}else if (this.game.currentScore < 750){
			this.panelText5.text = "average black hole";
			this.ranking = 3;
		}else if (this.game.currentScore < 900){
			this.panelText5.text = "Friend of the galaxy";
			this.ranking = 4;
		}else{
			this.panelText5.text = "Black hole of congeniality";
			this.ranking = 5;
		}
		
		var x = this.game.pressX;
		var y = this.game.pressY;
		
		this.CheckIfPlayAgain(x, y);
		this.CheckIfReturnMainMenu(x, y);
		this.CheckIfShop(x,y);
		
	}
	
	this.CheckIfPlayAgain = function(x, y){

		if (!isEnter && (typeof x == 'undefined' || typeof y == 'undefined')) return;
		if (this.newGame.IsInside(x, y) || isEnter){
			this.game.ChangeScreen(1);
			this.game.gameScreen.Initialize();
			this.game.pressX = this.game.pressY = 0;
		}
	}
	
	this.CheckIfReturnMainMenu = function(x, y){
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.returnMainMenu.IsInside(x, y)){
			this.game.ChangeScreen(0);
			this.game.pressX = this.game.pressY = 0;
		}
	}

	this.CheckIfShop = function(x, y){
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.shop.IsInside(x, y)){
			this.game.ChangeScreen(6);
			this.game.pressX = this.game.pressY = 0;
			this.game.developScreen.Initialize();
		}
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