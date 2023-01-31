import "../styles/board.css";
import { useState, useEffect } from "react";
import Box from "./box";

/*
 * Tic Tac Toe Board Component.
 */
function Board(props) {
  /*
   * For storing the value of the each box in the board (2D Array (NXN)).
   */
  const [boxes, setBoxes] = useState(
    Array(Number(props.boardSize))
      .fill(null)
      .map(() => Array(Number(props.boardSize)).fill(null))
  );

  /*
   * For storing each row value at a particular moment in the board.
   * if current move is "X" we will add 1 to the current row, if "O" we will substract 1 from the current row.
   */
  const [rowsCount, setRowsCount] = useState(
    Array(Number(props.boardSize)).fill(0)
  );

  /*
   * For storing each column value at a particular moment in the board.
   * if current move is "X" we will add 1 to the current column, if "O" we will substract 1 from the current column.
   */
  const [colsCount, setColsCount] = useState(
    Array(Number(props.boardSize)).fill(0)
  );

  /*
   * For storing each diagnoal (left and right) value at a particular moment in the board.
   * if current move is "X" we will add 1 to the current diagnol, if "O" we will substract 1 from the current diagnol.
   */
  const [diagsCount, setDiagsCount] = useState(Array(2).fill(0));

  /*
   * For storing whether game is over or not.
   */
  const [gameOver, setGameOver] = useState(false);

  /*
   * For storing who is the current player.
   */
  const [currentPlayer, setCurrentPlayer] = useState("X");

  /*
   * For stroring the indices or co-ordinates (X and Y) of the current box.
   */
  const [lastCoordinates, setLastCoordinates] = useState([]);

  /**
   * Reset the states on every board size change.
   */
  useEffect(() => {
    resetStates();
  }, [props.boardSize]);

  /**
   * To show the alert when a player wins.
   */
  useEffect(() => {
    if (gameOver) {
      alert(`${currentPlayer === "X" ? "O" : "X"} is the Winner`);
      resetStates();
    }
  }, [gameOver]);

  /**
   * Checking the count states whether game is over or not after each move.
   */
  useEffect(() => {
    // left diagonal check.
    if (Math.abs(diagsCount[0]) === Number(props.boardSize)) {
      setGameOver(true);
      return;
    }
    // right diagonal check.
    else if (Math.abs(diagsCount[1]) === Number(props.boardSize)) {
      setGameOver(true);
      return;
    }
    // row check.
    else if (
      Math.abs(rowsCount[lastCoordinates[0]]) === Number(props.boardSize)
    ) {
      setGameOver(true);
      return;
    }
    // column check.
    else if (
      Math.abs(colsCount[lastCoordinates[1]]) === Number(props.boardSize)
    ) {
      setGameOver(true);
      return;
    }
  }, [boxes]);

  /**
   * Resets all states of the board component.
   */
  function resetStates() {
    setBoxes(
      Array(Number(props.boardSize))
        .fill(null)
        .map(() => Array(Number(props.boardSize)).fill(null))
    );
    setRowsCount(Array(Number(props.boardSize)).fill(0));
    setColsCount(Array(Number(props.boardSize)).fill(0));
    setDiagsCount(Array(2).fill(0));
    setGameOver(false);
    setCurrentPlayer("X");
    setLastCoordinates([]);
  }

  /**
   * Update the board component states on the move of a players.
   */
  function handleMove(coordinates) {
    /**
     * If a Box had already a value or Game is over exit the function.
     */
    if (boxes[coordinates[0]][coordinates[1]] || gameOver) {
      return;
    }

    /**
     * Update rows count and columns count.
     */
    const rowsCountCopy = [...rowsCount];
    const colsCountCopy = [...colsCount];
    if (currentPlayer === "X") {
      rowsCountCopy[coordinates[0]] += 1;
      colsCountCopy[coordinates[1]] += 1;
    } else {
      rowsCountCopy[coordinates[0]] -= 1;
      colsCountCopy[coordinates[1]] -= 1;
    }

    /**
     * Update left and right diagonals count.
     */
    const diagsCountCopy = [...diagsCount];

    // If middle box is the current box, add the box value for both left and right diagonals.
    if (
      coordinates[0] === coordinates[1] &&
      coordinates[0] + coordinates[1] === Number(props.boardSize) - 1
    ) {
      if (currentPlayer === "X") {
        diagsCountCopy[0] += 1;
        diagsCountCopy[1] += 1;
      } else {
        diagsCountCopy[0] -= 1;
        diagsCountCopy[1] -= 1;
      }
    }
    // If current box is in left diagonal of the board, add the left diagonal count.
    else if (coordinates[0] === coordinates[1]) {
      if (currentPlayer === "X") {
        diagsCountCopy[0] += 1;
      } else {
        diagsCountCopy[0] -= 1;
      }
    }
    // If current box is in right diagonal of the board, add the right diagonal count.
    else if (coordinates[0] + coordinates[1] === Number(props.boardSize) - 1) {
      if (currentPlayer === "X") {
        diagsCountCopy[1] += 1;
      } else {
        diagsCountCopy[1] -= 1;
      }
    }

    // Update the count states of the board component.
    setRowsCount([...rowsCountCopy]);
    setColsCount([...colsCountCopy]);
    setDiagsCount([...diagsCountCopy]);

    // Update the remaining states of the board component.
    const boxesCopy = [...boxes];
    boxesCopy[coordinates[0]][coordinates[1]] = currentPlayer;
    setLastCoordinates(coordinates);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    setBoxes([...boxesCopy]);
  }

  return (
    <div className="board">
      {boxes.map((row, rowIndex) => (
        <div className="board-row" key={rowIndex}>
          {row.map((col, colIndex) => (
            <Box
              key={`${rowIndex}-${colIndex}`}
              value={col}
              coordinates={[rowIndex, colIndex]}
              handleMove={handleMove}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default Board;
