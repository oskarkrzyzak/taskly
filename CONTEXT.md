# Taskly — Project Context

## What is Taskly?
A full-stack task management app with calendar view, built as a portfolio project.

## Tech Stack
- Frontend: React.js (create-react-app)
- Backend: Python + FastAPI
- Database: Supabase (PostgreSQL)
- Auth: Google OAuth via Supabase

## Project Structure
taskly/
├── backend/
│   ├── main.py
│   ├── database.py
│   ├── models.py
│   ├── routes/tasks.py
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── App.js
│       ├── supabaseClient.js
│       ├── pages/
│       │   ├── Login.jsx
│       │   └── Dashboard.jsx
│       ├── components/
│       │   ├── Navbar.jsx
│       │   ├── Sidebar.jsx
│       │   ├── Calendar.jsx
│       │   ├── DayPanel.jsx
│       │   ├── TaskModal.jsx
│       │   └── TaskDetail.jsx
│       └── styles/
│           ├── global.css
│           └── Dashboard.css

## Features built so far
- Google OAuth login
- Monthly calendar view with navigation
- Click on day → DayPanel opens showing tasks for that day
- Tasks shown with title, time, description, priority badge
- Mark task as done / Delete task from DayPanel
- Add task button in DayPanel
- Add task button (+) in Sidebar
- Upcoming tasks list in Sidebar (clickable)
- Dark/light mode toggle (persisted in localStorage)
- Today's date highlighted in blue
- Blue dots on calendar days that have tasks

## Backend API endpoints
- GET /tasks — fetch all tasks
- POST /tasks — create task
- PUT /tasks/{id} — update task
- DELETE /tasks/{id} — delete task

## Task model fields
id, user_id, title, date, time, description, color, priority, status, created_at

## Current issues / Next steps
- DayPanel needs polish — tasks should show full details inline
- Need README.md
- Cosmetic CSS improvements
- user_id not yet connected to logged-in user (currently null)

## Color palette
Light mode: white, #378ADD (blue), yellow accents
Dark mode: #1a1f2e (dark navy), #252b3d (dark gray), red accents

## Notes
- Backend runs on http://127.0.0.1:8000
- Frontend runs on http://localhost:3000
- Supabase project: Taskly
- RLS is currently disabled on tasks table