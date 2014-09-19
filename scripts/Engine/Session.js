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
	this.eaten.consume(round.eaten);
	this.save();
}

Session.prototype.save = function() {
	if ("localStorage" in window && window["localStorage"] == null) console.log("Cannot save session - HTMl5 Local Storage not supported.");
	if (window.game === undefined) throw Error("UnknownGameException: There is no game reference in the global scope.");

	console.log("Saving game...");
	var game = window.game;

	localStorage["GBH.highScore"] = parseInt(this.highScore);
	localStorage["GBH.cash"] = parseInt(this.cash);

	localStorage["GBH.account.difficulty.level"] = parseInt(   this.account.difficulty.level );
	localStorage["GBH.account.difficulty.value"] = parseInt(   this.account.difficulty.value );
	
	localStorage["GBH.account.points.level"]     = parseFloat( this.account.points.level );
	localStorage["GBH.account.points.value"]     = parseFloat( this.account.points.value );
	
	localStorage["GBH.account.duration.level"]   = parseInt(   this.account.duration.level );
	localStorage["GBH.account.duration.value"]   = parseInt(   this.account.duration.value );
	
	localStorage["GBH.account.speed.level"]      = parseFloat( this.account.speed.level );
	localStorage["GBH.account.speed.value"]      = parseFloat( this.account.speed.value );

	localStorage["GBH.eaten.comets"]      		 = parseFloat( this.eaten.comets );
	localStorage["GBH.eaten.asteroids"]      	 = parseFloat( this.eaten.asteroids );
	localStorage["GBH.eaten.planets"]      		 = parseFloat( this.eaten.planets );

	localStorage["GBH.hasSounds"] = this.hasSounds;
};

Session.prototype.access = function(key){
	if (typeof(localStorage["GBH." + key]) !== "NaN" && localStorage["GBH." + key] !== "NaN")
		return parseInt(localStorage["GBH." + key]);
	return false;
}

Session.prototype.load = function() {
	if ("localStorage" in window && window["localStorage"] == null) console.log("Cannot load session - HTMl5 Local Storage not supported.");
	if (window.game === undefined) throw Error("UnknownGameException: There is no game reference in the global scope.");

	this.highScore 	= this.access("highScore") 	|| 0;
	this.cash 		= this.access("cash") 		|| Config.game.initialCash;

	this.account.difficulty.level   = this.access("account.difficulty.level")   || 0;
	this.account.difficulty.value   = this.access("account.difficulty.value")   || 0;
	
	this.account.points.level		= this.access("account.points.level")		|| 0;
	this.account.points.value		= this.access("account.points.value")		|| Config.game.points;
	
	this.account.duration.level 	= this.access("account.duration.level")	    || 0;
	this.account.duration.value 	= this.access("account.duration.value")	    || Config.game.duration;

	this.account.speed.level		= this.access("account.speed.level")		|| 0;
	this.account.speed.value		= this.access("account.speed.value")		|| Config.game.speed;

	this.eaten.comets		= this.access("eaten.comets")		|| 0;
	this.eaten.asteroids	= this.access("eaten.asteroids")	|| 0;
	this.eaten.planets		= this.access("eaten.planets")		|| 0;

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