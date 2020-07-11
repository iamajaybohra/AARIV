$(document).ready(function() {

    $('#strt').click(function() {
        document.getElementById("clr").disabled = true;
        document.getElementById("strt").disabled = true;
        document.getElementById("can").disabled = false;

        var x = document.getElementsByName("algo");

        if (x[0].checked) {
            var value = $("#algorithm-panel option:selected");
            switch (value.text()) {
                case "Dijkstra":
                    Dijkstra();
                    break;

                case "A*":
                    Astar();
                    break;
                default:
                    swal({
                        text: "Please Select a Algorithm to Start !!",
                        icon: "info",
                        button: "OK",
                    });
                    document.getElementById("clr").disabled = false;
                    document.getElementById("strt").disabled = false;
                    document.getElementById("can").disabled = true;
                    break;

            }
        } else if (x[1].checked) {
            calc_dis();
        } else {
            swal({
                text: "Please Tell : Single Destination or Multiple Destination ?",
                icon: "info",
                button: "OK",
            });

            document.getElementById("clr").disabled = false;
            document.getElementById("strt").disabled = false;
            document.getElementById("can").disabled = true;

        }
    });

    $('#clr').click(function() {

        for (var i = 0; i < col; i++) {
            for (var j = 0; j < row; j++) {
                grid[i][j].wall = false;
                grid[i][j].end = false;
                grid[i][j].showyou(color(255));
            }
        }
        strt.showyou(color(0, 255, 0))
        end.showyou(color(255, 0, 0));


    });

    $('#can').click(function() {
        abort = true;
    });
});