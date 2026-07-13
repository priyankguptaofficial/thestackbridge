// components/chatbot-widget.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  from: "bot" | "user";
  text: string;
}

const GREETING = "Hi there! How can we assist you today?";

function getBotReply(userText: string): { text: string; action?: "ticket" | "consult" | "pricing" } {
  const t = userText.toLowerCase();
  if (t.includes("ticket") || t.includes("support") || t.includes("issue") || t.includes("problem")) {
    return { text: "Got it \u2014 opening our support ticket form for you now.", action: "ticket" };
  }
  if (t.includes("consult") || t.includes("book") || t.includes("call")) {
    return { text: "Sure thing \u2014 let's get a consultation booked.", action: "consult" };
  }
  if (t.includes("price") || t.includes("pricing") || t.includes("cost") || t.includes("plan")) {
    return { text: "Here's our current pricing.", action: "pricing" };
  }
  return {
    text:
      "Thanks for the message! For anything urgent, tap \u201cTalk to Support\u201d below, " +
      "or call/text us directly. Our hours are Mon\u2013Fri, 9am\u20136pm PST.",
  };
}

export default function ChatbotWidget() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([{ from: "bot", text: GREETING }]);
  const [input, setInput] = useState("");

  function go(action: "ticket" | "consult" | "pricing") {
    if (action === "ticket") router.push("/contact?tab=ticket");
    if (action === "consult") router.push("/contact?tab=general");
    if (action === "pricing") router.push("/pricing");
  }

  function handleQuickTopic(label: string, action: "ticket" | "consult" | "pricing") {
    setMessages((m) => [...m, { from: "user", text: label }]);
    const reply = getBotReply(label);
    setMessages((m) => [...m, { from: "bot", text: reply.text }]);
    setTimeout(() => go(action), 400);
  }

  function handleSend() {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((m) => [...m, { from: "user", text: userMsg }]);
    setInput("");
    const reply = getBotReply(userMsg);
    setTimeout(() => {
      setMessages((m) => [...m, { from: "bot", text: reply.text }]);
      if (reply.action) setTimeout(() => go(reply.action!), 500);
    }, 300);
  }

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {open && (
        <div
          className="mb-3 w-80 max-w-[85vw] rounded-xl border border-hairline bg-surface shadow-xl flex flex-col overflow-hidden"
          style={{ height: 420 }}
        >
          <div className="px-4 py-3 border-b border-hairline bg-white/[0.03]">
            <p className="text-sm font-semibold text-ink">TheStackBridge Assistant</p>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`text-sm rounded-lg px-3 py-2 max-w-[85%] ${
                  m.from === "bot" ? "bg-white/5 text-ink/80" : "bg-accent text-background ml-auto"
                }`}
              >
                {m.text}
              </div>
            ))}
          </div>

          <div className="px-4 pb-2 flex flex-wrap gap-2">
            <button onClick={() => handleQuickTopic("Talk to Support", "ticket")} className="text-xs rounded-full border border-white/20 px-3 py-1 text-ink/80 hover:border-accent/50">
              Talk to Support
            </button>
            <button onClick={() => handleQuickTopic("Book Consultation", "consult")} className="text-xs rounded-full border border-white/20 px-3 py-1 text-ink/80 hover:border-accent/50">
              Book Consultation
            </button>
            <button onClick={() => handleQuickTopic("View Pricing", "pricing")} className="text-xs rounded-full border border-white/20 px-3 py-1 text-ink/80 hover:border-accent/50">
              View Pricing
            </button>
          </div>

          <div className="px-3 pb-3 flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type a message\u2026"
              className="flex-1 rounded-lg bg-white/5 border border-hairline px-3 py-2 text-sm text-ink"
            />
            <button onClick={handleSend} aria-label="Send" className="rounded-lg bg-accent text-background px-3">
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open chat assistant"
        className="h-14 w-14 rounded-full bg-white/10 border border-white/20 text-ink flex items-center justify-center shadow-lg hover:bg-white/20 transition"
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>
    </div>
  );
}
