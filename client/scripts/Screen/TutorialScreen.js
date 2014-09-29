function TutorialScreen(game){
	GameScreen.call(this, game);
}

TutorialScreen.prototype = Object.create(GameScreen.prototype);
TutorialScreen.prototype.constructor = TutorialScreen;

TutorialScreen.prototype.initialize = function()
{
	GameScreen.prototype.initialize.call(this);
	this.world.isTutorial = true;
	this.world.checkGameOver = TutorialScreen.prototype.checkGameOver;
	this.world.countdownLeft = 50 * 1000;
	this.world.emitter.spawnTime = 10 * 1000;

	this.isDone = false;
	this.tutorialPart = 0;

	var x, y;
	x = 273;
	y = 380;
	this.returnToMenu = new TextSprite("Main menu", x + 20, y + 20, 255, 40);
	this.returnToMenu2 = new Sprite("button", x, y, 255, 80, 1);
	this.spaceDone = 0;


	x = 150;
	y = 70;
	this.panel = new Sprite("panel", x, y, 489, 306, 0.8);

	y += 20;
	this.panelText = new TextSprite("You're a good black hole!", x + 150, y, 200, 40);
	y += 20;
	this.panelText2 = new TextSprite("Keep everyone alive", x + 150, y, 200, 40);
	y += 20;
	this.panelText2half = new TextSprite("to get more points!", x + 150, y, 200, 40);
	y += 40;
	this.panelText3 = new TextSprite("Each object in space", x + 150, y, 200, 40);
	y += 20;
	this.panelText3half = new TextSprite("is a multiplier!", x + 150, y, 200, 40);
	y += 40;
	this.panelText4 = new TextSprite("Get as much points", x + 150, y, 200, 40);
	y += 20;
	this.panelText4half = new TextSprite("in 30 seconds!", x + 150, y, 200, 40);
	y += 40;
	this.panelText5 = new TextSprite("Tap or space to do", x + 150, y, 200, 40);
	y += 20;
	this.panelText5half = new TextSprite("a shockwave pulse!", x + 150, y, 200, 40);

	x = 285;
	y = 275;
	this.arrowLeft = new Sprite("arrowLeft", x, y, 50, 50, 1);
	x += 55;
	this.arrowRight = new Sprite("arrowRight", x, y, 50, 50, 1);
	x += 55;
	this.arrowUp = new Sprite("arrowUp", x, y, 50, 50, 1);
	x += 55;
	this.arrowDown = new Sprite("arrowDown", x, y, 50, 50, 1);

	x = 290;
	y = 320;
	this.howToMovement = new TextSprite("arrow keys to move", x, y, 200, 40);

	this.arrowLeftPressed = new Sprite("arrowLeftPressed", 400, 240, 50, 50, 1);
	this.arrowRightPressed = new Sprite("arrowRightPressed", 400, 240, 50, 50, 1);
	this.arrowUpPressed = new Sprite("arrowUpPressed", 400, 240, 50, 50, 1);
	this.arrowDownPressed = new Sprite("arrowDownPressed", 400, 240, 50, 50, 1);


	x = 290;
	y = 320;
	this.howToShockwave = new TextSprite("space bar to shockwave", x, y, 200, 40);
	x = 250;
	y = 250;
	this.shockwave = new Sprite("spacebar", x, y, 305, 70, 1);

	this.asteroids = new Array();
}

TutorialScreen.prototype.draw = function(context) {
	GameScreen.prototype.draw.call(this, context);

	if (this.isDone){
		this.panel.draw(context);
		this.panelText.draw(context);
		this.panelText2.draw(context);
		this.panelText2half.draw(context);
		this.panelText3.draw(context);
		this.panelText3half.draw(context);
		this.panelText4.draw(context);
		this.panelText4half.draw(context);
		this.panelText5.draw(context);
		this.panelText5half.draw(context);

		this.returnToMenu2.draw(context);
		this.returnToMenu.draw(context);
	}
	else
	{
		this.drawCurrent(context);
	}
}

