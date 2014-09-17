function Sprite(raw_img, x, y, width, height, opacity, scalex, scaley) {
	if(window.game === undefined) throw new Error("UndefinedGameException: Cannot find the main game.");
	this.img = window.game.ImageLoader.images[raw_img];

	this.x = x;
	if (typeof x === 'undefined' && Config.warning)
		console.log("Warning: Sprite created without x position.");

	this.y = y;
	if (typeof y === 'undefined' && Config.warning)
		console.log("Warning: Sprite created without y position.");

	this.width = width;

	if (typeof width === 'undefined' && Config.warning)
		console.log("Warning: Sprite created without specified width.");

	this.height = height;
	if (typeof height === 'undefined' && Config.warning)
		console.log("Warning: Sprite created without specified height.");

	this.originx = 0;
	this.originy = 0;
	this.visible = true;
	this.rotation = 0;
	this.opacity = opacity || 1;
	this.scalex = scalex || 1;
	this.scaley = scaley || 1;
}

Sprite.prototype.setPosition = function(vector2D)
{
	if (typeof vector2D === 'undefined') throw new Error("NullError: Cannot set Sprite position to null.");
	if (vector2D.constructor.name !== 'Vector2D') throw new Error("ArgumentError: Sprite.setPosition only takes in a Vector2D object.");
	this.x = vector2D.x;
	this.y = vector2D.y;
}

Sprite.prototype.setOrigin = function(x, y)
{
	if (typeof x === 'number')
	{
		this.originx = (x === undefined) ?  0 : x;
		this.originy = (y === undefined) ?  0 : y;
	}
	else if (typeof x === 'string' && x == "centered")
	{
		this.setOrigin(-this.width / 2, -this.height / 2);
	}
	
}

Sprite.prototype.draw = function (context)
{
	if (this.visible) {
		context.save();
		context.translate(this.x , this.y );
		context.scale(this.scalex, this.scaley);
		context.rotate(this.rotation);
		context.globalAlpha = this.opacity;
		if (this.img == undefined) throw new Error("DrawException: Undefined image to be drawn.");
		context.drawImage(this.img, this.originx, this.originy, this.width, this.height);
		context.restore();
	}
}

Sprite.prototype.contains = function(aX, aY)
{
	var withinX = false, withinY = false;
	if (aX >= this.x + this.originx && aX <= this.x + this.originx + this.width) {
		withinX = true;
	}

	if (aY >= this.y + this.originy && aY <= this.y + + this.originy + this.height) {
		withinY = true;
	}

	return withinX && withinY;
}

Sprite.prototype.collidesWith = function (r2)
{
	var isHorizontalCollision = false; 
	var r1 = this;
	// Check left edge of r2
	if (r1.x < r2.x && r2.x < r1.x + r1.width) isHorizontalCollision = true;
	if (r1.x < r2.x + r2.width && r2.x + r2.width < r1.x + r1.width) isHorizontalCollision = true;
	
	var isVerticalCollision = false;
	// Check top edge of r2
	if (r1.y < r2.y && r2.y < r1.y + r1.height)	isVerticalCollision = true;
	// Check bottom edge of r2
	if (r1.y < r2.y + r2.height && r2.y + r2.height < r1.y + r1.height) isVerticalCollision = true;
	
	var isContainsCollision = false;

	if (!isHorizontalCollision && !isVerticalCollision)
	{
		if (r2.x < r1.x && r1.x < r2.x + r2.width) {
			if (r2.y < r1.y && r1.y < r2.y + r2.height){
				isContainsCollision = true;
			}
		}

		if (r1.x < r2.x && r2.x < r1.x + r1.width) {
			if (r1.y < r2.y && r2.y < r1.y + r1.height){
				isContainsCollision = true;
			}
		}
	}

	return (isHorizontalCollision && isVerticalCollision) || isContainsCollision;
}

