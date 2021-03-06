'use strict';

var $ = require('jQuery');
var game = require('./game_engine.js'); // {}
// var resource = require('./resource_watcher_0.1.0.js');
// var api = require('./game_ajax.js');

var score = {
  playerX: 0,
  playerO: 0,
  tie: 0
};
var turn; // 0 = player X, 1 = player 0, player X is always first
var singleMode = 0; // if the player plays with a computer the value is one
var moves = 0; // total moves in the game (max = 9)
var gameOver = 0;

$('#playerX').text(score.playerX);
$('#playerO').text(score.playerO);
$('#tie').text(score.tie);

var computerSetPosition = function(moves) {
  // when starting a new game against computer and it is computers turn to be first
  var position = game.computerPlayPosition(moves);

  $('#' + position).text('O');
  game.setGameBoard(position, 'O');
  turn = 'PlayerX';
};

var newGame = function() {
  $('.cell').each(function() {
    $(this).text('');
  });

  $('#turnsList').html('');

  moves = 0;
  gameOver = 0;
  game.newGame();

  if(turn === 'PlayerO') {
    computerSetPosition(0);
    moves++;
  }
};

var addToList = function() {
  var elementText = moves + '. ' + turn + ' turn';
  $('#turnsList').append('<li>' + elementText + '</li>');
};

var setScoreBoard = function() {

  // show current result
  $('#playerX').text(score.playerX);
  $('#playerO').text(score.playerO);
  $('#tie').text(score.tie);
}

var checkWinner = function() {
  var win = game.checkWin();
  if (win === 'X') {
    alert('Player X wins');
    score.playerX += 1;
    gameOver = 1;
    setScoreBoard();
  } else if (win === 'O') {
    alert('Player O wins');
    score.playerO += 1;
    gameOver = 1;
    setScoreBoard();
  } else if (win === '' && moves === 9) {
    alert('It\'s a tie');
    score.tie += 1;
    gameOver = 1;
    setScoreBoard();
  } else {
    // just continue
  }
}

$('#newgame').on('click', function() {
  newGame();
});

$('.reset-button').on('mouseover', function() {
  $(this).css('cursor', 'pointer');
  $(this).css('background-color', '#AED600');
});

$('.reset-button').on('mouseleave', function() {
  $(this).css('background-color', '#A5CE00');
});

$('#computer').on('click', function() {
  $('#playerOid').text('Computer');
  $('#computer').css('border', '2px solid black');
  singleMode = 1;
  turn = 'PlayerX';
  newGame();
});

$('.cell').on('click', function() {

  var element = $(this);

  // check if the cell is already played
  if (element.text() !== '' || gameOver === 1) {
    return;
  }

  moves++;

  if (singleMode === 0) {
    if (turn === 'PlayerX') {
      element.text('X');
      game.setGameBoard(element.attr('id'), 'X');
      turn = 'PlayerO';
    }
    else {
      var position = game.getComputerTurnPosition(moves);
      $('#' + position).text('O');
      game.setGameBoard(position, 'O');
      turn = 'PlayerX';
    }

    addToList();
    checkWinner();
  } else {
      element.text('X');
      game.setGameBoard(element.attr('id'), 'X');
      addToList();
      turn = 'PlayerO';
      checkWinner();

      if(gameOver === 1) {
        return;
      }

      // now it is player O turn
      moves++;
      addToList();
      computerSetPosition(moves);
      checkWinner();
    // else {
    //   computerSetPosition(moves);
    //   moves++;
    //   addToList();
    //   checkWinner();
    // }
  }
});
