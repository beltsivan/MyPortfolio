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
import '@n8n/chat/style.css';
import { createChat } from '@n8n/chat';

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

  useEffect(() => {
    createChat({
      webhookUrl: 'https://ivantranix.onrender.com/webhook/61ed4284-23fd-482f-b4ca-2a9e11156db1/chat'
    });
  }, []);

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
    </main>
  );
}
