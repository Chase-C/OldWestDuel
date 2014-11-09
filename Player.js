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
    this.hit           = false;

    this.gunSprite     = null;
    this.bloodSprite   = null;
    this.charSprite    = null;

    this.h = 0;//The actual height of the player
	
	this.characterSelection = 0; //which character the player's sprite is
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

        this.da += this.velY / 40;

        this.da *= 0.9;
        this.angle += this.da;

        if (this.y != this.floorY) {//If the player is not on the floor, gravity accelerates them downward
            this.velY += this.gravity * dt;
        }

        this.y += this.velY * dt;//Move based on the current x and y velocities
        this.x += this.velX * dt;

        if (this.y > this.floorY) {
            if (!this.hit) {
                this.charSprite.changeAnim(0);
            }
            this.y = this.floorY;
            this.velY = 0;
        }

        this.charSprite.update(dt);
        this.gunSprite.update(dt);

        if (!this.bloodSprite.anims[0].complete) {
            this.bloodSprite.update(dt);
        }
    },

    jump: function()
    {
        if(!this.hit && this.y===this.floorY){//If you're on the ground
            this.velY = this.jumpMagnitude;//
            this.charSprite.changeAnim(2);
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

    giveResources: function(resources)
    {
        this.bloodSprite = resources.sprBlood.clone();
    },

    setChar: function(c)
    {
        this.charSprite = c;

        this.w = 2 * this.charSprite.w;
        this.h = 2 * this.charSprite.h;

        //adjust the y position so that sprites of all dimensions are properly aligned to the floor
        this.y -= this.h;
        this.floorY = this.y;
    },

    setGun: function(g)
    {
        this.gunSprite = g;
    },

    kill: function(colY)
    {
        this.colY = colY;
        this.bloodSprite.anims[0].complete = false;
        this.bloodSprite.anims[0].frame = 0;
        this.hit = true;

        this.charSprite.changeAnim(3);
    },

    draw: function(canvas)
    {
        if (this.reverse) {
            canvas.scale(-1,1);
            this.x = -this.x;
        }

        if (!this.hit) {
            canvas.translate(this.x + this.w - 12, this.y + (this.h / 2) - 8);
            canvas.rotate(-this.angle);
            this.gunSprite.drawFrame(canvas, 0, 0, 0, 0);
            canvas.rotate(this.angle);
            canvas.translate(-(this.x + this.w - 12), -(this.y + (this.h / 2) - 8));
        }

        this.charSprite.draw(canvas, this.x, this.y);

        if (!this.bloodSprite.anims[0].complete) {
            this.bloodSprite.draw(canvas, this.x + (0.7 * this.w), this.y + (this.h - this.colY) - 6);
        }

        if (this.reverse) {
            canvas.scale(-1,1);
            this.x = -this.x;
        }
    },
	
	setEnemy: function(enemy){
		this.enemy = enemy;
	},
	
	canShoot: function(){
        if (this.hit) {
            return false;
        }
        j
		if(this.gunCD <= 0 && this.reloadCD <= 0){
			return true;
		}
		
		//otherwise
		return false;
	
	}
}
