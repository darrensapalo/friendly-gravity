function MainMenuScreen(game){
	this.game = game;
	this.countdown = true;
	this.countdownTimeout = 0;
	this.timerTimeout;
	this.updateTimers;
		
	this.elapsedGameMilliseconds = 0;
	this.elapsedMs = 33;
	
	this.welcomeMessage = new TextSprite("A black hole finds morality and purpose", 290, 100, 200, 40, backgroundColor, foregroundColor);
	this.welcomeMessage.drawBackground = false;
	

	
	this.mousey = this.mousex = 0;
	
	this.Initialize = function () {
		var x = 375;
		this.beginPlaying = new TextSprite("Play", x, 165, 100, 20, backgroundColor, foregroundColor);
		this.beginShopping = new TextSprite("Progress", x, 245, 100, 20, backgroundColor, foregroundColor);
		this.howToPlay = new TextSprite("Tutorial", x, 325, 100, 20, backgroundColor, foregroundColor);
		this.about = new TextSprite("About", x, 405, 100, 20, backgroundColor, foregroundColor);
	
		var button = myGame.GetImage("Button");
		this.beginPlayingButton = new Sprite(button, 273, 140, 255, 80, 1);
		this.beginShoppingButton = new Sprite(button, 273, 220, 255, 80, 1);
		this.howToPlayButton = new Sprite(button, 273, 300, 255, 80, 1);
		this.aboutButton = new Sprite(button, 273, 380, 255, 80, 1);
		
		var button2 = myGame.GetImage("Button2");
		this.beginPlayingButton2 = new Sprite(button2, 273, 140, 255, 80, 1);
		this.beginShoppingButton2 = new Sprite(button2, 273, 220, 255, 80, 1);
		this.howToPlayButton2 = new Sprite(button2, 273, 300, 255, 80, 1);
		this.aboutButton2 = new Sprite(button2, 273, 380, 255, 80, 1);
		
		this.beginPlayingButton.SetBasicOrigin();
		this.beginShoppingButton.SetBasicOrigin();
		this.howToPlayButton.SetBasicOrigin();
		this.aboutButton.SetBasicOrigin();

		this.beginPlayingButton2.SetBasicOrigin();
		this.beginShoppingButton2.SetBasicOrigin();
		this.howToPlayButton2.SetBasicOrigin();
		this.aboutButton2.SetBasicOrigin();

		this.beginPlayingButton2.opacity = 0;
		this.beginShoppingButton2.opacity = 0;
		this.howToPlayButton2.opacity = 0;
		this.aboutButton2.opacity = 0;


		
		this.logo = new Sprite(myGame.GetImage("Logo"), 400, 80, 964 / 3, 439 / 3, 1);
		this.beginPlayingButtonHover = this.beginShoppingButtonHover = this.howToPlayButtonHover = this.aboutButtonHover = false;

		this.soundButton = new Sprite(myGame.GetImage("soundButton"), 50, 420, 106, 106, 1);
		this.soundButton2 = new Sprite(myGame.GetImage("soundButton2"), 50, 420, 106, 106, 1);


	}

	this.Draw = function(context) {
		// Background image
		context.drawImage(myGame.GetImage("bg1"), 0, 0, 800, 480);
		
		// Player
		// this.player.sprite.Draw(context);
		
		// Stars
		// for(var i=0;i<comets.length;i++)
		//	comets[i].sprite.Draw(context);

		this.beginPlayingButton2.Draw(context);
		this.beginPlayingButton.Draw(context);
		
		this.beginShoppingButton2.Draw(context);
		this.beginShoppingButton.Draw(context);
		
		this.howToPlayButton2.Draw(context);
		this.howToPlayButton.Draw(context);
		
		this.aboutButton2.Draw(context);
		this.aboutButton.Draw(context);
		
		
		this.beginPlaying.Draw(context);
		this.beginShopping.Draw(context);
		this.howToPlay.Draw(context);
		this.about.Draw(context);
		
		this.logo.Draw(context);
		this.welcomeMessage.Draw(context);

		this.drawSoundButton(context);
	}

	this.drawSoundButton = function(context){ 
		if (myGame.hasSounds)
			this.soundButton2.Draw(context);
		else
			this.soundButton.Draw(context);
	}
	
	this.Update = function() {
		var x = this.game.pressX;
		var y = this.game.pressY;
		
		this.UpdateTimer();
		this.CheckIfPlayAgain(x, y);
		this.CheckIfShopping (x, y);
		this.CheckIfTutorial(x, y);
		this.CheckIfAbout(x, y);

		this.CheckSoundButton(x, y);
		this.UpdateHover();
		
		this.UpdateMousePos();
	}


	this.CheckSoundButton = function(x, y){
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		var a, b;
		a = this.mousex;
		b = this.mousey;

		if (this.soundButton2.IsInside(x, y)){
			this.toggleSounds();
			this.game.pressY = this.game.pressX = 0;
			if (myGame.hasSounds)
				backgroundMusic.play();
			else
				backgroundMusic.pause();
		}

	}

	this.toggleSounds = function(){
		myGame.hasSounds = !myGame.hasSounds;
	}

	this.UpdateHover = function(){

		
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
	
	this.UpdateMousePos = function(x, y) {
		this.mousex = myGame.mousex;
		this.mousey = myGame.mousey;
	}
	
	this.CheckIfPlayAgain = function(x, y){

		if (this.beginPlayingButton.IsInside(myGame.mousex, myGame.mousey)){
			this.beginPlayingButtonHover = true;
		}else{
			this.beginPlayingButtonHover = false;
		}

		if (!isEnter && (typeof x == 'undefined' || typeof y == 'undefined')) return;
		if (this.beginPlayingButton.IsInside(x, y) || isEnter){
			this.game.ChangeScreen(1);
			this.game.gameScreen.Initialize();
			this.game.pressX = this.game.pressY = 0;
		}
		
		
	}
	
	this.CheckIfShopping = function(x, y){
		if (this.beginShoppingButton.IsInside(myGame.mousex, myGame.mousey)){
			this.beginShoppingButtonHover = true;
		}else{
			this.beginShoppingButtonHover = false;
		}
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.beginShoppingButton.IsInside(x, y)){
			this.game.ChangeScreen(3);
			this.game.pressX = this.game.pressY = 0;
		}
		
	}
	
	this.CheckIfTutorial = function(x, y){
		if (this.howToPlayButton.IsInside(myGame.mousex, myGame.mousey)){
			this.howToPlayButtonHover = true;
		}else{
			this.howToPlayButtonHover = false;
		}
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.howToPlayButton.IsInside(x, y)){
			this.game.ChangeScreen(4);
			this.game.tutorialScreen.Initialize();
			this.game.pressX = this.game.pressY = 0;
			this.howToPlayButtonHover = true;
		}
		
		
	}
	
	this.CheckIfAbout = function(x, y){
		if (this.aboutButton.IsInside(myGame.mousex, myGame.mousey)){
			this.aboutButtonHover = true;
		}else{
			this.aboutButtonHover = false;
		}
		if (typeof x == 'undefined' || typeof y == 'undefined') return;
		if (this.aboutButton.IsInside(x, y)){
			this.game.ChangeScreen(5);
			this.game.pressX = this.game.pressY = 0;
			this.aboutButtonHover = true;
		}
		
		
	}
	
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