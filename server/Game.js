var net = require('net');
var dgram = require('dgram');
var tween = require('tween.js');
var mft = require('./modules');

function Game() {
	this.InputHandler  = mft.InputHandler();
	this.connections = new Array();
	this.game = null;
}

Game.prototype.initialize = function() {
	this.server = net.createServer(function (c) {
		var ip = c.localAddress;
		console.log("[" + ip + " start]");

		c.on('data', function (data) {
			var a = JSON.parse(data);
			console.log(ip +": " + a);
		});

		c.on('end', function() {
			console.log("[" + ip + " end]");
		});
	});

	this.server.listen(8080, function(){
		console.log('Server bound to port 8080.');
	});
}

Game.prototype.initStates = function () {
	
}


Game.prototype.update = function() {
	
}

Game.prototype.destroy = function() {
	
}

var game = new Game();
game.initialize();

module.exports = Game;