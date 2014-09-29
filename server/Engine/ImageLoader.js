function ImageLoader(resource_list) {
	this.list = resource_list;
	this.images = new Object();
}


ImageLoader.prototype.checkComplete = function() {
	var complete = true;
	var currObj = this;
	for(var i = 0; i < this.list.length; i++) {
		complete = complete && this.images[this.list[i].name].complete;
	}
	if (complete)
		this.onComplete();
	else 
		setTimeout(function () { currObj.checkComplete() },100);
}

ImageLoader.prototype.getImage = function (name) {
	return this.images[name];
}

ImageLoader.prototype.load = function () {
	var pair;
	var img;
	var currObj = this;
	for(var i = 0; i < this.list.length; i++) {
		pair = this.list[i];
		this.images[pair.name] = new Image();
		this.images[pair.name].src = 'assets/art/' + pair.url;
	}
	setTimeout(function () { currObj.checkComplete() },100);
}

ImageLoader.prototype.onComplete = function() { }