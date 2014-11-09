var Shot = function(x, y, angle, enemy)
{
    this.x      = x || 0;
    this.y      = y || 0;
    this.angle  = angle || 0;
    this.enemy  = enemy;
    this.flip   = !enemy.reverse;

    this.ex     = 820;
    this.ey     = 0;
    if (this.flip) {
        this.ex = 0;
    }

    this.time   = 0;
    this.active = true;
    this.check  = true;
    this.col    = false;
}

Shot.prototype =
{
    getCollisionY: function()
    {
        var m = -Math.tan(this.angle);
        if (this.flip) {
            m = -m
        }

        var b   = this.y - (m * this.x);
        var ret = (m * this.enemy.x) + b;
        this.ey = (m * this.ex) + b;

        this.check = false;

        if ((ret < this.enemy.y) || (ret > this.enemy.y + this.enemy.h)) {
            return (-1);
        }

        this.col = true;
        return ((this.enemy.y + this.enemy.h) - ret);
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
        canvas.beginPath();
        canvas.moveTo(this.x, this.y);
        canvas.lineTo(this.ex, this.ey);
        canvas.lineWidth = 2;
        if (this.col) {
            canvas.strokeStyle = '#FF0000';
        } else {
            canvas.strokeStyle = '#00FF00';
        }
        canvas.stroke();
    }
}
