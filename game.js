//* Gameboard object. Makes the board and puts in the pieces. 
function GameBoard () {
    const rows = 3;
    const columns = 3;
    const board = [];

    for (let i = 0; i < rows; i++) {
        board.push([]);
        for (let j = 0; j < columns; j++) {
            board[i].push('Open');
        }
      }

    const getBoard = () => console.log(board);

    function move (piece, row, column) {
        board[row][column] = piece;
    }
    return { move, getBoard }
}

function Playgame () {
    const player1 = 'Player 1';
    const player2 = 'Player 2';
    board = GameBoard();
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
      board.getBoard();
      console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        // Drop a token for the current player
        console.log(
          `Horrible move ${getActivePlayer().name}`
        );
        board.move(getActivePlayer().token, row, column);
    
        /*  This is where we would check for a winner and handle that logic,
            such as a win message. */
    
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
        getActivePlayer
      };
}

const game = Playgame();

