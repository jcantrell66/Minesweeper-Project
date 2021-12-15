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
        console.log(e.target-1);
        return;
    } else if (buttonValue > 0) {
        e.target.innerText = buttonValue;
        e.target.className = 'safe';
    } else {
        e.target.className = 'empty-safe';
        checkLeft(buttonRow,buttonCol,buttonValue);
        checkRight(buttonRow,buttonCol,buttonValue);
        checkUp(buttonRow,buttonCol,buttonValue);
        checkDown(buttonRow,buttonCol,buttonValue);
    }


//        console.log(mineField[buttonRow+1][buttonCol+1]);

//handler for empty buttons. Creates an array with the clicked empty button, and then
//loops through every button adjacent to the button in the array to see if it is not a mine. If it is a number,
//is it just clicked, if it is empty, it is clicked and added to the array.
        // emptyButtons.push(e.target.id);
        // emptyButtons.forEach((item, idx) => {
        //     boardButtonsEl[parseFloat(item)+1].className = 'empty-safe';
        //     console.log(boardButtonsEl[parseFloat(item)+1].innerText);

            // if (mineField[item[0]][item[1]+1] > 0) {
            //     console.log('yes');
            //     console.log(idx);
            //     console.log(boardButtonsEl[idx]);
            //    console.log(mineField[item[0]][item[1]+1].target);
            //    mineField[item[0]][item[1]+1].className = 'safe';
            //     emptyButtons[idx + 1].className = 'safe';
            //     emptyButtons[idx + 1].innerText = buttonValue;
            // }

        // })


//        handleEmptySafe(e, buttonValue);
    
}




//check left of the empty button to uncover other buttons
function checkLeft(buttonRow,buttonCol,buttonValue){
    for (let i = buttonCol; i >= 0; i--) {
        console.log(i,buttonRow,buttonCol,buttonValue);
        if (mineField[buttonRow][i] === undefined) {
            console.log('idx doesnt exist');
            return;
        }
        if (mineField[buttonRow][i] === 'Mine') {
            return;
        } else if (mineField[buttonRow][i] > 0) {
            boardButtonsEl[(buttonRow*8)+i].className = 'safe';
            boardButtonsEl[(buttonRow*8)+i].innerText = mineField[buttonRow][i];
            return;
        } else {
            boardButtonsEl[(buttonRow*8)+i].className = 'empty-safe'
            console.log(buttonRow,i-1,i+1,buttonValue);
            checkUp(buttonRow,i-1,buttonValue);
            checkDown(buttonRow,i+1,buttonValue);
        }
    }
}

//check right of the empty button to uncover other buttons
function checkRight(buttonRow,buttonCol,buttonValue){
    for (let i = buttonCol; i < mineField[buttonRow].length; i++) {
        if (mineField[buttonRow][i] === undefined) {
            console.log('idx doesnt exist');
            return;
        }
        if (mineField[buttonRow][i] === 'Mine') {
            return;
        } else if (mineField[buttonRow][i] > 0) {
            boardButtonsEl[(buttonRow*8)+i].className = 'safe';
            boardButtonsEl[(buttonRow*8)+i].innerText = mineField[buttonRow][i];
            return;
        } else {
            boardButtonsEl[(buttonRow*8)+i].className = 'empty-safe'
            checkUp(buttonRow,i-1,buttonValue);
            checkDown(buttonRow,i+1,buttonValue);
        }
    }
}
// !== undefined
//check north of the empty button to uncover other buttons
function checkUp(buttonRow,buttonCol,buttonValue){
    if (mineField[buttonRow-1] !== undefined && mineField[buttonRow-1][buttonCol] === 'Mine') {
        return;
    } else if (mineField[buttonRow-1] !== undefined && mineField[buttonRow-1][buttonCol] > 0) {
        boardButtonsEl[((buttonRow-1)*8)+buttonCol].className = 'safe';
        boardButtonsEl[((buttonRow-1)*8)+buttonCol].innerText = mineField[buttonRow-1][buttonCol];
        return;
    } else if (mineField[buttonRow-1] !== undefined){
        checkLeft(buttonRow-1,buttonCol,buttonValue);
        checkRight(buttonRow-1,buttonCol,buttonValue);
    }
}

//check south of the empty button to uncover other buttons
function checkDown(buttonRow,buttonCol,buttonValue){
    if (mineField[buttonRow+1] !== undefined && mineField[buttonRow+1][buttonCol] === 'Mine') {
        return;
    } else if (mineField[buttonRow+1] !== undefined && mineField[buttonRow+1][buttonCol] > 0) {
        boardButtonsEl[((buttonRow+1)*8)+buttonCol].className = 'safe';
        boardButtonsEl[((buttonRow+1)*8)+buttonCol].innerText = mineField[buttonRow+1][buttonCol];
        return;
    } else if (mineField[buttonRow+1] !== undefined) {
        checkLeft(buttonRow+1,buttonCol,buttonValue);
        checkRight(buttonRow+1,buttonCol,buttonValue);
    }
}






function handleFlagClick(){

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



