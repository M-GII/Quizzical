export default function StartingPage({ onClick, type, changeType, difficulty, changeDifficulty, amount, changeAmount }) {
    return (
        <section className="starting-page">
            <h1> Quizzical </h1>
            <p>Welcome to Quizzical! <br></br> Try your hardest to answer all questions!</p>
            <section className="selections">
                <label>Difficulty:
                    <select name="Difficulty" onChange={(e) => changeDifficulty(e.target.value)} value={difficulty}>
                        <option value="any">Any difficulty</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium </option>
                        <option value="hard">Hard</option>
                    </select>
                </label>
                <label>Type of Questions:
                    <select name="type" onChange={(e) => changeType(e.target.value)} value={type}>
                        <option value="any">Any type</option>
                        <option value="boolean">True or False</option>
                        <option value="multiple">Multiple Choice </option>
                    </select>
                </label>
                <label>Number of Questions (5-15 recommended):
                    <input
                        type="number"
                        min="5" max="15" value={amount}
                        onChange={(e) => changeAmount(e.target.value)} />
                </label>

            </section>
            <button onClick={onClick} id="startgame-btn">Start Game</button>
        </section>
    )

}