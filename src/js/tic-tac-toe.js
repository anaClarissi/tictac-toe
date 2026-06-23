let playerOne;

let playerTwo;

let currentPlayer;

let gameOver = false;

function Player (name, symbol) {

    return {name, symbol};

}

const GameBoard = (() => {

    const board = [

        ['', '', ''],
        ['', '', ''],
        ['', '', '']

    ];

    const getBoard = () => board;

    const updateBoard = (row, column, value) =>  {

        board[row][column] = value;

    }

    const resetBoard = () => {

        for (let row = 0; row < 3; row++) {

            for (let column = 0; column < 3; column++) {

                board[row][column] = '';

            }

        }

    }

    return {getBoard, updateBoard, resetBoard};

})();

const buttons = document.querySelectorAll(".board button");

buttons.forEach(button => {

    button.addEventListener("click", handleClick);

});

function handleClick(event) {

    const board = GameBoard.getBoard();

    if (gameOver) return;

    const button = event.target;

    const position = Number(button.id);

    const row = Math.floor((position - 1) / 3);

    const column = Math.floor((position - 1) % 3);

    if (board[row][column] !== '') return;

    GameBoard.updateBoard(row, column, currentPlayer.symbol);

    renderButton(button);

    if (checkWinner()) {

        disabledPlayerLoserButton();

        setTimeout(showEndMenu, 1000);

        showWinner();

        gameOver = true;

        return;

    }

    if (checkDraw()) {

        setTimeout(showEndMenu, 1000);

        showDraw();

        gameOver = true;

        return;

    }

    switchPlayer();

}

function renderButton(button) {

    const buttonContent = document.createElement("span");

    buttonContent.classList.add(currentPlayer === playerOne ? "button-player-one" : "button-player-two");

    buttonContent.innerText = currentPlayer.symbol;

    button.appendChild(buttonContent);

    button.disabled = true;

}

function switchPlayer() {

    currentPlayer = currentPlayer === playerOne ? playerTwo : playerOne;

}

function checkWinner() {

    const board = GameBoard.getBoard();

    for (let row = 0; row < 3; row++) {

        if (board[row][0] !== '' && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {

            return true;

        }

    }

    for (let column = 0; column < 3; column++) {

        if (board[0][column] !== '' && board[0][column] === board[1][column] && board[1][column] === board[2][column]) {

            return true;

        }

    }

    if (board[0][0] !== '' && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {

        return true;

    }

    if (board[0][2] !== '' && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {

        return true;

    }

    return false;

}

function checkDraw() {

    for (let row of GameBoard.getBoard()) {

        for (let value of row) {

            if (value === '') return false;

        }

    }

    return true;

}

function startGame(event) {

    event.preventDefault();

    const playerOneName = document.querySelector("#player-one").value;

    const playerTwoName = document.querySelector("#player-two").value;

    const playerOneSymbol = document.querySelector("#player-one-symbol").value;

    const playerTwoSymbol = playerOneSymbol === "X" ? "O" : "X";

    playerOne = Player(playerOneName, playerOneSymbol);

    playerTwo = Player(playerTwoName, playerTwoSymbol);

    currentPlayer = playerOne;

    updateUI();

}

function startMenu () {

    const menu = document.querySelector(".start-menu");

    menu.classList.add("active");

    const form = document.querySelector(".start-menu form");

    form.onsubmit = (event) => {

        startGame(event);

        menu.classList.remove("active");

    };

}

function updateUI () {

    document.querySelector(".player-name.one").textContent = playerOne.name;

    document.querySelector(".player-name.two").textContent = playerTwo.name;

    document.querySelector(".player-symbol.one").textContent = playerOne.symbol;

    document.querySelector(".player-symbol.two").textContent = playerTwo.symbol;

}

function showEndMenu () {

    const endMenu = document.querySelector(".end-menu");

    endMenu.classList.add("active");

    endMenu.classList.remove("one");

    endMenu.classList.remove("two");

    if (checkWinner()) {
        
        endMenu.classList.add(currentPlayer === playerOne ? "one" : "two");

    }

}

function showWinner () {

    document.querySelector(".winner-name").textContent = `${currentPlayer.name} Won!`;

    const winnerSymbol = document.querySelector(".winner-symbol");

    winnerSymbol.textContent = currentPlayer.symbol;

    winnerSymbol.classList.remove("one");
    winnerSymbol.classList.remove("two");

    document.querySelector(".winner-symbol").classList.add(currentPlayer === playerOne ? "one" : "two");

}

function showDraw () {

    document.querySelector(".winner-name").textContent = "The game ended in a draw.";

    document.querySelector(".winner-symbol").innerHTML = `<span class="one">${playerOne.symbol}<span>  <span class="two">${playerTwo.symbol}</span>`;

}

function disabledPlayerLoserButton () {

    const buttons = document.querySelectorAll(".board button");

    buttons.forEach(button => {

        const buttonContent = button.querySelector("span");

        if (!buttonContent) return;

        if (buttonContent.innerText !== currentPlayer.symbol) {

            buttonContent.classList.add("disabled");
            
        }
        
    });

}

function continueGame() {

    GameBoard.resetBoard();

    gameOver = false;

    currentPlayer = playerOne;

    resetButtons();

    hideEndMenu();

}

document.querySelector(".btn-continue").addEventListener("click", continueGame);

function restartGame() {

    GameBoard.resetBoard();

    gameOver = false;

    playerOne = null;
    playerTwo = null;
    currentPlayer = null;

    resetButtons();

    hideEndMenu();

    startMenu();
    
}

document.querySelector(".btn-restart").addEventListener("click", restartGame);

function resetButtons() {

    const buttons = document.querySelectorAll(".board button");

    buttons.forEach(button => {

        button.innerHTML = '';

        button.disabled = false;

    });

}

function hideEndMenu () {

    const endMenu = document.querySelector(".end-menu");

    endMenu.classList.remove("active");

    endMenu.classList.remove("one");

    endMenu.classList.remove("two");

}

startMenu();