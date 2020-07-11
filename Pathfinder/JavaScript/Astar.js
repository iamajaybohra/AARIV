//Astar Implementation
var check = false;

async function Astar() {

    pqueue = new priority_queue();
    check = false;

    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {

            grid[i][j].g = Infinity;
            grid[i][j].f = Infinity;
            grid[i][j].h = Infinity;
            grid[i][j].visited = false;
            grid[i][j].camefrom = null;
            grid[i][j].neighbours = [];
            grid[i][j].showyou(color(255));
        }
    }

    strt.g = 0;
    strt.f = Math.abs(strt.i - end.i) + Math.abs(strt.j - end.j);
    pqueue.enqueue(strt.i, strt.j);

    var closedset = [];

    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            grid[i][j].addneighbours(grid);
        }
    }

    while (!pqueue.isEmpty()) {

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

        var current = pqueue.front().element;

        if (current === end) {
            check = true;

            var path = [];
            var temp = current;
            path.push(current);

            while (temp.camefrom) {
                path.push(temp.camefrom);
                temp = temp.camefrom;
            }

            noFill();
            stroke(255, 245, 102);
            strokeWeight(w / 5);
            beginShape();
            for (var i = 0; i < path.length; i++) {
                vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
            }
            endShape();
            var c = path.length;
            c--;
            success(c);
            break;
        } else {

            pqueue.dequeue();

            closedset.push(current);

            var neigh = current.neighbours;

            for (var i = 0; i < neigh.length; i++) {
                var neighbor = neigh[i];
                if (!neighbor.visited) {
                    neighbor.visited = true;
                    var tempG = current.g + 1;

                    if (tempG < neighbor.g) {
                        neighbor.g = tempG;
                        neighbor.camefrom = current;

                    }
                    var temph = Math.abs(neighbor.i - end.i) + Math.abs(neighbor.j - end.j);
                    var newcost = neighbor.g + temph;

                    if (newcost < neighbor.f) {
                        neighbor.h = temph;
                        neighbor.f = newcost;
                        pqueue.enqueue(neighbor.i, neighbor.j);
                    }
                }
            }
        }

        if (!check) {
            for (var i = 0; i < pqueue.items.length; i++) {
                //if in neighbour of current node,colour them green
                pqueue.items[i].element.showyou(color(177, 250, 82));
            }

            for (var i = 0; i < closedset.length; i++) {
                //if already visited colour them blue
                closedset[i].showyou(color(74, 247, 244));
            }
            strt.showyou(color(0, 255, 0));
            end.showyou(color(255, 0, 0));
            await sleep(15);
        }
    }
    if (!check && pqueue.isEmpty()) {
        fail();
        strt.showyou(color(0, 255, 0));
        end.showyou(color(255, 0, 0));

    }

    document.getElementById("clr").disabled = false;
    document.getElementById("strt").disabled = false;
    document.getElementById("can").disabled = true;
    first_time = 3;
}
//end of the code!!