function TextSprite(text, x, y, width, height, bgColor, textColor) {
	bgColor = bgColor || Color.black;
	textColor = textColor || Color.white;
	
	this.text = text;
	this.bgColor = bgColor;
	this.textColor = textColor;
	this.KeyValue = null;
	this.drawBackground = false;

	Sprite.call(this, undefined, x, y, width, height);
}


TextSprite.prototype = Object.create(Sprite.prototype); 
TextSprite.prototype.constructor = Sprite;

TextSprite.prototype.changeOrigin = CenteredSprite.prototype.changeOrigin;

TextSprite.prototype.draw = function (context) {
	if (this.visible) {
		if (this.drawBackground){
			context.fillStyle = this.bgColor;
			context.fillRect(this.x,this.y,this.width,this.height);
		}
		context.globalAlpha = this.opacity;
		context.strokeStyle = this.bgColor;
		context.lineWidth = 4;
		context.fillStyle = this.textColor;
		context.font = Config.fontSize + " " + Config.font;

		context.textBaseline = "top";
		context.textAlign = "center";

		context.strokeText(this.text, this.x + this.width / 2,this.y + this.height / 4);
		context.fillText(this.text, this.x + this.width / 2,this.y + this.height / 4);
		context.globalAlpha = 1;

	}
}


TextSprite.prototype.IsKeyHit = function (aX,aY) {
	if (this.contains(aX,aY)) {
		return this.KeyValue;
	} else
	return null;
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
}
KeyboardSprite.prototype.draw = function(context) {
	context.fillStyle = keyboardColor;
	context.fillRect(this.offsetX,this.offsetY,this.width,this.height);
	for(var i=0;i<this.AlphaKeys.length;i++)
		this.AlphaKeys[i].draw(context);
}

KeyboardSprite.prototype.CheckKeyHit = function (aX, aY) {
	for(var i=0;i<this.AlphaKeys.length;i++) {
		var key = this.AlphaKeys[i].IsKeyHit(aX,aY);
		if (key != null)
			this.KeyHitHandler(key);
	}
}

KeyboardSprite.prototype.KeyHitHandler = function (keyCode) { }


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
	setInterval(function () { thisObj.cursorVisible = !thisObj.cursorVisible; } , 500);
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
	
	this.Clear = function () {
		this.spriteCollection.length = 0;
	}
	
	this.draw = function (context) {
		for(var i=0;i<this.spriteCollection.length;i++)
			for(var j=0;j<this.spriteCollection[i].length;j++)
				this.spriteCollection[i][j].draw(context);
		}
	}