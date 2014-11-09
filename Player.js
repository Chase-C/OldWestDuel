var Player = function(x, y, reverse)
{	
	this.floorY = 340;
    this.x = x || 0;
    this.y = y || 0;
	this.velY = 0;
	this.velX = 0;
	this.jumpMagnitude = -0.7;//negative because the y axis is inverted
	this.gravity = 0.003;
    this.reverse = reverse;

    this.image = new Image();
    this.image.src = './images/BigJoJo.png';
	
	this.w = 2 * this.image.width;
	this.h = 2 * this.image.height;
}

Player.prototype =
{
    update: function(dt)
    {

        if (this.y != this.floorY) {//If the player is not on the floor, gravity accelerates them downward
            this.velY += this.gravity * dt;
        }
        //console.log(this.velY);
        this.y += this.velY * dt;//Move based on the current x and y velocities
        this.x += this.velX * dt;

        if (this.y > this.floorY) {
            this.y = this.floorY;
            this.velY = 0;
        }
    },

    jump: function()
    {
        if(this.y===this.floorY){//If you're on the ground
            this.velY = this.jumpMagnitude;//
            console.log(this.velY);
        }

    },

    duck: function()
    {
    },

    shoot: function(enemy)
    {
        var shot = new Shot(this.x, this.y + (this.h / 2), 0.2, enemy);
        return shot;
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
    }
}
