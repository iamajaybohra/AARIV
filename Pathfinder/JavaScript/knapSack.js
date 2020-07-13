var col = 45;
var row = 21;



async function Rem()
{
    var vis = new Array(col);
    
    var dp = new Array(col);
    
    for(var i = 0 ; i < col ; i++ ) dp[i] = new Array(row);
    
    for(var i = 0 ; i < col ; i++ ) vis[i] = new Array(row);
    
    for(var i = 0 ; i < col ; i++ ) {
        for(var j = 0 ; j < row ; j++ ) {
            dp[i][j] = -1;
            vis[i][j] = false;
            grid[i][j].neighbours = [];
        }
    }

    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            grid[i][j].addneighbours(grid);
        }
    }
    dp[strt.i][strt.j] = 0;
    vis[strt.i][strt.j] = true;

    var que = new Queue();
    var cnt = 0;
    que.enqueue(new QItem(strt.i , strt.j , 0));

    while(!que.isEmpty())
    {
        var p = que.front();
        que.dequeue();

        if(p.dist > 9) continue;
        else 
        {
            var neigh = grid[p.row][p.col].neighbours; // Contains Neighbour of Grid[i][j]
            // Check in all the Direction of the Cell
            for (var i = 0; i < neigh.length; i++) {

                var neighbor = neigh[i]; 
                //If Cell is Not Visited or is Not A obstacle 
                if (!neighbor.wall && !vis[neighbor.i][neighbor.j]) {
                    dp[neighbor.i][neighbor.j] = Math.max(p.dist + 1 , dp[neighbor.i][neighbor.j]);
                    vis[neighbor.i][neighbor.j] = true;
                    que.enqueue(new QItem(neighbor.i, neighbor.j, dp[neighbor.i][neighbor.j]));
                }
            }
        }
        //cnt += 1;
    }
    for (var i = 0; i < col; i++) {
        for (var j = 0; j < row; j++) {
            
            if(dp[i][j] != -1 && grid[i][j] != strt && grid[i][j] != end) grid[i][j].showyou(color(13 , 123, 33));
        }
    }
    document.getElementById("clr").disabled = false;
    document.getElementById("strt").disabled = false;
    document.getElementById("can").disabled = true;

    //To not make any Modal on the First Click After the Algorihtm Ends
    first_time = 3;
    
}
