import { useState } from 'react'
const TURNOS ={
    X : 'x',
   O : 'o'
}

const Square = ({children, update, index}) => {
  return(
    <div className="w-full h-full p-5 border grid items-center cursor-pointer font-bold">
      {children}
    </div>
  )}
function App() {
  const [board, setBoard] = useState(Array(9).fill(null))
  return (
    <>
    <main className="flex justify-center items-center h-screen">
      
      <section className="grid grid-cols-3 gap-2"> 
     
        {board.map((_, index) => (
          <Square key={index} index={index}>
            
          </Square>
        ))}
      </section>
       </main>
    </>
  )
}

export default App
