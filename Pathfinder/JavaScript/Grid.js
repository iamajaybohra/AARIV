//Grid Implementation

var row = 21;
var col = 45;

var grid = new Array(col);
var h, w;


class Cell {

    constructor(i, j) {
        this.i = i;
        this.j = j;

        this.f = Infinity;
        this.h = Infinity;
        this.g = Infinity;

        this.wall = false;
        this.visited = false;
        this.end = false;
        this.neighbours = [];
        this.camefrom = null;
    }

    showyou(col) {
        fill(col);

        if (this.wall)
            fill(100, 100, 100);
        if (this.end)
            fill(255, 0, 0);

        strokeWeight(0.1);
        stroke(100, 100, 100);
        rect(this.i * w, this.j * h, w, h, 5);
    }


    addneighbours(grid) {
        var i = this.i;
        var j = this.j;

        if (i < col - 1 && grid[i + 1][j].wall == false) {
            this.neighbours.push(grid[i + 1][j]);
        }
        if (i > 0 && grid[i - 1][j].wall == false) {
            this.neighbours.push(grid[i - 1][j]);
        }
        if (j < row - 1 && grid[i][j + 1].wall == false) {
            this.neighbours.push(grid[i][j + 1]);
        }
        if (j > 0 && grid[i][j - 1].wall == false) {
            this.neighbours.push(grid[i][j - 1]);
        }
        //add diagonals also
        var diag = $("#diagonal-panel option:selected")
        if (diag.text() == "Allowed") {

            if (i < col - 1 && j < row - 1 && grid[i + 1][j + 1].wall == false && !(grid[i + 1][j].wall == true && grid[i][j + 1].wall == true)) {
                this.neighbours.push(grid[i + 1][j + 1]);
            }
            if (i > 0 && j > 0 && grid[i - 1][j - 1].wall == false && !(grid[i - 1][j].wall == true && grid[i][j - 1].wall == true)) {
                this.neighbours.push(grid[i - 1][j - 1]);
            }
            if (i > 0 && j < row - 1 && grid[i - 1][j + 1].wall == false && !(grid[i - 1][j].wall == true && grid[i][j + 1].wall == true)) {
                this.neighbours.push(grid[i - 1][j + 1]);
            }
            if (j > 0 && i < col - 1 && grid[i + 1][j - 1].wall == false && !(grid[i + 1][j].wall == true && grid[i][j - 1].wall == true)) {
                this.neighbours.push(grid[i + 1][j - 1]);
            }
        }
    }
}

function setup() {

    createCanvas(1335, 585);

    var canvas = document.getElementById("defaultCanvas0");

    var ctx = canvas.getContext('2d');
    ctx.shadowColor = "grey";
    //ctx.shadowBlur = 1;

    h = height / row;
    w = width / col;

    for (var i = 0; i < col; i++) grid[i] = new Array(row);

    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {

            grid[i][j] = new Cell(i, j);
            grid[i][j].showyou(color(255));
        }
    }
    strt = grid[18][10];
    end = grid[25][10];

    strt.wall = false;
    end.wall = false;

    strt.showyou(color(0, 255, 0));
    end.showyou(color(255, 0, 0));
}

function draw() {
    var xd = document.getElementsByName("algo");
    if (xd[0].checked) {
        document.getElementById("algorithm-panel").disabled = false;
        if (only) {
            for (var i = 0; i < col; i++) {
                for (var j = 0; j < row; j++) {
                    grid[i][j].end = false;
                    grid[i][j].showyou(color(255));

                }
            }
            strt.showyou(color(0, 255, 0));
            end.showyou(color(255, 0, 0));
            only = false;
        }
    } else {
        only = true;
        document.getElementById("algorithm-panel").disabled = true;
    }
}