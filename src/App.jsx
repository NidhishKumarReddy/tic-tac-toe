import "./global.css";
import { useState } from "react";
import Board from "./components/board";

function App() {
    const [boardSize, setBoardSize] = useState("3");

    function handleBoardSize(e) {
        setBoardSize(e.target.value);
    }
    return (
        <div className="app">
            <div className="select-board-size">
                <label htmlFor="select-board-size">Board Size : </label>
                <select onChange={handleBoardSize} id="select-board-size">
                    <option value="3">3 X 3</option>
                    <option value="4">4 X 4</option>
                    <option value="5">5 X 5</option>
                    <option value="6">6 X 6</option>
                </select>
            </div>
            <Board boardSize={boardSize} />
        </div>
    );
}

export default App;
