'use strict';

var score = { playerX: 0, playerO: 0, tie: 0 };

var turn = 0; // 0 = player X, 1 = player 0, player X is always first
var isComputer = 0;
var moves = 0; // total moves in the game (max = 9)
var board = ['', '', '', '', '', '', '', '', ''];
var gameOver = 0;

//===========================================
// register and login global variables
//-------------------------------------------
var sa = 'http://10.13.108.54:3000';
var token;
var gameWatcher;

$('#playerX').text(score.playerX);
$('#playerO').text(score.playerO);
$('#tie').text(score.tie);

var cells = document.getElementsByClassName('cell');

$('.cell').on('click', function() {
  var element = $(this);

  // check if the cell is already played
  if (element.text() !== '' || gameOver === 1) {
    return;
  } else {
    if (turn === 0) {
      element.text('X');
      setGameBoard(element.attr('id'), 'X');
    } else {
      element.text('O');
      setGameBoard(element.attr('id'), 'O');
    }
  }

  // change the players turn
  if (turn === 0) {
    turn = 1;
  } else {
    turn = 0;
  }

  // increment total moves
  moves++;

  if (moves < 5) {
    return;
  }

  var win = checkWin();
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

  // show current result
  $('#playerX').text(score.playerX);
  $('#playerO').text(score.playerO);
  $('#tie').text(score.tie);

});

$('.reset-button').on('click', function() {
  console.log('reset button');
  resetBoard();
});

$('.reset-button').on('mouseover', function() {
  console.log('on mouse over');
  $(this).css('cursor', 'pointer');
  $(this).css('background-color', '#AED600');
});

$('.reset-button').on('mouseleave', function() {
  console.log('on mouse leave');
  $(this).css('background-color', '#A5CE00');
});

//=============================================
// Game Engine logic
//---------------------------------------------
function resetBoard() {
  $('.cell').each(function() {
    $(this).text('');
  });

  board = ['', '', '', '', '', '', '', '', ''];
  moves = 0;
  gameOver = 0;
}

// sign is 0 for X and 1 for 0
function setGameBoard(position, sign) {
  board[position] = sign;
}

function checkWin() {

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
}

//==========================================
// Register and login
//------------------------------------------
$('#register').on('click', function(e) {
  $.ajax(sa + '/register', {
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
      credentials: {
        email: $('#email').val(),
        password: $('#password').val()//,
        // password_confirmation: $('#password').val()
      }
    }),
    dataType: 'json',
    method: 'POST'
  }).done(function(data, textStatus, jqxhr) {
    $('#result').val(JSON.stringify(data));
  }).fail(function(jqxhr, textStatus, errorThrown) {
    $('#result').val('registration failed');
  });
});

$('#login').on('click', function(e) {
  $.ajax(sa + '/login', {
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
      credentials: {
        email: $('#email').val(),
        password: $('#password').val()
      }
    }),
    dataType: 'json',
    method: 'POST'
  }).done(function(data) {
    $('#token').val(data.token);
  }).fail(function() {
    $('#result').val('login failed');
  });
});

$('#list').on('click', function(e) {
  $.ajax(sa + '/games', {
    dataType: 'json',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
    }
  }).done(function(data) {
    $('#result').val(JSON.stringify(data));
  }).fail(function() {
    $('#result').val('list failed');
  });
});

$('#create').on('click', function(e) {
  $.ajax(sa + '/games', {
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({}),
    dataType: 'json',
    method: 'POST',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
    }
  }).done(function(data) {
    $('#result').val(JSON.stringify(data));
  }).fail(function() {
    $('#result').val('create failed');
  });
});

$('#show').on('click', function(e) {
  $.ajax(sa + '/games/' + $('#id').val(), {
    dataType: 'json',
    method: 'GET',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
    }
  }).done(function(data, textStatus, jqxhr) {
    $('#result').val('');
    $('#result').val(JSON.stringify(data));
  }).fail(function(jqxhr, textStatus, errorThrown) {
    $('#result').val('show failed');
  });
});

$('#join').on('click', function(e) {
  $.ajax(sa + '/games/' + $('#id').val(), {
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({}),
    dataType: 'json',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
    }
  }).done(function(data, textStatus, jqxhr) {
    $('#result').val('');
    $('#result').val(JSON.stringify(data));
  }).fail(function(jqxhr, textStatus, errorThrown) {
    $('#result').val('join failed');
  });
});

$('#move').on('click', function(e) {
  $.ajax(sa + '/games/' + $('#id').val(), {
    contentType: 'application/json',
    processData: false,
    data: JSON.stringify({
      game: {
        cell: {
          index: $('#index').val(),
          value: $('#value').val()
        }
      }
    }),
    dataType: 'json',
    method: 'PATCH',
    headers: {
      Authorization: 'Token token=' + $('#token').val()
    }
  }).done(function(data, textStatus, jqxhr) {
    $('#result').val('');
    $('#result').val(JSON.stringify(data));
  }).fail(function(jqxhr, textStatus, errorThrown) {
    $('#result').val('move failed');
  });
});

// $('#watch').on('click', function(){
//   gameWatcher = resourceWatcher(sa + '/games/' + $('#id').val() + '/watch', {
//     Authorization: 'Token token=' + $('#token').val()
//   });
//   gameWatcher.on('change', function(data) {
//     var parsedData = JSON.parse(data);
//     // if (parsedData.timeout) { //not and error
//     //   gameWatcher.close();
//     //   return console.warn(parsedData.timeout);
//     // }
//     var gameData = parsedData.game;
//     var cell = gameData.cell;

//     $('#index').val(cell.index);
//     $('#value').val(cell.value);
//   });
//   gameWatcher.on('error', function(e) {
//     console.log('an error has occurred', e);
//   });
// });
