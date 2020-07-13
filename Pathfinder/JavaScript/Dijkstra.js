//Djikstar Algorihtm

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// AloGorithm Starts From here
async function Dijkstra() {
    
    //Hold Every Cell that Are yet to be Visited
    var que = new Queue();

    /**
     * Give Every Cell its Default Values 
     * Except Walls 
     */
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {

            grid[i][j].showyou(color(255));
            grid[i][j].camefrom = null;
            grid[i][j].visited = false;
            grid[i][j].neighbours = [];
        }
    }

    //Give each Cell its Neighbour in all Direction
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            grid[i][j].addneighbours(grid);
        }
    }

    que.enqueue(new QItem(strt.i, strt.j, 0)); //Contains Cell that are to be visited

    var cSet = []; //Contains All the Cells that Are visited

    var check = false;

    while (!que.isEmpty()) {

        //If the User Clicks The Cancel Search Button
        //Cancel the Search & Make every cell to its Default values
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

        //If Destination is Found
        if (grid[p.row][p.col] === end) {
            check = true;
            var x = grid[p.row][p.col];

            //To Show the Path
            noFill();
            stroke(255, 245, 102);
            strokeWeight(w / 7);
            beginShape(); // Drawing of Path starts from here
            vertex(x.i * w + w / 2, x.j * h + h / 2); 
            var cnt = 1; // Shows the Length of Path
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
            endShape();
            success(cnt); //Show a Message of Success
            break;
        } else {
            var neigh = grid[p.row][p.col].neighbours; // Contains Neighbour of Grid[i][j]
            // Check in all the Direction of the Cell
            for (var i = 0; i < neigh.length; i++) {

                var neighbor = neigh[i]; 
                //If Cell is Not Visited or is Not A obstacle 
                if (!neighbor.visited) {
                    que.enqueue(new QItem(neighbor.i, neighbor.j, p.dist + 1));
                    neighbor.visited = true;
                    neighbor.camefrom = grid[p.row][p.col];
                }
            }
        }
        if (!check) {

            //Colors the Cell to be Visited
            for (var i = 0; i < que.items.length; i++)
                grid[que.items[i].row][que.items[i].col].showyou(color(177, 250, 82));

            //Colors the Cell that are Visited
            for (var i = 0; i < cSet.length; i++)
                grid[cSet[i].row][cSet[i].col].showyou(color(74, 247, 244));

            strt.showyou(color(0, 255, 0));
            end.showyou(color(255, 0, 0));
            await sleep(5);
        }
    }
    // if Failed to Found a Path
    if (!check && que.isEmpty()) {
        fail(); // Show a Message
        strt.showyou(color(0, 255, 0));
        end.showyou(color(255, 0, 0));
    }
    //Algrihtm Ends!
    //Make All Buttons Normal
    document.getElementById("clr").disabled = false;
    document.getElementById("strt").disabled = false;
    document.getElementById("can").disabled = true;

    //To not make any Modal on the First Click After the Algorihtm Ends
    first_time = 3;
}
