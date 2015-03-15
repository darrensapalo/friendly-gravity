function MainMenuScreen(game){
	Screen.call(this, game);
}

MainMenuScreen.prototype = Object.create(Screen.prototype); 
MainMenuScreen.prototype.constructor = MainMenuScreen;

MainMenuScreen.prototype.initialize = function () {
	this.welcomeMessage = new TextSprite("A black hole finds morality and purpose", 290, 100, 200, 40);
	this.welcomeMessage.drawBackground = false;


	this.background = new Background();

	var x = 375;
	this.beginPlaying = new TextSprite("Play", x, 155, 100, 20);
	this.beginShopping = new TextSprite("Progress", x, 235, 100, 20);
	this.howToPlay = new TextSprite("Tutorial", x, 315, 100, 20);
	this.about = new TextSprite("About", x, 395, 100, 20);

	var y = 170;
	this.beginPlayingButton = Button.prototype.create("Hoverable", new Vector2D(420, y));		y += 80;
	this.beginShoppingButton = Button.prototype.create("Hoverable", new Vector2D(420, y));		y += 80;
	this.howToPlayButton = Button.prototype.create("Hoverable", new Vector2D(420, y));			y += 80;
	this.aboutButton = Button.prototype.create("Hoverable", new Vector2D(420, y));				y += 80;

	this.logo = new CenteredSprite("logo", 400, 80, 964 / 3, 439 / 3);
	this.beginPlayingButtonHover = this.beginShoppingButtonHover = this.howToPlayButtonHover = this.aboutButtonHover = false;

	this.soundButton = new ToggleButton("sound", "soundHighlight", 730, 420, 80, 80);
}

MainMenuScreen.prototype.draw = function(context) {
	this.background.draw(context);

	this.beginPlayingButton.draw(context);
	this.beginShoppingButton.draw(context);
	this.howToPlayButton.draw(context);
	this.aboutButton.draw(context);
	this.soundButton.draw(context);

	this.beginPlaying.draw(context);
	this.beginShopping.draw(context);
	this.howToPlay.draw(context);
	this.about.draw(context);
	
	this.logo.draw(context);
	this.welcomeMessage.draw(context);	
}

MainMenuScreen.prototype.update = function() {
	this.beginPlayingButton.update();
	this.beginShoppingButton.update();
	this.howToPlayButton.update();
	this.aboutButton.update();
	this.soundButton.update();

	if (game.InputHandler.isPressed(InputKey.ENTER))
	{
		this.game.ScreenManager.changeScreen("GameScreen");
	}
}

MainMenuScreen.prototype.onClick = function (p) {

	var SM = this.game.ScreenManager;
	if (this.soundButton.contains(p)){
		this.game.AudioManager.toggle();
	}

	else if (this.beginPlayingButton.contains(p)){
		SM.changeScreen("GameScreen");
	}

	else if (this.beginShoppingButton.contains(p)){
		SM.changeScreen("ShopScreen");
	}

	else if (this.howToPlayButton.contains(p)){
		SM.changeScreen("TutorialScreen");
	}

	else if (this.aboutButton.contains(p)){
		SM.changeScreen("AboutScreen");
	}
}