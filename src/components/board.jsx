import "../styles/board.css";
import { useState, useEffect } from "react";
import Box from "./box";

function Board(props) {
    const [boxes, setBoxes] = useState(
        Array(Number(props.boardSize))
            .fill(null)
            .map(() => Array(Number(props.boardSize)).fill(null))
    );
    const [rowsCount, setRowsCount] = useState(
        Array(Number(props.boardSize)).fill(0)
    );
    const [colsCount, setColsCount] = useState(
        Array(Number(props.boardSize)).fill(0)
    );
    const [diagsCount, setDiagsCount] = useState(Array(2).fill(0));
    const [gameOver, setGameOver] = useState(false);
    const [currentPlayer, setCurrentPlayer] = useState("X");
    const [lastCoordinates, setLastCoordinates] = useState([]);

    // Reset the states on board size change
    useEffect(() => {
        resetStates();
    }, [props.boardSize]);

    useEffect(() => {
        if (gameOver) {
            alert(`${currentPlayer === "X" ? "O" : "X"} is the Winner`);
            resetStates();
        }
    }, [gameOver]);

    useEffect(() => {
        //left diag check
        if (Math.abs(diagsCount[0]) === Number(props.boardSize)) {
            setGameOver(true);
            return;
        }
        //right diag check
        else if (Math.abs(diagsCount[1]) === Number(props.boardSize)) {
            setGameOver(true);
            return;
        }
        //rows check
        else if (
            Math.abs(rowsCount[lastCoordinates[0]]) === Number(props.boardSize)
        ) {
            setGameOver(true);
            return;
        }
        //cols check
        else if (
            Math.abs(colsCount[lastCoordinates[1]]) === Number(props.boardSize)
        ) {
            setGameOver(true);
            return;
        }
    }, [boxes]);

    //Reset the states
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

    //Update the states on the current move
    function handleMove(coordinates) {
        //Box has a value or game is over ->return
        if (boxes[coordinates[0]][coordinates[1]] || gameOver) {
            return;
        }
        //Update rows count and cols count
        const rowsCountCopy = [...rowsCount];
        const colsCountCopy = [...colsCount];
        if (currentPlayer === "X") {
            rowsCountCopy[coordinates[0]] += 1;
            colsCountCopy[coordinates[1]] += 1;
        } else {
            rowsCountCopy[coordinates[0]] -= 1;
            colsCountCopy[coordinates[1]] -= 1;
        }
        //Update left and right diags Count
        const diagsCountCopy = [...diagsCount];
        //Add Middle Element value for both left and right diags
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
        // left diag
        else if (coordinates[0] === coordinates[1]) {
            if (currentPlayer === "X") {
                diagsCountCopy[0] += 1;
            } else {
                diagsCountCopy[0] -= 1;
            }
        }
        // right diag
        else if (
            coordinates[0] + coordinates[1] ===
            Number(props.boardSize) - 1
        ) {
            if (currentPlayer === "X") {
                diagsCountCopy[1] += 1;
            } else {
                diagsCountCopy[1] -= 1;
            }
        }

        setRowsCount([...rowsCountCopy]);
        setColsCount([...colsCountCopy]);
        setDiagsCount([...diagsCountCopy]);

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
