import { useState } from "react";

const TURNS = {
   X: "x",
   O: "o",
};

const Square = ({ children, isSelected, updateBoard, index }) => {
   const className = `square ${isSelected ? "selected" : ""}`;

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

   const updateBoard = (index) => {

      

      const newBoard = [...board];
      newBoard[index] = turn;
      setBoard(newBoard);

      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X;
      setTurn(newTurn);
   };

   return (
      <div className="w-screen h-screen flex flex-col justify-center items-center select-none">
         <h1>TA-TE-TI</h1>

         <section className="grid grid-cols-3 gap-3">
            {board.map((_, index) => (
               <Square key={index} index={index} updateBoard={updateBoard}>
                  {board[index]}
               </Square>
            ))}
            {/* El primer parámetro ("_") representa cada elemento del arreglo,
         pero como no se utiliza en el cuerpo de la función, se utiliza el guion bajo
         para indicar que está siendo ignorado. El segundo parámetro ("index") representa
      el índice del elemento en el arreglo. */}
         </section>
         <section className="flex">
            <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
            <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
         </section>
         <div></div>
      </div>
   );
}

export default App;
