var Player = function(x, y, reverse)
{	
    this.x             = x || 0;
    this.y             = y || 0;
	this.velY          = 0;
	this.velX          = 0;
	this.floorY        = y;
	this.jumpMagnitude = -0.7;//negative because the y axis is inverted
	this.gravity       = 0.005;
    this.reverse       = reverse;

    this.enemyA        = 0;
    this.angle         = -1;
    this.da            = 0;
    this.maxDa         = 0.2;
	
	this.score 		   = 0;//The player's score that they have earned by shooting the opponent
	
	this.enemy 		   = null;//A reference to the opposing player. this.enemy.enemy = this

    this.h = 0;

    this.image = new Image();
    this.image.onload = (function() {
        this.w = 2 * this.image.width;
        this.h = 2 * this.image.height;
        console.log(this.w, this.h);

        //adjust the y position so that sprites of all dimensions are properly aligned to the floor
        this.y -= this.image.height * 2;
        this.floorY = this.y;
    }).bind(this);
    this.image.src = './images/BigBigJoJo.png';
}

Player.prototype =
{
    update: function(dt)
    {
        if (this.angle < this.enemyA) {
            var mod = 1;
            if (this.da > 0) {
                mod = (1 - Math.min(1, this.da / this.maxDa));
            }

            this.da += 0.01 * mod;
        } else {
            var mod = 1;
            if (this.da < 0) {
                mod = (1 - Math.min(1, -this.da / this.maxDa));
            }

            this.da -= 0.01 * mod;
        }

        this.da *= 0.9;

        if (Math.abs(this.da) < Math.abs(this.angle - this.enemyA)) {
            this.da = this.enemyA - this.angle;
        }

        this.angle += this.da;

        if (this.y != this.floorY) {//If the player is not on the floor, gravity accelerates them downward
            this.velY += this.gravity * dt;
        }

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
        var shot = new Shot(this.x, this.y + (this.h / 2), 0.0, enemy);
        return shot;
    },
	
	reset: function(){
		
	},

    setFloor: function(y)
    {
        this.y      = y - (this.h * 2);
        this.floorY = y;
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
	
	setEnemy: function(enemy){
		this.enemy = enemy;
	}
}
