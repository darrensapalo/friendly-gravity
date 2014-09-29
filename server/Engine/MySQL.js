var Database = require('./Database.js');
function MySQL()
{
	var mysql      = require('mysql');
	var connection = mysql.createConnection({
		host     : 'localhost',
		user     : 'me',
		password : 'secret'
	});

	connection.connect();

	connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
		if (err) throw err;

		console.log('The solution is: ', rows[0].solution);
	});

	connection.end();
}

MySQL.prototype = Object.create(Database.prototype);
MySQL.prototype.constructor = MySQL;


MySQL.prototype.create = function() {
	
};

MySQL.prototype.retrieve = function() {
	
};

MySQL.prototype.update = function() {
	
};

MySQL.prototype.delete = function() {
	
};


module.exports = MySQL;