var GameState = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;

    this.desertBackground = new Image();
    this.desertBackground.src = './images/bg_desert.png'
	
	this.finalDestinationBackground = new Image();
	this.finalDestinationBackground.src = './images/finald.png';
	
	this.activeBackground = this.desertBackground; //this.activeBackground should be set after ALL other background images are initialized

    this.running = true;

	//select the appropriate positions for the players based on the chosen background
	/*if(this.activeBackground === this.desertBackground){
		this.player1 = new Player(150, 521, false);
		this.player2 = new Player(670, 521, true);
	}
	else if(this.activeBackground === this.finalDestinationBackground){
		this.player1 = new Player(240, 401, false);
		this.player2 = new Player(580, 401, true);
	}*/
	this.chooseLevel(0);

    this.winner = 0;
	
	this.isScreenShaking = true; //set this to true any time a screen shake should occur 
	this.isScreenShakingEnd = false;
	this.screenShakeTimer = 0;
	this.shakeMagnitude = 12; //how far away the camera shakes around its original point, in pixels
	this.transX = 0; //keeps track of the canvas's translation in order to reset it to its original position after screen shaking
	this.transY = 0;
}

GameState.prototype =
{
    // Update the simulation each frame
    update: function(dt)
    {
        if(this.winner > 0)
            return;

        this.player1.update(dt);
        this.player2.update(dt);
		
		//code for screen shaking
		if(this.isScreenShaking){
			this.screenShakeTimer += dt;
			if(this.screenShakeTimer >= 1000){ //how many milliseconds the screen shaking lasts
				this.screenShakeTimer = 0;
				this.isScreenShaking = false;
				this.isScreenShakingEnd = true;
			}
		}
    },

    // Reset the simulation
    reset: function()
    {
        if(this.running == false) {
            this.running = true;
            Run();
        }
    },

	keyPress: function( keyCode)
	{
		switch(keyCode){
			case 87:
			
				//Jump player 1
				this.player1.jump();
				console.log("p1jump");
				break;
				
			
			case 83:
			
				//Crouch player 1
				break;
			case 38:
			
				//Jump player 2
				this.player2.jump();
				console.log("p2jump");
				break;
			case 40:
			
				//Crouch player 2
				break;
			
		}
	
	},

    // Functions for starting and stopping the simulation
    start: function() { this.running = true },
    pause: function() { this.running = false },
    // Returns running
    isRunning: function() { return this.running },

    draw: function(canvas)
    {
		if(this.isScreenShaking){
			canvas.translate(-this.transX, -this.transY); //move the canvas back to its origin (0, 0)
			var newX = Math.random() * this.shakeMagnitude * 2 - this.shakeMagnitude;
			var newY = Math.random() * this.shakeMagnitude * 2 - this.shakeMagnitude;
			canvas.translate(newX, newY); //move the canvas to a new origin
			this.transX = newX; //keep track of the current x and y translations
			this.transY = newY;
		}
		if(this.isScreenShakingEnd){ //solves the issue where the last translation isn't called
			canvas.translate(-this.transX, -this.transY);
			this.isScreenShakingEnd = false;
			this.transX = 0;
			this.transY = 0;
		}
	
        canvas.clearRect(0, 0, this.w, this.h);
        canvas.drawImage(this.activeBackground, 0, 0, 820, 640);

        this.player1.draw(canvas);
        this.player2.draw(canvas);
    },
	
	chooseLevel: function(level){
		//select the appropriate positions for the players based on the chosen background
		if(level === 0){ //0 is desert
			this.activeBackground = this.desertBackground;
			var yPos = 551;
			this.player1 = new Player(150, yPos, false);
			this.player2 = new Player(670, yPos, true);
		}
		else if(level === 1){ //1 is final destination
			this.activeBackground = this.finalDestinationBackground;
			var yPos = 431;
			this.player1 = new Player(240, yPos, false);
			this.player2 = new Player(580, yPos, true);
		}
	}
}
