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
	
	this.gunCD		   = 0;//The number of milliseconds before the gun can be reloaded.
	this.gunMaxCD      = 1200;//The number of milliseconds between one shot and the reload.
	this.reloadCD      = 0;//The number of milliseconds before the gun can be fired
	this.reloadMaxCD   = 500;//The number of milliseconds between the end of the fire sound and the reload

    this.enemyA        = 0;
    this.angle         = -1;
    this.da            = 0;
    this.maxDa         = 0.2;
	
	this.score 		   = 0;//The player's score that they have earned by shooting the opponent
	
	this.enemy 		   = null;//A reference to the opposing player. this.enemy.enemy = this

    this.h = 0;//The actual height of the player

    this.image = new Image();
    this.image.onload = (function() {
        this.w = 2 * this.image.width;
        this.h = 2 * this.image.height;

        //adjust the y position so that sprites of all dimensions are properly aligned to the floor
        this.y -= this.image.height * 2;
        this.floorY = this.y;
    }).bind(this);
    this.image.src = './images/BigJoJo.png';
	
	this.gunShotSound = new Audio('GameGunshot.wav');
	this.reloadSound  = new Audio('ReloadSound.wav');
}

Player.prototype =
{
    update: function(dt)
    {
        var e = 0.005;
        var aDiff = this.angle - this.enemyA;
		
        if (aDiff < 0) {
            if (this.da < 0 || aDiff < -e) {
                this.da += 0.01;
            }
        } else if (aDiff > 0) {
            if (this.da > 0 || aDiff > e) {
                this.da -= 0.01;
            }
        }
		
		this.reloadCD -= dt;//tick the reload timer down
		
		if(this.gunCD > 0){//Setting it from 0 to -delta would cause the reload sound to play constantly - would be game breaking.
		
			this.gunCD -= dt;//tick the cooldown timer down

			//This is where you play the reload sound (there would be a bug if gunCD happened to reach exactly 0 then the reload sound wouldn't play
			//But it is unlikely
			if(this.gunCD == 0){
				this.gunCD = -1;//This way you won't get a 1/delta bug where the reload sound won't play
			}
			
			if(this.reloadCD < 0){
				this.reloadCD = 0;//Just set it to 0 for simplicity's sake.
			}
			
			
			if(this.gunCD < 0){
				//Play the reload sound here!!
				this.reloadSound.play();
				this.reloadCD = this.reloadMaxCD;//Put it on reload cooldown
				this.gunCD = 0;//Set it to 0 so the game knows not to play the reload sound again.
				
			}
		}

        this.da *= 0.9;
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
            this.da -= 0.05;
        }

    },

    duck: function()
    {
    },

    shoot: function(enemy)
    {
	
		//Play the gunshot sound here!!
		this.gunShotSound.play();
		var shot = new Shot(this.x, this.y + (this.h / 2), this.angle, enemy);
		this.gunCD = this.gunMaxCD;
		return shot;



    },
	
	reset: function(){
		
	},

    setFloor: function(y)
    {
        this.y      = y - (this.h);
        this.floorY = this.y;
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
	},
	
	canShoot: function(){
		if(this.gunCD <= 0 && this.reloadCD <= 0){
			return true;
		}
		
		//otherwise
		return false;
	
	}
}
