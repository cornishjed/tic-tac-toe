import { FC, useState } from "react";

interface SquareProps {
  location: number,
  turn: string,
  setTurn: Function,
  squares: string[],
  setSquares: Function
}

const Square: FC<SquareProps> = ({ location, turn, setTurn, squares, setSquares }) => {
  const [value, setValue] = useState<string>("");

  function handleClick(n: number, turn: string, squares: string[]) {
    if (squares[n] || calculateWinner(squares)) {
      return;
    }

    let squaresCopy = [...squares];
    console.log(turn);

    if (turn == "" || turn == "X") {
      setValue("X");
      setTurn("O");
      squaresCopy[n] = "X";
      setSquares(squaresCopy);
      console.log(squares);

    } else {
      setValue("O");
      setTurn("X");
      squaresCopy[n] = "O";
      setSquares(squaresCopy);
      console.log(squares);
    }
  }

  return <button className="square" onClick={() => handleClick(location, turn, squares)}>{value}</button>
}

export default function App() {
  const [turn, setTurn] = useState<string>("");
  const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
  const winner = calculateWinner(squares);
  console.log(winner);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (turn);
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square location={0} turn={turn} setTurn={setTurn} squares={squares} setSquares={setSquares} />
        <Square location={1} turn={turn} setTurn={setTurn} squares={squares} setSquares={setSquares} />
        <Square location={2} turn={turn} setTurn={setTurn} squares={squares} setSquares={setSquares} />
      </div>
      <div className="board-row">
        <Square location={3} turn={turn} setTurn={setTurn} squares={squares} setSquares={setSquares} />
        <Square location={4} turn={turn} setTurn={setTurn} squares={squares} setSquares={setSquares} />
        <Square location={5} turn={turn} setTurn={setTurn} squares={squares} setSquares={setSquares} />
      </div>
      <div className="board-row">
        <Square location={6} turn={turn} setTurn={setTurn} squares={squares} setSquares={setSquares} />
        <Square location={7} turn={turn} setTurn={setTurn} squares={squares} setSquares={setSquares} />
        <Square location={8} turn={turn} setTurn={setTurn} squares={squares} setSquares={setSquares} />
      </div>
    </>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
