# 🛠️ Dynamic Portfolio – Vanilla JS Front-End (Refresh 25)

A dynamic portfolio site built with **pure JavaScript (Vanilla JS)**.  
The back-end API was provided by OpenClassrooms — this repo contains the **front-end code built from scratch** as part of the **"Refresh 25"** project.

---

## ✨ Overview

This project presents the works of an interior designer in a clean gallery layout, with admin features such as **login** and a **media upload modal**. The front communicates with a REST API using `fetch()` and demonstrates full dynamic rendering.

---

## 🚀 Features

- 📸 **Dynamic Gallery** — Loads projects from an API
- 🔐 **Admin Login** — Simple form authentication
- ⬆️ **Upload Modal** — Custom modal to add new projects
- 🔄 **Delete Feature** — Remove projects dynamically
- 🧠 **Built with Vanilla JS** — No frameworks or libraries
- 🎨 **Based on Figma Mockups** — UI design consistency
- 🌐 **REST API Integration** — Real backend connectivity

---

## 📚 What I Learned

- Structuring and manipulating the DOM
- Handling user events and form validation
- Communicating with an API (GET, POST, DELETE)
- Building modals from scratch
- Managing project files and Git versioning
- Working with real-world dev tools

---

## 🛠️ Technologies

- HTML / CSS
- JavaScript (ES6+)
- REST API (using `fetch`)
- Visual Studio Code
- Figma (UI mockups)
- Git & GitHub

---

## 📦 Folder Structure

.
├── Backend/ # Given backend (API)
│ └── ... # API files and server code
├── docs/FrontEnd/ # All front-end source files
│ ├── assets/ # Media and images
│ ├── config.js # API configuration
│ ├── first-modal.js # First modal logic
│ ├── second-modal.js # Second modal logic
│ ├── index.html # Main portfolio page
│ ├── login.html # Admin login page
│ ├── login.js # Login logic
│ ├── script.js # DOM logic and gallery
│ ├── package.json # Project dependencies
│ ├── package-lock.json
│ └── node_modules/ # Dependencies installed via npm
├── .gitignore
├── README.md
└── SECURITY.md

## 🧪 Running the Project

### 1. Clone the Repo

```bash
git clone https://github.com/yourusername/Portfolio-architecte-sophie-blue.git
cd Portfolio-architecte-sophie-blue
2. Start the Back-End Server
bash
cd Backend
npm install
npm start
The server will run at http://localhost:5678.

3. Open the Front-End
You can open the docs/FrontEnd/index.html in your browser manually or use a local server like Live Server.

🧠 About "Refresh 25"
This update was made in July 2025 to:

Improve structure and readability

Clarify project goals and learning outcomes

Polish file layout and navigation
