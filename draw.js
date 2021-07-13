var ctx, height, width, resolution;

function canvas(resolution){
    sizeX = Math.floor(document.documentElement.clientWidth / resolution);
    sizeY = Math.floor(document.documentElement.clientHeight/ resolution);

    height = sizeY * resolution; 
    width = sizeX * resolution;
    resolution = resolution;
    let canvas = document.createElement('canvas');
    canvas.height = height;
    canvas.width = width;
    document.body.appendChild(canvas);
    ctx = canvas.getContext("2d");
}

function clearAll(){
    ctx.clearRect(0, 0, width, height);
}

function drawPos(x, y, color){
    if(color === undefined)
        color = 'gray';
    ctx.fillStyle = color;
    ctx.fillRect( x * resolution, y * resolution, resolution, resolution);
}

function drawCircPos(x, y, color){
    if(color === undefined)
        color = 'gray';
    ctx.fillStyle = color;

    ctx.beginPath();
    ctx.arc(
        (x * resolution) + resolution/2, 
        (y * resolution) + resolution/2,
        resolution/2, 
        0*Math.PI, 
        2*Math.PI);
    ctx.fill();
}

function initialize(){
    console.log('Initialize OK!');
}

function loop(){
    console.log('Loop OK!');
    return true;
};

function loopStart(fps){
    initialize();
    loopUpdate(fps);
}

function loopUpdate(fps){
    clearAll();
    if(!loop())
        setTimeout(loopUpdate, 1000/fps);
}

function randomInt(min, max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}