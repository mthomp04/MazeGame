import Maze from "./maze.js";

// Constants
const BUBBLE_SPEED = 9;
const NEG_PENATLY = -40; 

// UI Variables
const btnStart = document.querySelector("#start");
const btnSolve = document.querySelector("#solve");
const solutionDisplay = document.createElement("div");
const gameField = document.querySelector(".room");
const container = document.querySelector(".container_game");
const totalScore = document.querySelector(".score");
const hallway = document.querySelector(".hallway");
let offsets;
let left;
let bottom;
let top;
let right;
let scoreBubble;
let scoreBubble_X;
let scoreBubble_Y;

// Helper Variables
let mazes = [];
let maze = [];
let mazeStarted = false;
let currMazeScore = 0;
let totalMazeScore = 0;
let usedHelpScore = 0;
let currRoom = 0;
let currRoomNum = 0;

windowResizing();
loadMazes();

// EFFECTS: sets initial size of the hallway b
function windowResizing() {
    offsets = container.getBoundingClientRect();
    left = offsets.x / offsets.left;
    bottom = offsets.bottom - offsets.top;
    top = bottom * .78;
    right = offsets.right - offsets.left;
    hallway.style.left = offsets.x - offsets.left + (right / 6.8) + "px";
    hallway.style.top = bottom /2 + "px";
    hallway.style.width = right / 3.4 + "px";
}

// EFFECTS: Selects next maze and displays the first room. If a maze is already started 
//          then loads next maze
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

// EFFECTS: Creates list of mazes
function loadMazes() {
    mazes.push(new Maze([[1,2,1,3], [2,1,2,1], [-1,-1,-1,-1]]));
    mazes.push(new Maze([[-1,-1,2,4], [-1,-1,3,5], [2,-1,-1,-1],[-1,-1,5,3],[-1,-1,6,1],[-1,-1,-1,-1]]));
    mazes.push(new Maze([[-1,3,2,4], [1,3,2,-1], [3,1,4,5],[-1,-1,3,-1],[6,-1,-1,1],[-1,-1,-1,-1]]));
    mazes.push(new Maze([[1,2,1,1], [1,1,3,1], [4,2,2,2],[3,3,3,5],[6,4,4,4],[-1,-1,-1,-1]]));
    mazes.push(new Maze([[1, 3, -1, 2], [2, -1, 4, 5], [5, 2, 1, 8], [-1, -1, -1, 1], [-1, 6, 4, 9], [2, 8, 5, 3], [-1, -1, 10, 6], [3, 4, -1, 7], [-1, 7, 4, 2], [-1, -1, -1, -1]]));
    mazes.push(new Maze([[-1, 8,2,4], [-1,-1,-1,5], [2,-1,-1,-1],[1,-1,3,2],[3,2,6,7],[4,5,6,10], [9,7,6,11], [8,6,3,4], [-1,-1,6,11], [7,5,-1,-1], [-1,1,-1,12],[-1,-1,-1,-1]]));
}

// REQUIRES: mazes variable has a list of mazes 
// EFFECTS: Selects the first maze in the list of mazes and removes it from the list
function selectMaze() {
    maze = mazes.shift();
}

// EFFECTS: Fades room colour to black than returns to original
function roomTransition(room){
    room.classList.add('roomTransition')
    setTimeout(() => room.classList.remove('roomTransition'), 150);
}

// EFFECTS: Creates label that indicates that door is locked then removes it
function doorLockedLabel(){
    const lockedDoor = document.createElement("div");
    lockedDoor.appendChild(document.createTextNode("Door is locked!"));
    lockedDoor.classList.add('lockedDoor');
    container.appendChild(lockedDoor);
    setTimeout(() => lockedDoor.remove(), 1500);
}

// EFFECTS: Creates UI for current room and checks if current room is exit
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

    addCheckWin(room, roomNum);
    
}

