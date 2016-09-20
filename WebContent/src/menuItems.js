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
	Phaser.Button.call(this, game, x, y, key, callback, callbackContext, 1, 0, 1, 0);
	this.anchor.set(0.5, 0.5);
	this.width = width;
	this.height = (47 / 190) * width;
	
	this.onInputOver.add(function(){this.y += 4;}, this)
	this.onInputOut.add(function(){this.y -= 4;}, this)
	this.onInputDown.add(function(){this.y += 4; this.key = 0})
	
	style = style || {
		'font': 'Galdeano', 
		'fill': 'black', 
		'fontSize': (width - (40/190 * width)) / label.length
	}
	
	var text = new Phaser.Text(game, 0, 0, label, style);
	while(text.height > this.height-(40/380 * width) && text.fontSize > 0) {  text.fontSize--;  text.updateText();}
	text.anchor.set(0.5, 0.49);
	this.addChild(text);
};

labelButton.prototype = Object.create(Phaser.Button.prototype);
labelButton.prototype.constructor = labelButton;
labelButton.prototype.update = function() {}

function affinity(type){
	Phaser.Sprite.call(this, game, 0, 0, "affinity/" + type)
	this.width = 100
	this.height = 100
	this.anchor.set(0.5, 0.5)
	this.inputEnabled = true
	this.alpha = 0
	this.affType = type
	this.first = true
	this.texts = game.add.group()
	
	this.events.onInputOver.add(function(){
		if (this.alpha >= 0.8 && this.game.device.desktop){
			game.add.tween(this).to({ width: 200, height: 200 }, 250, null, true);
		}
	}, this)
	
	this.events.onInputDown.add(function(){
		v.selectedAffinity = type
	})
	
	if (type == "time"){
		this.x = 640
		this.y = 125
		var offset = 0
		this.description = ["Time", "It is the element that binds all things", "and ultimately destroys them"]
	}
	if (type == "air"){
		this.x = 830
		this.y = 210
		var offset = 1
		this.description = ["Air", "It is the element of freedom and swiftness", "but does not like to be constrained"]
	}
	if (type == "fire"){
		this.x = 430
		this.y = 210
		var offset = 6
		this.description = ["Fire", "It is the element of fervor and anger", "that wishes not to be controlled"]
	}
	if (type == "water"){
		this.x = 530
		this.y = 610
		var offset = 4
		this.description = ["Water", "It the element of life and of healing", "powerful, but slow to harm"]
	}
	if (type == "earth"){
		this.x = 750
		this.y = 610
		var offset = 3
		this.description = ["Earth", "It is the element of strength and patience", "hard, unforgiving and slow"]
	}
	if (type == "dark"){
		this.x = 390
		this.y = 430
		var offset = 5
		this.description = ["Darkness", "It is the element of fear and control", "powerful, but corrupting"]
	}
	if (type == "light"){
		this.x = 890
		this.y = 430
		var offset = 2
		this.description = ["Light", "It is the element of power and energy", "but only to the pure of heart"]
	}
	this.game.add.tween(this).to({ width: 150, height: 150, alpha:1 }, 500, null, true, 1000 + offset*100).start();
	this.game.add.existing(this)
}

affinity.prototype = Object.create(Phaser.Sprite.prototype);
affinity.prototype.constructor = affinity;
affinity.prototype.update = function() {
	if (v.selectedAffinity == this.affType){
		game.add.tween(this).to({ width: 200, height: 200 }, 250, null, true);
		if (this.first == true){
			this.first = false
			var ty = 280
			for (line in this.description){
				var style = { font: '20pt Galdeano', fill: 'white', align: 'center', wordWrap: true, wordWrapWidth: 230}
				var text = game.add.text(640, ty + 200, this.description[line], style);
			    text.anchor.set(0.5, 0);
			    text.lineSpacing = -10
			    text.alpha = 0
			    if (line == 0){
			    	text.setStyle({font: 'bold 25pt Galdeano', fill: 'white'})
			    }
			    game.add.tween(text).to({ y: ty, alpha: 1 }, 1000, Phaser.Easing.Quadratic.Out, true, 200 + line * 400);
			    ty += text.height
			    this.texts.add(text)
			}
		}
	}
	else if (this.width == 200 && !this.input.pointerOver(0)){
		game.add.tween(this).to({ width: 150, height: 150 }, 250, null, true);
		game.add.tween(this.texts).to({alpha: 0}, 200, null, true)
		this.texts = game.add.group()
		this.first = true
	}
}

function gender(type){
	Phaser.Sprite.call(this, game, 0, 0, "gender/" + type)
	this.width = 400
	this.height = 400
	this.anchor.set(0.5, 0.5)
	this.inputEnabled = true
	this.alpha = 0.8
	this.genType = type
	this.first = true
	this.texts = game.add.group()
	
	this.events.onInputOver.add(function(){
		if (this.alpha >= 0.6 && this.game.device.desktop){
			game.add.tween(this).to({ width: 500, height: 500 }, 500, null, true);
		}
	}, this)
	
	this.events.onInputDown.add(function(){
		v.selectedGender = type
	})
	
	if (type == "male"){
		this.x = 450
		this.y = 320
		var offset = 0
		this.anchor.set(0.45, 0.6)
	}
	if (type == "female"){
		this.x = 830
		this.y = 320
		var offset = 1
		this.anchor.set(0.5, 0.35)
	}
	this.game.add.tween(this).from({ width: 200, height: 200, alpha:0, x: (50 + offset*1180)}, 1500, Phaser.Easing.Quadratic.Out, true, 500).start();
	this.game.add.existing(this)
}

gender.prototype = Object.create(Phaser.Sprite.prototype);
gender.prototype.constructor = gender;
gender.prototype.update = function() {
	if (v.selectedAffinity == this.genType){
		game.add.tween(this).to({ width: 500, height: 500 }, 500, null, true);
	}
	
	if (this.input.pointerOver(0) && this.first == true && this.alpha == 0.8){
		this.first = false
		var style = { font: 'bold 30pt Galdeano', fill: 'white', align: 'center'}
		var t = this.genType.charAt(0).toUpperCase() + this.genType.slice(1)
		var text = game.add.text(this.x, 320 + 200, t, style);
	    text.anchor.set(0.5, 0.5);
	    text.alpha = 0
	    game.add.tween(text).to({ y: 330, alpha: 1 }, 1000, Phaser.Easing.Quadratic.Out, true, 200);
	    this.texts.add(text)
	}
	else if (this.width == 500 && !this.input.pointerOver(0)){
		game.add.tween(this).to({ width: 400, height: 400 }, 500, null, true);
		game.add.tween(this.texts).to({alpha: 0}, 400, null, true)
		this.texts = game.add.group()
		this.first = true
	}
}