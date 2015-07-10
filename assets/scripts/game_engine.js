'use strict';

var board = ['', '', '', '', '', '', '', '', ''];

// sign is 0 for X and 1 for 0
var _setGameBoard = function(position, sign) {
  board[position] = sign;
};

var _resetGameBoard = function() {
  board = ['', '', '', '', '', '', '', '', ''];
};

var _getRandomInRange = function(max, min) {
  return Math.floor(Math.random() * (max - min) + min);
};

var _setRandomPosition = function(position) {
  var openPositions = [];

  // put the indexes of all empty cells in a new array
  board.forEach(function(element, index, board){
    if (element !== '') {
      openPositions.push(index);
    }
  });

  // get a random number for the indexes of the array
  var ran = _getRandomInRange(0, openPositions.length);
  console.log("random is :", ran);

  // return the index of the element that sit on the randomed position
  return openPositions[ran];
};

var _checkWin = function() {

  if ((board[0] + board[1] + board[2]) === 'XXX' ||
      (board[3] + board[4] + board[5]) === 'XXX' ||
      (board[6] + board[7] + board[8]) === 'XXX' ||
      (board[0] + board[3] + board[6]) === 'XXX' ||
      (board[1] + board[4] + board[7]) === 'XXX' ||
      (board[2] + board[5] + board[8]) === 'XXX' ||

      (board[0] + board[4] + board[8]) === 'XXX' ||
      (board[2] + board[4] + board[6]) === 'XXX') {
    return 'X';
  }
  else if ((board[0] + board[1] + board[2]) === 'OOO' ||
          (board[3] + board[4] + board[5]) === 'OOO' ||
          (board[6] + board[7] + board[8]) === 'OOO' ||
          (board[0] + board[3] + board[6]) === 'OOO' ||
          (board[1] + board[4] + board[7]) === 'OOO' ||
          (board[2] + board[5] + board[8]) === 'OOO' ||

          (board[0] + board[4] + board[8]) === 'OOO' ||
          (board[2] + board[4] + board[6]) === 'OOO') {
    return 'O';
  }
  else {
    return '';
  }
};

var _isBoardEmpty = function() {
  var isEmpty;
  board.forEach(function(cell) {
    isEmpty = cell;
  });
  return (isEmpty == true);
};

var _computerPlay = function(moves) {
  var pos;

  // if computer is first
  if (moves < 3) {
    var taken = true;
    while (taken) {
      pos = Math.floor(Math.random() * (9 - 0) + 0);
      if (board[pos] === ''){
        taken = false;
      }
    }
    return pos;
  }
  else {

    var currentBoard = board;

    for (var i = 0; i < 9; i++ ) {

      if(currentBoard[i] === '') {

        // set current element to O and if that position wins return the index
        currentBoard[i] = 'O';
        if (_checkWin(currentBoard[i]) === 'O') {
          return i;
        }

        // set current element to O and if that position wins return the index
        currentBoard[i] = 'X';
        if (_checkWin(currentBoard[i]) === 'X') {
          return i;
        }

        // if non of the above gets a winner set the element back to empty
        currentBoard[i] = '';
      }
    };

    var indexPos = _setRandomPosition();
    board[indexPos] ='O';
    return indexPos;
  }
};

module.exports = {
  gameBoard: board,
  setGameBoard: _setGameBoard,
  resetGameBoard: _resetGameBoard,
  checkWin: _checkWin,
  computerPlay: _computerPlay,
  isBoardEmpty: _isBoardEmpty
};
