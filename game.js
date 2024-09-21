//* Gameboard object. Makes the board and puts in the pieces. 
function GameBoard () {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board.push([]);
        for (let j = 0; j < columns; j++) {
            board[i].push('');
        }
      }

    const getBoard = () => board;

    function move (piece, row, column) {
        board[row][column] = piece;
    }

    return { move, getBoard }
}

function Playgame () {
    const player1 = 'Player 1';
    const player2 = 'Player 2';
    const board = GameBoard();
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

    const switchPlayerTurn = () => {
      activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };
    const getActivePlayer = () => activePlayer;
  
    const printNewRound = () => {
      console.log(board.getBoard());
      console.log(`${getActivePlayer().name}'s turn.`);
    };

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
                console.log('Winner!');
                return true;
            }
            }       
        }
    }
    const playRound = (row, column) => {
        // * Drop a token for the current player
        console.log(`Horrible move ${getActivePlayer().name}`);
        board.move(getActivePlayer().token, row, column);
        
        // * Check for winner
        if (winner() === true) {
            alert('Mad cunt! You win!');
        };
    
        // Switch player turn
        switchPlayerTurn();
        printNewRound();
      };
    
      // Initial play game message
      printNewRound();
    
      // For the console version, we will only use playRound, but we will need
      // getActivePlayer for the UI version, so I'm revealing it now
      return {
        playRound,
        getActivePlayer,
        winner
      };
}

function ScreenController () {
    const game = Playgame();
    const butt = document.getElementsByTagName('button');
    for (let i = 0; i < butt.length; i++) {
        butt[i].addEventListener("click", function() {
            column = butt[i].dataset.column;
            row = butt[i].dataset.row;
            butt[i].innerHTML = game.getActivePlayer().token;
            game.playRound(row, column);
        })
    };

    if (game.winner) {
    }
}

ScreenController();


