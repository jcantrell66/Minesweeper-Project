const mines = 10;

//state variables, whats changing game to game

//main board displayed
let board;

//array of mines and numbers
let mineField;

//displays the result of the game
let results;

//counts the number of mines remaining (technically flags)
let minesRemaining;

//counts the number of flags on the board
let flags;




//cache DOM elements that need to be updated

//the main board needs to be updated with each click
const boardEl = document.querySelector('.board');

//the remaining mines (flags) displayed in the top left
const remainingMinesEl = document.querySelector('#minesRemaining');

//results need to be displayed once the game is over
const resultsEl = document.querySelector('#results');

//reset button, restarting the board
document.querySelector('#reset').addEventListener('click', init);





init();

//setting the state variables EXCEPT for the board, which is
//handled by setBoard
function init() {
    setBoard();
    minesRemaining = mines;
    flags = 0;
    results = '';



    console.log('init is invoked!');
    console.log(board);
    render();
}




function render() {
    console.log('render is invoked')
}




//Setting board with 8x8 array of empty buttons
function setBoard() {
    let arrayBoard = [];
    board = [];
    for (let i = 0; i < 8; i++) {
        board.push([]);
        let arrayBoard = board[i];
        for (let j = 0; j < 8; j++) {
            arrayBoard.push('');
        }
    }
    console.log('Set board!');
}


function generateMineField(){
    let arrayMine = [];
    mineField = [];
    for (let i = 0; i < 8; i++) {
        mineField.push([]);
        let arrayMine = mineField[i];
        for (let j = 0; j < 8; j++) {
            arrayMine.push(null);
        }
    }
    console.log(mineField);

    for (let i = 0; i < mines; i++) {
        let mineRow = Math.floor(Math.random()*8);
        let mineCol = Math.floor(Math.random()*8);
        if (mineField[mineRow][mineCol] === 'Mine') {
            console.log('repeat!');
            //Use while loop!
        }
        mineField[mineRow][mineCol] = 'Mine'
        console.log(mineRow,mineCol);
    }

    

    console.log(mineField);
}


generateMineField();
