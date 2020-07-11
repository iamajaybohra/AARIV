//Djikstra ALgorithm Implementation

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function Dijkstra() {
    var que = new Queue();


    var ok = false;


    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {

            grid[i][j].showyou(color(255));
            grid[i][j].camefrom = null;
            grid[i][j].visited = false;
            grid[i][j].neighbours = [];
        }
    }

    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            grid[i][j].addneighbours(grid);
        }
    }

    que.enqueue(new QItem(strt.i, strt.j, 0));
    var cSet = [];
    var check = false;

    while (!que.isEmpty()) {

        if (abort) {
            abort = false;
            for (var i = 0; i < col; i++) {
                for (var j = 0; j < row; j++)
                    grid[i][j].showyou(color(255));
            }
            strt.showyou(color(0, 255, 0));
            end.showyou(color(255, 0, 0));
            break;
        }

        var p = que.front();
        que.dequeue();
        cSet.push(p);

        if (grid[p.row][p.col] === end) {
            check = true;
            var x = grid[p.row][p.col];

            noFill();
            stroke(255, 245, 102);
            strokeWeight(w / 7);
            beginShape();
            vertex(x.i * w + w / 2, x.j * h + h / 2);
            var cnt = 1;
            x = x.camefrom;
            while (true) {
                vertex(x.i * w + w / 2, x.j * h + h / 2);
                x = x.camefrom;
                cnt++;
                if (x == strt || x == null) {
                    vertex(x.i * w + w / 2, x.j * h + h / 2);
                    break;
                }
            }
            success(cnt);
            endShape();

            break;
        } else {
            var neigh = grid[p.row][p.col].neighbours;
            for (var i = 0; i < neigh.length; i++) {

                var neighbor = neigh[i];

                if (!neighbor.visited) {
                    que.enqueue(new QItem(neighbor.i, neighbor.j, p.dist + 1));
                    neighbor.visited = true;
                    neighbor.camefrom = grid[p.row][p.col];
                }
            }
        }
        if (!check) {

            for (var i = 0; i < que.items.length; i++)
                grid[que.items[i].row][que.items[i].col].showyou(color(177, 250, 82));

            for (var i = 0; i < cSet.length; i++)
                grid[cSet[i].row][cSet[i].col].showyou(color(74, 247, 244));

            strt.showyou(color(0, 255, 0));
            end.showyou(color(255, 0, 0));
            await sleep(5);
        }
    }
    if (!check && que.isEmpty()) {
        fail();
        strt.showyou(color(0, 255, 0));
        end.showyou(color(255, 0, 0));
    }
    document.getElementById("clr").disabled = false;
    document.getElementById("strt").disabled = false;
    document.getElementById("can").disabled = true;
    first_time = 3;
}