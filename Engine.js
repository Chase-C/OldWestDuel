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
    this.activeState = null;

    this.loadResources();
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

        if (this.activeState) {
            this.activeState.update(dt);
        }

        this.time = currTime;
    },
	
	keyPress: function(keyCode)
    {
        if (this.activeState) {
            this.activeState.keyPress(keyCode);
        }
    },

    loadResources: function()
    {
        this.resources = new Resources((function() {
            this.menuState.giveResources(this.resources);
            this.gameState.giveResources(this.resources);

            this.activeState = this.menuState;
        }).bind(this));
    },

    // Functions for starting and stopping the simulation
    start: function() { this.running = true },
    pause: function() { this.running = false },
    // Returns running
    isRunning: function() { return this.running },

    draw: function(canvas)
    {
        if (this.activeState) {
            this.activeState.draw(canvas);
        }
    },
	
	startGame: function(stage){
		this.menuState.mainMenuTheme.loop = false;
		this.menuState.mainMenuTheme.pause();
		this.menuState.mainMenuTheme.currentTime = 0;

		this.activeState = this.gameState;
        this.gameState.init();
        this.gameState.chooseLevel(stage);
	},
}
