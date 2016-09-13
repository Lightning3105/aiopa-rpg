function gradient(width, height, colour1, colour2){
	var background = this.game.add.bitmapData(width, height);
    var grd = background.context.createLinearGradient(0, 0, 0, width/2);
    grd.addColorStop(0, colour1);
    grd.addColorStop(1, colour2);
    background.context.fillStyle=grd;
    background.context.fillRect(0, 0, this.game.width, this.game.height);
    return background
};

function labelButton(x, y, width, label, key, callback, callbackContext, style){
	var button = game.make.button(x, y, key, callback, callbackContext, 1, 0, 1, 0);
	button.anchor.set(0.5, 0.5);
	button.width = width;
	button.height = (47 / 190) * width;
	this.onOver = function(){
		button.y += 4;
	};

	this.onOut = function(){
		button.y -= 4;
	};
	
	button.onInputOver.add(this.onOver, this)
	button.onInputOut.add(this.onOut, this)
	
	style = style || {
		'font': 'Galdeano', 
		'fill': 'black', 
		'fontSize': (width - (40/190 * width)) / label.length
	}
	
	var text = new Phaser.Text(game, 0, 0, label, style);
	while(text.height > button.height-30 && text.fontSize > 0) {  text.fontSize--;  text.updateText();}
	text.anchor.set(0.5, 0.49);
	button.addChild(text);
	return button
};