import { useState } from 'react'
import confetti from 'canvas-confetti'
const TURNOS ={
    X : '⨉',
   O : "◯"
}

const Square = ({children, isSelected, updateBoard, index}) => {
 const handleClick = () => {
    updateBoard(index)
  }
  return(
    <div onClick={handleClick} className={`${isSelected ? "bg-green-500 " : ""}  w-20 h-20 border border-white rounded flex justify-center items-center cursor-pointer text-4xl `}>

      {children}
    </div>

  )}
  

const combosGanadores = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],
]

function App() {
  const [board, setBoard] = useState(Array(9).fill(null))

  const [turn, setTurn]= useState(TURNOS.X)
  const [winner, setWinner]= useState(null)

  const checkWinner = (boardCheck) => {
    for (const combo of combosGanadores) {
      const [a,b,c] = combo
      if(boardCheck[a] && 
        boardCheck[a] === boardCheck[b] &&
        boardCheck[a] === boardCheck[c]
      ){
        return boardCheck[a]
        
      }
    }
    return null
  }

  const updateBoard = (index)=>{

    if(board[index] || winner) return
    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNOS.X ? TURNOS.O : TURNOS.X
    setTurn(newTurn)

    const newWinner = checkWinner(newBoard)
    if(newWinner){
      confetti()
      setWinner(newWinner)
    }else if(!newBoard.includes(null)){
      setWinner(false)
    
    } 

    
  }
  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNOS.X) 
    setWinner(null) 


  }
  return (
    <>
    <main className="w-full text-white bg-black flex flex-col justify-center items-center h-screen  ">
      <button className='border rounded p-2 mb-2 hover:bg-white hover:text-black' onClick={resetGame}>Reiniciar juego</button>
      <section className="grid grid-cols-3 gap-2 "> 
     
        {board.map((_, index) => (
          <Square key={index} index={index} updateBoard={updateBoard}>
            {board[index]}
            
          </Square>
        ))}
      </section>

      <section  className='flex gap-2 mt-2 w-32' >
        <Square isSelected={turn === TURNOS.X}>
          {TURNOS.X}
        </Square>
        <Square   isSelected={turn === TURNOS.O}>
          {TURNOS.O}
        </Square>
      </section>

      <section>

        {winner !== null && (
          <div className=' text-center absolute bg-black top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-10 rounded-lg border border-white'>
            <h2 className='text-3xl flex flex-col justify-center items-center gap-2'> {winner === false 
        ? "Empate 🤝"
        : <>El ganador es: <Square>{winner}</Square></>
      }</h2>
            <button 
              className='mt-2 border  text-white px-4 py-2 rounded hover:bg-white hover:text-black'
              onClick={resetGame}
              
            >
              Reiniciar juego
            </button>
            
          </div>
        )}
      </section>
       </main>
    </>
  )
}

export default App
