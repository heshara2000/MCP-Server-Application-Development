# MCP-Server-Application-Development
Develop a Next.js-based application to read the resume
This project is an intelligent chatbot system built using **Next.js**, **OpenAI's GPT-4**, and **PDF resume parsing**. Users can interact with the chatbot, which first reads and understands the uploaded resume, then answers context-based questions about the candidate.

## 💡 Features
- PDF resume parser using `pdf-parse`
- Chat interface powered by OpenAI's GPT API
- API built with Next.js App Router
- Simple resume upload and chat trigger via `/api/chat`

## 🚀 Tech Stack
- Next.js 14 (App Router)
- Node.js / Express
- OpenAI API (`gpt-4o-mini`)
- `pdf-parse` for resume parsing
- Deployed on Vercel / Render





## 🔧 Local Setup

```bash
git clone https://github.com/heshara2000/MCP-Server-Application-Development.git
cd mcp-frontend
npm install
touch .env.local
# Add your OpenAI key to .env.local :
# OPENAI_API_KEY=your-key
npm run dev

✅ 2. Deployment Steps (Vercel)
Push your project to GitHub.

Go to https://vercel.com and log in.

Click "New Project", then import your GitHub repo.

Set environment variable:

OPENAI_API_KEY = your-api-key

Let it build and deploy.

Done! You’ll get a live link like: https://resume-chatbot.vercel.app
