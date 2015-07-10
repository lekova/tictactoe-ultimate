'use strict';

var $ = require('jQuery');
var game = require('./game_engine.js'); // {}
// var resource = require('./resource_watcher_0.1.0.js');
// var api = require('./game_ajax.js');

var score = { playerX: 0, playerO: 0, tie: 0 };

var turn = 0; // 0 = player X, 1 = player 0, player X is always first
var isComputer = 0;
var moves = 0; // total moves in the game (max = 9)
var gameOver = 0;

$('#playerX').text(score.playerX);
$('#playerO').text(score.playerO);
$('#tie').text(score.tie);

var cells = document.getElementsByClassName('cell');

$('.cell').on('click', function() {

  if(isComputer === 1 && turn === 1 && gameOver === 0) {
    var position = game.computerPlay(moves);
    $('#' + position).text('O');
    game.setGameBoard(position, 'O');
    turn = 0;
    moves++;
    addToList();
  }

  var element = $(this);

  // check if the cell is already played
  if (element.text() !== '' || gameOver === 1) {
    return;
  } else {
    if (turn === 0) {
      element.text('X');
      game.setGameBoard(element.attr('id'), 'X');
    } else {
      element.text('O');
      game.setGameBoard(element.attr('id'), 'O');
    }
  }

  // change the players turn
  (turn === 0) ? turn = 1 : turn = 0;

  // increment total moves
  moves++;

  if (moves < 5 && isComputer === 0) {
    addToList();
    return;
  }
  else if (moves < 5 && isComputer === 1 && turn === 1 && gameOver === 0) {
      var position = game.setRandomPosition();
      $('#' + position).text('O');
      game.setGameBoard(position, 'O');
      turn = 0;
      moves++;
      addToList();
  }
  else {
    var win = game.checkWin();
    if (win === 'X' && gameOver === 0) {
      alert('Player X wins');
      score.playerX += 1;
      gameOver = 1;
    } else if (win === 'O'  && gameOver === 0) {
      alert('Player O wins');
      score.playerO += 1;
      gameOver = 1;
    } else if (win === '' && gameOver === 0 &&  moves === 9) {
      alert('It is tie');
      score.tie += 1;
      gameOver = 1;
    }

    if(isComputer === 1 && turn === 1 && gameOver === 0) {
      var position = game.computerPlay(moves);
      $('#' + position).text('O');
      game.setGameBoard(position, 'O');
      turn = 0;
      moves++;
    }
  }

  // show current result
  $('#playerX').text(score.playerX);
  $('#playerO').text(score.playerO);
  $('#tie').text(score.tie);

  addToList();
});

function addToList() {
  var elementText = moves + '. ' + 'Player \'' ;
  (turn === 0) ? elementText += 'X' : elementText += 'O';
  elementText += '\' turn';

  $('#turnsList').append('<li>' + elementText + '</li>')
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

$('#computer').on('click', function(){
  $('#playerOid').text('Computer');
  $('#computer').css('border', '2px solid black');
  isComputer = 1;
  turn = 0;
  newGame();
});

function newGame() {
  $('.cell').each(function() {
    $(this).text('');
  });

  $('#turnsList').html('');

  game.resetGameBoard();
  moves = 0;
  gameOver = 0;

  // when starting a new game against computer and it is computers turn to be first
  if (isComputer === 1 && turn === 1) {
    var position = game.computerPlay(0);
    $('#' + position).text('O');
    turn = 1;
  }
}
