import Room from './room.js';

export default class Maze {
    
    constructor(rooms){
        this.adjList = new Map();
        this.solution = new Array();
        this.addEdges(rooms);
        this.solv = [];
        this.isStarted = false;
    }

    addEdges(rooms) {
        let roomNum = 1;
        for (let i = 0; i < rooms.length; i++) 
            if (i < rooms.length - 1) {
                const room = new Room(rooms[roomNum - 1][0], rooms[i][1], rooms[i][2], rooms[i][3], false, false);
                this.adjList.set(roomNum, room);
                roomNum++;
            } else if (i = rooms.length - 1) {
                const room = new Room(rooms[roomNum - 1][0], rooms[i][1], rooms[i][2], rooms[i][3], true, false);
                this.adjList.set(roomNum, room);
                roomNum++;
            }
        }

    // solve() {
    //     let queue = [1];
    //     let path = [];
    //     this.adjList.set(1, new Room(this.adjList.get(1).a, this.adjList.get(1).b, this.adjList.get(1).c, this.adjList.get(1).d, false, true));

    //     while (queue.length > 0) {
    //         let curRoom = queue.pop();
    //         let doorOneNum = this.adjList.get(curRoom).a;
    //         let doorTwoNum = this.adjList.get(curRoom).b;
    //         let doorThreeNum = this.adjList.get(curRoom).c;
    //         let doorFourNum = this.adjList.get(curRoom).d;
    //         let leftRoom = false;
    //         path.push(curRoom);
    //         console.log(path);

    //         if (this.adjList.get(curRoom).exit === true) {
    //             this.solution = path;
    //             console.log(path);
    //             return;
    //         }

    //         if (doorOneNum != -1) {
    //             let doorOneRoom = this.adjList.get(doorOneNum);
    //             if (!doorOneRoom.isVisited) {
    //                 this.adjList.set(doorOneNum, new Room(doorOneRoom.a, doorOneRoom.b, doorOneRoom.c, doorOneRoom.d, false, true));
    //                 queue.push(doorOneNum);
    //                 path.push("A")
    //             } else {
    //                 path.pop();
    //                 path.pop();
    //                 leftRoom = true;
    //             }
    //         } 
    //         console.log(path);

    //         if (doorTwoNum != -1 && !leftRoom) {
    //             let doorTwoRoom = this.adjList.get(doorTwoNum);
    //             if (!doorTwoRoom.isVisited) {
    //                 this.adjList.set(doorTwoNum, new Room(doorTwoRoom.a, doorTwoRoom.b, doorTwoRoom.c, doorTwoRoom.d, false, true));
    //                 queue.push(doorTwoNum);
    //                 path.push("B")
    //             } else {
    //                 path.pop();
    //                 path.pop();
    //                 leftRoom = true;
    //             }
    //         } 
    //         console.log(path);

    //         if (doorThreeNum != -1 && !leftRoom) {
    //             let doorThreeRoom = this.adjList.get(doorThreeNum);
    //             if (!doorThreeRoom.isVisited) {
    //                 this.adjList.set(doorThreeNum, new Room(doorThreeRoom.a, doorThreeRoom.b, doorThreeRoom.c, doorThreeRoom.d, false, true));
    //                 queue.push(doorThreeNum);
    //                 path.push("C")
    //             } else {
    //                 path.pop();
    //                 path.pop();
    //                 leftRoom = true;
    //             }
    //         } 
    //         console.log(path);

    //         if (doorFourNum != -1 && !leftRoom) {
    //             let doorFourRoom = this.adjList.get(doorFourNum);
    //             if (!doorFourRoom.isVisited) {
    //                 this.adjList.set(doorFourNum, new Room(doorFourRoom.a, doorFourRoom.b, doorFourRoom.c, doorFourRoom.d, false, true));
    //                 queue.push(doorFourNum);
    //                 path.push("D")
    //             } else {
    //                 path.pop();
    //                 path.pop();
    //                 leftRoom = true;
    //             }
    //         } 
    //         console.log(path);

    //         if (!leftRoom) {
    //             path.pop();
    //             path.pop();
    //         }

    //         console.log(path);
    //     }

    // }

    solve() {
        let queue = [1];
        let path = []
        let visited = [];
        this.solveRecursion(queue, path, visited);
    }
    
    solveRecursion(queue2, path2, visited2) {
        let queue = queue2;
        let path = path2;
        let visited = visited2;
        let curRoom = queue.pop();
        let doorOne = this.adjList.get(curRoom).a;
        let doorTwo = this.adjList.get(curRoom).b;
        let doorThree = this.adjList.get(curRoom).c;
        let doorFour = this.adjList.get(curRoom).d;
        visited.push(curRoom);
        path.push(curRoom);
        
        if (this.adjList.get(curRoom).exit === true) {
             for (let i = 0; i < path.length; i++) {
                 this.solution.push(path[i]);
             }
            return;
        }

        if (doorOne != -1 && !visited.includes(doorOne)) {
            queue.push(doorOne);
            path.push(["A"]);
            this.solveRecursion(queue, path, visited);
            path.pop();
            path.pop();
            
        } 

        if (doorTwo != -1 && !visited.includes(doorTwo)) {
            queue.push(doorTwo);
            path.push(["B"])
            this.solveRecursion(queue, path, visited);
            path.pop();
            path.pop();
        } 

        if (doorThree != -1 && !visited.includes(doorThree)) {
            queue.push(doorThree);
            path.push(["C"]);
            this.solveRecursion(queue, path, visited);
            path.pop();
            path.pop();
        } 

        if (doorFour != -1 && !visited.includes(doorFour)) {
            queue.push(doorFour);
            path.push(["D"]); 
            this.solveRecursion(queue, path, visited);
            path.pop();
            path.pop();
        }
       return;
    }
}

