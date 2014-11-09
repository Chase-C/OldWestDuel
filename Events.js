document.onmousedown = function(evt)
{
    evt = evt || event;
    //engine.mouseDown(evt);
}

document.onmouseup = function(evt)
{
    evt = evt || event;
    //engine.mouseUp(evt);
}

document.addEventListener('keydown', function(event) {
    engine.keyPress(event.keyCode) ;
	
	
});




document.oncontextmenu = function(evt) { stopEvent(evt); }

function stopEvent(event){
    if(event.preventDefault != undefined)
        event.preventDefault();
    if(event.stopPropagation != undefined)
        event.stopPropagation();
}
