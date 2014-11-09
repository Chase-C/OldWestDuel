var CharacterSelection = function(w, h)
{
    this.w = w || 0;
    this.h = h || 0;
	
	this.backgroundImage = null;
	this.p1Select = null;
	this.p2Select = null;
	
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
	
	this.selectSound = new Audio('SelectSound.wav');
	
	this.bently1 = "Bently";
	this.bently2 = "Moxie: 8";
	this.bently3 = "Cojones: 8";
	this.bently4 = "Swagger: 4";
	this.bently5 = "Grit: 4";
	this.bently6 = "Hustle: 5";
	this.bently7 = "Total: 29";
	
	this.clyde1 = "Clyde";
	this.clyde2 = "Moxie: 4";
	this.clyde3 = "Cojones: 4";
	this.clyde4 = "Swagger: 8";
	this.clyde5 = "Grit: 7";
	this.clyde6 = "Hustle: 6";
	this.clyde7 = "Total: 29";
	
	this.grape1 = "Grape";
	this.grape2 = "Moxie: 4";
	this.grape3 = "Cojones: 3";
	this.grape4 = "Swagger: 10";
	this.grape5 = "Grit: 3";
	this.grape6 = "Hustle: 9";
	this.grape7 = "Total: 29";
	
	this.fido1 = "Fido";
	this.fido2 = "Moxie: 7";
	this.fido3 = "Cojones: 5";
	this.fido4 = "Swagger: 6";
	this.fido5 = "Grit: 1";
	this.fido6 = "Hustle: 10";
	this.fido7 = "Total: 29";
	
	this.ford1 = "Ford";
	this.ford2 = "Moxie: 7";
	this.ford3 = "Cojones: 8";
	this.ford4 = "Swagger: 3";
	this.ford5 = "Grit: 8";
	this.ford6 = "Hustle: 3";
	this.ford7 = "Total: 29";
	
	this.becky1 = "Becky";
	this.becky2 = "Moxie: 6";
	this.becky3 = "Cojones: 0";
	this.becky4 = "Swagger: 3";
	this.becky5 = "Grit: 6";
	this.becky6 = "Hustle: 7";
	this.becky7 = "Total: 22";
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
				this.selectSound.play();
                engine.p1Sel = new Object('c', 'g');
                engine.p1Sel.c = this.chars[this.selectionNumberP1].clone();
                engine.p1Sel.g = this.guns[this.selectionNumberP1].clone();

                engine.p2Sel = new Object('c', 'g');
                engine.p2Sel.c = this.chars[this.selectionNumberP2].clone();
                engine.p2Sel.g = this.guns[this.selectionNumberP2].clone();

				engine.menuState.currentScreen = engine.menuState.stageSelection;
				break;
		}
	},

    giveResources: function(resources)
    {
        this.backgroundImage = resources.bgCharacter;
        this.p1Select = resources.p1Select;
        this.p2Select = resources.p2Select;

        this.chars = resources.chars;
        this.guns  = resources.guns;
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

        this.chars[this.selectionNumberP1].drawFrame(canvas,
                                                     0,
                                                     0,
                                                     this.previewX1,
                                                     this.previewY1);

        this.chars[this.selectionNumberP2].drawFrame(canvas,
                                                     0,
                                                     0,
                                                     this.previewX2,
                                                     this.previewY2);

		canvas.drawImage(this.p1Select, this.currentSelectionXP1, this.ySelectP1, 17 * 2, 17 * 2);
		canvas.drawImage(this.p2Select, this.currentSelectionXP2, this.ySelectP2, 17 * 2, 17 * 2);
    },

}
