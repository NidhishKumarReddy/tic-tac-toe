# React.js Tic-Tac-Toe Game with O(1) Complexity

This is a simple Tic-Tac-Toe game built using React.js. The game is designed to work with any square-sized board (3x3, 4x4, 5x5, etc.) and uses an algorithm to achieve an O(1) complexity.

### Getting Started
Clone the repository<br />
Run npm install to install dependencies<br />
Run npm start to start the development server<br />
Open http://localhost:3000 to view it in the browser.

### Usage
When the game is started, you will see a dropdown menu to select the board size. Once you select the board size, the game board will be displayed.

To play the game, click on any empty box to make your move. The first player is "X" and the second player is "O". The game will continue until one player wins or all boxes are filled.

### Algorithm
The algorithm used in this game achieves an O(1) complexity by tracking the number of "X" and "O" in each row, column, and diagonal. Whenever a player makes a move, the counts for the corresponding row, column, and diagonal are updated. If any count reaches the size of the board, then that player has won the game.

This algorithm reduces the time complexity of checking for a winner from O(N^2) to O(1), making it much more efficient for larger board sizes.
