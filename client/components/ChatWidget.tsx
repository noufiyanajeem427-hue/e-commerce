"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Sparkles,
  X,
  Send,
  Loader2,
  Bot,
  User,
  RotateCcw,
  ShoppingBag,
  Truck,
  HelpCircle,
  Tag,
  ChevronDown,
  MessageSquare,
} from "lucide-react";

interface Message {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
}

const QUICK_PROMPTS = [
  { label: "Track My Order", query: "How do I track my order?", icon: Truck },
  { label: "Deals & Discounts", query: "What discounts and promo codes are available?", icon: Tag },
  { label: "Return Policy", query: "What is your return and refund policy?", icon: HelpCircle },
  { label: "Top Products", query: "Recommend the best trending products on Cartiva", icon: ShoppingBag },
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "bot",
      text: "👋 Hi there! I'm Cartiva's AI Shopping Assistant. How can I help you find products, track orders, or answer questions today?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of messages
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setUnreadCount(0);
    }
  }, [messages, isOpen]);

  const handleSend = async (customText?: string) => {
    const textToSend = (customText || input).trim();
    if (!textToSend || loading) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      // First try Next.js internal API route, fallback to standalone backend port 5000 if needed
      const apiUrl = process.env.NEXT_PUBLIC_CHATBOT_API_URL || "/api/chat";

      let res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: textToSend }),
      });

      // If internal route fails or is unavailable, try standalone backend server
      if (!res.ok && apiUrl !== "http://localhost:5000/api/chat") {
        try {
          res = await fetch("http://localhost:5000/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: textToSend }),
          });
        } catch (e) {
          // ignore fallback error and handle below
        }
      }

      if (!res.ok) {
        throw new Error("Failed to get response");
      }

      const data = await res.json();
      const botReply = data.reply || "I am here to help! Could you please clarify your question?";

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: botReply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    } catch (err) {
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        sender: "bot",
        text: "I'm having a brief connection issue. Please verify that your internet or backend server is running.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: `welcome-${Date.now()}`,
        sender: "bot",
        text: "Conversation cleared! What else can I assist you with on Cartiva?",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Floating Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-5 py-3.5 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold text-sm rounded-full shadow-[0_10px_30px_rgba(245,158,11,0.4)] border border-amber-300/30 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          aria-label="Open Cartiva AI Shopping Assistant"
        >

          <span className="tracking-wide">Ask Cartiva AI</span>

          {unreadCount > 0 && (
            <span className="absolute -top-2 -left-2 bg-red-500 text-white text-[10px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center shadow-lg animate-bounce">
              {unreadCount}
            </span>
          )}
        </button>
      )}

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="w-[360px] sm:w-[420px] h-[580px] max-h-[calc(100vh-5rem)] bg-zinc-950/95 backdrop-blur-2xl rounded-3xl shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] border border-amber-500/20 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-zinc-900 via-zinc-900 to-zinc-800 p-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="relative p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
                <Bot className="w-5 h-5 text-amber-400" />
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-zinc-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-zinc-100">Cartiva AI</h3>
                  <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    Pro
                  </span>
                </div>
                <p className="text-[11px] text-zinc-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Instant Support & Recommendations
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleReset}
                title="Reset Conversation"
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close"
                className="p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-white/5 transition cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 bg-zinc-950/70 text-xs scroll-smooth">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 items-end ${m.sender === "user" ? "flex-row-reverse" : "flex-row"
                  }`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-xs ${m.sender === "user"
                    ? "bg-amber-500 text-zinc-950 font-bold"
                    : "bg-zinc-800 text-amber-400 border border-amber-500/20"
                    }`}
                >
                  {m.sender === "user" ? <User className="w-3.5 h-3.5" /> : <Sparkles className="w-3.5 h-3.5" />}
                </div>

                {/* Message Bubble */}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 leading-relaxed break-words shadow-sm ${m.sender === "user"
                    ? "bg-amber-500 text-zinc-950 font-medium rounded-br-xs"
                    : "bg-zinc-900/90 text-zinc-200 border border-zinc-800 rounded-bl-xs"
                    }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  <span
                    className={`block text-[9px] mt-1 text-right ${m.sender === "user" ? "text-zinc-800" : "text-zinc-500"
                      }`}
                  >
                    {m.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex gap-2.5 items-end">
                <div className="w-7 h-7 rounded-xl flex items-center justify-center bg-zinc-800 text-amber-400 border border-amber-500/20">
                  <Bot className="w-3.5 h-3.5 animate-spin" />
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl rounded-bl-xs px-4 py-3 flex items-center gap-2 text-zinc-400 text-xs">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-amber-400" />
                  <span>Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions Chips */}
          <div className="px-3 py-2 bg-zinc-900/40 border-t border-white/5 flex gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <button
                  key={idx}
                  onClick={() => handleSend(item.query)}
                  disabled={loading}
                  className="shrink-0 flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900/80 hover:bg-amber-500/10 hover:border-amber-500/40 text-zinc-300 hover:text-amber-300 border border-zinc-800 rounded-lg text-[11px] transition-all cursor-pointer disabled:opacity-50"
                >
                  <Icon className="w-3 h-3 text-amber-400" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-zinc-900 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about products, orders, deals..."
              className="flex-1 bg-zinc-950 text-zinc-100 placeholder-zinc-500 text-xs rounded-xl px-3.5 py-3 outline-none border border-zinc-800 focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/40 transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-zinc-950 font-bold rounded-xl transition disabled:opacity-40 disabled:cursor-not-allowed shadow-md cursor-pointer shrink-0"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
export default ChatWidget;
