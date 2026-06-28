import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Section } from './Section';
import { ExternalLink, Github, Smartphone } from 'lucide-react';
import { cn } from '../lib/utils';

interface MobileApp {
  title: string;
  category: string;
  gradient: string;
  description: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  screenContent?: {
    headline: string;
    features: string[];
  };
}

const mobileApps: MobileApp[] = [
  {
    title: 'McDelivery PH',
    category: 'Native Android',
    gradient: 'from-orange-500/40 via-amber-600/20 to-red-700/30',
    description: 'A native Android application built in Kotlin that mirrors the McDelivery mobile experience with menu browsing, cart management, order placement, and real-time order status tracking.',
    tags: ['Kotlin', 'Android Studio', 'Firebase', 'Firestore', 'Material Design'],
    liveUrl: '',
    repoUrl: '',
    screenContent: {
      headline: 'Order & Track',
      features: ['Browse Menu', 'Cart Management', 'Real-time Tracking', 'Order History'],
    },
  },
];

function PhoneFrame({ app, idx }: { app: MobileApp; idx: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: idx * 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center group cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      {/* Phone Mockup */}
      <div
        className={cn(
          "relative w-[280px] h-[580px] rounded-[44px] border-[3px]",
          "border-zinc-700/50 dark:border-zinc-700/50",
          "bg-gradient-to-b from-zinc-800 to-zinc-900 p-3",
          "shadow-2xl shadow-black/40 transition-shadow duration-500",
          "hover:shadow-brand-accent/10"
        )}
      >
        {/* Side buttons */}
        <div className="absolute -left-[3px] top-[100px] w-[3px] h-[40px] bg-zinc-700/50 rounded-r-full" />
        <div className="absolute -left-[3px] top-[150px] w-[3px] h-[50px] bg-zinc-700/50 rounded-r-full" />
        <div className="absolute -right-[3px] top-[120px] w-[3px] h-[60px] bg-zinc-700/50 rounded-l-full" />

        {/* Notch area */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[110px] h-[26px] z-20">
          <div className="w-full h-full bg-zinc-900 rounded-b-[14px] flex items-center justify-center gap-2">
            <div className="w-[8px] h-[8px] rounded-full bg-zinc-800 border border-zinc-700" />
            <div className="w-[40px] h-[4px] bg-zinc-800 rounded-full" />
          </div>
        </div>

        {/* Screen */}
        <div className="relative w-full h-full rounded-[36px] overflow-hidden bg-zinc-950">
          <AnimatePresence mode="wait">
            {!isFlipped ? (
              <motion.div
                key="front"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className={cn(
                  "absolute inset-0 bg-gradient-to-br",
                  app.gradient
                )}
              >
                {/* Decorative circles */}
                <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-white/[0.06]" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-white/[0.04]" />

                {/* Status bar */}
                <div className="relative z-10 pt-[32px] px-6 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-white/70">9:41</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-3.5 h-2 border-[1.5px] border-white/60 rounded-[2px] relative">
                      <div className="absolute inset-[1.5px] right-[1.5px] bg-white/60 rounded-[1px]" />
                    </div>
                    <span className="text-[9px] font-bold text-white/70">
                      {'\u25C9'}
                    </span>
                  </div>
                </div>

                {/* Screen content */}
                <div className="relative z-10 px-6 pt-16 flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center mb-5 ring-1 ring-white/10">
                    <Smartphone size={28} className="text-white/80" />
                  </div>
                  <h3 className="text-xl font-bold font-display text-white mb-2">
                    {app.screenContent?.headline || app.title}
                  </h3>
                  <div className="flex flex-col gap-1.5 mt-4 w-full">
                    {app.screenContent?.features.map((feature) => (
                      <div
                        key={feature}
                        className="flex items-center gap-2.5 px-3 py-2 bg-white/[0.06] rounded-lg backdrop-blur-sm"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-accent/60" />
                        <span className="text-[11px] font-medium text-white/70">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="back"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="absolute inset-0 bg-zinc-900 p-6 flex flex-col justify-center"
              >
                <p className="text-white/70 text-xs leading-relaxed mb-4 line-clamp-6">
                  {app.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {app.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 bg-white/[0.06] rounded-full text-[8px] uppercase font-bold tracking-wider text-white/60"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-center gap-4 mt-6">
                  {app.repoUrl ? (
                    <a
                      href={app.repoUrl}
                      className="p-2.5 bg-white/5 rounded-full hover:bg-white/20 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Github size={16} className="text-white/70" />
                    </a>
                  ) : null}
                  {app.liveUrl ? (
                    <a
                      href={app.liveUrl}
                      className="p-2.5 bg-white/5 rounded-full hover:bg-white/20 transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink size={16} className="text-white/70" />
                    </a>
                  ) : null}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-[8px] left-1/2 -translate-x-1/2 w-[120px] h-[4px] bg-zinc-700 rounded-full" />
      </div>

      {/* Label below phone */}
      <div className="mt-6 text-center">
        <motion.span
          className="text-[10px] font-bold uppercase tracking-widest text-brand-accent"
          whileHover={{ letterSpacing: '0.15em' }}
        >
          {app.category}
        </motion.span>
        <p className="text-xs text-brand-secondary mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Tap to {isFlipped ? 'show preview' : 'view details'}
        </p>
      </div>
    </motion.div>
  );
}

export function MobileApps() {
  return (
    <Section id="mobile">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12 md:mb-16">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-brand-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary">Mobile</span>
          </div>
          <h2 className="text-6xl font-display font-black tracking-tighter uppercase leading-none">
            Mobile <span className="text-gradient">Apps</span>
          </h2>
        </div>
        <div className="hidden md:flex items-center gap-2 text-brand-secondary/40 text-[10px] uppercase tracking-widest font-bold">
          <Smartphone size={14} />
          <span>Phone Preview</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-10 md:gap-16">
        {mobileApps.map((app, idx) => (
          <PhoneFrame key={app.title} app={app} idx={idx} />
        ))}
      </div>

      {mobileApps.length === 0 && (
        <div className="text-center py-20">
          <Smartphone size={40} className="mx-auto mb-4 text-brand-secondary/20" />
          <p className="text-brand-secondary/40 text-sm">No mobile apps to display yet.</p>
        </div>
      )}
    </Section>
  );
}
