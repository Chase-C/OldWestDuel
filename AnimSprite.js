var AnimSprite = function(sheet, dur, loop)
{
    this.spriteSheet = new Image();
    this.numAnims    = 0;
    this.anims       = [];
    this.duration    = dur;
    this.time        = 0;
    this.curr        = 0;

    this.loop        = loop;
    this.complete    = !loop;

    this.spriteSheet.src = sheet;
}

AnimSprite.prototype =
{
    addAnim: function(num, x, y, w, h)
    {
        var anim = {};
        anim.numFrames = num;
        anim.frame     = 0;
        anim.x         = x;
        anim.y         = y;
        anim.w         = w;
        anim.h         = h;

        this.w         = w;
        this.h         = h;

        this.anims.push(anim);
        this.numAnims += 1;
    },

    changeAnim: function(anim)
    {
        this.anims[this.curr].sprite = 0;
        this.curr                    = anim;
        this.anims[this.curr].sprite = 0;
        this.time                    = 0;
    },

    update: function(dt)
    {
        var curr = this.anims[this.curr];

        this.time += dt;
        if (this.time > this.duration) {
            this.time -= this.duration;
            curr.frame += 1;
            if (curr.frame >= curr.numFrames) {
                curr.frame = 0;
                if (!this.loop) {
                    this.complete = true;
                }
            }
        }
    },

    draw: function(canvas, x, y)
    {
        var curr = this.anims[this.curr];
        canvas.drawImage(this.spriteSheet,
                         curr.x,
                         curr.y + (curr.h * curr.frame),
                         curr.w,
                         curr.h,
                         x,
                         y,
                         curr.w * 2,
                         curr.h * 2);
    }
}
