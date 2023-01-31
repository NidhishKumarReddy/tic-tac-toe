import "../styles/box.css";

/**
 * Box Component
 */
function Box(props) {
  return (
    <div className="box" onClick={() => props.handleMove(props.coordinates)}>
      {props.value}
    </div>
  );
}

export default Box;
