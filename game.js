//* Gameboard object. Makes the board and puts in the pieces. 
function GameBoard () {
    const rows = 3;
    const columns = 3;
    const board = [];

    // * Create the board
    for (let i = 0; i < rows; i++) {
        board.push([]);
        for (let j = 0; j < columns; j++) {
            board[i].push('');
        }
      }

    // ! return board array
    const getBoard = () => board;
    
    // * move pieve
    function move (piece, row, column) {
        board[row][column] = piece;
    }

    return { move, getBoard }
}

function Playgame () {
    const player1 = 'Player 1';
    const player2 = 'Player 2';
    const board = GameBoard();

    // ? JSON for the players
    const players = [
        {
          name: player1,
          token: 'X'
        },
        {
          name: player2,
          token: 'O'
        }
      ];

    let activePlayer = players[0];

    // * switch player turn
    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
      const turn = document.getElementsByClassName('turn');
      turn[0].innerHTML = `${activePlayer.name}'s turn`;
    };
    const getActivePlayer = () => activePlayer;

    const winner = () => {
        // ! This is all the possible winning combinations
        const win_array = [[[0,0], [0,1], [0,2]], [[1,0], [1,1], [1,2]], [[2,0],[2,1],[2,2]], [[0,0],[1,1],[2,2]], [[2,0], [1,1], [0,2]], [[0,0], [1,0], [2,0]], [[0,1], [1,1], [2,1]], [[0,2], [1,2], [2,2]]];

        // * Check status of board against all winning combos. 
        // * If there are 3 x's or o's in the winning combo they get put in the array. If the array gets to 3 that player wins. 
        for (let i = 0; i < win_array.length; i++) {
            xs = [];
            os = [];
            for (let j = 0; j < 3; j++) {
                x = win_array[i][j];
                first = x[0];
                second = x[1];
                nitizen = board.getBoard();
                if (nitizen[first][second] === 'X') {
                    xs.push('X');
                }
                else if (nitizen[first][second] === 'O') {
                    os.push('O');
                }
            if (xs.length === 3 || os.length === 3) {
                // console.log('Winner!');
                return true;
            }
            }       
        }
    }
    const playRound = (row, column) => {
        // * Drop a token for the current player
        // console.log(`Horrible move ${getActivePlayer().name}`);
        board.move(getActivePlayer().token, row, column);

        // * Check for winner
        if (winner() === true) {
            setTimeout(() => {
                alert(`${getActivePlayer().name} you mad cunt! You win!`);
            }, "300"); 
            return;
        };
    
        // * Switch player turn
        switchPlayerTurn();
      };
    
      return {
        playRound,
        getActivePlayer,
        winner
      };
}

function ScreenController () {
    const game = Playgame();
    const turn = document.getElementsByClassName('turn');
    turn[0].innerHTML = `${game.getActivePlayer().name}'s turn`;
    const butt = document.getElementsByTagName('button');
    // * This inserts the move into the 2d array and prints the player's token on the screen
    for (let i = 0; i < butt.length; i++) {
        butt[i].addEventListener("click", function() {
            column = butt[i].dataset.column;
            row = butt[i].dataset.row;
            butt[i].innerHTML = game.getActivePlayer().token;
            game.playRound(row, column);
        })
    };
}

ScreenController();


