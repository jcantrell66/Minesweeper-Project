const mines = 10;

//To do:
//Finish left click
//handle right click
//fix mineField generation, while loop for mine repeats
//fix init



//state variables, whats changing game to game

//object for collecting empty buttons
let emptyButtons;

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
//handled by generateMineField
function init() {
    generateMineField();
    emptyButtons = [];
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
        return;
    } if (buttonValue !== 'Mine') {
        e.target.className = 'safe';
    } if (buttonValue > 0) {
        e.target.innerText = buttonValue;
    } else {
//        console.log(mineField[buttonRow+1][buttonCol+1]);

//handler for empty buttons. Creates an array with the clicked empty button, and then
//loops through every button adjacent to the button in the array to see if it is not a mine. If it is a number,
//is it just clicked, if it is empty, it is clicked and added to the array.
        emptyButtons.push([buttonRow, buttonCol]);
        emptyButtons.forEach((item, idx) => {
            console.log(item[0], item[1]);

            if (mineField[item[0]][item[1]+1] > 0) {
                console.log('yes');
                console.log(idx);
                console.log(boardButtonsEl[idx]);
//                console.log(mineField[item[0]][item[1]+1].target);
//                mineField[item[0]][item[1]+1].className = 'safe';
                // emptyButtons[idx + 1].className = 'safe';
                // emptyButtons[idx + 1].innerText = buttonValue;
            }

        })



        if (buttonValue > 0) {
            e.target.innerText = buttonValue;
            e.target.className = 'safe';
        } else {
            e.target.className = 'empty-safe';
        }
//        handleEmptySafe(e, buttonValue);
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



