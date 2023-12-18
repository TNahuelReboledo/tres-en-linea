import { useState } from "react";

const TURNS = {
   X: "x",
   O: "o",
};

const WINNERSCOMBOS = [
   [0, 1, 2],
   [3, 4, 5],
   [6, 7, 8],
   [0, 3, 6],
   [0, 4, 8],
   [1, 4, 7],
   [2, 4, 6],
   [2, 5, 8],
];

const Square = ({ children, isSelected, updateBoard, index }) => {
   const className = `square ${isSelected ? "selected" : ""} `;

   const handleClick = () => {
      updateBoard(index);
   };

   return (
      <div onClick={handleClick} className={className}>
         {children}
      </div>
   );
};

function App() {
   const [board, setBoard] = useState(Array(9).fill(null));

   const [turn, setTurn] = useState(TURNS.X);

   const [winner, setWinner] = useState(null);

   const checkWinner = (boardToCheck) => {
      for (const combo of WINNERSCOMBOS) {
         const [a, b, c] = combo;
         if (
            boardToCheck[a] &&
            boardToCheck[a] === boardToCheck[b] &&
            boardToCheck[b] === boardToCheck[c]
         ) {
            return boardToCheck[a];
         }
      }
      return null;
   };

   const updateBoard = (index) => {
      if (board[index] || winner) return;

      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn);

      const newWinner = checkWinner(newBoard);
      if (newWinner) {
         setWinner(newWinner);
      }
   };

   const handlerRestart = () => {
      setBoard(Array(9).fill(null))
      setTurn(TURNS.X)
      setWinner(null)
   }

   return (
      <div className="w-screen h-screen flex flex-col justify-center items-center select-none">
         <h1>TA-TE-TI</h1>

         <button className="reset-button" onClick={handlerRestart}>reset</button>

         <section className="grid grid-cols-3 gap-3">
            {board.map((_, index) => (
               <Square key={index} index={index} updateBoard={updateBoard}>
                  {board[index]}
                  {/* {index} */}
               </Square>
            ))}
            {/* El primer parámetro ("_") representa cada elemento del arreglo,
         pero como no se utiliza en el cuerpo de la función, se utiliza el guion bajo
         para indicar que está siendo ignorado. El segundo parámetro ("index") representa
      el índice del elemento en el arreglo. */}
         </section>
         <section className="indicator">
            <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
            <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
         </section>

         {
            winner !== null && (
            <section className="absolute w-screen h-screen top-0 left-0 grid place-items-center bg-[#00000050]">
               <div className="w-1/2 h-1/2 p-10 flex flex-col justify-center items-center gap-6 bg-slate-100 rounded-lg shadow-2xl">
                  <h2 className="text-xl">
                     {winner === false ?
                     "empate" :
                     "gano:" + winner
                  }
                  </h2>

                  <button onClick={handlerRestart} className="border p-2 rounded-xl shadow-lg hover:shadow-inner hover:bg-white">restart</button>
               </div>
            </section>
            )
            }
      </div>
   );
}

export default App;
