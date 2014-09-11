function ImageLoader(list) {
	this.list = list;
	this.images = new Object();
	
	this.CheckComplete = function() {
		var complete = true;
		var currObj = this;
		for(var i=0;i<this.list.length;i++) {
			complete = complete && this.images[this.list[i].name].complete;
		}
		if (complete)
			this.OnComplete();
		else 
			setTimeout(function () { currObj.CheckComplete() },100);
	}
	
	this.GetImage = function (name) {
		return this.images[name];
	}
	
	this.Load = function () {
		var pair;
		var img;
		var currObj = this;
		for(var i=0;i<this.list.length;i++) {
			pair = this.list[i];
			this.images[pair.name] = new Image();
			this.images[pair.name].src = pair.url;
		}
		setTimeout(function () { currObj.CheckComplete() },100);
	}
	
	this.OnComplete = function() { }
}