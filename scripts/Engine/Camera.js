 function Camera(x, y){
	this.x = x;
	this.y = y;
	this.offx;
	this.offy;
}

Camera.prototype.start = function(context, offx, offy){
	this.offx = offx;
	this.offy = offy;
	context.save();
	context.translate(-(this.x + offx), -(this.y + offy));
	context.camera = this;
}

Camera.prototype.end = function(context){
	context.translate((this.x + this.offx), (this.y + this.offy));
	context.restore();
}

Camera.prototype.isVisible = function(s)
{
	return true;
}
