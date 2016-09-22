var preload = function(game){}

preload.prototype = {
	preload: function(){ 
		var text = "Loading Game";
        var style = { font: "65px Arial", fill: "#ffffff", align: "center" };
        var t = game.add.text(game.world.centerX, game.world.centerY, text, style);
        t.anchor.set(0.5);
        
        var style = { font: "30px Arial", fill: "#ffffff", align: "center" };
        this.loadingText = game.add.text(game.world.centerX, game.world.centerY + 60, "0%", style)
        this.loadingText.anchor.set(0.5);
                
        game.load.spritesheet('button/Beige', 'assets/images/button/beige.png', 190, 49);
        game.load.spritesheet('button/Blue', 'assets/images/button/blue.png', 190, 49);
        game.load.spritesheet('aiopaTitle', 'assets/images/Aiopa Title.png', 262, 110);
        game.load.video('logo', 'assets/images/Lightopa Games Intro.mp4')
        
        game.load.image('affinity/air', 'assets/images/affinity/air.png')
        game.load.image('affinity/water', 'assets/images/affinity/water.png')
        game.load.image('affinity/fire', 'assets/images/affinity/fire.png')
        game.load.image('affinity/earth', 'assets/images/affinity/earth.png')
        game.load.image('affinity/time', 'assets/images/affinity/time.png')
        game.load.image('affinity/dark', 'assets/images/affinity/dark.png')
        game.load.image('affinity/light', 'assets/images/affinity/light.png')
        game.load.image('affinity/septagram', 'assets/images/affinity/septagram.png')
        
        game.load.image('gender/male', 'assets/images/gender/maleSymbol.png')
        game.load.image('gender/female', 'assets/images/gender/femaleSymbol.png')
        
        game.load.spritesheet('tile/outside', 'assets/images/tile/outside.png', 16, 16, -1, 0, 1)
        
        game.load.image('control/compass', 'assets/images/control/compass_rose.png')
        game.load.image('control/touch_segment', 'assets/images/control/touch_segment.png')
        game.load.image('control/touch', 'assets/images/control/touch.png')
        
	},
  	create: function(){
  		game.state.start("titleMenu")
  		/*video = game.add.video('logo');
  	    video.play(false);
  	    video.addToWorld();
  	    
  	    video.onComplete.add(function(){
			game.state.start("titleMenu")
		},
		this) */
	},
	
	loadUpdate: function() {
		// update loading text percent
		this.loadingText.setText(this.load.progress + "%");
	}
}