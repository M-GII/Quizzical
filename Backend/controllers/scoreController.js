import scoreModel from "../models/scoreModel.js"


const addScore = async (req, res) => {
    try {
        const userId = req.user.id
        const { correctAnswers, totalQuestions, category, typeOfQuestions } = req.body;
        if (correctAnswers === undefined || totalQuestions === undefined || totalQuestions === 0 || !category || !typeOfQuestions) {
            return res.status(400).json({ success: false, message: "Invalid score data" });
        }
        const scoreData = {
            userId,
            correctAnswers,
            percentage: Number(((correctAnswers / totalQuestions) * 100).toFixed(1)),
            totalQuestions,
            category,
            typeOfQuestions
        }
        const newScore = new scoreModel(scoreData)
        await newScore.save()
        res.status(200).json({ success: true, message: "Score added successfully" })
    } catch (error) {
        console.error("Error adding score:", error);
        res.status(500).json({ message: error.message, success: false });
    }
}

const getRecentScores = async (req, res) => {
    try {
        const recentScores = await scoreModel.find({ userId: req.user.id }).sort({ date: -1 }).limit(10)
        res.status(200).json({ success: true, scores: recentScores })
    } catch (error) {
        console.error("Error fetching recent scores:", error);
        res.status(500).json({ message: error.message, success: false });
    }
}

const getBestScores = async (req, res) => {
    try {
        const bestScores = await scoreModel.find({ userId: req.user.id }).sort({ percentage: -1 }).limit(10)
        res.status(200).json({ success: true, scores: bestScores })
    } catch (error) {
        console.error("Error fetching best scores:", error);
        res.status(500).json({ message: error.message, success: false });
    }
}

export { addScore, getRecentScores, getBestScores }