import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { qaData } from '../data/chatbot-data';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: "Hi! Ask me anything about Ivan's portfolio, skills, or projects." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = () => setIsOpen(true);
    window.addEventListener('open-chat', handler);
    return () => window.removeEventListener('open-chat', handler);
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    await new Promise(r => setTimeout(r, 400));

    const words = userMsg.toLowerCase().split(/\s+/);
    let bestScore = 0;
    let bestAnswer = "I can only answer based on the portfolio data. Try asking about my projects, skills, design work, or contact info. You can also reach me directly at ivanmathewbeltran@email.com.";

    for (const item of qaData) {
      const score = item.keywords.filter(kw => words.some(w => w.includes(kw) || kw.includes(w))).length;
      if (score > bestScore) {
        bestScore = score;
        bestAnswer = item.answer;
      }
    }

    setMessages(prev => [...prev, { role: 'assistant', text: bestAnswer }]);
    setLoading(false);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-3.5 rounded-full glass text-brand-accent shadow-lg shadow-brand-accent/20 hover:shadow-brand-accent/40 transition-all duration-300 hover:scale-105"
        aria-label="Toggle chat"
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[500px] max-h-[70vh] glass border border-white/[0.06] rounded-2xl shadow-2xl shadow-black/30 flex flex-col overflow-hidden"
          >
            <div className="p-4 border-b border-white/[0.06] flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center">
                <MessageCircle size={16} className="text-brand-accent" />
              </div>
              <div>
                <p className="text-sm font-bold">Ivan Beltran</p>
                <p className="text-[10px] text-brand-secondary">Always Ready</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-brand-accent text-white rounded-br-md'
                      : 'bg-white/[0.06] text-brand-primary rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2.5 rounded-2xl text-sm bg-white/[0.06] rounded-bl-md flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" />
                    Thinking...
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <div className="p-4 border-t border-white/[0.06]">
              <div className="flex gap-2">
                <input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage()}
                  placeholder="Type a message..."
                  className="flex-1 bg-white/[0.06] rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-1 focus:ring-brand-accent/50 transition-all placeholder:text-brand-secondary/50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="p-2.5 rounded-xl bg-brand-accent text-white disabled:opacity-40 transition-opacity hover:bg-brand-accent/90"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
