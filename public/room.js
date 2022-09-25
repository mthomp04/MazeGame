export default class Room {
    constructor(a, b, c, d, exit, isVisited) {
        this.a = a;
        this.b = b;
        this.c = c;
        this.d = d;
        this.exit = exit;
        this.isVisited = isVisited;
    }

    get getExit(){
        return this.exit;
    }

    getIsVisited(){
        return isVisited;
    }
}