function KeyboardSprite(offsetX, offsetY, keyboardColor) {
	var lines = new Array();
	lines.push("1234567890");
	lines.push("QWERTYUIOP");
	lines.push("ASDFGHJKL");
	lines.push("ZXCVBNM");

	this.offsetX = offsetX;
	this.offsetY = offsetY;
	this.keyWidth = 50;
	this.keyHeight = 50;
	this.keyPaddingX = 10;
	this.keyPaddingY = 10;
	this.paddingX = 5;
	this.paddingY = 5;
	this.width = 15 * 60;
	this.height = lines.length * 60;

	// Create Alpha-Numeric Keys
	this.AlphaKeys = new Array();
	for(var line=0;line<lines.length;line++)
		for(var i=0;i<lines[line].length;i++) {
			var keySprite = new TextSprite(lines[line][i], this.offsetX + this.paddingX + i * (this.keyWidth + this.keyPaddingX), 
				this.offsetY + this.paddingY + line * (this.keyHeight + this.keyPaddingY),
				this.keyWidth,this.keyHeight,"#FFFFFF",blackColor);
			keySprite.KeyValue = lines[line][i].charCodeAt(0);
			this.AlphaKeys.push( keySprite );
		}
	// Create Special Function Keys
	var spacebar = new TextSprite("Space", this.offsetX + this.paddingX + 7 *(this.keyWidth + this.keyPaddingX),
		this.offsetY + this.paddingY + 3 * (this.keyHeight + this.keyPaddingY),
		this.keyWidth * 5,this.keyHeight,"#FFFFFF",blackColor);
	spacebar.KeyValue = " ".charCodeAt(0);
	
	var backspace = new TextSprite("<--", this.offsetX + this.paddingX + 10 *(this.keyWidth + this.keyPaddingX),
		this.offsetY + this.paddingY + 0 * (this.keyHeight + this.keyPaddingY),
		this.keyWidth * 2,this.keyHeight,"#FFFFFF",blackColor);
	backspace.KeyValue = -1;
	
	var guess = new TextSprite("Guess", this.offsetX + this.paddingX + 9 *(this.keyWidth + this.keyPaddingX),
		this.offsetY + this.paddingY + 2 * (this.keyHeight + this.keyPaddingY),
		this.keyWidth * 3,this.keyHeight,"#ffffff",blackColor);
	guess.KeyValue = -2;
	
	var cancel = new TextSprite("Cancel", this.offsetX + this.paddingX + 10 *(this.keyWidth + this.keyPaddingX),
		this.offsetY + this.paddingY + 1 * (this.keyHeight + this.keyPaddingY),
		this.keyWidth * 2,this.keyHeight,"#FFFFFF",blackColor);
	cancel.KeyValue = -3;
	
	this.AlphaKeys.push(spacebar);
	this.AlphaKeys.push(backspace);
	this.AlphaKeys.push(guess);
	this.AlphaKeys.push(cancel);
	
	this.draw = function(context) {
		context.fillStyle = keyboardColor;
		context.fillRect(this.offsetX,this.offsetY,this.width,this.height);
		for(var i=0;i<this.AlphaKeys.length;i++)
			this.AlphaKeys[i].draw(context);
	}
	
	this.CheckKeyHit = function (aX, aY) {
		for(var i=0;i<this.AlphaKeys.length;i++) {
			var key = this.AlphaKeys[i].IsKeyHit(aX,aY);
			if (key != null)
				this.KeyHitHandler(key);
		}
	}
	
	this.KeyHitHandler = function (keyCode) { }
}

function TextBox(value, x, y, width, height) {
	this.value = value;
	
	this.textWidth = null;
	this.cursor = 0;
	this.cursorVisible = true;
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	
	this.draw = function(context) {
		context.fillStyle = blackColor;
		context.strokeRect(this.x,this.y,this.width,this.height);
		context.fillStyle = "#FFFFFF";
		context.fillRect(this.x,this.y,this.width,this.height);
		context.fillStyle = blackColor;
		context.font = "bold 30px sans-serif"
		context.textBaseline = "center";
		context.textAlign = "center";
		context.fillText(this.value, this.x + this.width / 2,this.y + this.height / 3);
		
		this.textWidth = context.measureText (this.value); 
		this.textWidth.ascent = context.measureText("m").width;
		if (this.cursorVisible) {
			context.fillStyle = blackColor;
			context.fillRect(this.width / 2 + this.textWidth.width / 2, (this.y + this.height / 3), 5, this.textWidth.ascent + 10);
		}
	}
	
	this.SetCursorPosition = function (x, y) {
	}
	
	this.Insert = function (key) {
		this.value = [this.value.slice(0, this.cursor), key, this.value.slice(this.cursor)].join('');
		this.cursor++;
	}
	
	this.Delete = function() {
		if (this.cursor > 0) {
			this.value = [this.value.slice(0, this.cursor-1), this.value.slice(this.cursor)].join('');
			this.cursor--;
		}
	}
	
	var thisObj = this;
	setInterval(function() { thisObj.cursorVisible = !thisObj.cursorVisible; } , 500);
}

function TableLayout(column, rowHeight, columnWidth, spacingWidth, spacingHeight) {
	this.column = column;
	this.spriteCollection = new Array();
	this.Add = function (aSprite) {
		var lastRow = this.spriteCollection.length == 0 ? -1 : this.spriteCollection.length - 1;
		if (lastRow == -1) {
			this.spriteCollection.push(new Array());
			lastRow = 0;
		}
		
		var lastColumn = this.spriteCollection[lastRow].length;
		
		if (lastColumn >= this.column) {
			this.spriteCollection.push(new Array());
			lastRow++;
			lastColumn = 0;
		}
		
		this.spriteCollection[lastRow].push(aSprite);
		
		aSprite.x = (lastColumn) * (columnWidth + spacingWidth);
		aSprite.y = (lastRow) * (rowHeight + spacingHeight);
		aSprite.width = columnWidth;
		aSprite.height = rowHeight;
	}
	
	this.Clear = function() {
		this.spriteCollection.length = 0;
	}
	
	this.draw = function (context) {
		for(var i=0;i<this.spriteCollection.length;i++)
			for(var j=0;j<this.spriteCollection[i].length;j++)
				this.spriteCollection[i][j].draw(context);
		}
	}