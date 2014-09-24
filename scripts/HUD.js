function HUD(world)
{
	this.world = world;
	this.blackhole = world.blackhole;

	this.PulseNova = new PulseNova(this.blackhole);
}

HUD.prototype.update = function() {
	this.PulseNova.update();
}

HUD.prototype.draw = function(context) {
	context.strokeStyle = 'black';
	context.lineWidth = 3;
	context.fillStyle = "#fff";
	context.font = Config.ui.fontSize + " " + Config.ui.font + ", regular"
	context.textBaseline = "top";
	context.textAlign = "center";
	
	var x, y;
	x = 75;
	y = 13;

	context.strokeText("Score: " + Math.floor(this.world.score), x, y);
	context.fillText("Score: " + Math.floor(this.world.score), x, y);

	x = 725;
	y = 13;
	
	var time = Math.floor(this.world.countdownLeft / 1000);
	
	if (time < 0)
		time = 0;
	
	context.strokeText("Time: " + time, x, y);
	context.fillText("Time: " + time, x, y);
	
	

	this.PulseNova.draw(context);
}

HUD.prototype.drawTimer = function(context) {
		var x, y;
		y = 10;
		x = 150;
		context.drawImage(this.game.ImageLoader.images["bar"], x, y, game.timerWidth, 25);
		context.drawImage(this.game.ImageLoader.images["barHolder"], x, y, 500, 25);
	}

HUD.prototype.updateTutorial = function(){
	this.showMessage -= this.elapsedMs;
	if (this.showMessage < 0){
		// decrease opacity of text message
		this.tutorialText.opacity -= 0.025;
		if (this.tutorialText.opacity < 0)
			this.finishShowTutorial = true;
	}
}