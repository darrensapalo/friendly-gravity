function Session()
{
	this.highScore;
	this.cash;
	this.account = {
		'difficulty': {
			level: 0,
			value: this.difficulty
			},
		'points': {
			level: 0,
			value: this.points
			},
		'duration': {
			level: 0,
			value: this.duration
			},
		'speed': {
			level: 0,
			value: this.speed
		}
	}
	
	this.hasSounds;
}

Session.prototype.save = function() {
	if ("localStorage" in window && window["localStorage"] == null) console.log("Cannot save session - HTMl5 Local Storage not supported.");
	if (window.game === undefined) throw Error("UnknownGameException: There is no game reference in the global scope.");

	var game = window.game;

	localStorage["GBH.highscore"] = parseInt(this.highScore);
	localStorage["GBH.cash"] = parseInt(this.cash);

	localStorage["GBH.difficulty"] = parseInt(this.account.difficulty.value);
	localStorage["GBH.points"] = parseFloat(this.account.points.value);
	localStorage["GBH.duration"] = parseInt(this.account.duration.value);
	localStorage["GBH.speed"] = parseFloat(this.account.speed.value);

	localStorage["GBH.hasSounds"] = this.hasSounds;
};

Session.prototype.access = function(key){
	if (typeof(localStorage["GBH." + key]) != "NaN" && localStorage["GBH." + key] != "NaN")
		return parseInt(localStorage["GBH." + key]);
	return false;
}

Session.prototype.load = function() {
	if ("localStorage" in window && window["localStorage"] == null) console.log("Cannot save session - HTMl5 Local Storage not supported.");
	if (window.game === undefined) throw Error("UnknownGameException: There is no game reference in the global scope.");

	this.highScore 	= this.access("highScore") 	|| 0;
	this.cash 		= this.access("cash") 		|| Config.game.initialCash;
	this.difficulty = this.access("difficulty") || 0;
	this.points		= this.access("points")		|| Config.game.points;
	this.duration 	= this.access("duration")	|| Config.game.duration;
	this.speed		= this.access("speed")		|| Config.game.speed;
	this.hasSounds	= this.access("hasSounds")	|| Config.sound.musicEnabled;
};

Session.prototype.reset = function() {
	this.cash = Config.game.initialCash;
	this.highScore = 0;

	this.baseShockwaveCD = Config.game.baseShockwaveCD;
	this.difficulty = 0;
	this.points = Config.game.points;
	this.duration = Config.game.duration;
	this.speed = Config.game.speed;
	this.hasSounds = Config.sound.musicEnabled;

	this.save();
};