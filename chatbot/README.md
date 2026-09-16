# 🤖 Cartiva AI Shopping Assistant (Chatbot Module)

આ ફોલ્ડરમાં Chatbot માટેની તમામ **Frontend (UI)** અને **Backend (API + AI Integration)** ફાઈલો અલગ કરીને વ્યવસ્થિત રાખવામાં આવી છે.

---

## 📁 Folder Structure

```text
chatbot/
├── frontend/
│   └── ChatWidget.jsx        # React UI Component (Tailwind CSS + Lucide Icons)
├── backend/
│   ├── routes/
│   │   └── chatRoutes.js     # Express API Route (/api/chat) with Gemini AI & MongoDB search
│   ├── server.js             # Standalone Express Server
│   ├── test-ai.js            # Gemini API Key & Model Test Script
│   ├── package.json          # Node dependencies for Chatbot
│   └── .env.example          # Environment variables template
└── README.md                 # Documentation & Setup Guide
```

---

## 🚀 How to Run & Use (કેવી રીતે ચલાવવું)

### 1. Backend Setup

1. Terminal માં `chatbot/backend` ફોલ્ડરમાં જાઓ:
   ```bash
   cd chatbot/backend
   ```

2. Dependencies install કરો:
   ```bash
   npm install
   ```

3. `.env` ફાઈલ બનાવો (`.env.example` માંથી કોપી કરો) અને તમારી **Google Gemini API Key** ઉમેરો:
   ```env
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/ecommerce
   GEMINI_API_KEY=AIzaSy...
   ```

4. Gemini API ટેસ્ટ કરવા માટે:
   ```bash
   npm run test-ai
   ```

5. Chatbot Server શરૂ કરવા માટે:
   ```bash
   npm start
   # અથવા ડેવલપમેન્ટ મોડ માટે:
   npm run dev
   ```

---

### 2. Frontend Integration (React)

તમારા કોઈપણ React પ્રોજેક્ટમાં Chatbot વાપરવા માટે:

1. ખાતરી કરો કે `lucide-react` અને `tailwindcss` ઇન્સ્ટોલ કરેલા છે:
   ```bash
   npm install lucide-react
   ```

2. `chatbot/frontend/ChatWidget.jsx` ને તમારા પ્રોજેક્ટના components ફોલ્ડરમાં import કરીને વાપરો:
   ```jsx
   import ChatWidget from './components/ChatWidget';

   function App() {
     return (
       <div>
         {/* Your other components */}
         <ChatWidget apiEndpoint="http://localhost:5000/api/chat" />
       </div>
     );
   }

   export default App;
   ```

---

## ⚙️ Features
- **Context-Aware Recommendations**: MongoDB ડેટાબેઝમાંથી પ્રોડક્ટ્સ, કેટેગરીઝ અને કૂપન કોડ્સ શોધીને યુઝરને સચોટ જવાબ આપે છે.
- **Google Gemini AI Powered**: ઝડપી અને સ્માર્ટ પ્રતિસાદ.
- **Floating Interactive Widget**: સુંદર અને મોર્ડન UI જે કોઈપણ પેજ પર સરળતાથી દેખાઈ શકે.
