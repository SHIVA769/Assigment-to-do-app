# Full-Stack To-Do Application (MERN Stack)

This is a modern, responsive, and beautiful To-Do Application built with the MERN stack (MongoDB, Express, React, Node.js). It includes user authentication, task management, and a stunning UI with glassmorphism effects.

## 🌟 Features Included

### Core Requirements
- ✅ Add new tasks
- ✅ Display list of tasks
- ✅ Mark tasks as complete/incomplete
- ✅ Delete tasks

### Bonus Requirements
- ✅ Edit/update tasks
- ✅ Filter tasks (All / Active / Completed)
- ✅ User-specific tasks (login-based authentication with JWT)
- ✅ Password securely hashed using `bcryptjs`

---

## 🛠️ Tech Stack Used

- **Frontend:** React (Vite), React Router DOM, fetch/Context 
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Authentication:** JSON Web Tokens (JWT), bcryptjs

---

## 🚀 Setup Instructions

### Prerequisites
Make sure you have installed:
1. [Node.js](https://nodejs.org/)
2. [MongoDB](https://www.mongodb.com/try/download/community) (running locally on default port `27017`)

---

### Step 1: Start the Backend server

1. Open a new terminal.
2. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
3. Install backend dependencies:
   ```bash
   npm install
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
> The backend server will run on `http://localhost:5000` and automatically connect to your local MongoDB database (`todo-app`).

---

### Step 2: Start the Frontend React App

1. Open a **second, separate terminal**.a
2. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
3. Install frontend dependencies:
   ```bash
   npm install
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
> The frontend application will run on `http://localhost:3000` (or similar, check terminal output). Open the link in your browser to view the app!

---

