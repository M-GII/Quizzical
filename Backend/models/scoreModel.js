import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    correctAnswers:{type : Number, required: true},
    percentage:{type : Number, required: true},
    totalQuestions:{type :Number, required: true},
    typeOfQuestions: {type : String, required: true},
    difficulty: {type : String, required: true},
    date: {type : Date, default: Date.now}
});

const scoreModel = mongoose.models.score || mongoose.model("score", scoreSchema);

export default scoreModel; 