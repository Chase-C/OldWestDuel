var MenuState = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;
	
	this.stageSelection = new StageSelection(w, h);
	this.characterSelection = new CharacterSelection(w, h);
	this.currentScreen = this.characterSelection;

    this.running = true;
	
	this.mainMenuTheme = new Audio("gem_cave.mp3");
	this.mainMenuTheme.loop = true;
	this.mainMenuTheme.play();
}

MenuState.prototype =
{
    // Update the simulation each frame
    update: function(dt)
    {
		this.currentScreen.update(dt);
    },

	keyPress: function( keyCode)
	{
		this.currentScreen.keyPress(keyCode);
		/*switch(keyCode){
			case 37: // Left arrow
				this.selectionNumber--;
				break;
			case 39: // Right arrow
				this.selectionNumber++;
				break;
			case 13: // Enter
			case 32: // Spacebar
				//Move to the GameState
				engine.startGame(this.selectionNumber);
				break;
		}*/
	},

    // Functions for starting and stopping the simulation
    start: function() { this.running = true },
    pause: function() { this.running = false },
    // Returns running
    isRunning: function() { return this.running },

    draw: function(canvas)
    {
        canvas.clearRect(0, 0, this.w, this.h);
		//canvas.drawImage(this.backgroundImage, 0, 0, 820, 640);
		
		this.currentScreen.draw(canvas);
    },

}
