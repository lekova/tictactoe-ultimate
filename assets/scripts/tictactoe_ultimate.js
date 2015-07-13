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
  var position;
  if (singleMode === 1 && turn === 'PlayerO') {
    position = game.computerPlayPosition(0);
  } else {
    position = game.computerPlayPosition(moves);
    $('#' + position).text('O');
    game.setGameBoard(position, 'O');
    turn = 'PlayerX';
  }
};

var newGame = function() {
  $('.cell').each(function() {
    $(this).text('');
  });

  $('#turnsList').html('');

  moves = 0;
  gameOver = 0;

  computerSetPosition(0);
};

var addToList = function() {
  var elementText = moves + '. ' + 'Player \'' + turn + '\' turn';
  $('#turnsList').append('<li>' + elementText + '</li>');
};

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

  if (turn === 'PlayerX') {
    element.text('X');
    game.setGameBoard(element.attr('id'), 'X');
    turn = 'PlayerO';
  } else {
    var position = game.getComputerTurnPosition(moves);
    $('#' + position).text('O');
    game.setGameBoard(position, 'O');
    turn = 'PlayerX';
  }

  if (moves < 5) {
    if (turn === 'PlayerO') {
      computerSetPosition(moves);
    }

    return;
  } else {
    var win = game.checkWin();
    if (win === 'X') {
      alert('Player X wins');
      score.playerX += 1;
      gameOver = 1;
    } else if (win === 'O') {
      alert('Player O wins');
      score.playerO += 1;
      gameOver = 1;
    } else if (win === '' && moves === 9) {
      alert('It is tie');
      score.tie += 1;
      gameOver = 1;
    }
  }

  // show current result
  $('#playerX').text(score.playerX);
  $('#playerO').text(score.playerO);
  $('#tie').text(score.tie);

  addToList();
});
