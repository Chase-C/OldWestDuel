var Engine = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;

    this.backgroundImage = new Image();
    this.backgroundImage.src = './images/bg_grotto.png'

    this.running = true;
    this.time = Date.now();

    this.player1 = new Player(150, 340, false);
    this.player2 = new Player(670, 340, true);

    this.winner = 0;
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

        this.time = currTime;
		

		
		this.player1.update(dt);
		this.player2.update(dt);
		
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

    // Reset the simulation
    reset: function()
    {
        this.planets = [];
        this.particles = [];
        if(this.running == false) {
            this.running = true;
            Run();
        }
    },

    // Functions for starting and stopping the simulation
    start: function() { this.running = true },
    pause: function() { this.running = false },
    // Returns running
    isRunning: function() { return this.running },

    draw: function(canvas)
    {
        canvas.clearRect(0, 0, this.w, this.h);
        canvas.drawImage(this.backgroundImage, 0, 0, 820, 640);

        this.player1.draw(canvas);
        this.player2.draw(canvas);

        //for(i = 0; i < this.planets.length; i++) {
        //    this.planets[i].draw(canvas);
        //}
        //for(i = 0; i < this.particles.length; i++) {
        //    this.particles[i].draw(canvas);
        //}

        ////this.drawHash(canvas);
        //if(this.winner > 0) {
        //    canvas.fillStyle = (new Color(128, 128, 128)).toString();
        //    canvas.font = '48px sans-serif';
        //    canvas.textBaseline = 'middle';
        //    canvas.textAlign = 'center';
        //    if(this.winner == 1)
        //        canvas.fillText('You Win!', this.w / 2, this.h / 2);
        //    else
        //        canvas.fillText('You Lose! :(', this.w / 2, this.h / 2);
        //}
    },
}
