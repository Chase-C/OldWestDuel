var Player = function(x, y, reverse)
{	
	this.floorY = y;
    this.x = x || 0;
    this.y = y || 0;
	this.velY = 0;
	this.velX = 0;
	this.jumpMagnitude = -0.7;//negative because the y axis is inverted
	this.gravity = 0.003;
    this.reverse = reverse;

    this.image = new Image();
    this.image.src = './images/BigJoJo.png';
	
	//adjust the y position so that sprites of all dimensions are properly aligned to the floor
	this.y -= this.image.height * 2;
	this.floorY = this.y;
}

Player.prototype =
{
    update: function(dt)
    {
	
	if(this.y!=this.floorY){//If the player is not on the floor, gravity accelerates them downward
		
		this.velY += this.gravity * dt;
		console.log(this.velY);
	}
	//console.log(this.velY);
	this.y += this.velY * dt;//Move based on the current x and y velocities
	this.x += this.velX * dt;
	
	if(this.y>this.floorY){
		this.y = this.floorY;
		this.velY = 0;
		console.log("Set to 0");
	}
	
    },

    draw: function(canvas)
    {
        if (this.reverse) {
            canvas.scale(-1,1);
            this.x = -this.x;
        }

        canvas.drawImage(this.image, this.x, this.y, this.image.width * 2, this.image.height * 2);

        if (this.reverse) {
            canvas.scale(-1,1);
            this.x = -this.x;
        }
    },
	
	jump: function(){
		if(this.y===this.floorY){//If you're on the ground
			this.velY = this.jumpMagnitude;//
			console.log(this.velY);
		}
	
	}
}
