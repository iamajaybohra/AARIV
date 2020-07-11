//Travelling Salseman Problem Implementation
var distance;
var pathorigin;
var destination;
var check = false;
var path = [];
var temp;
var z = 0;

class TSP {

    constructor(strt, distance) {
        this.start_node = strt;
        this.distance = distance;
        this.N = distance.length;
        this.finish_state = (1 << this.N) - 1;
        this.mintourcost = Infinity;
        this.ransolver = false;
        this.tour = [];
    }

    recursive_tsp(curr, state, memo, prev) {
        if (state == this.finish_state)
            return this.distance[curr][this.start_node];
        if (memo[curr][state] != -1)
            return memo[curr][state];

        var mincost = Infinity;
        var index = -1;

        for (var i = 0; i < this.N; i++) {
            if ((state & (1 << i)) != 0)
                continue;

            var nextState = (state | (1 << i));
            var newcost = this.distance[curr][i] + this.recursive_tsp(i, nextState, memo, prev);

            if (newcost < mincost) {
                mincost = newcost;
                index = i;
            }
        }
        prev[curr][state] = index;
        return memo[curr][state] = mincost;
    }

    solve() {
        var state = (1 << this.start_node);
        var memo = new Array(this.N);

        for (var i = 0; i < this.N; i++)
            memo[i] = new Array(1 << this.N);

        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < (1 << this.N); j++) {
                memo[i][j] = -1;
            }
        }

        var prev = new Array(this.N);

        for (var i = 0; i < this.N; i++)
            prev[i] = new Array(1 << this.N);

        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < (1 << this.N); j++) {
                prev[i][j] = -1;
            }
        }
        this.minTourCost = this.recursive_tsp(this.start_node, state, memo, prev);

        var index = this.start_node;

        while (true) {
            this.tour.push(index);
            var nextIndex = prev[index][state];

            if (nextIndex == -1)
                break;
            var nextState = (state | (1 << nextIndex));
            state = nextState;
            index = nextIndex;
        }
        this.tour.push(this.start_node);
        this.ranSolver = true;

    }

    getTourCost() {
        if (!this.ranSolver)
            this.solve();

        this.tour.push(this.minTourCost);
        return this.tour;
    }
}

//Main function.starts from here!
function calc_dis() {

    var count = 2;
    destination = [];

    destination.push(strt);
    destination.push(end);

    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++)
            if (grid[i][j].end) {
                count++;
                destination.push(grid[i][j]);
            }
    }
    //console.log(count);
    //console.log(destination);
    distance = new Array(count);
    pathorigin = new Array(count);

    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++)
            grid[i][j].neighbours = [];
    }
    //Storing neighbours of each cell in one of its property.Not considering diagonals
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            grid[i][j].addneighbours(grid); //Refer to line 37
        }
    }

    //Creating a priority_queue instance

    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            grid[i][j].showyou(color(255));
        }
    }

    strt.showyou(color(0, 255, 0));

    for (var i = 1; i < destination.length; i++)
        destination[i].showyou(color(255, 0, 0));

    for (var i = 0; i < count; i++)
        distance[i] = new Array(count);

    for (var i = 0; i < count; i++)
        pathorigin[i] = new Array(count);

    for (var i = 0; i < count; i++) {
        for (var j = 0; j < count; j++)
            pathorigin[i][j] = -1;
    }

    for (var i = 0; i < count; i++) {
        for (var j = 0; j < count; j++) {
            if (i == j)
                distance[i][j] = 0;
            else
                distance[i][j] = Infinity;
        }
    }
    travellingsalesman();
}

