# Quizzical

A customizable React trivia application that fetches real-time questions from the Open Trivia Database API. Users can configure quiz settings, answer interactive questions, and receive instant feedback with score tracking and result highlighting.

## 🚀 Live Demo
🔗 https://quizzical-manrojgill.netlify.app/

---

## 📌 Overview

Quizzical is a single-page React application built with modern React fundamentals including state management, effects, controlled components, and API integration. The app dynamically generates quizzes based on user-selected parameters and provides a polished results experience with conditional styling and score calculation.

---

## ✨ Key Features

- Configurable number of questions (5–15)
- Selectable question type: Multiple Choice or True/False
- Selectable difficulty: Easy, Medium, Hard
- Dynamic API requests based on user input
- HTML entity decoding for clean question formatting
- Randomized answer placement for each question
- Prevents submission until all questions are answered
- Visual feedback:
  - Correct answers highlighted in green
  - Incorrect selections highlighted in red
- Final score calculation
- Restart functionality to generate a new quiz session

---

## 🛠 Technical Implementation

- Built with React (functional components and hooks)
- `useState` for state management
- `useEffect` for API data fetching
- Controlled form inputs for quiz configuration
- Conditional rendering for results view
- Dynamic URL generation using query parameters:
  - `amount`
  - `type`
  - `difficulty`
- Score calculated by comparing selected answers against correct answers
- Answer options built by combining correct/incorrect answers and inserting the correct answer at a randomized index

---

## 🌐 Data Source

Open Trivia Database API  
https://opentdb.com/

---

## 📈 Future Improvements

- **Persist scores and settings** using `localStorage` (save best score, last score, and preferred quiz settings)
- **Add a leaderboard-style stats panel** (best score, average score, streaks, total quizzes played)
- **Add a backend (Node.js/Express)** to store quiz history and scores for cross-device persistence
- **Accessibility upgrades** (ARIA labels, keyboard navigation, focus management, improved contrast)