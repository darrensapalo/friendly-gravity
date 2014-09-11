function AudioManager()
{
	var is_ready = false;
	var is_playing;
	var is_toggled;

	// buffers automatically when created
	this.load = function(filename)
	{
		return new Audio("assets/audio/" + filename);
	}

	var background_music = this.load("new bgm.mp3");
	background_music.addEventListener('loaded', function () {
		is_ready = true;
	});

	// Background audio
	this.sound = 
	{
		bgm: background_music,
		volume: 0,
		loop: true,
	}
	
	// Sound effects
	this.sfx = {
		vortex: this.load("sfxvortex.mp3"),
		shockwave: this.load("shockwave.mp3"),
		volume: 0.13
	}

	this.Play = function(sound)
	{
		switch(sound)
		{
			case "bgm": this.background_music.play();
			case "vortex": this.sfx.vortex.play();
			case "shockwave": this.sfx.shockwave.play();
		}
	}

	this.Manage = function()
	{
		if (Config.music == false) return;
		if (is_ready == false) return;

		if (is_playing && is_toggled == false){
			is_playing = !is_playing;
			is_toggled = true;
		}

		if (is_playing)
			this.sound.bgm.play();
		else
			this.sound.bgm.pause();
	}
}