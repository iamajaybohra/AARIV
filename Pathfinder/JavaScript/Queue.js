class QItem {
    constructor(x, y, w) {
        this.row = x;
        this.col = y;
        this.dist = w;
    }
}

class Queue {
    //Array Is Used to Implement Queue 
    constructor() {
        this.items = [];
    }

    //Push In the Array!!
    enqueue(element) {
        this.items.push(element);
    }

    //Dequeue function 
    dequeue() {
        if (this.isEmpty()) return "Underflow";
        return this.items.shift();
    }

    //Front function 
    front() {
        if (this.isEmpty()) return "No elements in Queue";
        return this.items[0];
    }

    //IsEmpty function 
    isEmpty() {
        return this.items.length == 0;
    }
}


class queue_element {
    constructor(i, j) {

        this.element = grid[i][j];
        this.priority = grid[i][j].f;
    }
}


class priority_queue {

    constructor() {
        this.items = [];
    }

    enqueue(i, j) {

        var ele = new queue_element(i, j);
        var contain = false;

        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].priority > ele.priority) {
                this.items.splice(i, 0, ele);
                contain = true;
                break;
            }
        }
        if (!contain) {
            this.items.push(ele);
        }
    }

    dequeue() {

        this.items.splice(0, 1);
    }

    front() {
        return this.items[0];
    }

    isEmpty() {
        return this.items.length == 0;
    }
}

function success(c) {
    swal({
        title: "Congratulations!!",
        text: "Found Path with length " + c,
        icon: "success",
        button: "OK",
    });
}
function fail() {
    swal({
        title: "Sorry",
        text: "No Path Found!",
        icon: "error",
        button: "no!",
    });
}