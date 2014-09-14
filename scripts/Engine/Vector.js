function Vector2D(x, y)
{
	this.x = x || 0;
	this.y = y || 0;
}

Vector2D.prototype.multiply = function(scalar) {
	
}

Vector2D.prototype.toString = function() {
	return "(" + this.x + ", " + this.y + ")";
}

Vector2D.prototype.add = function(vector2D) {
	this.assertIsVector2D(vector2D);
	return new Vector2D(vector2D.x + this.x, vector2D.y + this.y);
}

Vector2D.prototype.distance = function(vector2D) {
	this.assertIsVector2D(vector2D);
	return new Vector2D(vector2D.x * this.x, vector2D.y * this.y);
}

Vector2D.prototype.assertIsVector2D = function(vector2D) {
	if (vector2D.constructor.name !== 'Vector2D') throw new Error("TypeError: The parameter must be a Vector2D.");

}