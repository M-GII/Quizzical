export default function StartingPage(props){
    return (
        <section className="starting-page">
            <h1> Quizzical </h1>
            <p>Welcome to Quizzical! <br></br> Try your hardest to answer all questions!</p>
            <section className="selections">
                <label>Difficulty:
                    <select name="Difficulty" onChange={(e) => props.changeDifficulty(e.target.value)} value={props.difficulty}>
                        <option value="any">Any difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium </option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
                <label>Type of Questions:
                    <select name="type" onChange={(e) => props.changeType(e.target.value)} value={props.type}>
                        <option value="any">Any type</option>
                        <option value="boolean">True or False</option>
                        <option value="multiple">Multiple Choice </option>
                    </select>
                </label>
                <label>Number of Questions (5-15 recommended):
                    <input 
                    type ="number" 
                    min="5" max="15" value={props.amount}
                    onChange={(e) => props.changeAmount(e.target.value)} />
                </label>
               
            </section>
             <button onClick = {props.onClick} id="startgame-btn">Start Game</button>
        </section>
    )

}