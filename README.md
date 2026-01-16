# YellowAI Chatbot 🤖

A full-stack AI-powered chatbot application built as part of the **YellowAI assignment**.  
The system allows users to securely register, manage projects, and interact with an AI model through a modern web interface.

---

## 🌐 Live Application

**Frontend (Vercel)**  
https://yellowai-chatbot.vercel.app

**Backend API (Railway)**  
https://yellowai-chatbot-production.up.railway.app

> ⚠️ **Note:** Opening the backend URL directly in a browser may return **403 Forbidden**.  
> This is expected because the backend is a **secured REST API**, not a public web page.

---

## 🧠 System Architecture

User (Browser)
|
v
Frontend (React + Vite)
|
| REST API (JWT)
v
Backend (Spring Boot)
|
+-- MySQL Database
+-- Groq AI (LLM)

### Explanation
- Frontend handles UI and user interactions
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

### 🔐 Authentication
- User registration
- User login
- JWT-based authentication
- Protected API endpoints

### 📁 Project Management
- Create multiple projects
- Projects are user-specific
- Each project has isolated chat history

### 💬 Chat System
- User ↔ AI interaction
- Messages persisted in database
- AI responses generated via Groq API

---

## 🔗 API Endpoints

### Authentication
- `POST /auth/register`
- `POST /auth/login`

### Projects
- `GET /projects`
- `POST /projects`

### Chat
- `POST /chat` (JWT required)

---

## 🔐 Security

- Stateless JWT authentication
- Spring Security filter chain
- CORS restricted to frontend domain
- No secrets committed to GitHub
- Environment variables used in production

---

## ⚙️ Environment Variables

### Backend (Railway)

| Variable | Description |
|--------|------------|
| `SPRING_DATASOURCE_URL` | MySQL JDBC connection URL |
| `SPRING_DATASOURCE_USERNAME` | Database username |
| `SPRING_DATASOURCE_PASSWORD` | Database password |
| `JWT_SECRET` | Secret key for JWT signing |
| `GROQ_API_KEY` | API key for Groq LLM |

### Frontend (Vercel)

| Variable | Description |
|--------|------------|
| `VITE_API_BASE_URL` | Backend API base URL |

---

## 🧩 SPA Routing Note

This project uses **React Router**.  
A `vercel.json` rewrite configuration is applied so that all routes are served via `index.html`, preventing **404 errors on page refresh**.

---

## 📈 Non-Functional Requirements (NFR)

- Secure authentication
- Stateless backend
- Scalable architecture
- Environment-based configuration
- Production-ready deployment

---

## 💤 Deployment Notes

- Backend runs on **Railway free tier**
- Service may sleep when inactive
- First request after inactivity may take a few seconds

---

## 🔮 Future Enhancements

- Chat streaming
- Message pagination
- User profile management
- Project deletion
- Dark mode UI
- Rate limiting

---

## 📽 Demo Video

A short demo video covers:
- System architecture
- Authentication flow
- Project creation
- AI chat interaction
- Deployment overview

---

## 👨‍💻 Author

**Ganeswar Sahoo**  
Full Stack Developer (Java + React)
