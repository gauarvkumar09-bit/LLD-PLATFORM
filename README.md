LLD Evaluator — AI-Powered Low-Level Design Practice Platform
A full-stack, production-grade platform for practicing Low-Level System Design (LLD). Candidates can solve real-world architectural design problems, write object-oriented schemas and code, and receive deterministic, rubric-based architectural evaluation powered by Google Gemini AI.

Key Features
Strict Rubric Evaluation: Evaluations return marks (0–100) and actionable critiques across 5 core dimensions:

Requirement Understanding

Class Responsibilities & Cohesion

SOLID Principles Adherence

Extensibility & Scalability

Edge Cases & Error Handling

Safe State Machine: Uses a 4-stage lifecycle (SUBMITTED → EVALUATING → COMPLETED / FAILED) to preserve candidate solutions if network drops or evaluation fails.

Cost & DDoS Protection: Rate-limited submission endpoints via express-rate-limit prevent duplicate attempts and API credit exhaustion.

Session Security: Stateless JWT authentication stored inside secure, HTTP-only, sameSite protected cookies.

Developer Experience: In-browser Monaco Editor with syntax highlighting, language selection, and attempt history review.

Architecture Overview
The system follows a strict 4-Tier Decoupled Architecture on both client and server:

Frontend
API / Infrastructure Layer (src/api/): Centralized Axios client handling credentials and network serialization.

Hook / Logic Layer (src/hooks/): Isolated React hooks managing asynchronous state, errors, and loading flags.

Context Layer (src/context/): Global session persistence and authentication context.

Presentation Layer (src/pages/, src/components/): Clean Tailwind CSS views driven entirely by custom hooks.

Backend
Routing & Rate Limiting (routes/, middlewares/): Input validation and endpoint throttles.

Controllers (controllers/): Request/response orchestration and submission lifecycle transitions.

AI Service Layer (services/): Gemini SDK integration enforcing schema constraints at runtime with Zod.

Data Persistence (models/): Mongoose schemas modeling candidate submissions, nested rubrics, and user profiles.

Tech Stack
Frontend: React, Vite, Tailwind CSS, Lucide React, Monaco Editor (@monaco-editor/react), React Router DOM

Backend: Node.js, Express.js, MongoDB, Mongoose

AI & Validation: @google/genai (Gemini Flash), Zod

Security & Auth: JSON Web Tokens (jsonwebtoken), bcryptjs, cookie-parser, express-rate-limit, cors

Getting Started
1. Prerequisites
Node.js (v18+)
MongoDB connection string (Local or MongoDB Atlas)

Google Gemini API Key


2. Backend Setup
Bash
cd backend
npm install
Create a .env file inside backend/:

Code snippet
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/lld-evaluator
JWT_SECRET=your_super_secret_jwt_key
GEMINI_API_KEY=your_google_gemini_api_key
CLIENT_URL=http://localhost:5173
Start the backend server:

Bash
npm run dev
3. Frontend Setup
Bash
cd frontend
npm install
Create a .env file inside frontend/:

Code snippet
VITE_API_BASE_URL=http://localhost:5000/api
Start the frontend application:

Bash
npm run dev



API Endpoints

Engineering Decisions & Trade-offs
Native Gemini Schema + Zod Runtime Validation: Gemini's native responseSchema forces structured JSON outputs, avoiding parsing hallucinations. Zod validates the shape on the Node.js layer before touching the database to catch corrupted outputs.

Pre-Save Before Evaluation: Solutions are saved with EVALUATING status before invoking the AI model. If the AI provider times out or experiences an outage, the candidate's work is never lost.

HTTP-Only Cookies over LocalStorage: Tokens are stored strictly in HTTP-only cookies to eliminate XSS token theft vulnerabilities.

















MongoDB connection string (Local or MongoDB Atlas)

Google Gemini API Key
