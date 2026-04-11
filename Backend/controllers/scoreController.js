import scoreModel from "../models/scoreModel.js"


const addScore = async (req, res) => {
    try {
        const userId = req.user.id
        const { correctAnswers, totalQuestions, typeOfQuestions, difficulty } = req.body;
        if (correctAnswers === undefined || totalQuestions === undefined || totalQuestions === 0 || !difficulty || !typeOfQuestions) {
            return res.status(400).json({ success: false, message: "Invalid score data" });
        }
        const scoreData = {
            userId,
            correctAnswers,
            percentage: Number(((correctAnswers / totalQuestions) * 100).toFixed(1)),
            totalQuestions,
            typeOfQuestions,
            difficulty
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
        const recentScores = await scoreModel.find({ userId: req.user.id }).sort({ date: -1 }).limit(5)
        res.status(200).json({ success: true, scores: recentScores })
    } catch (error) {
        console.error("Error fetching recent scores:", error);
        res.status(500).json({ message: error.message, success: false });
    }
}

const getBestScores = async (req, res) => {
    try {
        const bestScores = await scoreModel.find({ userId: req.user.id }).sort({ percentage: -1 , totalQuestions: -1 , date: -1 }).limit(5)
        res.status(200).json({ success: true, scores: bestScores })
    } catch (error) {
        console.error("Error fetching best scores:", error);
        res.status(500).json({ message: error.message, success: false });
    }
}

const getStats = async (req, res) => {
    try {
        const userId = req.user.id
        const userScores = await scoreModel.find({ userId })
        const totalGames = userScores.length

        if (totalGames === 0) {
            return res.status(200).json({
                success: true,
                stats: {
                    totalGames: 0,
                    averagePercentage: 0,
                    bestPercentage: 0,
                    lowestPercentage: 0
                }
            })
        }
        const totalPercentage = userScores.reduce((sum, score) => sum + score.percentage, 0)
        const averagePercentage = totalPercentage / totalGames
        const bestPercentage = Math.max(...userScores.map(score => score.percentage))
        const lowestPercentage = Math.min(...userScores.map(score => score.percentage))
        res.status(200).json({
            success: true,
            stats: {totalGames,averagePercentage: Number(averagePercentage.toFixed(1)), bestPercentage: Number(bestPercentage.toFixed(1)), lowestPercentage: Number(lowestPercentage.toFixed(1))
            }
        })
    } catch (error) {
        console.error("Error getting stats:", error)
        res.status(500).json({
            success: false,message: error.message
        })
    }
}

export { addScore, getRecentScores, getBestScores , getStats}