import express from "express"
import { addScore, getBestScores , getRecentScores ,getStats} from "../controllers/scoreController.js";

const scoreRouter = express.Router()

scoreRouter.post('/add', addScore)
scoreRouter.get('/recent', getRecentScores)
scoreRouter.get('/best', getBestScores)
scoreRouter.get('/stats', getStats)

export default scoreRouter