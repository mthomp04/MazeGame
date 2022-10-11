
// Creates a room with four doors
export default class Room {

    // EFFECTS: Constructs room with four doors with a number > 0 indicating the room it leads to OR with a -1 indicating door is
    //          locked. Also indicates if room is the final room or if the room has been visited
    constructor(a, b, c, d, isExit, isVisited) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.isExit = isExit;
        this.isVisited = isVisited;
    }

    get getIsExit(){
        return this.isExit;
    }

    getIsVisited(){
        return isVisited;
    }
}

