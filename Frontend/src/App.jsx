import he from "he"
import { nanoid } from "nanoid"
import { useState } from 'react'
import StartingPage from "./Components/StartingPage"
import Questions from "./Components/Questions"
import Login from "./Components/Login"
import Stats from "./Components/Stats"
import { toast, ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000"

export default function App() {
  const [page, setPage] = useState("start")
  const [previousPage, setPreviousPage] = useState("start")
  const [token, setToken] = useState(localStorage.getItem("token") || "")
  const [difficulty, setDifficulty] = useState("any")
  const [type, setType] = useState("any")
  const [amount, setAmount] = useState("5")
  const [questions, setQuestions] = useState([])

  const handleLogout = () => {
    setToken("")
    localStorage.removeItem("token")
    setPage("start")
    toast.success("Logged out successfully");
  }
  const handleShowLogin = () => {
    setPreviousPage(page)
    setPage("login")
  }
  const fetchQuestions = async () => {
    try {
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
      return true
    } catch (error) {
      console.error("Error fetching questions:", error)
      toast.error("Failed to fetch questions. Please try again.");
      return false
    }
  }
  const startGame = async () => {
    const success = await fetchQuestions()
    if (success) {
      setPage("questions")
    }
  }
  return (
    <main>
      <div className="nav-btn">
        {page !== "start" && (
          <button className="back-btn" onClick={()=>setPage("start")}>Back</button>)}
        {token
          ? <div className="right-btn">
            <button className='stats-btn' onClick={() => { setPreviousPage(page); setPage("stats") }}>Stats</button>
            <button className='logout-btn' onClick={handleLogout}>Logout</button>
          </div>
          : <button className='login-btn' onClick={handleShowLogin}>Login</button>
        }
      </div>

      {page === "login" && !token && (
        <Login
          setToken={setToken}
          setPage={setPage}
          backendUrl={backendUrl}
          previousPage={previousPage}

        />
      )}
      {page === "start" && (
        <StartingPage onClick={() => startGame()}
          type={type} changeType={setType}
          difficulty={difficulty} changeDifficulty={setDifficulty}
          amount={amount} changeAmount={setAmount}
        />
      )}
      {page === "questions" && (<Questions questions={questions}
        setQuestions={setQuestions}
        showStartPage={() => setPage("start")}
        token={token}
        backendUrl={backendUrl}
        type={type}
        difficulty={difficulty}
        amount={amount}
      />)}
      {page === "stats" && token && ( <Stats token={token} backendUrl={backendUrl} />)}

      <ToastContainer />
    </main>
  )
}