async function travellingsalesman() {

    for (var a = 0; a < destination.length; a++) {

        for (var b = 0; b < destination.length; b++) {


            if (a == b)
                continue;

            for (var i = 0; i < col; i++) {
                for (var j = 0; j < row; j++) {

                    grid[i][j].g = Infinity;
                    grid[i][j].f = Infinity;
                    grid[i][j].h = Infinity;
                    grid[i][j].visited = false;
                    grid[i][j].camefrom = null;
                }
            }

            end = destination[b];
            var pqueue = new priority_queue();
            destination[a].g = 0;
            destination[a].f = Math.abs(destination[a].i - end.i) + Math.abs(destination[a].j - end.j);
            pqueue.enqueue(destination[a].i, destination[a].j);

            while (!pqueue.isEmpty()) {

                var current = pqueue.front().element;

                //if that unvisited cell is our destination
                if (current === end) {
                    check = true;
                    //console.log("DONE!");

                    path[z] = new Array(1);
                    temp = current;
                    path[z].push(current);

                    while (temp.camefrom) {
                        path[z].push(temp.camefrom);
                        temp = temp.camefrom;
                    }

                    distance[a][b] = path[z].length;
                    //distance[b][a] = path[z].length;
                    pathorigin[a][b] = z;
                    //pathorigin[b][a] = z;
                    z++;
                    break;
                    //for stopping the calling of draw() function again.
                } else {
                    //remove that current cell from openset as it has been visited
                    pqueue.dequeue();

                    //taking all the neighbors of current cell
                    var neigh = current.neighbours;

                    for (var i = 0; i < neigh.length; i++) {
                        var neighbor = neigh[i];
                        //if that neighbour is not in closed set,then we only need to visit
                        if (!neighbor.visited) {
                            neighbor.visited = true;
                            var tempG = current.g + 1;

                            if (tempG < neighbor.g) {
                                neighbor.g = tempG;
                                neighbor.camefrom = current;
                            }
                            var temph = Math.abs(neighbor.i - end.i) + Math.abs(neighbor.j - end.j); //Math.sqrt((neighbor.i - end.i) * (neighbor.i - end.i) + (neighbor.j - end.j) * (neighbor.j - end.j)); //Math.abs(neighbor.i - end.i) + Math.abs(neighbor.j - end.j);
                            var newcost = neighbor.g + temph;

                            if (newcost < neighbor.f) {
                                neighbor.h = temph;
                                neighbor.f = newcost;
                                pqueue.enqueue(neighbor.i, neighbor.j);
                            }
                        }
                    }
                    //A* ends here   
                }
            }

        }

    }
    var obj = new TSP(0, distance);
    var follow = [];

    follow = obj.getTourCost();
    //console.log(follow);

    if (follow[follow.length - 1] == Infinity) {
        swal({
            title: "Sorry!",
            text: "No common path found!!",
            icon: "error",
            button: "noo!",
        });

    } else {

        var cnt = 0;
        noFill();
        stroke(0, 0, 0);
        strokeWeight(w / 5);

        beginShape();

        for (var i = 0; i < follow.length - 2; i++) {
            for (var j = path[pathorigin[follow[i]][follow[i + 1]]].length - 1; j >= 1; j--) {
                path[pathorigin[follow[i]][follow[i + 1]]][j].showyou(color(0, 0, 255));
                cnt++;

                destination[0].showyou(color(0, 255, 0));

                for (var k = 1; k < destination.length; k++)
                    destination[k].showyou(color(255, 0, 0));

                if (abort) {
                    for (var i = 0; i < col; i++) {
                        for (var j = 0; j < row; j++)
                            grid[i][j].showyou(color(255));
                    }
                    strt.showyou(color(0, 255, 0));
                    end.showyou(color(255, 0, 0));
                    break;
                }

                await sleep(100);
                path[pathorigin[follow[i]][follow[i + 1]]][j].showyou(color(74, 247, 244));

            }
            if (abort)
                break;
        }
        endShape();

        destination[0].showyou(color(0, 255, 0));

        for (var k = 1; k < destination.length; k++)
            destination[k].showyou(color(255, 0, 0));

        if (!abort) {
            cnt -= destination.length;
            success(cnt);
        }
    }
    document.getElementById("clr").disabled = false;
    document.getElementById("strt").disabled = false;
    document.getElementById("can").disabled = true;
    first_time = 3;
    abort = false;
}