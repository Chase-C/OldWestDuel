var GameState = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;

    this.backgroundImage = new Image();
    this.backgroundImage.src = './images/bg_grotto.png'

    this.running = true;

    this.player1 = new Player(150, 340, false);
    this.player2 = new Player(670, 340, true);

    this.shots = [];

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
        canvas.drawImage(this.backgroundImage, 0, 0, 820, 640);

        this.player1.draw(canvas);
        this.player2.draw(canvas);

        for (var i = 0; i < this.shots.length; i++) {
            this.shots[i].draw(canvas);
        }
    },
}
