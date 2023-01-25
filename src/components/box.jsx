import "../styles/box.css";

function Box(props) {
    return (
        <div
            className="box"
            onClick={() => props.handleMove(props.coordinates)}
        >
            {props.value}
        </div>
    );
}

export default Box;
