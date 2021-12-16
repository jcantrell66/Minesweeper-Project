const mines = 10;

//To do:
//Finish left click
//handle right click
//fix mineField generation, while loop for mine repeats
//fix init



//state variables, whats changing game to game

//array for collecting empty buttons
let emptyButtons;

//array of mines and numbers
let mineField;

//displays the result of the game
let results;

//counts the number of mines remaining (technically flags)
let minesRemaining;

//counts the number of flags on the board
let flags;

//new array object for storing all buttons
let allButtons;

//variable used to count empty buttons to prevent infinite loop
let emptyCount = 0;
let maxEmptyCount = 0;


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
//document.querySelector('#boardButtons').addEventListener('click', handleButtonClick);




init();

//setting the state variables EXCEPT for the board, which is
//handled by generateMineField
function init() {
    generateMineField();
    emptyButtons = [];
    allButtons = [];

    boardButtonsEl.forEach((button) => {
        allButtons.push(button.id);
        allButtons[0].buttonRow = 0;
    })










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
        console.log(e.target - 1);
        return;
    } else if (buttonValue > 0) {
        e.target.innerText = buttonValue;
        e.target.className = 'safe';
    } else {
        e.target.className = 'empty-safe';
        //this calls a function that is the meta-checker for all other empty-safe
        //check functions
        checkLeft(buttonRow, buttonCol);
    }
}

//change checkLeft to be only checkLeft? and create a 'meta-function'

//check left of the empty button to uncover other buttons
function checkLeft(buttonRow, buttonCol) {
    //buttonRow and buttonCol are the x y coordinates of where i have clicked
    if (mineField[buttonRow][buttonCol] === undefined) {
        return;
    }
    if (mineField[buttonRow][buttonCol] === 'Mine') {
        return;
    } else if (mineField[buttonRow][buttonCol] > 0) {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'safe';
        boardButtonsEl[(buttonRow * 8) + buttonCol].innerText = mineField[buttonRow][buttonCol];
        return;
    } else {
        //as long as the button click has a classname of empty-safe, then we
        //recursively run the checkLeft function again by moving one to the left
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'empty-safe'
        console.log(buttonRow, buttonCol, 'left');
        checkLeft(buttonRow, buttonCol - 1)
        console.log(buttonRow, buttonCol, 'right');
        checkRight(buttonRow, buttonCol + 1)
        console.log(buttonRow, buttonCol, 'up');
        checkUp(buttonRow - 1, buttonCol)
        console.log(buttonRow, buttonCol, 'down');
        checkDown(buttonRow + 1, buttonCol)
    }
}
//check right of the empty button to uncover other buttons
function checkRight(buttonRow, buttonCol) {
    if (mineField[buttonRow][buttonCol] === undefined) {
        return;
    }
    if (mineField[buttonRow][buttonCol] === 'Mine') {
        return;
    } else if (mineField[buttonRow][buttonCol] > 0) {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'safe';
        boardButtonsEl[(buttonRow * 8) + buttonCol].innerText = mineField[buttonRow][buttonCol];
        return;
    } else {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'empty-safe';
        checkRight(buttonRow, buttonCol + 1);
        checkDown(buttonRow + 1, buttonCol);
        checkUp(buttonRow - 1, buttonCol);
//        checkLeft(buttonRow, buttonCol - 1)
    }
}

//check north of the empty button to uncover other buttons
function checkUp(buttonRow, buttonCol) {
    if (mineField[buttonRow] === undefined) {
        return;
    } if (mineField[buttonRow][buttonCol] === 'Mine') {
        return;
    } else if (mineField[buttonRow][buttonCol] > 0) {
        boardButtonsEl[((buttonRow) * 8) + buttonCol].className = 'safe';
        boardButtonsEl[((buttonRow) * 8) + buttonCol].innerText = mineField[buttonRow][buttonCol];
        return;
    } else {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'empty-safe'
        checkUp(buttonRow - 1, buttonCol)
        checkRight(buttonRow, buttonCol + 1)
//        checkLeft(buttonRow, buttonCol - 1)
    }
}

//check south of the empty button to uncover other buttons
function checkDown(buttonRow, buttonCol) {
    if (mineField[buttonRow] === undefined) {
        return;
    } if (mineField[buttonRow][buttonCol] === 'Mine') {
        return;
    } else if (mineField[buttonRow][buttonCol] > 0) {
        boardButtonsEl[((buttonRow) * 8) + buttonCol].className = 'safe';
        boardButtonsEl[((buttonRow) * 8) + buttonCol].innerText = mineField[buttonRow][buttonCol];
        return;
    } else {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'empty-safe'
        checkDown(buttonRow + 1, buttonCol)
        checkRight(buttonRow, buttonCol + 1)
//       checkLeft(buttonRow, buttonCol - 1)

    }
}





function handleFlagClick() {

}



// function handleEmptySafe(e, buttonValue){
//     if (buttonValue > 0) {
//         e.target.innerText = buttonValue;
//         e.target.className = 'safe';
//     } else {
//         e.target.className = 'empty-safe';
//     }
//    console.log(buttonValue);
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




