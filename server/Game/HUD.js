function HUD(world)
{
	this.world = world;
	this.blackhole = world.blackhole;

	this.PulseNova = new PulseNova(this.blackhole);
}

HUD.prototype.update = function() {
	this.PulseNova.update();
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

module.exports = HUD;