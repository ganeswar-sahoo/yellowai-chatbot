# YellowAI Chatbot 🤖

A full-stack AI-powered chatbot application built as part of the YellowAI assignment.  
The system allows users to securely register, create projects, and interact with an AI model through a clean web interface.

---

## 🌐 Live Application

**Frontend (Vercel):**  
https://yellowai-chatbot.vercel.app

**Backend API (Railway):**  
https://yellowai-chatbot-production.up.railway.app  

> ⚠️ Note: Opening the backend URL directly in a browser may return `403`.  
> This is expected because the backend is a secured API, not a web page.

---

## 🧠 System Architecture

# YellowAI Chatbot 🤖

A full-stack AI-powered chatbot application built as part of the YellowAI assignment.  
The system allows users to securely register, create projects, and interact with an AI model through a clean web interface.

---

## 🌐 Live Application

**Frontend (Vercel):**  
https://yellowai-chatbot.vercel.app

**Backend API (Railway):**  
https://yellowai-chatbot-production.up.railway.app  

> ⚠️ Note: Opening the backend URL directly in a browser may return `403`.  
> This is expected because the backend is a secured API, not a web page.

---

## 🧠 System Architecture
User (Browser)
│
▼
Frontend (React + Vite)
│ REST API (JWT)
▼
Backend (Spring Boot)
│
├── MySQL Database
└── Groq AI (Free LLM)

### Explanation
- Frontend handles UI and user interaction
- Backend exposes REST APIs and enforces security
- JWT tokens protect user data
- MySQL stores users, projects, and chat messages
- Groq API generates AI responses

---

## 🛠 Technology Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Deployment: **Vercel**

### Backend
- Java 17
- Spring Boot
- Spring Security
- JWT Authentication
- Hibernate / JPA
- MySQL
- Deployment: **Railway**

### AI
- Groq API (Free Large Language Model)

---

## ✨ Key Features

### Authentication
- User Registration
- User Login
- JWT-based authentication
- Protected API endpoints

### Project Management
- Create multiple projects
- Projects are user-specific
- Each project has isolated chat history

### Chat System
- User ↔ AI interaction
- Messages stored in database
- AI responses via Groq API

---

## 🔐 Security

- Stateless JWT authentication
- CORS restricted to frontend domain
- No secrets committed to GitHub
- Environment variables used in production

---

## ⚙️ Environment Variables

### Backend (Railway)

### Explanation
- Frontend handles UI and user interaction
- Backend exposes REST APIs and enforces security
- JWT tokens protect user data
- MySQL stores users, projects, and chat messages
- Groq API generates AI responses

---

## 🛠 Technology Stack

### Frontend
- React
- Vite
- JavaScript
- CSS
- Deployment: **Vercel**

### Backend
- Java 17
- Spring Boot
- Spring Security
- JWT Authentication
- Hibernate / JPA
- MySQL
- Deployment: **Railway**

### AI
- Groq API (Free Large Language Model)

---

## ✨ Key Features

### Authentication
- User Registration
- User Login
- JWT-based authentication
- Protected API endpoints

### Project Management
- Create multiple projects
- Projects are user-specific
- Each project has isolated chat history

### Chat System
- User ↔ AI interaction
- Messages stored in database
- AI responses via Groq API

---

## 🔐 Security

- Stateless JWT authentication
- CORS restricted to frontend domain
- No secrets committed to GitHub
- Environment variables used in production

---

## ⚙️ Environment Variables

### Backend (Railway)
SPRING_DATASOURCE_URL
SPRING_DATASOURCE_USERNAME
SPRING_DATASOURCE_PASSWORD
JWT_SECRET
GROQ_API_KEY

### Frontend (Vercel)
VITE_API_BASE_URL

📈 Non-Functional Requirements (NFR)
Secure authentication  
Stateless backend  
Scalable architecture  
Environment-based configuration  
Production-ready deployment

💤 Deployment Notes
Backend runs on Railway free tier  
Service may sleep when inactive  
First request after inactivity may take a few seconds

🔮 Future Enhancements
Chat streaming
Message pagination
User profile management
Project deletion
Dark mode UI
Rate limiting

📽 Demo Video
A short demo video explains:
Architecture
Authentication flow
Project creation
AI chat
Deployment overview

👨‍💻 Author
Ganeswar Sahoo
Full Stack Developer (Java + React)