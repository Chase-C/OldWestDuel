var AnimSprite = function(sheet)
{
    this.spriteSheet = new Image();
    this.numAnims    = 0;
    this.anims       = [];
    this.time        = 0;
    this.curr        = 0;
    this.src         = sheet;

    this.spriteSheet.src = sheet;
}

AnimSprite.prototype =
{
    clone: function()
    {
        var ret = new AnimSprite(this.src);
        for (var i = 0; i < this.anims.length; i++) {
            var curr = this.anims[i];
            ret.addAnim(curr.numFrames, curr.x, curr.y, curr.w, curr.h, curr.dur, curr.loop);
        }

        return ret;
    },

    addAnim: function(num, x, y, w, h, dur, loop)
    {
        var anim = {};
        anim.numFrames = num;
        anim.frame     = 0;
        anim.dur       = dur;
        anim.loop      = loop;
        anim.complete  = !loop;
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
        if (this.time > curr.dur) {
            this.time -= curr.dur;
            curr.frame += 1;
            if (curr.frame >= curr.numFrames) {
                if (!curr.loop) {
                    curr.complete = true;
                    curr.frame = curr.numFrames - 1;
                } else {
                    curr.frame = 0;
                }
            }
        }
    },

    draw: function(canvas, x, y)
    {
        var curr = this.anims[this.curr];
        //console.log(this.curr, this.anims.length, this.src);
        canvas.drawImage(this.spriteSheet,
                         curr.x,
                         curr.y + (curr.h * curr.frame),
                         curr.w,
                         curr.h,
                         x,
                         y,
                         curr.w * 2,
                         curr.h * 2);
    },

    drawFrame: function(canvas, anim, frame, x, y)
    {
        var curr = this.anims[anim];
        canvas.drawImage(this.spriteSheet,
                         curr.x,
                         curr.y + (curr.h * frame),
                         curr.w,
                         curr.h,
                         x,
                         y,
                         curr.w * 2,
                         curr.h * 2);
    }
}
