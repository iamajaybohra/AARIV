$(document).on("mousedown", function(event) {
    //Not the First Click After The Algorihtm
    if (first_time != 3) {
        
        //Clear Grid Button Not Disabled
        if (!document.getElementById("clr").disabled) {

            if (first_time == 1) {

                //Cells to Deafault Value
                for (var i = 0; i < col; i++) {
                    for (var j = 0; j < row; j++) {
                        grid[i][j].showyou(color(255));
                    }
                }

                strt.showyou(color(0, 255, 0));
                end.showyou(color(255, 0, 0));

                first_time = 0;
            }

            //Finding Cell Coordinates!
            //X- coordinate
            var xc = Math.floor(mouseX / w);
            //Y- coordinate
            var yc = Math.floor(mouseY / h);
            
            //For checking if user has choosed Multi-Dest or Single-Dest
            var yz = document.getElementsByName("algo");

            //Check if the cell is currently a wall and A valid Cell
            if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc].end == true) {

                grid[xc][yc].end = false;
                grid[xc][yc].showyou(color(255));

                $(document).on("mousemove", function(event) {

                    //Current Cordinates of cell on which the mouse is!
                    var xc = Math.floor(mouseX / w);
                    var yc = Math.floor(mouseY / h);

                    if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc] != strt && grid[xc][yc] != end) {
                        grid[xc][yc].end = false;
                        grid[xc][yc].showyou(color(255));
                    }

                });
                $(document).on("mouseup", function(ev) {
                    //Stop the mousemove and mouseup
                    //Ready for Another MouseClick and MouseMove
                    $(this).unbind("mouseup mousemove");
                });

            } else if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc].wall == true && yz[1].checked) {

                //Mark Cell as Destination for inCase of Multi-dest 
                //Color The Cell Red
                grid[xc][yc].wall = false;
                grid[xc][yc].end = true;
                grid[xc][yc].showyou(color(255));

                $(document).on("mousemove", function(event) {

                    //Current Cordinates of cell on which the mouse is!
                    var xc = Math.floor(mouseX / w);
                    var yc = Math.floor(mouseY / h);

                    if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc].wall == true) {
                        grid[xc][yc].wall = false;
                        grid[xc][yc].end = true;
                        grid[xc][yc].showyou(color(255));

                    }

                });

                $(document).on("mouseup", function(ev) {
                    //Stop the mousemove and mouseup
                    //Ready for Another MouseClick and MouseMove
                    $(this).unbind("mouseup mousemove");
                });
            } else if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc].wall == false) {

                //Check if the current cell is not Souce and Destination
                if (grid[xc][yc] != strt && grid[xc][yc] != end) {

                    //If only pressed then also make the Cell a obstacle
                    grid[xc][yc].visited = true;
                    grid[xc][yc].wall = true;

                    //Color the Cell
                    grid[xc][yc].showyou(color(100, 100, 100));

                    /**
                     * If the mouse is pressed and moved
                     * make every cell a obstacles excluding Sources and Destination
                     */
                    $(document).on("mousemove", function(ev) {

                        var xc = Math.floor(mouseX / w);
                        var yc = Math.floor(mouseY / h);

                        if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc] != strt && grid[xc][yc] != end) {

                            grid[xc][yc].visited = true;
                            grid[xc][yc].wall = true;
                            grid[xc][yc].showyou(color(100, 100, 100));
                        }
                    });

                    $(document).on("mouseup", function(ev) {
                        //Stop the mousemove and mouseup
                        //Ready for Another MouseClick and MouseMove
                        $(this).unbind("mouseup mousemove");
                    });

                } else if (grid[xc][yc] == strt) {
                    //The Current Cell is Source 
                    //Move the Source or Destination Position 

                    //For transition Effects
                    $(document).on("mousemove", function(ev) {
                        document.getElementById('cursor1').style.display = 'block';
                        var cursor = document.getElementById('cursor1');
                        var xc = Math.floor(mouseX / w);
                        var yc = Math.floor(mouseY / h);
                        cursor.style.left = xc * w + w + "px";
                        cursor.style.top = yc * h + 2.5 * h + "px";

                    });

                    $(document).on("mouseup", function(ev) {

                        var xf = Math.floor(mouseX / w);
                        var yf = Math.floor(mouseY / h);
                        document.getElementById('cursor1').style.display = 'none';

                        //Mark the Cell as new Source
                        if (xf >= 0 && yf >= 0 && xf < col && yf < row && grid[xf][yf].wall != true && grid[xf][yf] != end) {
                            grid[xc][yc].wall = false;
                            grid[xc][yc].visited = false;
                            grid[xc][yc].showyou(color(255));

                            strt = grid[xf][yf];
                            strt.showyou(color(0, 255, 0));
                            grid[xf][yf].showyou(color(0, 255, 0));
                        }

                        $(this).unbind("mouseup mousemove");
                    });
                } else if (grid[xc][yc] == end) {

                    //If the Current Cell is Destination
                    //For Transition
                    $(document).on("mousemove", function(ev) {

                        document.getElementById('cursor2').style.display = 'block';
                        var cursor = document.getElementById('cursor2');
                        var xc = Math.floor(mouseX / w);
                        var yc = Math.floor(mouseY / h);
                        cursor.style.left = xc * w + w + "px";
                        cursor.style.top = yc * h + 2.5 * h + "px";

                    });


                    $(document).on("mouseup", function(ev) {

                        var xf = Math.floor(mouseX / w);
                        var yf = Math.floor(mouseY / h);
                        document.getElementById('cursor2').style.display = 'none';
                        
                        //Make the Cell the New Destination
                        if (xf >= 0 && yf >= 0 && xf < col && yf < row && grid[xf][yf].wall != true && grid[xf][yf] != strt) {
                            grid[xc][yc].wall = false;
                            grid[xc][yc].visited = false;
                            grid[xc][yc].showyou(color(255));

                            end = grid[xf][yf];
                            end.showyou(color(255, 0, 0));
                        }
                        $(this).unbind("mouseup mousemove");
                    });
                }
            } else if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc].wall == true) {

                //If the Cell is a Obstacle then it can't be Souce or Destination
                grid[xc][yc].visited = false;
                grid[xc][yc].wall = false;
                grid[xc][yc].showyou(color(255));
                $(document).on("mousemove", function(event) {

                    //Current Cordinates of cell on which the mouse is!
                    var xc = Math.floor(mouseX / w);
                    var yc = Math.floor(mouseY / h);
                    if (xc >= 0 && yc >= 0 && xc < col && yc < row && grid[xc][yc] != strt && grid[xc][yc] != end) {
                        grid[xc][yc].visited = false;
                        grid[xc][yc].wall = false;
                        grid[xc][yc].showyou(color(255));
                    }

                });

                //Stop the mousemove and mouseup
                //Ready for Another MouseClick and MouseMove
                $(document).on("mouseup", function(event) {
                    $(this).unbind("mouseup mousemove");
                });
            }
        }
    } else {
        first_time = 1;
    }
});
