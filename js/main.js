const mines = 10;

//To do:
//Finish left click
//handle right click (scrapping this)
//fix mineField generation, while loop for mine repeats



// run these commands when ready for final deployment
// git add -A

// git commit -m "prep for deployment"

// git checkout gh-pages

// git merge main

// git push origin gh-pages



//state variables, whats changing game to game

//array for collecting empty buttons
let emptyButtons;

//array of mines and numbers
let mineField;

//displays the result of the game
//let results;

//counts the number of mines remaining (technically flags)
let minesRemaining;

//counts the number of flags on the board
let flags;

//variable used to count empty buttons to prevent infinite loop
let buttonCount;


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


//    minesRemaining = mines;
//    flags = 0;
    buttonCount = 0;

    //reset the board, removing all classes and innerText
    boardButtonsEl.forEach((item) => {
        item.innerText = null;
        item.removeAttribute('class');
        resultsEl.innerText = "Results";
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
        resultsEl.innerText = 'Game over!';
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

        checkAll(buttonRow, buttonCol);
        // checkAll(buttonRow, buttonCol);
    }
}


//check all of the empty buttons to uncover other buttons
function checkAll(buttonRow, buttonCol) {
    if (buttonRow > 7 || buttonCol > 7 || buttonRow < 0 || buttonCol < 0) {
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
        // console.log(buttonRow, buttonCol, 'all');
        // checkAll(buttonRow, buttonCol - 1)
        console.log(buttonRow, buttonCol, 'left', 'checkAll');
        checkLeft(buttonRow, buttonCol -1)
        console.log(buttonRow, buttonCol, 'right', 'checkAll');
        checkRight(buttonRow, buttonCol + 1)
        console.log(buttonRow, buttonCol, 'up', 'checkAll');
        checkUp(buttonRow -1, buttonCol)
        console.log(buttonRow, buttonCol, 'down', 'checkAll');
        checkDown(buttonRow + 1, buttonCol)
    }
}
//check left of the empty button to uncover other buttons
function checkLeft(buttonRow, buttonCol, direction) {
    // console.log(buttonRow, buttonCol)
    // console.log(boardButtonsEl[(buttonRow * 8) + buttonCol], 'line 185')
    // console.log(mineField[buttonRow][buttonCol])
    if (buttonRow > 7 || buttonCol > 7 || buttonRow < 0 || buttonCol < 0) {
        console.log('checkleft undefined')
        return;
    }
    if (mineField[buttonRow][buttonCol] === 'Mine') {
        return;
    } else if (mineField[buttonRow][buttonCol] > 0) {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'safe';
        boardButtonsEl[(buttonRow * 8) + buttonCol].innerText = mineField[buttonRow][buttonCol];
        // checkUp(buttonRow, buttonCol + 1);
        // checkDown(buttonRow, buttonCol + 1);
        console.log('left number hit')
        return
    } else {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'empty-safe'
        if (direction) {
            checkLeft(buttonRow, buttonCol - 1, true);
            return;
        }
        // console.log(buttonRow, buttonCol, 'left', 'checkLeft');
        checkUp(buttonRow - 1, buttonCol);
        checkDown(buttonRow + 1, buttonCol);
       checkLeft(buttonRow, buttonCol - 1);
    }
}
//check right of the empty button to uncover other buttons
function checkRight(buttonRow, buttonCol, direction) {
    // console.log(boardButtonsEl[(buttonRow * 8) + buttonCol], 'line 209')
    if (buttonRow > 7 || buttonCol > 7 || buttonRow < 0 || buttonCol < 0) {
        console.log('checkright undefined')
        return;
    }
    if (mineField[buttonRow][buttonCol] === 'Mine') {
        console.log('checkRight ended')
        return;
    } else if (mineField[buttonRow][buttonCol] > 0) {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'safe';
        boardButtonsEl[(buttonRow * 8) + buttonCol].innerText = mineField[buttonRow][buttonCol];
        // checkUp(buttonRow - 1, buttonCol);
        // checkDown(buttonRow + 1, buttonCol);
        console.log('right number hit')
        return
    } else {
        // console.log((buttonRow * 8) + buttonCol);
        // console.log(buttonRow, buttonCol);
        // console.log(boardButtonsEl[(buttonRow * 8) + buttonCol]);
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'empty-safe';
        if (direction) {
            checkRight(buttonRow, buttonCol + 1, true);
            return;
        }
        console.log(buttonRow - 1, buttonCol, 'up', 'checkRight');
        checkUp(buttonRow - 1, buttonCol);
        console.log(buttonRow + 1, buttonCol, 'down', 'checkRight');
        checkDown(buttonRow + 1, buttonCol);
        console.log(buttonRow, buttonCol + 1, 'right', 'checkRight');
        checkRight(buttonRow, buttonCol + 1);
    }
}
//check north of the empty button to uncover other buttons
function checkUp(buttonRow, buttonCol) {
    // console.log(boardButtonsEl[(buttonRow * 8) + buttonCol], 'line 230')
    console.log(buttonRow,buttonCol, 'error check checkUp');
    if (buttonRow > 7 || buttonCol > 7 || buttonRow < 0 || buttonCol < 0) {
        console.log('check up undefined')
        return;
    } if (mineField[buttonRow][buttonCol] === 'Mine') {
        return;
    } else if (mineField[buttonRow][buttonCol] > 0) {
        boardButtonsEl[((buttonRow) * 8) + buttonCol].className = 'safe';
        boardButtonsEl[((buttonRow) * 8) + buttonCol].innerText = mineField[buttonRow][buttonCol];
        // checkRight(buttonRow, buttonCol);
        // checkLeft(buttonRow, buttonCol);
        console.log('up number hit')
        return
    } else {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'empty-safe'
        console.log(buttonRow, buttonCol + 1, 'right', 'checkUp');
        checkRight(buttonRow, buttonCol + 1, true);
        console.log(buttonRow, buttonCol - 1, 'left', 'checkUp');
        checkLeft(buttonRow, buttonCol - 1, true);
        console.log(buttonRow - 1, buttonCol, 'up', 'checkUp');
        checkUp(buttonRow - 1, buttonCol);
    }
}
//check south of the empty button to uncover other buttons
function checkDown(buttonRow, buttonCol) {
//    console.log(boardButtonsEl[(buttonRow * 8) + buttonCol], 'line 258')
    if (buttonRow > 7 || buttonCol > 7 || buttonRow < 0 || buttonCol < 0) {
        console.log('checkdown undefined')
        return;
    } if (mineField[buttonRow][buttonCol] === 'Mine') {
        return;
    } else if (mineField[buttonRow][buttonCol] > 0) {
        boardButtonsEl[((buttonRow) * 8) + buttonCol].className = 'safe';
        boardButtonsEl[((buttonRow) * 8) + buttonCol].innerText = mineField[buttonRow][buttonCol];
        // checkRight(buttonRow, buttonCol + 1);
        // checkLeft(buttonRow, buttonCol - 1);
        console.log('down number hit')
        return
    } else {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'empty-safe'
        console.log(buttonRow, buttonCol + 1, 'right', 'checkDown');
        checkRight(buttonRow, buttonCol + 1, true);
        console.log(buttonRow, buttonCol -1, 'left', 'checkDown');
        checkLeft(buttonRow, buttonCol -1, true);
        console.log(buttonRow + 1, buttonCol, 'down', 'checkDown');
        checkDown(buttonRow + 1, buttonCol);
    }
}
















function winner() {
    boardButtonsEl.forEach((item) => {
        if (item.className.includes('empty-safe') || item.className.includes('safe')) {
            buttonCount++;
        }
    })
    console.log(buttonCount);
    if (buttonCount >= 54) {
        resultsEl.innerText = 'You win!';
    }
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




