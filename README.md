//# tictactoe-ultimate

## TIC TAC TOE

Tic Tac Toe is one of the best known games in the world. This project creates a web page that gives the user the option to play against another user or against coputer.

## Technologies used:
This project uses `JavaScript` for the game engine and `jQuery` for DOM manipulation and event handling. It also uses `browserify` to bundle all JS files into one main file. The layout design is created with `HTML` and vanilla `CSS`. `Ajax` is used to send and retrieve from a server asynchronously

## Approach:
Major rules:
- When a new game starts player X is first, next round the turn changes.
- The board is not checked for winners if the there are less than 5 moves on the board from both players
- In single player mode computer is always player 'O'

# Multiplayer mode (playing against another person)
- When moves are more than 5 check the board is checked for winners. In case of a win allert message is shown to state the winner and the score on the left pannel is updated.

# Single player mode (playing against the computer)
 - If the moves on the board are less then 3 the computer chooses a random position.
 - After more than 3 moves, computer checks for win possibility for both player X and player 0 and if found places its next move there.
 - In case of no possibility of winning, computer gets all empty cells and randomy chooses where to place its next move.

## Unsolved problems:
- The project UI should be resizable and for that purpose it should be using Bootstrap
- Labels should be more responsive to show what is the current playing mode
- Bug in code when playing against computer, player X moves are sometimes overriden by player O

## Linkes to:

- Wireframes

- User stories
