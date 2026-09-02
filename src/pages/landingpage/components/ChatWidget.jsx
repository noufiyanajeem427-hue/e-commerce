import React, { useState } from 'react';
import { Bot, X, Send, Loader2 } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hello! I am Cartiva AI. How can I help you find products today?' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setLoading(true);

    try {
      // Changed to full backend URL
      const res = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { sender: 'bot', text: data.reply }]);
    } catch (err) {
      setMessages((prev) => [
        ...prev, 
        { sender: 'bot', text: 'Something went wrong. Please check your connection.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-5 rounded-full shadow-2xl flex items-center gap-2 text-sm transition transform hover:scale-105 cursor-pointer"
        >
          <Bot className="w-5 h-5" />
          <span>Ask AI</span>
        </button>
      )}

      {isOpen && (
        <div className="w-80 sm:w-96 h-[480px] bg-white rounded-3xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden">
          <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-xl">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-extrabold text-sm leading-none">Cartiva AI</h3>
                <span className="text-[10px] text-indigo-200">Online | Store Assistant</span>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg hover:bg-indigo-700 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50 text-xs">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`max-w-[85%] p-3 rounded-2xl leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-indigo-600 text-white ml-auto rounded-br-none shadow-xs'
                    : 'bg-white text-slate-800 border border-slate-200 mr-auto rounded-bl-none shadow-xs'
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs p-2">
                <Loader2 className="w-4 h-4 animate-spin text-indigo-600" />
                <span>Cartiva AI is thinking...</span>
              </div>
            )}
          </div>

          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about products, prices..."
              className="flex-1 bg-slate-100 text-slate-800 text-xs rounded-xl px-3 py-2.5 outline-none"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white p-2.5 rounded-xl transition cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}