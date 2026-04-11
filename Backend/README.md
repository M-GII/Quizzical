# 🧠 Quizzical Backend

Backend API for **Quizzical**, handling authentication and quiz score storage.

🔗 https://quizzical-lwpu.onrender.com  

---

## 📌 Overview

Built with Node.js and Express, this API manages users and stores quiz results in MongoDB. It uses JWT for authentication and protects all score-related routes.

---

## 🚀 Features

- User authentication (login/signup)
- Password hashing with bcrypt
- JWT-based route protection
- Store quiz scores with calculated percentages
- Retrieve user-specific data:
  - Top scores
  - Recent attempts

---

## 🛠 Tech Stack

- Node.js
- Express.js
- MongoDB (Mongoose)
- JWT
- bcrypt

---

## 📡 API Routes

### Auth
POST /api/user/register
POST /api/user/login

### Scores (requires token)

POST /api/score/add
GET  /api/score/recent
GET  /api/score/best

---

## 🗄️ Score Data

Each score includes:

- userId
- correctAnswers
- totalQuestions
- percentage
- category
- typeOfQuestions

---

## ⚠️ Notes

- Scores are tied to authenticated users
- Percentage is calculated before saving
- Backend is hosted on Render (may take ~30s to wake up)
