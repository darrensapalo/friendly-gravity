var Entity = require('./Entity.js');
function ChildEntity(target, offset)
{
	Entity.call(this);
	this.target = target;
	this.offset = offset;
}

ChildEntity.prototype = Object.create(Entity.prototype);
ChildEntity.prototype.constructor = ChildEntity;

ChildEntity.prototype.draw = function(context) {
	Entity.prototype.draw.call(this, context);
}

ChildEntity.prototype.update = function() {
	this.position.x = this.target.position.x + this.offset.x;
	this.position.y = this.target.position.y + this.offset.y;
}

module.exports = ChildEntity;