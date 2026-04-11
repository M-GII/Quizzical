import { useState } from 'react'
import { clsx } from "clsx"
import axios from 'axios'

export default function Questions({ questions, setQuestions, showStartPage, token, backendUrl,type,difficulty, amount}) {
    const [showAnswers, setShowAnswers] = useState(false)
    const answersCorrect = questions.map(q => q.options.some(o => o.isClicked && o.isCorrect)).filter(Boolean).length
    const showQuestions = Array.isArray(questions) && questions.length > 0 ? questions.map((question) => {
        return (
            <section key={question.id} className="Question">
                <h2> {question.question} </h2>
                <section className='answer-buttons'>
                    {question.options.map(answer => {
                        return (
                            <button onClick={() => makeSelection(question, answer.id)} className={clsx("answer-btn", answer.isClicked && "option-selected")} key={answer.id}>{answer.answer}</button>
                        )
                    })}
                </section>
            </section>
        )
    })
        : <h2>Loading... (If this takes over 5 seconds please reload page) </h2>

    const showCorrectAnswers = questions.map(question => {
        return (
            <section key={question.id} className="Question">
                <h2> {question.question} </h2>
                <section className='answer-buttons'>
                    {question.options.map(answer => {
                        return (
                            <button className={clsx("answer-btn", answer.isCorrect && "correct", answer.isClicked && !answer.isCorrect && "wrong")} key={answer.id}>{answer.answer}</button>
                        )
                    })}
                </section>
            </section>
        )
    })

    function makeSelection(questionAsked, optionid) {
        setQuestions(prev =>
            prev.map(quest =>
                quest.id === questionAsked.id
                    ? {
                        ...quest,
                        isSubmitted: true,
                        options: quest.options.map(o => ({
                            ...o,
                            isClicked: o.id === optionid
                        }))
                    }
                    : quest))
    }
    const sendScore = async () => {
        setShowAnswers(prev => !prev)
        if (token){
            try {
                const response = await axios.post(`${backendUrl}/api/score/add`, {
                    correctAnswers: answersCorrect,
                    totalQuestions: Number(amount),
                    typeOfQuestions: type || "any",
                    difficulty: difficulty || "any"
                },{headers:{token}})
                if (response.data.success) {
                    console.log("Score submitted successfully")
                }
            } catch (error) {
                console.error("Error submitting score:", error)
            }
        }
    }
    return (
        <section className="Questions">
            {!showAnswers && showQuestions}
            {!showAnswers && <button disabled={!questions.every(question => question.isSubmitted === true)} onClick={() => sendScore()} className='check-ansBtn'> Check Answers </button>}
            {showAnswers && showCorrectAnswers}
            {showAnswers &&

                <section className="display-correctAns">
                    <p> You got {answersCorrect}/{questions.length} questions correct </p>
                    <button onClick={showStartPage}>Play again</button>
                </section>
            }
        </section>

    )
}