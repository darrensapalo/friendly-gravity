function AudioManager()
{
	this.isReady = false;
	this.isPlaying = false;
	this.isToggled = false;
	this.sfx = // Sound effects
	{
		vortex: this.load("sfxvortex.mp3"),
		shockwave: this.load("shockwave.mp3"),
		volume: 0.13
	};

	this.bgm = this.load("friendly_gravity.mp3");
	this.bgm.audioManager = this;

	this.bgm.addEventListener('loadeddata', function (evt) {
		this.audioManager.isReady = true;
		this.volume = Config.sound.bgmVolume;

		if (Config.musicEnabled)
		{
			this.play();
			isPlaying = true;
		}

		if (Config.bgmRepeat)
		{
			this.addEventListener('ended', function(){
				this.currentTime = 0;
				this.play();
			});
		}
	});

}
// buffers automatically when created
AudioManager.prototype.load = function(filename)
{
	return new Audio("assets/audio/" + filename);
}



AudioManager.prototype.play = function(sound)
{
	if (Config.sound.musicEnabled == false) return false;
	if (isReady == false) return false;

	switch(sound)
	{
		case "bgm": this.bgm.play(); break;
		case "vortex": this.sfx.vortex.play(); break;
		case "shockwave": this.sfx.shockwave.play(); break;
	}
	return true;
}

AudioManager.prototype.toggle = function()
{
	if (Config.musicEnabled == false) return false;
	if (this.bgm === undefined) return false;

	if (isPlaying && isToggled == false){
		isPlaying = !isPlaying;
		isToggled = true;
	}
	if (isPlaying)
		this.bgm.play();
	else
		this.bgm.pause();
}