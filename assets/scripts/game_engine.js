// 'use strict';

// var score = {
//   playerX: 0,
//   playerO: 0,
//   tie: 0
// };

// var turn = 0; // 0 = player X, 1 = player 0, player X is always first
// var isComputer = 0;
// var moves = 0; // total moves in the game (max = 9)
// var board = ['', '', '', '', '', '', '', '', ''];

// var cells = document.getElementsByClassName('cell');

// // sign is 0 for X and 1 for 0
// function setGameBoard(position, sign) {
//   board[position] = sign;
// }

// function checkWin() {

//   if ((board[0] + board[1] + board[2]) === 'XXX' ||
//       (board[3] + board[4] + board[5]) === 'XXX' ||
//       (board[6] + board[7] + board[8]) === 'XXX' ||
//       (board[0] + board[3] + board[6]) === 'XXX' ||
//       (board[1] + board[4] + board[7]) === 'XXX' ||
//       (board[2] + board[5] + board[8]) === 'XXX' ||

//       (board[0] + board[4] + board[8]) === 'XXX' ||
//       (board[2] + board[4] + board[6]) === 'XXX') {
//     return 'X';
//   }
//   else if ((board[0] + board[1] + board[2]) === 'OOO' ||
//           (board[3] + board[4] + board[5]) === 'OOO' ||
//           (board[6] + board[7] + board[8]) === 'OOO' ||
//           (board[0] + board[3] + board[6]) === 'OOO' ||
//           (board[1] + board[4] + board[7]) === 'OOO' ||
//           (board[2] + board[5] + board[8]) === 'OOO' ||

//           (board[0] + board[4] + board[8]) === 'OOO' ||
//           (board[2] + board[4] + board[6]) === 'OOO') {
//     return 'O';
//   }
//   else {
//     return '';
//   }
// }
