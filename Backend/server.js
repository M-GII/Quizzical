import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/mongodb.js';
import userRouter from './routes/userRoute.js';
import scoreRouter from './routes/scoreRoute.js';
import authUser from './middleware/authUser.js';
const app = express();
const port = process.env.PORT || 4000;
connectDB()


app.use(express.json())
app.use(cors( {origin: process.env.FRONTEND_URL,  methods: ['GET', 'POST', 'PUT', 'DELETE'], allowedHeaders: ['Content-Type', 'Authorization', 'token']}))

app.use('/api/user',userRouter)
app.use('/api/score',authUser, scoreRouter)
app.get('/', (req, res) => {
    res.send("API Working")
})

app.listen(port, () => {
    console.log('Server start on Port : ' + port)
})
