// Parameters for runtime
var fps = 1;
resolution = 5;
var type = {
    1: 'orange',
    2: 'red',
    3: 'blue',
    4: 'gray',
    5: 'black',
    6: 'white',
    7: 'aquamarine',
    8: 'purple',
    9: 'deeppink',
    10: 'darkblue'
};

var generationLimit = -1;

// Logic and code
var sizeX, sizeY;
var generation;
var grid;
function initialize(){
    canvas(resolution);
    grid = [];
    generation = 0;

    let typeLength = 0;
    for(pos in type)
        typeLength++;
    
    for(let i=0; i < sizeX; i++){
        let row = [];
        for(let j=0; j < sizeY; j++){
            row.push(randomInt(0, typeLength));
        }
        grid.push(row);
    }
}

function loop(){
    let tempGrid = [];
    for(let i=0; i < sizeX; i++){
        let tempRow = [];
        for(let j=0; j < sizeY; j++){
            let cell = grid[i][j];
            if(cell == 0){
                let neighbors = countNeighbors(i, j);
                if(neighbors.length == 3){
                    let type;
                    if(neighbors[0] == neighbors[1] || neighbors[0] == neighbors[2])
                        type = neighbors[0];
                    else
                        if(neighbors[1] == neighbors[2])
                            type = neighbors[1];
                        else
                            type = randomInt(0, 2);
                    tempRow.push(type);
                }else{
                    tempRow.push(0);
                }
            }else{
                drawCircPos(i, j, type[cell]);
                let neighbors = countNeighborsByType(i, j, cell);
                if(neighbors < 2 || neighbors > 3)
                    tempRow.push(0);
                else
                    tempRow.push(cell);
            }
        }
        tempGrid.push(tempRow);
    }
    grid = tempGrid;
    generation++;
    if(generation == generationLimit)
        return true;
}

function countNeighbors(x, y){
    let neighbors = [];
    for(let i=x-1; i <= x+1; i++){
        for(let j=y-1; j <= y+1; j++){
            if(i == x && j == y)
                continue

            let tempX = i;
            let tempY = j;
            if(i < 0)
                tempX = sizeX - 1;
            if(i >= sizeX)
                tempX = 0;
            if(j < 0)
                tempY = sizeY - 1;
            if(j >= sizeY)
                tempY = 0;
            if(grid[tempX][tempY] != 0)
                neighbors.push(grid[tempX][tempY]);
        }
    }
    return neighbors;
}

function countNeighborsByType(x, y, cell){
    let sum = 0;
    for(let i=x-1; i <= x+1; i++){
        for(let j=y-1; j <= y+1; j++){
            if(i == x && j == y)
                continue

            let tempX = i;
            let tempY = j;
            if(i < 0)
                tempX = sizeX - 1;
            if(i >= sizeX)
                tempX = 0;
            if(j < 0)
                tempY = sizeY - 1;
            if(j >= sizeY)
                tempY = 0;
            if(grid[tempX][tempY] == cell)
                sum++;
        }
    }
    return sum;
}

loopStart(fps);