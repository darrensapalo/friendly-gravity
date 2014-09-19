function GameOverScreen(game){
	Screen.call(this, game);
}	

GameOverScreen.prototype = Object.create(Screen.prototype);
GameOverScreen.prototype.constructor = GameOverScreen;

GameOverScreen.prototype.initialize = function () {
	this.ranking = 0;

	var world = this.game.world;
	this.round = world.round;

	// Add your cash
	session.cash += this.round.score;

	this.initStars();
	this.initInterface();
	this.initPanel();

	this.initContent();
	
}

GameOverScreen.prototype.initContent = function() {
	this.panelText2.text = "Score: " + this.round.score;
	this.panelText3.text = "High Score: " + session.highScore;

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
}

GameOverScreen.prototype.initInterface = function() {
	var buttonSet = this.game.ScreenManager.createButtons();
	
	this.newGame = buttonSet.texts[0];
	this.newGameButton = buttonSet.buttons[0];
	this.newGame.text = "Play again";
	
	this.returnMainMenu = buttonSet.texts[1];
	this.returnMainMenuButton = buttonSet.buttons[1];
	this.returnMainMenu.text = "Main menu";
	
	this.shop = buttonSet.texts[2];
	this.shopButton = buttonSet.buttons[2];
	this.shop.text = "Shop";
}

GameOverScreen.prototype.initPanel = function () {
	this.panel = this.game.ScreenManager.createPanel();
	var x = 150;
	var y = 90;	
	this.panelText2 = new TextSprite("", x + 150, y, 200, 40, Color.black, Color.light_gray);
	y += 40;
	this.panelText3 = new TextSprite("Your current high score is ", x + 150, y, 200, 40, Color.black, Color.light_gray);
	y += 40;
	this.panelText4 = new TextSprite("You are classified as ", x + 150, y, 200, 40, Color.black, Color.light_gray);
	y += 40;
	this.panelText5 = new TextSprite("Chat...", x + 150, y, 200, 40, Color.black, Color.light_gray);

	y += 60;
	this.panelText = new TextSprite("Rank: ", 130, y + 10, 200, 40, Color.black, Color.light_gray);
}

GameOverScreen.prototype.initStars = function () {
	var x, y;
	x = 270;
	y = 270;
	this.star1 = new Sprite("yellowStar", x, y, 50, 50, 1); x += 60;
	this.star2 = new Sprite("yellowStar", x, y, 50, 50, 1); x += 60;
	this.star3 = new Sprite("yellowStar", x, y, 50, 50, 1); x += 60;
	this.star4 = new Sprite("yellowStar", x, y, 50, 50, 1); x += 60;
	this.star5 = new Sprite("yellowStar", x, y, 50, 50, 1);
}

GameOverScreen.prototype.draw = function(context) {
	context.drawImage(this.game.ImageLoader.images["default_background"], 0, 0, 800, 480);

	/* Draw panels */
	this.panel.draw(context);
	this.panelText.draw(context);
	this.panelText2.draw(context);
	this.panelText3.draw(context);
	this.panelText4.draw(context);
	this.panelText5.draw(context);

	/* Draw score */
	this.drawStars(context);

	/* Draw interface */
	this.newGameButton.draw(context);
	this.newGame.draw(context);

	this.returnMainMenuButton.draw(context);
	this.returnMainMenu.draw(context);

	this.shopButton.draw(context);
	this.shop.draw(context);
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
	this.newGameButton.update();
	this.returnMainMenuButton.update();
	this.shopButton.update();
}

GameOverScreen.prototype.onClick = function (p) {
	var SM = this.game.ScreenManager;
	if (this.newGameButton.contains(p)){
		SM.changeScreen("GameScreen");
	}

	else if (this.returnMainMenuButton.contains(p)){
		SM.changeScreen("MainMenuScreen");
	}

	else if (this.shopButton.contains(p)){
		SM.changeScreen("ShopScreen");
	}
}