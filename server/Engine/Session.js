function Session()
{
	this.highScore = 0;
	this.cash = 0;
	this.account = {
		'difficulty': {
			level: 0,
			value: 0
			},
		'points': {
			level: 0,
			value: 0
			},
		'duration': {
			level: 0,
			value: 0
			},
		'speed': {
			level: 0,
			value: 0
		}
	}

	this.eaten = new Eaten();
	this.hasSounds = true;

	this.load();
}

Session.prototype.saveRound = function(round) {
	if (round.score > this.highScore)
		this.highScore = round.score;

	this.cash += round.score;
	this.eaten.comets += round.eaten.comets;
	this.eaten.asteroids += round.eaten.asteroids;
	this.eaten.planets += round.eaten.planets;
	this.save();
}

Session.prototype.save = function() {
	if ("localStorage" in window && window["localStorage"] == null) console.log("Cannot save session - HTMl5 Local Storage not supported.");
	if (window.game === undefined) throw Error("UnknownGameException: There is no game reference in the global scope.");

	console.log("Saving game...");
	var game = window.game;

	localStorage["GBH.game"] = JSON.stringify(this);
	
};

Session.prototype.access = function(key){
	if (typeof(localStorage["GBH." + key]) !== "NaN" && localStorage["GBH." + key] !== "NaN")
		return parseInt(localStorage["GBH." + key]);
	return false;
}

Session.prototype.load = function() {
	if ("localStorage" in window && window["localStorage"] == null) console.log("Cannot load session - HTMl5 Local Storage not supported.");
	if (window.game === undefined) throw Error("UnknownGameException: There is no game reference in the global scope.");

	var ses = localStorage["GBH.game"];
	if (typeof ses !== 'undefined'){
		var temp = JSON.parse( ses );
		this.highScore = temp.highScore;
		this.cash = temp.cash;
		this.account = temp.account;
		this.eaten = temp.eaten;
		this.hasSounds = temp.hasSounds;
	}
		

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