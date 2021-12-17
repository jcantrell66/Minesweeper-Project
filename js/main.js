const mines = 10;

//To do:
//beautify
//deploy game



// run these commands when ready for final deployment
// git add -A

// git commit -m "prep for deployment"

// git checkout gh-pages

// git merge main

// git push origin gh-pages



//state variables, whats changing game to game

//array of mines and numbers
let mineField;

//variable used to count buttons to determine win status
let buttonCount;


//cache DOM elements that need to be updated

//cache the buttons on the board
const boardButtonsEl = document.querySelectorAll('#boardButtons > button');

//results need to be displayed once the game is over
const resultsEl = document.querySelector('#results');




//Add event listeners

//reset button, restarting the board
document.querySelector('#reset').addEventListener('click', init);

//left click to uncover a button
document.querySelector('#boardButtons').addEventListener('click', handleButtonClick);



init();

//setting the state variables EXCEPT for the board, which is
//handled by generateMineField
function init() {
    generateMineField();
    buttonCount = 0;

    //reset the board, removing all classes and innerText
    boardButtonsEl.forEach((item) => {
        item.innerText = null;
        item.removeAttribute('class');
        resultsEl.innerText = "Results";
    })
    render();
}


function render() {
}


function handleButtonClick(e) {
    //logic for matching each button with its corresponding value in the mineField array
    let buttonRow = Math.floor(e.target.id / 8);
    let buttonCol = e.target.id - buttonRow * 8;
    let buttonValue = mineField[buttonRow][buttonCol];

    //logic for changing the appearance of each button upon click
    if (buttonValue === 'Mine') {
        resultsEl.innerText = 'Game over!';
        e.target.className = 'danger';
        return;
    } else if (buttonValue > 0) {
        e.target.innerText = buttonValue;
        e.target.className = 'safe';
    } else {
        e.target.className = 'empty-safe';
        checkAll(buttonRow, buttonCol);
    }
    winner();
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
        checkLeft(buttonRow, buttonCol - 1)
        checkRight(buttonRow, buttonCol + 1)
        checkUp(buttonRow - 1, buttonCol)
        checkDown(buttonRow + 1, buttonCol)
    }
}
//check left of the empty button to uncover other buttons
function checkLeft(buttonRow, buttonCol, direction) {
    if (buttonRow > 7 || buttonCol > 7 || buttonRow < 0 || buttonCol < 0) {
        return;
    }
    if (mineField[buttonRow][buttonCol] === 'Mine') {
        return;
    } else if (mineField[buttonRow][buttonCol] > 0) {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'safe';
        boardButtonsEl[(buttonRow * 8) + buttonCol].innerText = mineField[buttonRow][buttonCol];
        return
    } else {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'empty-safe'
        if (direction) {
            checkLeft(buttonRow, buttonCol - 1, true);
            return;
        }
        checkUp(buttonRow - 1, buttonCol);
        checkDown(buttonRow + 1, buttonCol);
        checkLeft(buttonRow, buttonCol - 1);
    }
}
//check right of the empty button to uncover other buttons
function checkRight(buttonRow, buttonCol, direction) {
    if (buttonRow > 7 || buttonCol > 7 || buttonRow < 0 || buttonCol < 0) {
        return;
    }
    if (mineField[buttonRow][buttonCol] === 'Mine') {
        return;
    } else if (mineField[buttonRow][buttonCol] > 0) {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'safe';
        boardButtonsEl[(buttonRow * 8) + buttonCol].innerText = mineField[buttonRow][buttonCol];
        return
    } else {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'empty-safe';
        if (direction) {
            checkRight(buttonRow, buttonCol + 1, true);
            return;
        }
        checkUp(buttonRow - 1, buttonCol);
        checkDown(buttonRow + 1, buttonCol);
        checkRight(buttonRow, buttonCol + 1);
    }
}

//check north of the empty button to uncover other buttons
function checkUp(buttonRow, buttonCol) {
    if (buttonRow > 7 || buttonCol > 7 || buttonRow < 0 || buttonCol < 0) {
        return;
    } if (mineField[buttonRow][buttonCol] === 'Mine') {
        return;
    } else if (mineField[buttonRow][buttonCol] > 0) {
        boardButtonsEl[((buttonRow) * 8) + buttonCol].className = 'safe';
        boardButtonsEl[((buttonRow) * 8) + buttonCol].innerText = mineField[buttonRow][buttonCol];
        return
    } else {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'empty-safe'
        checkRight(buttonRow, buttonCol + 1, true);
        checkLeft(buttonRow, buttonCol - 1, true);
        checkUp(buttonRow - 1, buttonCol);
    }
}

//check south of the empty button to uncover other buttons
function checkDown(buttonRow, buttonCol) {
    if (buttonRow > 7 || buttonCol > 7 || buttonRow < 0 || buttonCol < 0) {
        return;
    } if (mineField[buttonRow][buttonCol] === 'Mine') {
        return;
    } else if (mineField[buttonRow][buttonCol] > 0) {
        boardButtonsEl[((buttonRow) * 8) + buttonCol].className = 'safe';
        boardButtonsEl[((buttonRow) * 8) + buttonCol].innerText = mineField[buttonRow][buttonCol];
        return
    } else {
        boardButtonsEl[(buttonRow * 8) + buttonCol].className = 'empty-safe'
        checkRight(buttonRow, buttonCol + 1, true);
        checkLeft(buttonRow, buttonCol - 1, true);
        checkDown(buttonRow + 1, buttonCol);
    }
}


//checks if every button has been clicked
function winner() {
    boardButtonsEl.forEach((item) => {
        if (item.className.includes('empty-safe') || item.className.includes('safe')) {
            buttonCount++;
        }
    })
    if (buttonCount >= 54) {
        resultsEl.innerText = 'You win!';
    }
    buttonCount = 0;
}


function generateMineField() {
    //generate the mineField array
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

        while (mineField[mineRow][mineCol] === 'Mine') {
            mineRow = Math.floor(Math.random() * 8);
            mineCol = Math.floor(Math.random() * 8);
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




