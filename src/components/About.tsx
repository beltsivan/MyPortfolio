import { Section } from './Section';
import { motion } from 'motion/react';
import formalImage from '../assets/formal.png';

export function About() {
  const stats = [
    { label: 'Age', value: '22' },
    { label: 'Featured Projects', value: '04' },
    { label: 'Skill Areas', value: '05' },
  ];
  const techStack = [
    'HTML',
    'CSS',
    'JavaScript',
    'Responsive Design',
    'UI/UX Design',
    'Branding',
    'Visual Identity',
    'MySQL',
    'CMS Management',
    'Figma',
    'Canva',
    'Photoshop',
    'Illustrator',
    'Google Analytics',
  ];

  return (
    <Section id="about" className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
      <div className="relative aspect-square md:aspect-video lg:aspect-square rounded-3xl overflow-hidden glass group">
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          className="w-full h-full bg-gradient-to-br from-zinc-800 to-zinc-950 flex items-center justify-center"
        >
          <img
            src={formalImage}
            alt="Ivan Mathew Beltran"
            className="h-full w-full object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
            <h3 className="text-2xl font-bold font-display text-white">Ivan Mathew Beltran</h3>
            <p className="text-sm text-white/70">Graphic & Web Designer</p>
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col gap-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-[1px] bg-brand-accent" />
          <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary">Profile</span>
        </div>

        <h2 className="text-5xl md:text-6xl font-display font-bold tracking-tight leading-[1.1]">
          Clean <span className="italic font-light">Design</span> with <span className="text-gradient">Functional Web Solutions</span>.
        </h2>

        <p className="text-lg text-brand-secondary leading-relaxed">
          I am 22 years old and currently a college student. My work focuses on clean, user-centered interfaces, 
          responsive web design, branding, visual identity, logo design, presentation design, and marketing materials. 
          I also create and edit static visual content for businesses and have experience with basic backend connectivity through database integration.
        </p>

        <div className="grid grid-cols-3 gap-8 py-8 border-y border-brand-secondary/10 mt-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="text-4xl font-display font-black mb-1">{stat.value}</div>
              <div className="text-[10px] uppercase font-bold tracking-widest text-brand-secondary opacity-60">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="overflow-hidden border-y border-brand-secondary/10 py-5">
          <div className="mb-4 text-[10px] uppercase font-bold tracking-[0.2em] text-brand-secondary opacity-60">
            Tech Stack
          </div>
          <div className="tech-marquee flex w-max gap-3">
            {[...techStack, ...techStack].map((tech, index) => (
              <span
                key={`${tech}-${index}`}
                className="whitespace-nowrap rounded-full border border-brand-secondary/10 bg-brand-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-brand-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
