import Maze from './maze.js';

export default class Game {

    Game() {
        this.mazeStarted = false;
        this.currMazeScore = 0;
        this.totalMazeScore = 0;
        this.usedHelpScore = 0;
        
        
    }

    // EFFECTS: Creates list of mazes
    loadMazes() {
        this.mazes.push(new Maze([[1,2,1,3], [2,1,2,1], [-1,-1,-1,-1]]));
        this.mazes.push(new Maze([[-1,-1,2,4], [-1,-1,3,5], [2,-1,-1,-1],[-1,-1,5,3],[-1,-1,6,1],[-1,-1,-1,-1]]));
        this.mazes.push(new Maze([[-1,3,2,4], [1,3,2,-1], [3,1,4,5],[-1,-1,3,-1],[6,-1,-1,1],[-1,-1,-1,-1]]));
        this.mazes.push(new Maze([[1,2,1,1], [1,1,3,1], [4,2,2,2],[3,3,3,5],[6,4,4,4],[-1,-1,-1,-1]]));
        this.mazes.push(new Maze([[1, 3, -1, 2], [2, -1, 4, 5], [5, 2, 1, 8], [-1, -1, -1, 1], [-1, 6, 4, 9], [2, 8, 5, 3], [-1, -1, 10, 6], [3, 4, -1, 7], [-1, 7, 4, 2], [-1, -1, -1, -1]]));
        this.mazes.push(new Maze([[-1, 8,2,4], [-1,-1,-1,5], [2,-1,-1,-1],[1,-1,3,2],[3,2,6,7],[4,5,6,10], [9,7,6,11], [8,6,3,4], [-1,-1,6,11], [7,5,-1,-1], [-1,1,-1,12],[-1,-1,-1,-1]]));
        console.log("done");
    }

    // REQUIRES: mazes variable has a list of mazes 
    // EFFECTS: Selects the first maze in the list of mazes and removes it from the list
        selectMaze() {
            this.maze = mazes.shift();
        }

        set setCurrentGameScore(num) {
            this.currMazeScore = num;
        }

        set setTotalGameScore(num) {
            this.totalMazeScore = num;
        }

}
