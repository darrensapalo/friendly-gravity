function MainMenuScreen(game){
	this.game = game;
	this.countdown = true;
	this.countdownTimeout = 0;
	this.timerTimeout;
	this.updateTimers;

	this.elapsedGameMilliseconds = 0;
	this.elapsedMs = 33;

	this.mousey = this.mousex = 0;
}

MainMenuScreen.prototype = Object.create(Screen.prototype); 
MainMenuScreen.prototype.constructor = MainMenuScreen;

MainMenuScreen.prototype.initialize = function () {
	this.welcomeMessage = new TextSprite("A black hole finds morality and purpose", 290, 100, 200, 40);
	this.welcomeMessage.drawBackground = false;


	this.background = new Background();

	var x = 375;
	this.beginPlaying = new TextSprite("Play", x, 165, 100, 20);
	this.beginShopping = new TextSprite("Progress", x, 245, 100, 20);
	this.howToPlay = new TextSprite("Tutorial", x, 325, 100, 20);
	this.about = new TextSprite("About", x, 405, 100, 20);

	this.beginPlayingButton = new Sprite("button", 273, 140, 255, 80, 1);
	this.beginShoppingButton = new Sprite("button", 273, 220, 255, 80, 1);
	this.howToPlayButton = new Sprite("button", 273, 300, 255, 80, 1);
	this.aboutButton = new Sprite("button", 273, 380, 255, 80, 1);

	this.beginPlayingButton2 = new Sprite("buttonHighlight", 273, 140, 255, 80, 1);
	this.beginShoppingButton2 = new Sprite("buttonHighlight", 273, 220, 255, 80, 1);
	this.howToPlayButton2 = new Sprite("buttonHighlight", 273, 300, 255, 80, 1);
	this.aboutButton2 = new Sprite("buttonHighlight", 273, 380, 255, 80, 1);

	this.beginPlayingButton2.opacity = 0;
	this.beginShoppingButton2.opacity = 0;
	this.howToPlayButton2.opacity = 0;
	this.aboutButton2.opacity = 0;



	this.logo = new CenteredSprite("logo", 400, 80, 964 / 3, 439 / 3, 1);
	this.beginPlayingButtonHover = this.beginShoppingButtonHover = this.howToPlayButtonHover = this.aboutButtonHover = false;

	this.soundButton = new CenteredSprite("sound", 50, 420, 80, 80, 1);
	this.soundButton2 = new CenteredSprite("soundHighlight", 50, 420, 80, 80, 1);


}

MainMenuScreen.prototype.draw = function(context) {
	this.background.draw(context);

	// Player
	// this.player.sprite.draw(context);
	
	// Stars
	// for(var i=0;i<comets.length;i++)
	//	comets[i].sprite.draw(context);

	this.beginPlayingButton2.draw(context);
	this.beginPlayingButton.draw(context);
	
	this.beginShoppingButton2.draw(context);
	this.beginShoppingButton.draw(context);
	
	this.howToPlayButton2.draw(context);
	this.howToPlayButton.draw(context);
	
	this.aboutButton2.draw(context);
	this.aboutButton.draw(context);
	
	
	this.beginPlaying.draw(context);
	this.beginShopping.draw(context);
	this.howToPlay.draw(context);
	this.about.draw(context);
	
	this.logo.draw(context);
	this.welcomeMessage.draw(context);

	this.drawSoundButton(context);
}

MainMenuScreen.prototype.drawSoundButton = function(context){ 
	if (game.hasSounds)
		this.soundButton2.draw(context);
	else
		this.soundButton.draw(context);
}

MainMenuScreen.prototype.update = function() {
	var x = this.game.pressX;
	var y = this.game.pressY;
	
	this.updateTimer();
	this.checkIfPlayAgain(x, y);
	this.checkIfShopping (x, y);
	this.checkIfTutorial(x, y);
	this.checkIfAbout(x, y);

	this.checkSoundButton(x, y);
	this.updateHover();
	
	this.updateMousePos();
}


MainMenuScreen.prototype.checkSoundButton = function(x, y){
	if (typeof x == 'undefined' || typeof y == 'undefined') return;
	var a, b;
	a = this.mousex;
	b = this.mousey;

	if (this.soundButton2.contains(x, y)){
		this.toggleSounds();
		this.game.pressY = this.game.pressX = 0;
		this.game.AudioManager.manage();
	}

}

MainMenuScreen.prototype.toggleSounds = function(){
	game.hasSounds = !game.hasSounds;
}

