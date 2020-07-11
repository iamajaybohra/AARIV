async function DFS() {
    var dir = new Array(4);
    for (var i = 0; i < 4; i++) dir[i] = new Array(2);

    dir[0][0] = 0;
    dir[0][1] = 1;
    dir[1][0] = 0;
    dir[1][1] = -1;
    dir[2][0] = 1;
    dir[2][1] = 0;
    dir[3][0] = -1;
    dir[3][1] = 1;

    var que = new Queue();
    var source = new QItem(0, 0, 0);

    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {

            if (grid[i][j] == strt) {
                source.row = i;
                source.col = j;
            }
        }
    }

    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            grid[i][j].visited = grid[i][j].wall;
        }
    }

    que.enqueue(source);
    var ok = true;

    while (!que.isEmpty()) {
        var p = que.front();
        que.dequeue();
        console.log("Dhund raha hoon");

        grid[p.row][p.col].visited = true;

        if (grid[p.row][p.col] == end) {
            swal({
                title: "Congratulations!!",
                //text: "Path length = " + c,
                icon: "success",
                button: " OK ",
            });
            ok = false;
            break;
        }

        for (var i = 0; i < 4; i++) {

            var a = p.row + dir[i][0];
            var b = p.col + dir[i][1];

            if (a >= 0 && b >= 0 && a < col && b < row && !grid[a][b].visited) que.enqueue(new QItem(a, b, 0));
        }
    }
    if (ok) {
        swal({
            title: "Sorry",
            text: "No Path Found!",
            icon: "error",
            button: "OK",
        });
    }
    //first_time = 2;

}