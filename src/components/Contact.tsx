import { Section } from './Section';
import { motion } from 'motion/react';
import { Mail, ArrowUpRight, Github, Linkedin } from 'lucide-react';

export function Contact() {
  return (
    <Section id="contact" className="pb-40">
      <div className="glass rounded-[3rem] p-12 md:p-24 overflow-hidden relative">
        {/* Background glow */}
        <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-brand-accent/20 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="flex flex-col gap-8">
            <div className="flex items-center gap-4">
               <div className="w-12 h-[1px] bg-brand-accent" />
               <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary">Get in touch</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-display font-black tracking-tighter uppercase leading-[0.9]">
              Let's build <br /> something <span className="text-gradient">Clean</span>.
            </h2>
            <p className="text-lg text-brand-secondary max-w-md">
               Open to web design, graphic design, content, and development support.
               I can help turn ideas into clean, functional digital experiences.
            </p>

            <div className="flex flex-col gap-4 mt-8">
               <a href="mailto:ivanmathewbeltran@gmail.com" className="flex items-center gap-4 text-2xl font-display font-bold group">
                  <span className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-brand-primary group-hover:text-black transition-all">
                    <Mail size={20} />
                  </span>
                  ivanmathewbeltran@gmail.com
                  <ArrowUpRight className="opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-brand-accent" />
               </a>
            </div>
          </div>

          <div className="flex flex-col justify-end gap-12">
             <div className="grid grid-cols-2 gap-8">
                <div className="flex flex-col gap-4">
                   <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-secondary opacity-50">Socials</span>
                   <div className="flex flex-col gap-2">
                      <a href="https://www.linkedin.com/in/ivan-beltran-894124405/" className="text-sm hover:text-brand-accent transition-colors flex items-center gap-2">LinkedIn <Linkedin size={14} /></a>
                      <a href="https://github.com/beltsivan" className="text-sm hover:text-brand-accent transition-colors flex items-center gap-2">GitHub <Github size={14} /></a>
                   </div>
                </div>
                <div className="flex flex-col gap-4">
                   <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-secondary opacity-50">Focus</span>
                   <p className="text-sm font-mono tracking-wider">Design + Web Development</p>
                </div>
             </div>

             <motion.button
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={() => window.dispatchEvent(new CustomEvent('open-chat'))}
               className="w-full py-6 bg-brand-accent/10 rounded-2xl text-xl font-display font-black uppercase tracking-widest border-2 border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white transition-all duration-300"
             >
                Start a conversation
             </motion.button>
          </div>
        </div>
      </div>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="py-12 border-t border-brand-secondary/10 opacity-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-8">
        <span className="text-xs font-mono">Copyright 2026 Ivan Mathew Beltran. All rights reserved.</span>
        <div className="flex gap-8 text-[10px] uppercase font-bold tracking-widest">
           <a href="#about" className="hover:text-brand-accent transition-colors">Profile</a>
           <a href="#projects" className="hover:text-brand-accent transition-colors">Projects</a>
        </div>
      </div>
    </footer>
  );
}
