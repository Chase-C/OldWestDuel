var Engine = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;

    this.running = true;
    this.time = Date.now();

    this.winner = 0;
    this.time = Date.now();
	
	this.gameState = new GameState(w, h);
	this.menuState = new MenuState(w, h);
	this.activeState = this.menuState;
}

Engine.prototype =
{
    // Update the simulation each frame
    update: function()
    {
		//console.log("Normal update occurring");
        if(this.winner > 0)
            return;

        var currTime = Date.now();
        var dt = currTime - this.time;

		this.activeState.update(dt);

        this.time = currTime;
    },
	
	keyPress: function(keyCode)
    {
        this.activeState.keyPress(keyCode);
    },

    // Functions for starting and stopping the simulation
    start: function() { this.running = true },
    pause: function() { this.running = false },
    // Returns running
    isRunning: function() { return this.running },

    draw: function(canvas)
    {	
		this.activeState.draw(canvas);
    },
	
	startGame: function(stage){
		this.menuState.mainMenuTheme.loop = false;
		this.menuState.mainMenuTheme.pause();
		this.menuState.mainMenuTheme.currentTime = 0;
		console.log("Game rounds started");
		this.activeState = new GameState(this.w, this.h, stage);
	},
	
}
