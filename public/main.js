import Maze from "./maze.js";

// ui var
const btnStart = document.querySelector("#start");
const btnSolve = document.querySelector("#solve");
const solutionDisplay = document.createElement("div");



//const maze = new Maze([[-1,-1,2,4], [-1,-1,3,5], [2,-1,-1,-1],[-1,-1,5,3],[-1,-1,6,1],[-1,-1,-1,-1]]);
let mazes = [];
let maze = [];
let mazeStarted = false;
let currMazeScore = 0;
let totalMazeScore = 0;
let usedHelpScore = 0;
let currRoom = 0;
let currRoomNum = 0;
let SPEED = 9;
const gameField = document.querySelector(".room");
const container = document.querySelector(".container");
const totalScore = document.querySelector(".score");
totalScore.classList.add(".score");
const scoreContainer = document.querySelector(".scorePanel");
scoreContainer.classList.add("scorePanel");
let offsets = container.getBoundingClientRect();
let left = offsets.x / offsets.left;
let bottom = offsets.bottom - offsets.top;
let top = bottom * .78;
let right = offsets.right - offsets.left;
const hallway = document.querySelector(".hallway");
hallway.style.left = offsets.x - offsets.left + (right / 6.8) + "px";
hallway.style.top = bottom /2 + "px";
hallway.style.width = right / 3.4 + "px";


loadMazes();
createSolved();

btnStart.addEventListener('click', (e) => {
    e.preventDefault();
    startingSequence(e);
 });

function startingSequence(e) {
    usedHelpScore = 0;
    if (!mazeStarted) {
        mazeStarted = true;
        selectMaze();
        createRoom(1);
    } else if (mazeStarted && mazes.length > 0) {
        if (solutionDisplay.childNodes.length > 0) {
            solutionDisplay.remove();
            solutionDisplay.removeChild(solutionDisplay.firstChild);
        }
        currRoom.remove();
        selectMaze();
        createRoom(1);
    }
}

function loadMazes() {
    mazes.push(new Maze([[1,2,1,3], [2,1,2,1], [-1,-1,-1,-1]]));
    mazes.push(new Maze([[-1,-1,2,4], [-1,-1,3,5], [2,-1,-1,-1],[-1,-1,5,3],[-1,-1,6,1],[-1,-1,-1,-1]]));
    mazes.push(new Maze([[-1,3,2,4], [1,3,2,-1], [3,1,4,5],[-1,-1,3,-1],[6,-1,-1,1],[-1,-1,-1,-1]]));
    mazes.push(new Maze([[1,2,1,1], [1,1,3,1], [4,2,2,2],[3,3,3,5],[6,4,4,4],[-1,-1,-1,-1]]));
    mazes.push(new Maze([[1, 3, -1, 2], [2, -1, 4, 5], [5, 2, 1, 8], [-1, -1, -1, 1], [-1, 6, 4, 9], [2, 8, 5, 3], [-1, -1, 10, 6], [3, 4, -1, 7], [-1, 7, 4, 2], [-1, -1, -1, -1]]));
    mazes.push(new Maze([[-1, 8,2,4], [-1,-1,-1,5], [2,-1,-1,-1],[1,-1,3,2],[3,2,6,7],[4,5,6,10], [9,7,6,11], [8,6,3,4], [-1,-1,6,11], [7,5,-1,-1], [-1,1,-1,12],[-1,-1,-1,-1]]));
}

function selectMaze() {
    maze = mazes.shift();
}

function roomTransition(room){
    room.classList.add('roomTransition')
    setTimeout(() => room.classList.remove('roomTransition'), 150);
}

function doorLockedLabel(){
    const lockedDoor = document.createElement("div");
    lockedDoor.appendChild(document.createTextNode("Door is locked!"));
    lockedDoor.classList.add('lockedDoor');
    container.appendChild(lockedDoor);
    setTimeout(() => lockedDoor.remove(), 1500);
}

// ui methods
function createRoom(roomNum) {
    gameField.remove();
    currMazeScore++;
    const room = document.createElement("div");
    roomTransition(room);
    currRoom = room;
    currRoomNum = roomNum;
    const roomTitle = document.createElement("span");
    const doorOne = document.createElement("div");
    doorOne.appendChild(document.createTextNode("A"));
    const doorTwo = document.createElement("span");
    doorTwo.appendChild(document.createTextNode("B"));
    const doorThree = document.createElement("span");
    doorThree.appendChild(document.createTextNode("C"));
    const doorFour = document.createElement("span");
    doorFour.appendChild(document.createTextNode("D"));
    room.classList.add('room');
    roomTitle.classList.add('roomTitle');
    roomTitle.appendChild(document.createTextNode("Room: " + roomNum));

    doorOne.classList.add('door-one');
    doorTwo.classList.add('door-two');
    doorThree.classList.add('door-three');
    doorFour.classList.add('door-four');

    doorOne.addEventListener('click', (e) => {
        e.preventDefault();
        let doorNum = maze.adjList.get(roomNum).a;
        if (doorNum === -1) {
            doorLockedLabel();
        } else {
            room.remove();
            createRoom(doorNum);
        }
    });

    doorTwo.addEventListener('click', (e) => {
        e.preventDefault();
        let doorNum = maze.adjList.get(roomNum).b;
        if (doorNum === -1) {
            doorLockedLabel();
        } else {
            room.remove();
            createRoom(doorNum);
        }
    });

    doorThree.addEventListener('click', (e) => {
        e.preventDefault();
        let doorNum = maze.adjList.get(roomNum).c;
                if (doorNum === -1) {
                    doorLockedLabel();
                } else {
                    room.remove();
                    createRoom(doorNum);
                }
    });

    doorFour.addEventListener('click', (e) => {
        e.preventDefault();
        let doorNum = maze.adjList.get(roomNum).d;
        if (doorNum === -1) {
            doorLockedLabel();
        } else {
            room.remove();
            createRoom(doorNum);
        }
    });

    room.appendChild(doorOne);
    room.appendChild(doorTwo);
    room.appendChild(doorThree);
    room.appendChild(doorFour);
    room.appendChild(roomTitle);
    container.appendChild(room);
    if (checkWin(roomNum)) {
        room.remove();
        if (solutionDisplay.childNodes.length > 0) {
            solutionDisplay.remove();
            solutionDisplay.removeChild(solutionDisplay.firstChild);
        }
        mazeStarted = false;
            scoreAnimation();
        container.appendChild(gameField);
    }
}

