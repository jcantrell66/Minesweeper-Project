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

//cache the buttons on the board
const boardButtonsEl = document.querySelectorAll('#boardButtons > button');

//the remaining mines (flags) displayed in the top left
const remainingMinesEl = document.querySelector('#minesRemaining');

//results need to be displayed once the game is over
const resultsEl = document.querySelector('#results');




//Add event listeners

//reset button, restarting the board
document.querySelector('#reset').addEventListener('click', init);

//left click to uncover a button
document.querySelector('#boardButtons').addEventListener('click', handleButtonClick);

//right click to set a flag





init();

//setting the state variables EXCEPT for the board, which is
//handled by setBoard
function init() {
    // setBoard();
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

function handleButtonClick(e){
    console.log(`${e.target.id} has been clicked!`)
    let buttonRow = Math.floor(e.target.id / 8);
    let buttonCol = e.target.id - buttonRow * 8;
    console.log(buttonRow, buttonCol);
    console.log(mineField[buttonRow][buttonCol]);
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
// ***** Need to get the value of each index into their corresponding button?
//Do I even need an empty array, could I just use the buttons from the html
// and the mineField?
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
    //    console.log(mineRow,mineCol);
    }

    mineField.forEach((arrayMine, arrayIdx) => {

        arrayMine.forEach((item, idx) => {
            let mineCount = 0;

            if (item !== 'Mine') {
                if (arrayMine[idx+1] === 'Mine') {
                    mineCount++;
                } if (arrayMine[idx-1] === 'Mine') {
                    mineCount++;
                } if (mineField[arrayIdx+1] !== undefined && mineField[arrayIdx+1][idx] === 'Mine') {
                    mineCount++;
                } if (mineField[arrayIdx+1] !== undefined && mineField[arrayIdx+1][idx+1] === 'Mine') {
                    mineCount++;
                } if (mineField[arrayIdx+1] !== undefined && mineField[arrayIdx+1][idx-1] === 'Mine') {
                    mineCount++;
                } if (mineField[arrayIdx-1] !== undefined && mineField[arrayIdx-1][idx] === 'Mine') {
                    mineCount++;
                } if (mineField[arrayIdx-1] !== undefined && mineField[arrayIdx-1][idx+1] === 'Mine') {
                    mineCount++;
                } if (mineField[arrayIdx-1] !== undefined && mineField[arrayIdx-1][idx-1] === 'Mine') {
                    mineCount++;
                } 
//Need to get item into the MineField array
                item = mineCount;
//                mineField[arrayMine][item] = item;
//                console.log(item,arrayIdx,idx);
            }
        })
    })
}


generateMineField();
console.log(mineField);

