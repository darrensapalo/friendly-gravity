function Trail (){
	this.visible = true;
	this.sprite;
	
	this.Initialize = function(type, x, y, opacity, scale) {
	
		// Prepares position and texture
		this.PrepareTrail(type, x, y, opacity, scale) ;
		
		// Initialize values
		this.xVelocity = this.yVelocity = 0;
		this.xAcceleration = this.yAcceleration = 0;
		this.force = this.maxForce;
	}
	
	this.PrepareTrail = function(type, x, y, opacity, scale) {
		var sprite, width, height;
		
		var textureList = new Array();
		textureList.push("asteroid");
		textureList.push("asteroidsmall");
		textureList.push("asteroidglow");
		textureList.push("comethead");
		textureList.push("tail1");
		textureList.push("tail2");
		textureList.push("tail3");
		textureList.push("tail4");
		
		width = 72;
		height = 36;
		
		if (type == 2){
			var texture = myGame.GetImage(textureList[2]);
			
			height = width = 50;
		}else{
			var texture = myGame.GetImage(textureList[type]);
		}
		
		this.sprite = new Sprite(texture, x, y, width, height, opacity, scale, scale);
		
	}
	
	this.ReduceOpacity = function ()
	{
		if (this.sprite.opacity > 0)
			this.sprite.opacity -= 0.05;
		else
			this.sprite.opacity = 0;
	}
	
	this.UpdatePosition = function (x, y){
		this.sprite.x = x;
		this.sprite.y = y;
	}
	
	this.Update = function (){
		
	}
	
	this.Draw = function (context) {
		this.sprite.Draw(context);
	}
	
	
}