MainMenuScreen.prototype.updateHover = function(){

	
	if (this.beginPlayingButtonHover){
		this.beginPlayingButton2.opacity += 0.05;
	}else{
		this.beginPlayingButton2.opacity -= 0.05;
	}

	if (this.beginPlayingButton2.opacity >= 1)
		this.beginPlayingButton2.opacity = 1;
	else if (this.beginPlayingButton2.opacity <= 0)
		this.beginPlayingButton2.opacity = 0;





	if (this.beginShoppingButtonHover){
		this.beginShoppingButton2.opacity += 0.05;
	}else{
		this.beginShoppingButton2.opacity -= 0.05;
	}

	if (this.beginShoppingButton2.opacity >= 1)
		this.beginShoppingButton2.opacity = 1;
	else if (this.beginShoppingButton2.opacity <= 0)
		this.beginShoppingButton2.opacity = 0;






	if (this.howToPlayButtonHover){
		this.howToPlayButton2.opacity += 0.05;
	}else{
		this.howToPlayButton2.opacity -= 0.05;
	}

	if (this.howToPlayButton2.opacity >= 1)
		this.howToPlayButton2.opacity = 1;
	else if (this.howToPlayButton2.opacity <= 0)
		this.howToPlayButton2.opacity = 0;









	if (this.aboutButtonHover){
		this.aboutButton2.opacity += 0.05;
	}else{
		this.aboutButton2.opacity -= 0.05;
	}

	if (this.aboutButton2.opacity >= 1)
		this.aboutButton2.opacity = 1;
	else if (this.aboutButton2.opacity <= 0)
		this.aboutButton2.opacity = 0;


}

MainMenuScreen.prototype.updateMousePos = function(x, y) {
	this.mousex = game.mousex;
	this.mousey = game.mousey;
}

MainMenuScreen.prototype.checkIfPlayAgain = function(x, y){

	if (this.beginPlayingButton.contains(game.mousex, game.mousey)){
		this.beginPlayingButtonHover = true;
	}else{
		this.beginPlayingButtonHover = false;
	}

	if (this.game.InputHandler.isPressed(InputKey.ENTER) == false && (typeof x == 'undefined' || typeof y == 'undefined')) return;
	if (this.beginPlayingButton.contains(x, y) || this.game.InputHandler.isPressed(InputKey.ENTER)){
		this.game.changeScreen(1);
		this.game.gameScreen.initialize();
		this.game.pressX = this.game.pressY = 0;
	}
	
	
}

MainMenuScreen.prototype.checkIfShopping = function(x, y){
	if (this.beginShoppingButton.contains(game.mousex, game.mousey)){
		this.beginShoppingButtonHover = true;
	}else{
		this.beginShoppingButtonHover = false;
	}
	if (typeof x == 'undefined' || typeof y == 'undefined') return;
	if (this.beginShoppingButton.contains(x, y)){
		this.game.changeScreen(3);
		this.game.pressX = this.game.pressY = 0;
	}
	
}

MainMenuScreen.prototype.checkIfTutorial = function(x, y){
	if (this.howToPlayButton.contains(game.mousex, game.mousey)){
		this.howToPlayButtonHover = true;
	}else{
		this.howToPlayButtonHover = false;
	}
	if (typeof x == 'undefined' || typeof y == 'undefined') return;
	if (this.howToPlayButton.contains(x, y)){
		this.game.changeScreen(4);
		this.game.tutorialScreen.initialize();
		this.game.pressX = this.game.pressY = 0;
		this.howToPlayButtonHover = true;
	}
	
	
}

MainMenuScreen.prototype.checkIfAbout = function(x, y){
	if (this.aboutButton.contains(game.mousex, game.mousey)){
		this.aboutButtonHover = true;
	}else{
		this.aboutButtonHover = false;
	}
	if (typeof x == 'undefined' || typeof y == 'undefined') return;
	if (this.aboutButton.contains(x, y)){
		this.game.changeScreen(5);
		this.game.pressX = this.game.pressY = 0;
		this.aboutButtonHover = true;
	}
	
	
}

MainMenuScreen.prototype.updateTimerFunc = new function(){
	this.updateTimers = true;
}


MainMenuScreen.prototype.updateTimer = function(){
	if (this.updateTimers){
		this.elapsedGameMilliseconds += 33;
		this.updateTimers = false;
		this.timerTimeout = setTimeout(this.updateTimerFunc, 33);
	}

}