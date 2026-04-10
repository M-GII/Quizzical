import he from "he"
import { nanoid } from "nanoid"
import { useState } from 'react'
import StartingPage from "./Components/StartingPage"
import Questions from "./Components/Questions"
import Login from "./Components/Login"
import { toast, ToastContainer } from 'react-toastify';
export const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"

export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [showQuestionsPage, setShowQuestionsPage] = useState(false)
  const [showLoginPage, setShowLoginPage] = useState(false)
  const [difficulty, setDifficulty] = useState("any")
  const [type, setType] = useState("any")
  const [amount, setAmount] = useState("5")
  const [previousPage, setPreviousPage] = useState("start")
  const [questions, setQuestions] = useState([])

  const handleLogout = () => {
    setToken("")
    localStorage.removeItem("token")
    toast.success("Logged out successfully");
  }
  const handleShowLogin = () => {
    setPreviousPage(showQuestionsPage ? "questions" : "start")
    setShowLoginPage(true)
  }
  const fetchQuestions = async () => {
    let url = `https://opentdb.com/api.php?amount=${amount}`
    if (difficulty !== "any") {
      url += `&difficulty=${difficulty}`
    }
    if (type !== "any") {
      url += `&type=${type}`
    }
    const res = await fetch(url)
    const data = await res.json()
    const finalData = data.results.map(obj => {
      const correct = {
        answer: he.decode(obj.correct_answer),
        isCorrect: true,
        id: nanoid(),
        isClicked: false
      }

      const incorrect = obj.incorrect_answers.map(ans => ({
        answer: he.decode(ans),
        isCorrect: false,
        id: nanoid(),
        isClicked: false
      }))

      const options = [...incorrect]
      const randomIndex = Math.floor(Math.random() * (options.length + 1))
      options.splice(randomIndex, 0, correct)

      return {
        ...obj,
        question: he.decode(obj.question),
        options,
        isSubmitted: false,
        id: nanoid()
      }
    })

    setQuestions(finalData)
  }
  const startGame = async () => {
    await fetchQuestions()
    setShowQuestionsPage(true)
  }
  return (
    <main>
      <div className="nav-btn">
        {token
          ? <button className='login-btn' onClick={handleLogout}>Logout</button>
          : <button className='login-btn' onClick={handleShowLogin}>Login</button>
        }
      </div>

      {showLoginPage && !token && (
        <Login
          token={token}
          setToken={setToken}
          setShowLoginPage={setShowLoginPage}
          backendUrl={backendUrl}
          setShowQuestionsPage={setShowQuestionsPage}
          previousPage={previousPage}

        />
      )}
      {!showQuestionsPage && !showLoginPage && (
        <StartingPage onClick={() => startGame()}
          type={type} changeType={setType}
          difficulty={difficulty} changeDifficulty={setDifficulty}
          amount={amount} changeAmount={setAmount}


        />
      )}
      {showQuestionsPage && !showLoginPage && (<Questions questions={questions}
        setQuestions={setQuestions}
        showStartPage={() => setShowQuestionsPage(false)}
      />)}

      <ToastContainer />
    </main>
  )
}