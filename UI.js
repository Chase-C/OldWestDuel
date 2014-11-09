var UI = function(player1, player2)
{
    this.p1 = player1;
    this.p2 = player2;
}

UI.prototype =
{
    drawBar: function(canvas, player, flip)
    {
        var width = 180;
        var x     = 0;
        if (flip) {
            x = 820 - (width + 16);
        } else {
            x = 16;
        }

        var aDiff = Math.min(0.5, Math.max(-0.5, (4 * (player.angle - player.enemyA)) / Math.PI));
        var px = (width * aDiff) + (x + (width / 2));


        //canvas.strokeStyle = '#FFFFFF';
        canvas.strokeStyle = '#333333';
        canvas.lineWidth   = 2;
        canvas.strokeRect(x, 16, width, 32);

        canvas.beginPath();
        canvas.moveTo(x + (width / 2), 17);
        canvas.lineTo(x + (width / 2), 47);
        canvas.lineWidth   = 3;
        canvas.strokeStyle = '#55FF55';
        canvas.stroke();

        canvas.beginPath();
        canvas.moveTo(px, 17);
        canvas.lineTo(px, 47);
        canvas.lineWidth   = 3;
        canvas.strokeStyle = '#FF5555';
        canvas.stroke();
    }
}
