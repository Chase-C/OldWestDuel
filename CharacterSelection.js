var CharacterSelection = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;
	
	this.backgroundImage = new Image();
	this.backgroundImage.src = './images/roster.png';
	
	this.p1Select = new Image();
	this.p1Select.src = './images/p1select.png';
	
	this.p2Select = new Image();
	this.p2Select.src = './images/p2select.png';
	
	this.xSelectP1 = 34 * 2;
	this.ySelectP1 = 166 * 2;
	
	this.xSelectP2 = 68 * 2;
	this.ySelectP2 = 166 * 2;
	
	this.currentSelectionXP1 = this.xSelectP1;
	console.log("After initialization: " + this.currentSelectionXP1);
	this.currentSelectionXP2 = this.xSelectP2;
	
	this.selectionNumberP1 = 0; //0 to 5 for the 6 characters
	this.selectionNumberP2 = 0;

    this.running = true;
}

CharacterSelection.prototype =
{
    // Update the simulation each frame
    update: function(dt)
    {
		//makes sure selection number is within range
		if(this.selectionNumberP1 < 0){ 
			this.selectionNumberP1 = 5;
		}
		if(this.selectionNumberP1 > 5){ 
			this.selectionNumberP1 = 0;
		}
		if(this.selectionNumberP2 < 0){ 
			this.selectionNumberP2 = 5;
		}
		if(this.selectionNumberP2 > 5){ 
			this.selectionNumberP2 = 0;
		}
	
		//updates the position of the selection highligher
		/*if(this.selectionNumber === 0){
			this.currentSelectionX = this.xSelect1;
			this.currentSelectionY = this.ySelect1;
		}
		else if(this.selectionNumber === 1){
			this.currentSelectionX = this.xSelect2;
			this.currentSelectionY = this.ySelect2;
		}
		else if(this.selectionNumber === 2){
			this.currentSelectionX = this.xSelect3;
			this.currentSelectionY = this.ySelect3;
		}*/
		this.currentSelectionXP1 = this.xSelectP1 + this.selectionNumberP1 * 58 * 2; //58 is the number of pixels between each character's image
		console.log("After multiplication: " + this.currentSelectionXP1);
		this.currentSelectionXP2 = this.xSelectP2 + this.selectionNumberP2 * 58 * 2; //58 is the number of pixels between each character's image
    },

	keyPress: function( keyCode)
	{
		switch(keyCode){
			case 65: // 'a'
				this.selectionNumberP1--;
				break;
			case 68: // 'd'
				this.selectionNumberP1++;
				break;
			case 37: // Left arrow
				this.selectionNumberP2--;
				break;
			case 39: // Right arrow
				this.selectionNumberP2++;
				break;
			case 13: // Enter
			case 32: // Spacebar
				//Move to the StageSelection
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
        canvas.clearRect(0, 0, this.w, this.h);
		canvas.drawImage(this.backgroundImage, 0, 0, 820, 640);
		/*if(this.selectionNumber === 0){
			canvas.drawImage(engine.gameState.desertBackground, 43, 150, 326, 84, 43 * 2, 43 * 2, 325 * 2, 83 * 2);
		}
		else if(this.selectionNumber === 1){
			canvas.drawImage(engine.gameState.finalDestinationBackground, 43, 150, 326, 84, 43 * 2, 43 * 2, 325 * 2, 83 * 2);
		}
		else if(this.selectionNumber === 2){
			canvas.drawImage(engine.gameState.grottoBackground, 43, 120, 326, 84, 43 * 2, 43 * 2, 325 * 2, 83 * 2);
		}*/
		
		console.log(this.currentSelectionXP1, this.ySelectP1);
		canvas.drawImage(this.p1Select, this.currentSelectionXP1, this.ySelectP1, 17 * 2, 17 * 2);
		canvas.drawImage(this.p2Select, this.currentSelectionXP2, this.ySelectP2, 17 * 2, 17 * 2);
    },

}
