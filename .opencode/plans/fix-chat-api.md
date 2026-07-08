# Fix Chat API — Local Dev with Express Server

## Problem
The Vite plugin handling `/api/chat` is failing silently. The user sees "Sorry, I couldn't reach the AI."

## Fix

### 1. Simplify `vite.config.ts` — Remove chat plugin, add proxy

Replace the `chatApiPlugin()` function with just a proxy. Keep the existing plugins:

```ts
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

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
          target: 'http://localhost:3001',
          changeOrigin: true,
        },
      },
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
```

### 2. Create `server/index.js` — Express server for local dev

Uses `@google/genai` SDK (already installed) for cleaner code. Loads `.env` with dotenv.

```javascript
import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());

const dataDir = path.resolve(__dirname, '..', 'dataa', 'data');

function loadPortfolioData() {
  const personalPath = path.join(dataDir, 'personal.md');
  const projectsDir = path.join(dataDir, 'projects');

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

let ai;
if (process.env.GEMINI_API_KEY) {
  ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    if (!ai) {
      return res.status(500).json({ error: 'Gemini API key not configured' });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [{ role: 'user', parts: [{ text: message }] }],
      config: {
        systemInstruction: SYSTEM_PROMPT,
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    const text = response.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';
    res.json({ response: text });
  } catch (err) {
    console.error('Chat API error:', err);
    res.status(500).json({ error: 'Failed to get response from AI' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
```

### 3. Add script to `package.json`

```json
"scripts": {
  "dev": "vite --port=3000 --host=0.0.0.0",
  "server": "node server/index.js",
  "build": "vite build",
  ...
}
```

### 4. Keep `api/chat.js` — unchanged (for Vercel deployment)

## How to run

**Terminal 1:** `npm run server` (Express on :3001)
**Terminal 2:** `npm run dev` (Vite on :3000, proxies /api to Express)

Open http://localhost:3000 → chat should work.
If it fails, the actual error will show in Terminal 1's logs.
