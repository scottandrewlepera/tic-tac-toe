/*
Given a tic-tac-toe board, there are 8 known win conditions,
so it's optimal to just test for any of those conditions after
each player's turn.

Not a matrix! In memory, the board will be just an array of
nine spaces:

[0,1,2,3,4,5,6,7,8]

But displayed as a 3x3 grid:

|0|1|2|
|3|4|5|
|6|7|8|

This means we don't need to use 2D coordinates. No row/column stuff.

*/

// these values represent the players and how they occupy the board

const EMPTY = 0;
const PLAYER_1 = 1;
const PLAYER_2 = 2;

// here we list all the winning conditions.
// Each sub-array of three number pairings
// represents the spaces that need to be
// occupied to win with that condition.

const WINNING = [
    // horizontal
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    // vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    // diagonal
    [0, 4, 8],
    [2, 4, 6]
];

// initialize the current player
let currentPlayer = PLAYER_1;

// our board is a 9-element array initialized with EMPTY value
const BOARD = new Array(EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY,EMPTY);

// to check win conditions, we take the current player value, look
// at each win condition on the board, and see if the player occupies all
// all the spaces in each win condition.

const checkIfWinning = (playerInt) => {
    let hasWon = false;
    let winningState;
    // we'll use a standard loop since we can't exit a forEach
    for (i = 0; i < WINNING.length; i++) {
        if (
            BOARD[WINNING[i][0]] == playerInt &&
            BOARD[WINNING[i][1]] == playerInt &&
            BOARD[WINNING[i][2]] == playerInt
        ) {
            // if we find a win condition, 
            // record the condition and exit the loop,
            // no point in continuing the search.
            hasWon = true;
            winningStateIndex = i;
            break;
        }
    }
    // do we have a winner? If so, end the game
    if (hasWon) {
        declareWinner(playerInt, winningStateIndex);
    // if no winner and the board is full, end the game
    // as a stalemate.
    } else if (boardIsFull()) {
        doStaleMate();
    // otherwise, next player is up
    } else {
        alternatePlayer();
        displayPlayer();
    }
}

// the board is full when it's out of EMPTY spaces
const boardIsFull = () => {
    return !BOARD.includes(EMPTY);
}

// this will be our click handler when the player chooses a space
const chooseSpace = (button) => {
    const space = parseInt(button.getAttribute("id"));
    // if the space is EMPTY, assign it to the player
    if (BOARD[space] == EMPTY) {
        BOARD[space] = currentPlayer;
        button.textContent = currentPlayer;
        // disable it so it can't be chosen again
        button.setAttribute("disabled", "disabled");
        // check for win condition
        checkIfWinning(currentPlayer);
    }
}

// flips the current player between player 1 and 2
const alternatePlayer = () => {
    currentPlayer = (currentPlayer == PLAYER_2) ? PLAYER_1 : PLAYER_2;
}

// puts  up the winner message and disable the board
const declareWinner = (playerInt, winningStateIndex) => {
    console.log(winningStateIndex);
    document.getElementById("msg").innerHTML = `WINNER! Player ${playerInt}`;
    Array.from(document.getElementsByTagName("button")).forEach((button) => {
        button.setAttribute("disabled", "disabled");
    });
    WINNING[winningStateIndex].forEach((index) => {
        document.getElementById(index.toString()).classList.add("winning");
    });
}

// puts up the stalemate message
const doStaleMate = () => {
    document.getElementById("msg").innerHTML = `Stalemate!`;
}

// renders the board by creating a button for each space.
// The ID of each button will correspond to its space.
const renderBoard = () => {
    const root = document.getElementById("root");
    BOARD.forEach((value, index) => {
        const spaceElement = document.createElement("button");
        spaceElement.textContent = value;
        spaceElement.id = index;
        spaceElement.addEventListener("click", (e) => {
            chooseSpace(spaceElement);
        });
        root.appendChild(spaceElement);
    });
}

// puts up the current player message
const displayPlayer = () => {
    document.getElementById("player").innerHTML = currentPlayer;
}

// set everything up when the page loads
window.addEventListener("DOMContentLoaded", function(e) {
    renderBoard();
    displayPlayer();
});