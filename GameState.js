var GameState = function(w, h, level)
{
    this.w = w || 0;
    this.h = h || 0;
	
	this.level = level;

    this.desertBackground = new Image();
    this.desertBackground.src = './images/bg_desert.png'
	
	this.finalDestinationBackground = new Image();
	this.finalDestinationBackground.src = './images/finald.png';
	
	this.grottoBackground = new Image();
	this.grottoBackground.src = './images/bg_grotto.png';
	
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
	this.chooseLevel(this.level);

    this.shots = [];

    this.winner = 0;
	
	this.roundNumber = 1;
	this.maxRoundNumber = 3; //may change later
	
	this.gameIsEnding = false;
	
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

        for (var i = 0; i < this.shots.length; i++) {
            if (this.shots[i].active) {
                this.shots[i].update(dt);
                if (this.shots[i].check) {
                    console.log(this.shots[i].getCollisionY());
                }
            } else {
                this.shots.splice(i);
            }
        }
		
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

	keyPress: function( keyCode)
	{
		switch(keyCode){
			case 87: // 'w'
				this.player1.jump();
				break;
			case 83: // 's'
				//Crouch player 1
				break;
            case 70: // 'f'
                this.shots.push(this.player1.shoot(this.player2));
                break;
            case 190: // '.'
                this.shots.push(this.player2.shoot(this.player1));
                break;
			case 38: // Up arrow
				this.player2.jump();
				break;
			case 40: // Down arrow
				//Crouch player 2
				break;
			case 27: //Escape key
				//Quit to the main menu
				this.gameIsEnding = true;
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
		
		if(this.gameIsEnding){ //ensures that the camera is back to normal by the time the game ends
			canvas.translate(-this.transX, -this.transY);
			this.isScreenShaking = false;
			this.isScreenShakingEnd = false;
			this.transX = 0;
			this.transY = 0;
			
			engine.activeState = engine.menuState;
		}
	
        canvas.clearRect(0, 0, this.w, this.h);
        canvas.drawImage(this.activeBackground, 0, 0, 820, 640);

        this.player1.draw(canvas);
        this.player2.draw(canvas);

        for (var i = 0; i < this.shots.length; i++) {
            this.shots[i].draw(canvas);
        }
    },
	
	//used to move on to the next round
	reset: function(){
		this.roundNumber++;
		if(this.roundNumber > this.maxRoundNumber){
			//Win/lose/end results
		}
		//everything below must be reset after every round
		this.transX = 0;
		this.transY = 0;
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
		else if(level === 2){ //2 is grotto
			this.activeBackground = this.grottoBackground;
			var yPos = 431;
			this.player1 = new Player(150, yPos, false);
			this.player2 = new Player(670, yPos, true);
		}
	}
}
