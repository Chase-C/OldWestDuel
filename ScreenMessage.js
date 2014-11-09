var ScreenMessage = function(x, y, message, duration)
{
    this.x      = x || 0;
    this.y      = y || 0;
    this.message = message;
	this.duration = duration;
  

    this.time   = 0;
    this.active = true;
    this.check  = true;
    this.col    = false;
}

ScreenMessage.prototype =
{


    update: function(dt)
    {
        this.time += dt;
        if (this.time > this.duration) {
            this.active = false;
        }
    },

    draw: function(canvas)
    {
        canvas.fillStyle = '#FFFF00';
        canvas.font = '38px sans-serif';
        canvas.textBaseline = 'middle';
        canvas.textAlign = 'center';
        canvas.fillText(this.message, this.x, this.y);
    }
}
