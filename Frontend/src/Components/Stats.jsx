import { useEffect, useState } from "react"
import axios from "axios"
import { toast } from "react-toastify"

export default function Stats({ token, backendUrl }) {
    const [stats, setStats] = useState(null)
    const [recentScores, setRecentScores] = useState([])
    const [bestScores, setBestScores] = useState([])

    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                const statsRes = await axios.get(`${backendUrl}/api/score/stats`, { headers: { token } })
                const recentRes = await axios.get(`${backendUrl}/api/score/recent`, { headers: { token } })
                const bestRes = await axios.get(`${backendUrl}/api/score/best`, { headers: { token } })
                if (statsRes.data.success) setStats(statsRes.data.stats)
                if (recentRes.data.success) setRecentScores(recentRes.data.scores)
                if (bestRes.data.success) setBestScores(bestRes.data.scores)
            } catch (error) {
                console.error("Error loading stats:", error)
                toast.error("Failed to load stats")
            }
        }
        fetchStatsData()
    }, [token, backendUrl])

    const formatDate = (dateStr) => {
        if (!dateStr) return "—"
        return new Date(dateStr).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" })
    }
    const formatType = (type) => {
        if (type === "boolean") return "True / False"
        if (type === "multiple") return "Multiple Choice"
        return "Any"
    }

    return (
        <section className="stats-page">
            <h1>Your Stats</h1>

            <section className="stats-section">
                <h2>Overall Stats</h2>
                <div className="stats-grid">
                    <div className="stat-card">
                        <span className="stat-label">Total Games</span>
                        <span className="stat-value">{stats?.totalGames ?? 0}</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Average</span>
                        <span className="stat-value">{stats?.averagePercentage ?? 0}%</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Best</span>
                        <span className="stat-value">{stats?.bestPercentage ?? 0}%</span>
                    </div>
                    <div className="stat-card">
                        <span className="stat-label">Lowest</span>
                        <span className="stat-value">{stats?.lowestPercentage ?? 0}%</span>
                    </div>
                </div>
            </section>

            <section className="stats-section">
                <h2>Most Recent Scores</h2>
                <div className="score-table">
                    <div className="score-table-header">
                        <span>#</span>
                        <span>Difficulty</span>
                        <span>Type</span>
                        <span>Score</span>
                        <span>Percentage</span>
                        <span>Date</span>
                    </div>
                    {recentScores.length === 0 ? (
                        <p className="stats-empty">No recent games</p>
                    ) : (
                        recentScores.map((score, i) => (
                            <div key={score._id} className="score-table-row">
                                <span className="row-index">{i + 1}</span>
                                <span><span className="type-pill">{score.difficulty}</span></span>
                                <span><span className="type-pill">{formatType(score.typeOfQuestions)}</span></span>
                                <span>{score.correctAnswers} / {score.totalQuestions}</span>
                                <span>
                                    <span className={`badge ${score.percentage >= 80 ? "badge-green" : score.percentage >= 50 ? "badge-yellow" : "badge-red"}`}>
                                        {score.percentage.toFixed(1)}%
                                    </span>
                                </span>
                                <span className="date-cell">{formatDate(score.date)}</span>
                            </div>
                        ))
                    )}
                </div>
            </section>

            <section className="stats-section">
                <h2>Best Scores</h2>
                <div className="score-table">
                    <div className="score-table-header">
                        <span>#</span>
                        <span>Difficulty</span>
                        <span>Type</span>
                        <span>Score</span>
                        <span>Percentage</span>
                        <span>Date</span>
                    </div>
                    {bestScores.length === 0 ? (
                        <p className="stats-empty">No best scores</p>
                    ) : (
                        bestScores.map((score, i) => (
                            <div key={score._id} className="score-table-row">
                                <span className="row-index">{i + 1}</span>
                                <span><span className="type-pill">{score.difficulty}</span></span>
                                <span><span className="type-pill">{formatType(score.typeOfQuestions)}</span></span>
                                <span>{score.correctAnswers} / {score.totalQuestions}</span>
                                <span>
                                    <span className={`badge ${score.percentage >= 80 ? "badge-green" : score.percentage >= 50 ? "badge-yellow" : "badge-red"}`}>
                                        {score.percentage.toFixed(1)}%
                                    </span>
                                </span>
                                <span className="date-cell">{formatDate(score.date)}</span>
                            </div>
                        ))
                    )}
                </div>
            </section>

        </section>
    )
}