// EFFECTS: Determines if the given room number is the final room. If it is launches scoring animation and resets UI
function addCheckWin(room, roomNum) { 
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

// EFFECTS: Checks to see if current room is the last. Adds label that indicates win if true else nothing
function checkWin(roomNum) {
    if (maze.adjList.get(roomNum).getIsExit === true) {
        const winGameLabel = document.createElement("div");
        winGameLabel.appendChild(document.createTextNode("You escaped!"));
        winGameLabel.classList.add('winGameLabel');
        gameField.appendChild(winGameLabel);
        return true;
    }
    return false;
}

// EFFECTS: Creates score bubble (circle with current score) that starts at beginning of hallway
function scoreAnimation() {
    scoreBubble = document.createElement('div');
    scoreBubble_X = 100;
    scoreBubble_Y = bottom /2;
    scoreBubble.style.left = right /2 + "px";
    scoreBubble.style.top = bottom /2 + "px";
    scoreBubble.appendChild(document.createTextNode(Math.ceil(((10 * maze.adjList.size) - (5 * currMazeScore)) + usedHelpScore)));
    scoreBubble.classList.add('scoreBubble');
    container.appendChild(scoreBubble);
    moveScoreBubble();
}

// EFFECTS: Moves scorebubble left down hallway and then around the bottom of the game container and is removed once hit
//          left side menu. Updates total score by adding current score
function moveScoreBubble() {
    
         if (scoreBubble_X > left & scoreBubble_Y === bottom /2) {
             scoreBubble.style.left = scoreBubble_X + "px";
             scoreBubble.style.top = scoreBubble_Y + "px";
             scoreBubble_X -= BUBBLE_SPEED;
             requestAnimationFrame(moveScoreBubble);
         } else if (scoreBubble_X <= left && scoreBubble_Y < bottom){
            
            scoreBubble.style.left = scoreBubble_X + "px";
            scoreBubble.style.top = scoreBubble_Y + "px";
            scoreBubble_Y += BUBBLE_SPEED;
            requestAnimationFrame(moveScoreBubble);
         } else if (scoreBubble_Y >= bottom && scoreBubble_X < right - 5) {
            scoreBubble.style.left = scoreBubble_X + "px";
            scoreBubble.style.top = scoreBubble_Y + "px";
            scoreBubble_X += BUBBLE_SPEED;
            requestAnimationFrame(moveScoreBubble);
         } else if (scoreBubble_X >= right - 5 && scoreBubble_Y > top) {
           
            scoreBubble.style.left = scoreBubble_X + "px";
            scoreBubble.style.top = scoreBubble_Y + "px";
            scoreBubble_Y -= BUBBLE_SPEED;
            requestAnimationFrame(moveScoreBubble);
         } else {
            scoreBubble.remove();
            totalMazeScore += Math.ceil(((10 * maze.adjList.size) - (5 * currMazeScore)) + usedHelpScore);
            totalScore.innerHTML = totalMazeScore;
            currMazeScore = 0;
         }
     }

// EFFECTS: Adds start button event listener     
btnStart.addEventListener('click', (e) => {
    e.preventDefault();
    startingSequence(e);
 });

 // EFFECTS: Displays solution on the screen. If already displayed then nothing 
 btnSolve.addEventListener('click', (e) => {
    if (mazeStarted && maze.solution.length < 1) {
    e.preventDefault();
    maze.solve();
    usedHelpScore = NEG_PENATLY;
    solutionDisplay.appendChild(document.createTextNode(maze.solution));
    solutionDisplay.classList.add('solutionDisplay');
    container.appendChild(solutionDisplay);
    }
});

// EFFECTS: adjusts size of the hallway if window size is changed
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

// EFFECTS: Adds arrow key events where 'L' enters Door A, 'U' Door B, 'R' Door C, and 'D' Door D 
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    
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

// EFFECTS: Pressing enter launches game
window.addEventListener('keydown', (e) => {
    e.preventDefault();
    if (e.key === 'Enter') {
        startingSequence();
    }
})