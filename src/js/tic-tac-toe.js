function handleButtons (board) {

    const buttons = document.querySelectorAll(".board button");

    let currentPlayerSimbol = "X";

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            let buttonPositionValue = Number(button.getAttribute("id"));

            button.textContent = `${currentPlayerSimbol}`;

            button.setAttribute("disabled", true)

            handlePosition(buttonPositionValue, board, currentPlayerSimbol);

            if (currentPlayerSimbol === "X") {

                currentPlayerSimbol = "O";

            } else {

                currentPlayerSimbol = "X";

            }

        });

    });

}

function handlePosition (number, board, player) {

    const row = Math.floor((number - 1) / 3);

    const column = Math.floor((number - 1) % 3);

    board[row][column] = player;

    console.log("-----");

    board.forEach(value => {

        console.log(value.join("|"));

    });

    console.log("-----");

    handleWinner(player, board);

}

function handleWinner (player, board) {

    for (let position = 0; position < board.length; position++) {

        if (board[position][0] === player && board[position][1] === player && board[position][2] === player) {

            showWinnerMessage(player);

            disabledAllButtons();
            
            return;

        } 

    }

    if (board[0][0] === player && board[1][1] === player && board[2][2] === player) {

        showWinnerMessage(player);

        disabledAllButtons();

        return;

    } 

    if (board[0][2] === player && board[1][1] === player && board[2][0] == player) {

        showWinnerMessage(player)

        disabledAllButtons();
        
        return;

    }

}

function disabledAllButtons () {

    const buttons = document.querySelectorAll(".board button");

    buttons.forEach(button => {

        button.setAttribute("disabled", true);

    });

}

function showWinnerMessage (player) {

    const winnerMessage = document.querySelector("h1");

    winnerMessage.innerText = `The Winner is: ${player} !!!`;

}

function startGame () {

    let board = [

        ['1', '2', '3'],
        ['4', '5', '6'],
        ['6', '8', '9']

    ];
    
    handleButtons(board);

}

startGame();