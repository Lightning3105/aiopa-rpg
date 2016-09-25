var boot = function(game){
    console.log("%cStarting Aiopa RPG", "color:white; background:red");
};
  
boot.prototype = {
    preload: function(){
    },
    
    create: function(){
    	if (this.game.device.desktop){
    		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    		this.scale.pageAlignHorizontally = true;
    		this.scale.pageAlignVertically = true;
    		this.scale.windowConstraints.bottom = "visual";
    		this.scale.updateLayout();
    		this.scale.refresh();
    		game.add.plugin(Phaser.Plugin.Debug);
    		}
    	else {
    		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    		this.scale.minWidth = v.gameWidth/2;
    		this.scale.minHeight = v.gameHeight/2;
    		this.scale.maxWidth = v.gameWidth * 2.5; //You can change this to gameWidth*2.5 if needed
    		this.scale.maxHeight = v.gameHeight * 2.5; //Make sure these values are proportional to the gameWidth and gameHeight
    		this.scale.pageAlignHorizontally = true;
    		this.scale.pageAlignVertically = true;
    		this.scale.forceOrientation(true, false);
    		this.scale.updateLayout();
    		this.scale.refresh();
    		}
    	
    	game.time.desiredFps = 60
    	game.time.advancedTiming = true

        this.game.state.start("Preload");
    }
}