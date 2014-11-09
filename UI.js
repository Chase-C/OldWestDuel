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

        var px = ((width / (2 * (Math.PI / 3))) * (player.angle - player.enemyA)) + (x + (width / 2));

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
        canvas.moveTo(x + (width / 2), 17);
        canvas.lineTo(x + (width / 2), 47);
        canvas.lineWidth   = 3;
        canvas.strokeStyle = '#FF5555';
        canvas.stroke();
    }
}
