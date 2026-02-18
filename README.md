# Quizzical

A React trivia app that fetches questions from the Open Trivia Database. This version includes custom controls for number of questions, question type, and difficulty, plus a results screen with correct/incorrect highlighting.
This project was developed as a **solo capstone project at the end of the Scrimba React Course**, bringing together everything I learned in React from state management and effects to API integration and conditional rendering.

## Demo
- [Live Site](https://quizzical-manrojgill.netlify.app/)

## Description
Quizzical lets users configure a quiz and then answer a series of questions. Questions and answers are HTML-entity decoded for readability, answers are shuffled per question, and the app enforces that all questions are answered before checking results. After submission, the UI shows which selections were correct or wrong and displays the final score, with an option to play again.

## Features
- Choose number of questions (5–15)
- Select question type: Multiple Choice or True/False
- Select difficulty: Easy, Medium, Hard
- Decodes HTML entities in questions/answers for clean text
- Randomizes the placement of the correct answer among options
- Prevents submission until all questions have a selection
- Highlights results: green for correct, red for incorrect
- Shows final score and allows restarting the quiz

## How It Works
- Data source: [Open Trivia Database API](https://opentdb.com/)
- Dynamic API URL built from user selections (`amount`, `type`, `difficulty`)
- Answer options are constructed by combining the correct answer with incorrect ones and inserting the correct answer at a random index
- Result checking:
  - Before submit: selected options are tracked per question
  - After submit: correct and incorrect selections are styled differently
  - Score is computed by counting selected options that are correct