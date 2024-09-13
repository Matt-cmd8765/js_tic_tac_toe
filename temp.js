const board = [];

for (let i = 0; i < 3; i++) {
    board.push([]);
    for (let j = 0; j < 3; j++) {
        board[i].push('');
    }
  }

let win_array = [[[0][0], [0][1], [0][2]], [[1,0], [1,1], [1,2]], [[2,0],[2,1],[2,2]] [[0,0],[1,1],[2,2]], [[2,0], [1,1], [0,2]], [[0,0], [1,0], [2,0]], [[0,1], [1,1], [2,1]], [[0,2], [1,2], [2,2]]]
let first = win_array[0];

for (let i = 0; i < first.length; i++) {
    for (let j = 0; j < 2; j++) {
        console.log(board[i][j]);
    }
}