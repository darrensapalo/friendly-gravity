function AudioManager()
{
	var isReady = false;
	var isPlaying = false;
	var isToggled;
	var bgm = {};
	var sfx = {};

	// buffers automatically when created
	this.load = function(filename)
	{
		return new Audio("assets/audio/" + filename);
	}

	bgm = this.load("friendly_gravity.mp3");

	bgm.addEventListener('loadeddata', function () {
		isReady = true;
		bgm.volume = Config.sound.bgmVolume;

		if (Config.musicEnabled)
		{
			this.play("bgm");
			isPlaying = true;
		}

		if (Config.bgmRepeat)
		{
			bgm.addEventListener('ended', function(){
				bgm.currentTime = 0;
				bgm.play();
			});
		}
	});
	
	// Sound effects
	sfx = {
		vortex: this.load("sfxvortex.mp3"),
		shockwave: this.load("shockwave.mp3"),
		volume: 0.13
	};

	this.play = function(sound)
	{
		if (Config.sound.musicEnabled == false) return false;
		if (isReady == false) return false;

		switch(sound)
		{
			case "bgm": bgm.play(); break;
			case "vortex": sfx.vortex.play(); break;
			case "shockwave": sfx.shockwave.play(); break;
		}
		return true;
	}

	this.toggle = function()
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
}