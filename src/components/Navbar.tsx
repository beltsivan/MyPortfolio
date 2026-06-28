import { motion } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '../lib/utils';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

type NavbarProps = {
  theme: 'dark' | 'light';
  onToggleTheme: () => void;
  onNavigate: (page: 'home' | 'projects') => void;
  currentPage: 'home' | 'projects';
};

export function Navbar({ theme, onToggleTheme, onNavigate, currentPage }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isDark = theme === 'dark';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4',
        isScrolled ? 'py-4' : 'py-8'
      )}
    >
      <div className={cn(
        'max-w-7xl mx-auto flex items-center justify-between px-6 py-3 rounded-full transition-all duration-300',
        isScrolled ? 'glass' : 'bg-transparent'
      )}>
        <motion.a 
          href="#" 
          className="text-xl font-display font-bold tracking-tighter"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          IVAN<span className="text-brand-accent">.</span>
        </motion.a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.name}
              onClick={() => {
                if (link.name === 'Projects') {
                  onNavigate('projects');
                } else {
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }
              }}
              className="text-sm font-medium text-brand-secondary hover:text-brand-primary transition-colors"
            >
              {link.name}
            </button>
          ))}
          <button
            onClick={() => {
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
            className="px-5 py-2 bg-brand-primary text-background rounded-full text-sm font-bold"
          >
            Let's Talk
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            className="h-10 w-10 rounded-full border border-brand-secondary/10 bg-brand-primary/5 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-background transition-colors"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-3 md:hidden">
          <button
            type="button"
            onClick={onToggleTheme}
            className="h-10 w-10 rounded-full border border-brand-secondary/10 bg-brand-primary/5 flex items-center justify-center text-brand-primary"
            aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            className="text-brand-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-24 left-6 right-6 glass rounded-2xl p-8 flex flex-col items-center gap-6 md:hidden"
        >
          {navLinks.map((link) => (
            <button
              key={link.name}
              className="text-lg font-medium"
              onClick={() => {
                setIsMobileMenuOpen(false);
                if (link.name === 'Projects') {
                  onNavigate('projects');
                } else {
                  onNavigate('home');
                  setTimeout(() => {
                    document.getElementById(link.href.slice(1))?.scrollIntoView({ behavior: 'smooth' });
                  }, 50);
                }
              }}
            >
              {link.name}
            </button>
          ))}
          <button
            className="w-full text-center py-3 bg-brand-primary text-background rounded-xl font-bold"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onNavigate('home');
              setTimeout(() => {
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
          >
            Let's Talk
          </button>
        </motion.div>
      )}
    </motion.nav>
  );
}
