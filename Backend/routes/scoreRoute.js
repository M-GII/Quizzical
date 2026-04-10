import express from "express"
import { addScore, getBestScores , getRecentScores } from "../controllers/scoreController.js";

const scoreRouter = express.Router()

scoreRouter.post('/add', addScore)
scoreRouter.get('/recentTen', getRecentScores)
scoreRouter.get('/best', getBestScores)

export default scoreRouter