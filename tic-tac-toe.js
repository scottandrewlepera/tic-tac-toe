/*
Given a tic-tac-toe board, there are 8 known win conditions,
so it's optimal to just test for any of those conditions after
each player's turn.

NOTE: the board is not a matrix! In memory, the board 
will be just an array of nine spaces:

[0,1,2,3,4,5,6,7,8]

...but displayed as a 3x3 grid:

|0|1|2|
|3|4|5|
|6|7|8|

This means we don't need to use 2D coordinates. No row/column stuff.
In a worse-case scenario, the app will check all 8 win conditions,

*/

// these values represent the empty spaces and players. When a
// player claims a space, the associate value is assigned to it.

const PLAYER_1 = 0;
const PLAYER_2 = 1;
const EMPTY = -1;

// initialize the current player (global)

let currentPlayer = PLAYER_1;

// flips the current player between player 1 and 2
const alternatePlayer = () => {
    currentPlayer = (currentPlayer == PLAYER_2) ? PLAYER_1 : PLAYER_2;
}

// here we list all the winning conditions.
// Each triple represents the spaces that 
// need to be occupied to win with that 
// condition.

const WIN_CONDITION = [
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

// our board is a 9-element array initialized with EMPTY values.

const BOARD = 
    new Array(
        EMPTY, EMPTY, EMPTY,
        EMPTY, EMPTY, EMPTY, 
        EMPTY, EMPTY, EMPTY
    );

// to check win conditions, we take the current player value, look
// at each win condition on the board, and see if the player occupies all
// all the spaces in each win condition.

const checkIfWinning = (player) => {
    let winnerFound = false;

    // we'll use a standard loop since we can't break from a forEach

    for (i = 0; i < WIN_CONDITION.length; i++) {
        if (
            BOARD[WIN_CONDITION[i][0]] == player &&
            BOARD[WIN_CONDITION[i][1]] == player &&
            BOARD[WIN_CONDITION[i][2]] == player
        ) {
            // if we find a win condition, 
            // record the condition and exit the loop;
            // no point in continuing the search.

            winnerFound = true;
            break;
        }
    }
    // do we have a winner? If so, end the game

    if (winnerFound) {
        declareWinner(player, i);

    // if no winner and the board is full, end the game
    // as a stalemate.

    } else if (boardIsFull()) {
        doStalemateMessage();

    // otherwise, next player is up

    } else {
        alternatePlayer();
        displayPlayer(currentPlayer);
    }
}

// the board is full when it's out of EMPTY spaces
// (Not sure how performant the includes() method is 
// but it only has to check a max of 9 spaces. A
// better way might be to just increment a counter
// with each turn and call a stalemate when turn == 9)
const boardIsFull = () => {
    return !BOARD.includes(EMPTY);
}

// this will be our click handler when the player chooses a space
const claimSpace = (space, player) => {
    // if the space is EMPTY, assign it to the player
    if (BOARD[space] == EMPTY) {
        BOARD[space] = player;
        return true;
    } else {
        return false;
    }
}

// **** render functions **** //

// this could be more sophisticated I guess?
const MARKERS = ["X", "O"];

// this will be our click handler when the player chooses a space
const chooseSpace = (button, player) => {
    const space = parseInt(button.getAttribute("id"));
    // if the space is EMPTY, assign it to the player
    if (claimSpace(space, player)) {
        // update the button text
        button.textContent = MARKERS[player];
        // disable it so it can't be chosen again
        button.setAttribute("disabled", "disabled");
        // check for win condition
        checkIfWinning(player);
    }
}

// puts  up the winner message and disable the board
const declareWinner = (player, condition) => {
    // put up the winner's message
    document.getElementById("msg").innerHTML = `WINNER! Player ${MARKERS[player]}`;
    // disable the whole board
    Array.from(document.getElementsByTagName("button")).forEach((button) => {
        button.setAttribute("disabled", "disabled");
    });
    // light up the winning condition
    WIN_CONDITION[condition].forEach((index) => {
        document.getElementById(index.toString()).classList.add("winning");
    });
}

// puts up the stalemate message
const doStalemateMessage = () => {
    document.getElementById("msg").innerHTML = `Stalemate!`;
}

// renders the board by creating a button for each space.
// The ID of each button will correspond to its space.
const renderBoard = () => {
    const root = document.getElementById("root");
    BOARD.forEach((value, index) => {
        const space = document.createElement("button");
        space.id = index;
        space.addEventListener("click", (e) => {
            chooseSpace(space, currentPlayer);
        });
        root.appendChild(space);
    });
}

// puts up the current player message
const displayPlayer = (player) => {
    document.getElementById("player").innerHTML = MARKERS[player];
}

// set everything up when the page loads
window.addEventListener("DOMContentLoaded", (e) => {
    renderBoard();
    displayPlayer(currentPlayer);
});