TutorialScreen.prototype.drawCurrent = function(context){
	switch(this.tutorialPart){
		case 0:
		this.arrowLeft.draw(context);
		this.arrowRight.draw(context);
		this.arrowUp.draw(context);
		this.arrowDown.draw(context);
		this.howToMovement.draw(context);
		break;
		case 1:
		console.log("Drawing current");
		this.howToShockwave.draw(context);
		this.shockwave.draw(context);
		break;
	}
}

TutorialScreen.prototype.update = function() {
	if (this.isDone == false){
		GameScreen.prototype.update.call(this);
		this.updateCurrent();
	}else{
		
	}
}

TutorialScreen.prototype.updateCurrent = function () {
	switch(this.tutorialPart){
		case 0: 
		this.world.countdownLeft = 30000;
		this.world.emitter.spawnTime = 3000;

		if (this.game.InputHandler.isPressed(InputKey.LEFT) 	|| 
			this.game.InputHandler.isPressed(InputKey.RIGHT) 	|| 
			this.game.InputHandler.isPressed(InputKey.UP) 		|| 
			this.game.InputHandler.isPressed(InputKey.DOWN)    ){

			var fadeOutList = [this.arrowLeft, this.arrowRight, this.arrowUp, this.arrowDown, this.howToMovement];
			for (var i = 0; i < fadeOutList.length; i++) {
				createjs.Tween.get(fadeOutList[i]).to({ opacity:0 }, 500, createjs.Ease.quadIn).call(function(tutorialScreen) {
					tutorialScreen.tutorialPart = 1;
				}, [this]);
			};
			
		}
		break;
		case 1:	
		

		if (this.game.InputHandler.isPressed(InputKey.SPACE)){
			if (this.blackhole.injectionTimeout >= 10000)
				this.spaceDone += 1;
			if (this.spaceDone > 2){
				this.changeType = true;
			}
		}




		break;
	}

	if (this.changeType){
		this.teachMovement(type);
		this.teachShockwave(type);

	}
}

TutorialScreen.prototype.teachShockwave = function(type){
	if (type == 1)
	{
		this.changeOpacity -= 0.025;
		if (this.changeOpacity < 0)
			this.changeOpacity = 0;

		this.howToShockwave.opacity = this.shockwave.opacity = this.changeOpacity;

		if (this.changeOpacity <= 0)
		{
			this.tutorialPart += 1;
			this.isDone = true;
			this.changeOpacity = 1;
			this.changeType = false;
		}
	}
}

TutorialScreen.prototype.teachMovement = function(type)
{
	if (type == 0){
		this.changeOpacity -= 0.025;
		if (this.changeOpacity < 0)
			this.changeOpacity = 0;

		this.arrowUp.opacity = this.howToMovement.opacity = this.arrowDown.opacity = this.arrowRight.opacity = this.arrowLeft.opacity = this.changeOpacity;

		if (this.changeOpacity <= 0)
		{
			tutorialPart += 1;
			this.changeOpacity = 1;
			this.changeType = false;
			this.spawnComets();
		}
	}
}

this.CheckIfReturnMainMenu = function(x, y){
	if (!this.game.InputHandler.isPressed(InputKey.ENTER) && (typeof x == 'undefined' || typeof y == 'undefined')) return;
	if (this.returnToMenu.contains(x, y) || this.game.InputHandler.isPressed(InputKey.ENTER)){
		this.game.changeScreen(0);
		this.game.gameScreen.initialize();
		this.game.pressX = this.game.pressY = typeof 'undefined';
	}
}

TutorialScreen.prototype.checkGameOver = function () {
	if (this.countdownLeft <= 0)
	{
		this.initialize();
		// this.game.ScreenManager.changeScreen("GameOverScreen");
	}
	
}