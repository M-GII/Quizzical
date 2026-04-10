import { useState} from 'react'
import StartingPage from "./Components/StartingPage"
import Questions from "./Components/Questions"
export default function App(){
  const [showQuestionsPage , setShowQuestionsPage]  = useState(false)
  const [difficulty, setDifficulty] = useState("any")
  const [type, setType] = useState("any")
  const [amount , setAmount] = useState("5")
  return (
    <main>
      {!showQuestionsPage && <StartingPage onClick = {() => setShowQuestionsPage(!showQuestionsPage)} 
      type ={type} changeType ={setType}
      difficulty={difficulty} changeDifficulty ={setDifficulty}
      amount = {amount} changeAmount = {setAmount}
    
      />}
      {showQuestionsPage  && <Questions showStartPage = {() => setShowQuestionsPage(!showQuestionsPage)}
      type ={type} changeType ={setType}
      difficulty={difficulty} changeDifficulty ={setDifficulty}
      amount = {amount} changeAmount = {setAmount} 
      />}


    </main>
  )
}