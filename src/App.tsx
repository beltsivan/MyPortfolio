/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects, AllProjects } from './components/Projects';
import { Contact, Footer } from './components/Contact';
import { useEffect, useState, useCallback } from 'react';


type Theme = 'dark' | 'light';
type Page = 'home' | 'projects';

export default function App() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === 'undefined') {
      return 'dark';
    }

    return (localStorage.getItem('theme') as Theme | null) ?? 'dark';
  });

  const [page, setPage] = useState<Page>('home');

  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((currentTheme) => currentTheme === 'dark' ? 'light' : 'dark');
  };

  const navigate = useCallback((p: Page) => {
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <main className="min-h-screen bg-background relative overflow-x-hidden transition-colors duration-300">
      <Navbar theme={theme} onToggleTheme={toggleTheme} onNavigate={navigate} currentPage={page} />
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

      {/* ── Chat Widget — Under Development ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {isChatOpen && (
          <div className="w-80 rounded-3xl glass border border-white/[0.08] shadow-2xl shadow-black/40 overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
            {/* Chat header */}
            <div className="px-5 py-4 border-b border-white/[0.06] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-brand-accent/20 flex items-center justify-center ring-1 ring-brand-accent/30">
                  <span className="text-xs font-black text-brand-accent">I</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-brand-primary">Ivan</p>
                  <p className="text-[10px] text-brand-secondary/60 uppercase tracking-wider">AI Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsChatOpen(false)}
                className="text-brand-secondary/40 hover:text-brand-primary transition-colors text-lg leading-none"
                aria-label="Close chat"
              >
                ✕
              </button>
            </div>
            {/* Chat body */}
            <div className="px-5 py-8 flex flex-col items-center gap-4 text-center">
              <div className="w-12 h-12 rounded-full bg-brand-accent/10 flex items-center justify-center ring-1 ring-brand-accent/20">
                <span className="text-xl">🚧</span>
              </div>
              <div>
                <p className="text-sm font-bold text-brand-primary mb-1">Under Development</p>
                <p className="text-xs text-brand-secondary leading-relaxed">
                  Ivan's AI assistant is coming soon. Check back later!
                </p>
              </div>
              <span className="px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest bg-brand-accent/10 text-brand-accent border border-brand-accent/20">
                Coming Soon
              </span>
            </div>
          </div>
        )}

        {/* Chat bubble trigger */}
        <button
          id="chat-trigger"
          onClick={() => setIsChatOpen(!isChatOpen)}
          aria-label={isChatOpen ? 'Close chat' : 'Open chat with Ivan'}
          className="group w-14 h-14 rounded-full bg-brand-accent flex items-center justify-center shadow-lg shadow-brand-accent/30 hover:shadow-brand-accent/50 hover:scale-110 transition-all duration-300"
        >
          {isChatOpen ? (
            <span className="text-white text-lg font-bold leading-none">✕</span>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
          )}
        </button>
      </div>
    </main>
  );
}
