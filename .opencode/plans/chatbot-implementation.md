# Chatbot Implementation Plan (Vercel Serverless)

## Overview
Add a floating Gemini AI-powered chatbot — works locally and deploys seamlessly on Vercel.

## How It Works on Vercel
- Vercel auto-detects the `api/` directory and runs those files as serverless functions
- No separate server needed — everything deploys together with `npm run build`
- Set `GEMINI_API_KEY` in Vercel dashboard → Environment Variables
- For local dev: `vercel dev` or set `GEMINI_API_KEY` in `.env` and use Vite proxy

---

## Files to Create

### 1. `api/chat.js` — Vercel Serverless Function
- Loads portfolio data from `dataa/data/` at build time
- Uses raw `fetch` to call Gemini REST API (lighter than SDK for serverless)
- Exports a Vercel-compatible handler

```javascript
import fs from 'fs';
import path from 'path';

const dataDir = path.resolve(process.cwd(), 'dataa', 'data');
const personalPath = path.join(dataDir, 'personal.md');
const projectsDir = path.join(dataDir, 'projects');

function loadPortfolioData() {
  let personalContent = '';
  if (fs.existsSync(personalPath)) {
    personalContent = fs.readFileSync(personalPath, 'utf-8');
  }

  const projectFiles = fs.readdirSync(projectsDir).filter(f => f.endsWith('.md'));
  const projectsContent = projectFiles.map(f => {
    const content = fs.readFileSync(path.join(projectsDir, f), 'utf-8');
    return `--- Project: ${f.replace('.md', '')} ---\n${content}`;
  }).join('\n\n');

  return { personalContent, projectsContent };
}

const { personalContent, projectsContent } = loadPortfolioData();

const SYSTEM_PROMPT = `You are a helpful portfolio assistant for Ivan Mathew Beltran. Answer questions about his skills, projects, experience, and contact information based on the data provided below. Be friendly, concise, and professional.

## Personal Info
${personalContent}

## Projects
${projectsContent}

If asked about something not covered in the data, politely say you can only answer based on his portfolio information. Keep responses brief and natural.`;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
          contents: [{ parts: [{ text: message }] }],
          generationConfig: {
            maxOutputTokens: 500,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
    res.json({ response: text });
  } catch (err) {
    console.error('Gemini API error:', err);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
}
```

### 2. `src/components/ChatBot.tsx`
Floating chat UI (unchanged from original plan):
- Fixed `MessageCircle` button at bottom-right
- Click opens a chat panel with glass-morphism styling
- Message history, text input, send button, loading state

```tsx
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  text: string;
}

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', text: 'Hi! Ask me anything about Ivan\'s portfolio, skills, or projects.' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'assistant', text: data.response }]);
    } catch {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I couldn\'t reach the AI. Please try again later.' }]);
    } finally {
      setLoading(false);
    }
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
                <p className="text-sm font-bold">Portfolio Assistant</p>
                <p className="text-[10px] text-brand-secondary">Ask me anything!</p>
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
```

---

## Files to Modify

### 3. `src/App.tsx`
Add import and render `<ChatBot />`:
```tsx
import { ChatBot } from './components/ChatBot';
// ...
return (
  <main>
    <Navbar />
    {page === 'home' ? (
      <>
        <Hero />
        <About />
        <Projects onViewAll={() => navigate('projects')} />
        <Contact />
        <Footer />
      </>
    ) : (
      <AllProjects />
    )}
    <ChatBot />
  </main>
);
```

### 4. `.env` (local dev only)
```
GEMINI_API_KEY=your_gemini_api_key_here
```

### 5. `vite.config.ts` — Add proxy for local dev
```ts
export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
```

---

## How to Deploy on Vercel

1. Get a Gemini API key: https://aistudio.google.com/apikey (free tier)
2. Push to GitHub
3. Import repo on Vercel
4. In Vercel dashboard → Project Settings → Environment Variables → Add:
   - `GEMINI_API_KEY` = your key
5. Deploy — Vercel automatically:
   - Builds the Vite frontend
   - Deploys `api/chat.js` as a serverless function
   - Routes `/api/*` requests to the function
   - The chatbot just works 🎉

### Local Development
```
npm run dev     # Vite on :3000, /api proxied to Vite's dev server
```
Or use `vercel dev` for full serverless emulation.

## How Responses Work
- `api/chat.js` reads `personal.md` + all project `.md` files at cold-start
- The portfolio data is injected into Gemini's `system_instruction`
- User types → `fetch('/api/chat')` → Vercel runs serverless function → Gemini API → response back
- Gemini answers naturally about projects, skills, contact info, design work
