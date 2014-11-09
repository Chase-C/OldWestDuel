var MenuState = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;
	
	this.backgroundImage = new Image();
	this.backgroundImage.src = './images/stageselect.png';
	
	this.stageSelectHighlight = new Image();
	this.stageSelectHighlight.src = './images/stage_selection_ring.png';
	
	this.xSelect1 = 37 * 2;
	this.ySelect1 = 150 * 2;
	
	this.xSelect2 = 117 * 2;
	this.ySelect2 = 150 * 2;
	
	this.xSelect3 = 53 * 2;
	this.ySelect3 = 197 * 2;
	
	this.currentSelectionX = this.xSelect1;
	this.currentSelectionY = this.ySelect1;
	this.selectionNumber = 0; //0 = desert, 1 = final destination, 2 = grotto

    this.running = true;
}

MenuState.prototype =
{
    // Update the simulation each frame
    update: function(dt)
    {
		//makes sure selection number is within range
		if(this.selectionNumber < 0){ 
			this.selectionNumber = 2;
		}
		if(this.selectionNumber > 2){ 
			this.selectionNumber = 0;
		}
	
		//updates the position of the selection highligher
		if(this.selectionNumber === 0){
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
		}
    },

	keyPress: function( keyCode)
	{
		switch(keyCode){
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
		
		canvas.drawImage(this.stageSelectHighlight, this.currentSelectionX, this.currentSelectionY, 62 * 2, 40 * 2);
    },

}