window.addEventListener('keydown', (e) => {
    console.log(currRoomNum);
    
    if (mazeStarted) {
        
        switch(e.key) { 
            case 'ArrowLeft':
                let doorNumA = maze.adjList.get(currRoomNum).a;
                if (doorNumA === -1) {
                    doorLockedLabel();
                } else {
                    currRoom.remove();
                    createRoom(doorNumA);
                }   
                break;
            
            case 'ArrowUp':
                let doorNumB = maze.adjList.get(currRoomNum).b;
                if (doorNumB === -1) {
                    doorLockedLabel();
                } else {
                    currRoom.remove();
                    createRoom(doorNumB);
                }
                break;

            case 'ArrowRight' :
                let doorNumC = maze.adjList.get(currRoomNum).c;
                if (doorNumC === -1) {
                    doorLockedLabel();
                } else {
                    currRoom.remove();
                    createRoom(doorNumC);
                }
                break;

            case 'ArrowDown' : 
            let doorNumD = maze.adjList.get(currRoomNum).d;
            if (doorNumD === -1) {
                doorLockedLabel();
            } else {
                currRoom.remove();
                createRoom(doorNumD);
            }   
            break;
        }
    }
});

window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
        startingSequence();
    }
})

function checkWin(roomNum) {
    if (maze.adjList.get(roomNum).exit === true) {
        const winGameLabel = document.createElement("div");
        winGameLabel.appendChild(document.createTextNode("You escaped!"));
        winGameLabel.classList.add('winGameLabel');
        gameField.appendChild(winGameLabel);
        return true;
    }
    return false;
}

function createSolved() {
    btnSolve.addEventListener('click', (e) => {
        if (mazeStarted && maze.solution.length < 1) {
        e.preventDefault();
        maze.solve();
        usedHelpScore = -40;
        solutionDisplay.appendChild(document.createTextNode(maze.solution));
        solutionDisplay.classList.add('solutionDisplay');
        container.appendChild(solutionDisplay);
        }
    });
}

let  x;
let y;
let scoreBubble;

function scoreAnimation() {
    x = 100;
    y = bottom /2;
    scoreBubble = document.createElement('div');
    scoreBubble.appendChild(document.createTextNode(Math.ceil(((10 * maze.adjList.size) - (5 * currMazeScore)) + usedHelpScore)));
    scoreBubble.classList.add('scoreBubble');
    container.appendChild(scoreBubble);
    moveScoreBubble();
}



 window.addEventListener("resize", function(){
    offsets = container.getBoundingClientRect();
    left = offsets.x / offsets.left;
    bottom = offsets.bottom - offsets.top;
    top = bottom * .78;
    right = offsets.right - offsets.left;
    hallway.style.left = offsets.x - offsets.left + (right / 6.8) + "px";
    hallway.style.top = bottom /2 + "px";
    hallway.style.width = right / 3.4 + "px";
    });
 



function moveScoreBubble() {
    scoreBubble.style.left = right /2 + "px";
    scoreBubble.style.top = bottom /2 + "px";

         if (x > left & y === bottom /2) {
             scoreBubble.style.left = x + "px";
             scoreBubble.style.top = y + "px";
             x -= SPEED;
             requestAnimationFrame(moveScoreBubble);
         } else if (x <= left && y < bottom){
            
            scoreBubble.style.left = x + "px";
            scoreBubble.style.top = y + "px";
            y += SPEED;
            requestAnimationFrame(moveScoreBubble);
         } else if (y >= bottom && x < right - 5) {
            scoreBubble.style.left = x + "px";
            scoreBubble.style.top = y + "px";
            x += SPEED;
            requestAnimationFrame(moveScoreBubble);
         } else if (x >= right - 5 && y > top) {
           
            scoreBubble.style.left = x + "px";
            scoreBubble.style.top = y + "px";
            y -= SPEED;
            requestAnimationFrame(moveScoreBubble);
         } else {
            scoreBubble.remove();
            totalMazeScore += Math.ceil(((10 * maze.adjList.size) - (5 * currMazeScore)) + usedHelpScore);
            totalScore.innerHTML = totalMazeScore;
            currMazeScore = 0;
         }
     }