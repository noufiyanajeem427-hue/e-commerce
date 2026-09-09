.......
# Cartiva E-Commerce & Cartiva AI Assistant

![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue?style=for-the-badge&logo=mongodb)
![React](https://img.shields.io/badge/Frontend-React_18-61DAFB?style=for-the-badge&logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=node.js)
![Gemini AI](https://img.shields.io/badge/AI-Google_Gemini-4285F4?style=for-the-badge&logo=googlegemini)

Cartiva is a modern MERN-stack e-commerce application equipped with **Cartiva AI**—an interactive, context-aware shopping assistant powered by Google's Gemini AI SDK (`gemini-3.6-flash`).

---

## ✨ Features

- **Storefront Interface**: Clean shopping UI with product catalogs and category filters.
- **Cartiva AI Chatbot**:
  - Floating, slide-out chat widget using `lucide-react` icons.
  - Generates concise, context-aware product recommendations based on live MongoDB inventory.
  - Fallback catalog support when database items are unpopulated.
- **Robust Backend**: Node.js & Express REST API with MongoDB/Mongoose ORM.
- **Secure Environment**: Environment-variable isolation using `dotenv`.

---

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS, Lucide React
- **Backend**: Node.js, Express.js
- **Database**: MongoDB & Mongoose ODM
- **AI Engine**: `@google/generative-ai` (`gemini-3.6-flash`)

---

## 📁 Repository Structure

```text
Cartiva/
├── backend/
│   ├── models/
│   │   └── Product.js
│   ├── routes/
│   │   └── chatRoutes.js
│   ├── .env
│   ├── server.js
│   └── test-ai.js
└── client/
    ├── src/
    │   └── components/
    │       └── ChatWidget.jsx
    └── App.jsx
