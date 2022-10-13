import Room from './room.js';

// A maze with a series of rooms
export default class Maze {
    
    constructor(rooms){
        this.adjList = new Map();
        this.solution = new Array();
        this.addEdges(rooms);
        this.solv = [];
        this.isStarted = false;
    }

    // EFFECTS: Builds series of rooms starting a one where the final room is the exit
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

    // REQUIRES: the given series of rooms must be solvable
    // EFFECTS: Finds a solution of the maze by displaying the room number followed by the door letter to the next room 
    //          until reaches final room
    solve() {
        let queue = [1];
        let path = []
        let visited = [];
        this.solveRecursion(queue, path, visited);
    }
    
    // EFFECTS: Find path from the first room to the final room
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
        
        if (this.adjList.get(curRoom).getIsExit === true) {
             for (let i = 0; i < path.length; i++) {
                 this.solution.push(path[i]);
             }
            return;
        }

        if (doorOne != -1 && !visited.includes(doorOne)) {
            this.nextRoom(queue, doorOne, path, visited, "A");
            
        } 

        if (doorTwo != -1 && !visited.includes(doorTwo)) {
            this.nextRoom(queue, doorTwo, path, visited, "B");

        } 

        if (doorThree != -1 && !visited.includes(doorThree)) {
            this.nextRoom(queue, doorThree, path, visited, "C");

        } 

        if (doorFour != -1 && !visited.includes(doorFour)) {
            this.nextRoom(queue, doorFour, path, visited, "D");

        }
       return;
    }

    // EFFECTS: Adds new room to queue and removes room and door from path if leads to a previously visited room
    nextRoom(queue, doorNum, path, visited, doorLetter) {
        queue.push(doorNum);
        path.push([doorLetter]);
        this.solveRecursion(queue, path, visited);
        path.pop();
        path.pop();
    }
}

