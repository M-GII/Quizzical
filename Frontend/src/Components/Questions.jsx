import { useState} from 'react'
import { clsx } from "clsx"

export default function Questions(props){
    const {questions, setQuestions,showStartPage} = props
    const [showAnswers , setShowAnswers ] = useState(false)
    const answersCorrect =questions.map(q => q.options.some(o => o.isClicked && o.isCorrect)).filter(Boolean).length
    const showQuestions = Array.isArray(questions) && questions.length > 0 ? questions.map((question) => {
      return(
            <section key = {question.id} className="Question">
                <h2> {question.question} </h2>
                <section className='answer-buttons'>
                    {question.options.map(answer =>{
                        return( 
                        <button onClick = {() => makeSelection(question,answer.id)} className ={clsx("answer-btn" , answer.isClicked && "option-selected")} key ={answer.id}>{answer.answer}</button>
                        )
                    })}
                </section>
            </section>
    ) 
    })
    : <h2>Loading... (If this takes over 5 seconds please reload page) </h2>

    const showCorrectAnswers =questions.map(question => { 
        return(
            <section key = {question.id} className="Question">
                <h2> {question.question} </h2>
                <section className='answer-buttons'>
                    {question.options.map(answer =>{
                        return( 
                        <button className ={clsx("answer-btn" ,answer.isCorrect && "correct", answer.isClicked && !answer.isCorrect &&"wrong")} key ={answer.id}>{answer.answer}</button>
                        )
                    })}
                </section>
            </section>
    ) 
    })

    function makeSelection(questionAsked,optionid){
        setQuestions(prev =>
            prev.map(quest =>
                quest.id === questionAsked.id
                    ? {
                        ...quest,
                        isSubmitted: true,
                        options: quest.options.map(o => ({
                        ...o,
                        isClicked: o.id === optionid}))}
                    : quest))}                  
    return (
        <section className="Questions">
            {!showAnswers && showQuestions}
            {!showAnswers && <button disabled= {!questions.every(question => question.isSubmitted ===true)} onClick ={() => setShowAnswers(prev => !prev)} className='check-ansBtn'> Check Answers </button>}
            {showAnswers && showCorrectAnswers}
            {showAnswers &&

                <section className="display-correctAns">
                    <p> You got {answersCorrect}/{questions.length} questions correct </p>
                    <button onClick= {showStartPage}>Play again</button>
                </section>
            }
        </section>
        
    )
    }