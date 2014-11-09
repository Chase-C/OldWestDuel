var MenuState = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;
	
	this.stageSelection = new StageSelection(w, h);
	this.characterSelection = new CharacterSelection(w, h);
	this.currentScreen = this.characterSelection;

    this.running = true;
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
	},

    giveResources: function(resources)
    {
        this.stageSelection.giveResources(resources);
        this.characterSelection.giveResources(resources);
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
