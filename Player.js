var Player = function(x, y, reverse)
{
    this.x = x || 0;
    this.y = y || 0;

    this.reverse = reverse;

    this.image = new Image();
    this.image.src = './images/BigJoJo.png';
}

Player.prototype =
{
    update: function()
    {
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
