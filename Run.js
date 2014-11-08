window.getAnimationFrame = (function()
        {
            var animFrame = window.requestAnimationFrame    ||
                            window.webkitRequestAnimationFrame  ||
                            window.mozRequestAnimationFrame     ||
                            window.oRequestAnimationFrame       ||
                            window.msRequestAnimationFrame      ||
                            function(callback, element) {
                                return window.setTimeout(callback, 1000 / 60);
                            };
            return animFrame;
        })();

var engine = new Engine(820, 640);

function Run()
{
    engine.update();
    engine.draw(context);

    if(engine.isRunning()) {
        window.getAnimationFrame(Run);
    } else {
        return;
    }
}

function pause()
{
    if(engine.isRunning()) {
        engine.pause();
    } else {
        engine.start();
        Run();
    }
}
