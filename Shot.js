var Shot = function(x, y, angle, flip)
{
    this.x = x || 0;
    this.y = y || 0;

    this.angle = angle || 0;
    this.flip = flip;

    if (this.flip) {
        this.ex = 0;
    } else {
        this.ex = 820;
    }
    this.ey = 0;

    this.time = 0;
    this.active = true;
}

Shot.prototype =
{
    getCollisionY: function(enemy)
    {
        var m   = -Math.tan(this.angle);
        if (this.flip) {
            m = -m
        }

        var b   = this.y - (m * this.x);
        var ret = (m * enemy.x) + b;
        this.ey = (m * this.ex) + b;

        if ((ret < enemy.y) || (ey > enemy.y + enemy.h)) {
            return -1;
        }

        return (enemy.y + enemy.h) - ret;
    },

    update: function(dt)
    {
        this.time += dt;
        if (this.time > 500) {
            this.active = false;
        }
    },

    draw: function(canvas)
    {
        
    }
}
