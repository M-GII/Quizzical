# 🧠 Quizzical Frontend

Frontend client for **Quizzical**, a React-based quiz application that generates trivia questions using the Open Trivia Database API and interacts with a custom backend for authentication and score tracking.

🔗 **Live App:** https://quizzical-manrojgill.vercel.app/  

---

## 📌 Overview

This is the frontend of Quizzical, built as a single-page React application. It handles quiz generation, user interaction, score calculation, and communication with the backend API for authentication and data persistence.

---

## ✨ Key Features

### Quiz Functionality
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
- Restart functionality for new quiz sessions

### Backend Interaction
- User authentication (login/signup)
- Score submission after quiz completion
- Fetching user-specific stats:
  - Top scores
  - Recent attempts

---

## 🛠 Technical Implementation

- Built with React (functional components and hooks)
- `useState` for managing quiz state, authentication, and UI flow
- Controlled form inputs for quiz configuration
- Conditional rendering for multi-step UI (start → quiz → results → stats)
- Axios for API communication

---

## 🌐 External API

**Open Trivia Database API**  
https://opentdb.com/

- Questions fetched dynamically using:
  - `amount`
  - `type`
  - `difficulty`
- Handles empty responses and API edge cases
- Uses `he` library to decode HTML entities

---

## 🔗 Backend Integration

- Communicates with a custom Express API
- JWT token stored in `localStorage`
- Protected routes require token in request headers

---

## ⚠️ Notes

- Backend is hosted on Render (free tier)  
  → Initial requests may take ~30 seconds due to cold start
- Users must be logged in to save and view scores
- Quiz generation depends on external API availability

---