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
	
	this.previewX1 = 70 * 2; //the coordinates for the character preview image
	this.previewY1 = 105 * 2;
	
	this.previewX2 = 312 * 2; //the coordinates for the character preview image
	this.previewY2 = 105 * 2;
	
	this.previewImageScale = 2; //how much to scale the preview images by
	
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
		var p1 = engine.gameState.player1;
		var p2 = engine.gameState.player2;
		
		//preview images for player 1
		if(this.selectionNumberP1 === 0){
			canvas.drawImage(p1.ford, this.previewX1, this.previewY1, p1.ford.width * this.previewImageScale, p1.ford.height * this.previewImageScale);
		}
		else if(this.selectionNumberP1 === 1){
			canvas.drawImage(p1.grape, this.previewX1, this.previewY1, p1.grape.width * this.previewImageScale, p1.grape.height * this.previewImageScale);
		}
		else if(this.selectionNumberP1 === 2){
			canvas.drawImage(p1.becky, this.previewX1, this.previewY1, p1.becky.width * this.previewImageScale, p1.becky.height * this.previewImageScale);
		}
		else if(this.selectionNumberP1 === 3){
			canvas.drawImage(p1.fido, this.previewX1, this.previewY1, p1.fido.width * this.previewImageScale, p1.fido.height * this.previewImageScale);
		}
		else if(this.selectionNumberP1 === 4){
			canvas.drawImage(p1.bently, this.previewX1, this.previewY1, p1.bently.width * this.previewImageScale, p1.bently.height * this.previewImageScale);
		}
		else if(this.selectionNumberP1 === 5){
			canvas.drawImage(p1.fido, this.previewX1, this.previewY1, p1.fido.width * this.previewImageScale, p1.fido.height * this.previewImageScale);
		}
		
		//preview images for player 2
		if(this.selectionNumberP2 === 0){
			canvas.drawImage(p2.ford, this.previewX2, this.previewY2, p2.ford.width * this.previewImageScale, p2.ford.height * this.previewImageScale);
		}
		else if(this.selectionNumberP2 === 1){
			canvas.drawImage(p2.grape, this.previewX2, this.previewY2, p2.grape.width * this.previewImageScale, p2.grape.height * this.previewImageScale);
		}
		else if(this.selectionNumberP2 === 2){
			canvas.drawImage(p2.becky, this.previewX2, this.previewY2, p2.becky.width * this.previewImageScale, p2.becky.height * this.previewImageScale);
		}
		else if(this.selectionNumberP2 === 3){
			canvas.drawImage(p2.fido, this.previewX2, this.previewY2, p2.fido.width * this.previewImageScale, p2.fido.height * this.previewImageScale);
		}
		else if(this.selectionNumberP2 === 4){
			canvas.drawImage(p2.bently, this.previewX2, this.previewY2, p2.bently.width * this.previewImageScale, p2.bently.height * this.previewImageScale);
		}
		else if(this.selectionNumberP2 === 5){
			canvas.drawImage(p2.fido, this.previewX2, this.previewY2, p2.fido.width * this.previewImageScale, p2.fido.height * this.previewImageScale);
		}
		
		//console.log(this.currentSelectionXP1, this.ySelectP1);
		canvas.drawImage(this.p1Select, this.currentSelectionXP1, this.ySelectP1, 17 * 2, 17 * 2);
		canvas.drawImage(this.p2Select, this.currentSelectionXP2, this.ySelectP2, 17 * 2, 17 * 2);
    },

}
