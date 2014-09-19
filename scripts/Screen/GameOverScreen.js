function GameOverScreen(game){
	this.game = game;
}	

GameOverScreen.prototype = Object.create(Screen.prototype);
GameOverScreen.prototype.constructor = GameOverScreen;

GameOverScreen.prototype.initialize = function () {
	this.ranking = 0;

	if (game.highScore < game.currentScore)
	{
		game.highScore = game.currentScore;
	}
	
	game.gameScreen.player.cash = game.cash = parseInt(game.cash) + parseInt(game.currentScore);
	game.quit();
	

	var button = game.getImage("Button");
	this.newGame = new TextSprite("Play again", 263, 200, 255, 40, Color.black, Color.light_gray);
	
	var x, y;
	
	x = 50;
	y = 380;
	this.newGame = new TextSprite("Play again", x + 20, y + 20, 255, 40, Color.black, Color.light_gray);
	this.newGame2 = new Sprite(button, x, y, 255, 80, 1);
	

	x += 250;
	y = 380;
	this.returnMainMenu = new TextSprite("Main menu", x + 47, y + 20, 200, 40, Color.black, Color.light_gray);
	this.returnMainMenu2 = new Sprite(button, x, y, 255, 80, 1);
	
	x += 250;
	this.shopButtonCaption = new TextSprite("Shopping", x + 47, y + 20, 200, 40, Color.black, Color.light_gray);
	this.shop = new Sprite(game.getImage("shopButton"), x, y, 255, 80, 1);


	x = 150;
	y = 70;
	var panelTexture = game.getImage("panel");
	this.panel = new Sprite(panelTexture, x, y, 489, 306, 0.8);
	
	y += 40;
	this.panelText2 = new TextSprite("", x + 150, y, 200, 40, Color.black, Color.light_gray);
	y += 40;
	this.panelText3 = new TextSprite("Your current high score is ", x + 150, y, 200, 40, Color.black, Color.light_gray);
	y += 40;
	this.panelText4 = new TextSprite("You are classified as ", x + 150, y, 200, 40, Color.black, Color.light_gray);
	y += 40;
	this.panelText5 = new TextSprite("Chat...", x + 150, y, 200, 40, Color.black, Color.light_gray);
	y += 40;
	this.panelText = new TextSprite("Rank: ", 130, y + 10, 200, 40, Color.black, Color.light_gray);
	
	var starImage = game.getImage("yellowStar");
	x = 300;
	y = 300;
	this.star1 = new Sprite(starImage, x, y, 50, 50, 1); x += 60;
	this.star2 = new Sprite(starImage, x, y, 50, 50, 1); x += 60;
	this.star3 = new Sprite(starImage, x, y, 50, 50, 1); x += 60;
	this.star4 = new Sprite(starImage, x, y, 50, 50, 1); x += 60;
	this.star5 = new Sprite(starImage, x, y, 50, 50, 1);
	
	


	

}

GameOverScreen.prototype.draw = function(context) {
	context.drawImage(game.getImage("bg1"), 0, 0, 800, 480);

	this.panel.draw(context);
	this.panelText.draw(context);
	this.panelText2.draw(context);
	this.panelText3.draw(context);
	this.panelText4.draw(context);
	this.panelText5.draw(context);


	this.drawStars(context);

	this.newGame2.draw(context);
	this.newGame.draw(context);


	this.returnMainMenu2.draw(context);
	this.returnMainMenu.draw(context);

	this.shop.draw(context);
	this.shopButtonCaption.draw(context);
}

GameOverScreen.prototype.drawStars = function (context){
	if (this.ranking >= 1)
		this.star1.draw(context);
	if (this.ranking >= 2)
		this.star2.draw(context);
	if (this.ranking >= 3)
		this.star3.draw(context);
	if (this.ranking >= 4)
		this.star4.draw(context);
	if (this.ranking >= 5)
		this.star5.draw(context);
}

GameOverScreen.prototype.update = function() {
	this.updateTimer();
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