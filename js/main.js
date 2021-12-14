const mines = 10;

//To do:
//Finish left click
//handle right click
//fix mineField generation, while loop for mine repeats
//fix init



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
    generateMineField();
    minesRemaining = mines;
    flags = 0;
    results = '';

//reset the board, removing all classes and innerText
    boardButtonsEl.forEach((item) => {
            item.innerText = null;
            item.removeAttribute('class');
    })


    console.log('init is invoked!');
    render();
}




function render() {
    console.log('render is invoked')
}


function handleButtonClick(e) {
    //logic for matching each button with its corresponding value in the mineField array
    console.log(`${e.target.id} has been clicked!`)
    let buttonRow = Math.floor(e.target.id / 8);
    let buttonCol = e.target.id - buttonRow * 8;
    let buttonValue = mineField[buttonRow][buttonCol];
    console.log(`Row ${buttonRow}, column ${buttonCol}`);

    //logic for changing the appearance of each button upon click
    if (buttonValue === 'Mine') {
        console.log('Game over');
        e.target.className = 'danger';
    } else if (buttonValue > 0) {
        e.target.innerText = buttonValue;
        e.target.className = 'safe';
    }
}




//Setting board with 8x8 array of empty buttons
// function setBoard() {
//     let arrayBoard = [];
//     board = [];
//     for (let i = 0; i < 8; i++) {
//         board.push([]);
//         let arrayBoard = board[i];
//         for (let j = 0; j < 8; j++) {
//             arrayBoard.push('');
//         }
//     }
//     console.log('Set board!');
    // ***** Need to get the value of each index into their corresponding button?
    //Do I even need an empty array, could I just use the buttons from the html
    // and the mineField?
// }





function generateMineField() {
    //generate the mineField array
    let arrayMine = [];
    mineField = [];
    for (let i = 0; i < 8; i++) {
        mineField.push([]);
        let arrayMine = mineField[i];
        for (let j = 0; j < 8; j++) {
            arrayMine.push(null);
        }
    }

    //place 10 mines into the mineField array
    for (let i = 0; i < mines; i++) {
        let mineRow = Math.floor(Math.random() * 8);
        let mineCol = Math.floor(Math.random() * 8);
        if (mineField[mineRow][mineCol] === 'Mine') {
            console.log('repeat!');
            //Use while loop?
        }
        mineField[mineRow][mineCol] = 'Mine'
    }

    //place numbers into the mineField array based on hwo many mines surround each button
    mineField.forEach((arrayMine, arrayIdx) => {

        arrayMine.forEach((item, idx) => {
            let mineCount = 0;

            if (item !== 'Mine') {
                if (arrayMine[idx + 1] === 'Mine') {
                    mineCount++;
                } if (arrayMine[idx - 1] === 'Mine') {
                    mineCount++;
                } if (mineField[arrayIdx + 1] !== undefined && mineField[arrayIdx + 1][idx] === 'Mine') {
                    mineCount++;
                } if (mineField[arrayIdx + 1] !== undefined && mineField[arrayIdx + 1][idx + 1] === 'Mine') {
                    mineCount++;
                } if (mineField[arrayIdx + 1] !== undefined && mineField[arrayIdx + 1][idx - 1] === 'Mine') {
                    mineCount++;
                } if (mineField[arrayIdx - 1] !== undefined && mineField[arrayIdx - 1][idx] === 'Mine') {
                    mineCount++;
                } if (mineField[arrayIdx - 1] !== undefined && mineField[arrayIdx - 1][idx + 1] === 'Mine') {
                    mineCount++;
                } if (mineField[arrayIdx - 1] !== undefined && mineField[arrayIdx - 1][idx - 1] === 'Mine') {
                    mineCount++;
                }
                //Need to get item into the mineField array
                if (arrayMine !== undefined) {
                    mineField[arrayIdx][idx] = mineCount;
                }
            }
        })
    })
    console.log(mineField);
}



