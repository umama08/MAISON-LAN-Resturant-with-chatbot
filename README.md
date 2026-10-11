<div align="center">

<img src="public/favicon.svg" width="80" alt="Maison Élan Logo" />

# 🍽️ Maison Élan

### *A Taste of Paris, Made for You.*

A modern French-European bistro website with a built-in **AI Concierge Chatbot** powered by Retrieval-Augmented Generation (RAG) and the Groq API.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vite.dev)
[![Groq](https://img.shields.io/badge/Groq-AI-F55036?style=for-the-badge&logo=groq&logoColor=white)](https://groq.com)
[![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)

</div>

---

## ✨ Overview

**Maison Élan** is a fully-featured restaurant web application for a fictional French-European bistro in Karachi, Pakistan. It combines an elegant, premium UI with an intelligent AI chatbot that answers guest questions about the menu, hours, deals, and reservations — all sourced from the restaurant's own knowledge base using RAG.

---

## 🖼️ Features

| Feature | Description |
|---|---|
| 🤖 **AI Concierge Chatbot** | RAG-powered chatbot using Groq API (GPT-OSS / Qwen fallback) |
| 🍷 **Full Menu Page** | Filterable menu with categories, prices, and descriptions |
| 🛒 **Shopping Cart** | Add items to cart with live total calculation |
| 📅 **Table Reservations** | Reservation form with date, time, and guest selection |
| 🖼️ **Gallery Section** | Curated photo gallery of the restaurant ambiance |
| 💬 **Testimonials** | Guest review carousel |
| 📍 **About & Contact** | Restaurant story, location, and contact details |
| 📱 **Fully Responsive** | Optimized for mobile, tablet, and desktop |

---

## 🤖 AI Chatbot — How It Works

The chatbot uses a custom **RAG (Retrieval-Augmented Generation)** pipeline:

```
User Question
      │
      ▼
┌─────────────────┐
│   Retriever.js  │  ← Searches chatbot/material/data.txt
│  (TF-IDF + BM25)│    for relevant restaurant context
└────────┬────────┘
         │ Top-k context chunks
         ▼
┌─────────────────┐
│  ragService.js  │  ← Builds prompt with scoped system rules
│   Groq API      │    + retrieved context + chat history
└────────┬────────┘
         │ AI response
         ▼
┌─────────────────┐
│   Chatbot.jsx   │  ← Renders formatted reply in the UI
└─────────────────┘
```

**The chatbot is strictly scoped to Maison Élan:**
- ✅ Answers only restaurant-related questions
- ✅ Never hallucinates menu items or prices
- ✅ Deflects off-topic questions politely
- ✅ Resistant to prompt injection attacks

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 |
| **Build Tool** | Vite 8 |
| **Styling** | Vanilla CSS with CSS custom properties |
| **Icons** | Lucide React |
| **AI / LLM** | Groq API — `openai/gpt-oss-20b` (primary), `qwen/qwen3.6-27b` (fallback) |
| **RAG Engine** | Custom TF-IDF retriever (`retriever.js`) |
| **Linting** | Oxlint |

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- A free [Groq API key](https://console.groq.com/)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/umama08/MAISON-LAN-Resturant-with-chatbot.git
cd MAISON-LAN-Resturant-with-chatbot

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

Open `.env` and add your Groq API key:

```env
VITE_GROQ_API_KEY=your_groq_api_key_here
```

```bash
# 4. Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. 🎉

---

## 📁 Project Structure

```
MAISON-LAN-Resturant-with-chatbot/
│
├── chatbot/
│   ├── material/
│   │   └── data.txt          # Restaurant knowledge base (menu, hours, policies)
│   └── rag/
│       ├── ragService.js     # Groq API integration + system prompt
│       └── retriever.js      # Custom TF-IDF retrieval engine
│
├── src/
│   ├── components/
│   │   ├── Chatbot.jsx       # AI chatbot UI + message formatter
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── Cart.jsx
│   │   ├── ReservationForm.jsx
│   │   └── ...               # Other UI components
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Menu.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── data/
│   │   └── menuData.js       # Menu items and categories
│   └── index.css             # Global styles and CSS design tokens
│
├── .env.example              # Environment variable template
├── .gitignore
├── index.html
├── package.json
└── vite.config.js
```

---

## 🔑 Environment Variables

| Variable | Description | Required |
|---|---|---|
| `VITE_GROQ_API_KEY` | Your Groq API key from [console.groq.com](https://console.groq.com) | ✅ Yes |

> ⚠️ **Never commit your `.env` file.** It is already excluded by `.gitignore`.

---

## 📜 Available Scripts

```bash
npm run dev      # Start development server with hot reload
npm run build    # Build for production
npm run preview  # Preview the production build locally
npm run lint     # Run Oxlint for code quality checks
```

---

## 🎨 Design System

The UI uses a cohesive token-based design system defined in `src/index.css`:

- **Primary:** Burgundy `#6B1D2F` — elegance and warmth
- **Accent:** Gold `#C5A059` — luxury and refinement
- **Background:** Ivory `#FAF7F2` — clean, airy feel
- **Typography:** Playfair Display (serif headings) + Inter (body)
- **Effects:** Glassmorphism cards, smooth micro-animations, hover transitions

---

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

1. Fork the project
2. Create your feature branch: `git checkout -b feature/your-feature`
3. Commit your changes: `git commit -m "Add your feature"`
4. Push to the branch: `git push origin feature/your-feature`
5. Open a Pull Request

---

## 👩‍💻 Author

**Umama** — [@umama08](https://github.com/umama08)

---

<div align="center">

*Built with ❤️ and a love for French cuisine.*

⭐ **Star this repo if you found it useful!** ⭐

</div>
