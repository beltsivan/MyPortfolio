import { useState, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Section } from './Section';
import { ExternalLink, Github, ArrowDown, ChevronLeft, ChevronRight, X, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import appointmentImage from '../assets/appointment.png';
import schoolImage from '../assets/school.png';
import mcdeliveryImage from '../assets/mcdelivery.jpg';

interface Project {
  title: string;
  category: string;
  image: string;
  imageUrl: string;
  description: string;
  tags: string[];
  liveUrl: string;
  repoUrl: string;
  size: 'large' | 'small';
}

interface Category {
  id: string;
  label: string;
  projects: Project[];
}

const graphicDesignProjects: Project[] = [
  {
    title: 'Social Media Design Suite',
    category: 'Digital Graphics',
    image: 'bg-gradient-to-br from-pink-600/30 to-rose-600/10',
    imageUrl: '/graphic%20design/image_2025-01-21_205546869.png',
    description: '',
    tags: ['Canva', 'Photoshop', 'Illustrator', 'Social Media'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Print Collateral Package',
    category: 'Print Design',
    image: 'bg-gradient-to-br from-rose-600/30 to-stone-600/10',
    imageUrl: '/graphic%20design/image_2025-01-21_205532421.png',
    description: '',
    tags: ['Illustrator', 'InDesign', 'Print Production', 'Typography'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Digital Art & Illustrations',
    category: 'Digital Art',
    image: 'bg-gradient-to-br from-violet-600/30 to-fuchsia-600/10',
    imageUrl: '/graphic%20design/image_2025-01-21_205506282.png',
    description: '',
    tags: ['Illustrator', 'Photoshop', 'Vector Art', 'Digital Painting'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Brand Marketing Toolkit',
    category: 'Marketing Design',
    image: 'bg-gradient-to-br from-emerald-600/30 to-teal-600/10',
    imageUrl: '/graphic%20design/image_2025-01-21_205206212.png',
    description: '',
    tags: ['Canva', 'Photoshop', 'Email Design', 'Social Media'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Web Design Mockups',
    category: 'UI Design',
    image: 'bg-gradient-to-br from-sky-600/30 to-blue-600/10',
    imageUrl: '/graphic%20design/image_2025-01-21_205103613.png',
    description: '',
    tags: ['Figma', 'Photoshop', 'Wireframing', 'Prototyping'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Presentation Design',
    category: 'Corporate Design',
    image: 'bg-gradient-to-br from-slate-600/30 to-gray-600/10',
    imageUrl: '',
    description: '',
    tags: ['PowerPoint', 'Keynote', 'Data Vis', 'Typography'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Iconography Set',
    category: 'Icon Design',
    image: 'bg-gradient-to-br from-amber-600/30 to-yellow-600/10',
    imageUrl: '',
    description: '',
    tags: ['Illustrator', 'SVG', 'Icon Design', 'Vector Art'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Newsletter Templates',
    category: 'Email Design',
    image: 'bg-gradient-to-br from-red-600/30 to-pink-600/10',
    imageUrl: '',
    description: '',
    tags: ['HTML Email', 'Canva', 'Mailchimp', 'Responsive'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'E-commerce Graphics',
    category: 'Product Design',
    image: 'bg-gradient-to-br from-orange-600/30 to-amber-600/10',
    imageUrl: '',
    description: '',
    tags: ['Photoshop', 'Product Photo', 'Banners', 'Ads'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Event Materials',
    category: 'Event Design',
    image: 'bg-gradient-to-br from-purple-600/30 to-violet-600/10',
    imageUrl: '',
    description: '',
    tags: ['Illustrator', 'InDesign', 'Posters', 'Banners'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Photo Retouching',
    category: 'Photo Editing',
    image: 'bg-gradient-to-br from-zinc-600/30 to-neutral-600/10',
    imageUrl: '',
    description: '',
    tags: ['Photoshop', 'Color Grading', 'Retouching', 'Compositing'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Infographic Design',
    category: 'Data Design',
    image: 'bg-gradient-to-br from-cyan-600/30 to-sky-600/10',
    imageUrl: '',
    description: '',
    tags: ['Illustrator', 'Data Vis', 'Typography', 'Layout'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
];

const categories: Category[] = [
  {
    id: 'web',
    label: 'Web Development',
    projects: [
      {
        title: 'Computer Services Appointment Booking',
        category: 'Live Web Application',
        image: '',
        imageUrl: appointmentImage,
        description: 'A responsive single-page application for booking computer repair and service appointments with service selection, date and time picking, real-time availability, appointment confirmation, and an admin dashboard.',
        tags: ['React.js', 'Vite', 'Tailwind CSS', 'JavaScript', 'REST API'],
        liveUrl: 'https://computer-services-appointment-booki.vercel.app/',
        repoUrl: '',
        size: 'large',
      },
      {
        title: 'School Management System',
        category: 'In Development',
        image: 'bg-purple-600/20',
        imageUrl: schoolImage,
        description: 'A school administration system for managing enrollment, class scheduling, grades, report cards, teacher assignments, and role-based access for administrators, teachers, and students.',
        tags: ['C#', 'ASP.NET MVC', 'SQL Server', 'Entity Framework', 'Bootstrap'],
        liveUrl: '',
        repoUrl: '',
        size: 'small',
      },
      {
        title: 'McDelivery PH - Website Clone',
        category: 'In Development',
        image: 'bg-emerald-600/20',
        imageUrl: mcdeliveryImage,
        description: 'A full-stack McDelivery Philippines website clone with user authentication, menu categories, cart management, order placement, and an admin dashboard for order tracking.',
        tags: ['PHP', 'phpMyAdmin', 'MySQL', 'HTML/CSS', 'JavaScript'],
        liveUrl: '',
        repoUrl: '',
        size: 'small',
      },
    ],
  },
  {
    id: 'graphic',
    label: 'Graphic Design',
    projects: graphicDesignProjects,
  },
  {
    id: 'branding',
    label: 'Branding',
    projects: graphicDesignProjects,
  },
];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 320 : -320,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -320 : 320,
    opacity: 0,
    scale: 0.97,
  }),
};

const springStiffness = 400;

function WebLayerStack({ projects }: { projects: Project[] }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);

  const prevProject = () => setActiveIdx((prev) => Math.max(0, prev - 1));
  const nextProject = () => setActiveIdx((prev) => Math.min(projects.length - 1, prev + 1));

  return (
    <div>
      <div className="relative h-[520px] md:h-[580px] w-full">
        {/* Background glow */}
        <div className="absolute -inset-20 bg-brand-accent/5 rounded-full blur-[100px] opacity-60 pointer-events-none" />

        {projects.map((project, idx) => {
          const dist = idx - activeIdx;
          const absDist = Math.abs(dist);

          const x = dist === 0 ? 0 : dist < 0 ? absDist * 24 : -absDist * 24;
          const y = absDist * 6;
          const s = 1 - absDist * 0.025;
          const o = absDist === 0 ? 1 : Math.max(0.3, 1 - absDist * 0.25);

          return (
            <motion.div
              key={project.title}
              className="absolute inset-0 cursor-pointer group"
              animate={{
                x,
                y,
                scale: s,
                opacity: o,
                zIndex: projects.length - absDist,
              }}
              transition={{
                type: 'spring',
                stiffness: springStiffness,
                damping: 30,
                mass: 0.9,
              }}
              onClick={() => {
                if (idx === activeIdx) {
                  setLightboxProject(project);
                } else {
                  setActiveIdx(idx);
                }
              }}
            >
              <div
                className={cn(
                  "relative h-full w-full rounded-3xl overflow-hidden glass border border-white/[0.06]",
                  "shadow-2xl shadow-black/25 transition-shadow duration-500",
                  absDist === 0 && "shadow-brand-accent/10 ring-1 ring-brand-accent/20",
                  absDist === 0 && "group-hover:shadow-brand-accent/20"
                )}
              >
                <div className="relative h-full w-full flex flex-col">
                  {/* Image / Visual area */}
                  <div
                    className={cn(
                      "relative flex-1 min-h-[180px] overflow-hidden",
                      project.image,
                      !project.image && !project.imageUrl ? 'flex items-center justify-center' : ''
                    )}
                  >
                    {project.imageUrl ? (
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        className="h-full w-full object-cover object-center"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="text-4xl md:text-5xl font-display font-black tracking-tighter opacity-[0.04] select-none text-center leading-tight max-w-[85%]">
                          {project.title}
                        </div>
                      </div>
                    )}

                    {/* Hover overlay links */}
                    <div
                      className={cn(
                        "absolute top-3 right-3 flex items-center gap-2 transition-all duration-300",
                        absDist === 0
                          ? "opacity-0 group-hover:opacity-100"
                          : "opacity-0 pointer-events-none"
                      )}
                    >
                      {project.repoUrl ? (
                        <a
                          href={project.repoUrl}
                          className="p-2.5 glass rounded-full hover:bg-brand-primary hover:text-black transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} repository`}
                        >
                          <Github size={16} />
                        </a>
                      ) : null}
                      {project.liveUrl ? (
                        <a
                          href={project.liveUrl}
                          className="p-2.5 glass rounded-full hover:bg-brand-primary hover:text-black transition-colors"
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${project.title} live site`}
                        >
                          <ExternalLink size={16} />
                        </a>
                      ) : null}
                    </div>
                  </div>

                  {/* Info area */}
                  <div className="p-5 md:p-6 flex flex-col gap-2.5 bg-background/40 backdrop-blur-md border-t border-white/[0.04]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono text-brand-secondary">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold font-display tracking-tight leading-tight">
                      {project.title}
                    </h3>
                    {project.description && (
                      <p className="text-brand-secondary text-xs md:text-sm leading-relaxed line-clamp-2">
                        {project.description}
                      </p>
                    )}
                    <div className="flex gap-2 flex-wrap mt-1">
                      {project.tags.slice(0, 4).map(tag => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 bg-brand-primary/[0.04] border border-brand-primary/[0.06] rounded-full text-[9px] uppercase font-bold tracking-wider"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Navigation with arrows */}
      <div className="mt-8 md:mt-10 px-1">
        <div className="flex items-center gap-4 justify-center">
          <button
            onClick={prevProject}
            disabled={activeIdx === 0}
            className={cn(
              "p-2.5 rounded-full transition-all duration-300",
              activeIdx === 0
                ? "text-brand-secondary/20 cursor-not-allowed"
                : "text-brand-secondary hover:text-brand-primary hover:bg-brand-primary/5"
            )}
            aria-label="Previous project"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex-1 max-w-[400px]">
            {/* Current project label */}
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-5"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-brand-primary/80">
                {projects[activeIdx].title}
              </span>
            </motion.div>

            {/* Track container */}
            <div className="relative flex items-center h-6">
              {/* Track background */}
              <div className="absolute left-0 right-0 h-[2px] bg-brand-secondary/15 rounded-full" />

              {/* Active track fill */}
              <motion.div
                className="absolute left-0 h-[2px] bg-brand-accent rounded-full"
                animate={{
                  width: projects.length > 1
                    ? `${(activeIdx / (projects.length - 1)) * 100}%`
                    : '100%',
                }}
                transition={{ type: 'spring', stiffness: springStiffness, damping: 30 }}
              />

              {/* Dots */}
              {projects.map((project, idx) => {
                const pct = projects.length > 1
                  ? (idx / (projects.length - 1)) * 100
                  : 50;
                return (
                  <button
                    key={project.title}
                    className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 group"
                    style={{ left: `${pct}%` }}
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`View ${project.title}`}
                  >
                    <motion.div
                      className="rounded-full"
                      animate={{
                        width: idx === activeIdx ? 14 : 6,
                        height: idx === activeIdx ? 14 : 6,
                        backgroundColor: idx === activeIdx
                          ? 'var(--color-brand-accent)'
                          : 'var(--color-brand-secondary)',
                        opacity: idx === activeIdx ? 1 : 0.25,
                        boxShadow: idx === activeIdx
                          ? '0 0 24px rgba(59,130,246,0.5), 0 0 8px rgba(59,130,246,0.3)'
                          : 'none',
                      }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                  </button>
                );
              })}

              {/* Hidden range input for drag interaction */}
              <input
                type="range"
                min={0}
                max={projects.length - 1}
                step={1}
                value={activeIdx}
                onChange={(e) => setActiveIdx(Number(e.target.value))}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              />
            </div>

            {/* Step numbers */}
            <div className="flex justify-between mt-2 px-0.5">
              {projects.map((_, idx) => (
                <span
                  key={idx}
                  className={cn(
                    "text-[9px] font-bold font-mono transition-colors duration-300",
                    idx === activeIdx ? 'text-brand-accent' : 'text-brand-secondary/20'
                  )}
                >
                  {String(idx + 1).padStart(2, '0')}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={nextProject}
            disabled={activeIdx === projects.length - 1}
            className={cn(
              "p-2.5 rounded-full transition-all duration-300",
              activeIdx === projects.length - 1
                ? "text-brand-secondary/20 cursor-not-allowed"
                : "text-brand-secondary hover:text-brand-primary hover:bg-brand-primary/5"
            )}
            aria-label="Next project"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setLightboxProject(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxProject(null)}
              className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            {lightboxProject.imageUrl ? (
              <img
                src={lightboxProject.imageUrl}
                alt={lightboxProject.title}
                className="max-w-full max-h-[75vh] w-full object-contain rounded-2xl"
              />
            ) : (
              <div className="w-full aspect-video rounded-2xl glass flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-brand-secondary/40">
                  {lightboxProject.title}
                </span>
              </div>
            )}
            <h3 className="text-xl md:text-2xl font-bold font-display text-white mt-5 text-center">
              {lightboxProject.title}
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export function Projects({ onViewAll }: { onViewAll?: () => void }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [showAll, setShowAll] = useState(false);
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);

  const changeCategory = useCallback((idx: number) => {
    if (idx === activeIdx) return;
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
    setShowAll(false);
  }, [activeIdx]);

  const handlePanEnd = useCallback((_: PointerEvent, info: PanInfo) => {
    const threshold = 60;
    const absX = Math.abs(info.offset.x);
    const absY = Math.abs(info.offset.y);

    if (absX > threshold && absX > absY * 1.5) {
      if (info.offset.x < 0 && activeIdx < categories.length - 1) {
        changeCategory(activeIdx + 1);
      } else if (info.offset.x > 0 && activeIdx > 0) {
        changeCategory(activeIdx - 1);
      }
    }
  }, [activeIdx, changeCategory]);

  const currentCategory = categories[activeIdx];

  return (
    <Section id="projects">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-brand-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary">Projects</span>
          </div>
          <h2 className="text-6xl font-display font-black tracking-tighter uppercase leading-none">
            Selected <span className="text-gradient">Work</span>
          </h2>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide -mx-6 md:-mx-0 px-6 md:px-0">
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => changeCategory(idx)}
            className={cn(
              "relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-500",
              idx === activeIdx
                ? "text-white"
                : "text-brand-secondary hover:text-brand-primary"
            )}
          >
            {idx === activeIdx && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-brand-accent rounded-full shadow-lg shadow-brand-accent/25"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        className={cn(
          "relative -mx-6 md:-mx-0 px-6 md:px-0",
          currentCategory.id !== 'web' && "overflow-hidden"
        )}
        onPanEnd={handlePanEnd}
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={activeIdx}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 350, damping: 30, mass: 0.9 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
          >
            {currentCategory.id === 'web' ? (
              <WebLayerStack projects={currentCategory.projects} />
            ) : (
              <div>
                <div className="grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-3">
                  {(showAll ? currentCategory.projects : currentCategory.projects.slice(0, 3)).map((project, idx) => (
                  <div
                    key={project.title}
                    className={cn(
                      "group relative flex flex-col",
                      project.size === 'large' ? 'md:col-span-2' : ''
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "relative rounded-3xl overflow-hidden glass aspect-video mb-6 transition-all duration-500 cursor-pointer",
                        project.image
                      )}
                      onClick={() => {
                        if (project.imageUrl) {
                          setLightboxProject(project);
                        }
                      }}
                    >
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="text-5xl font-display font-black tracking-tighter opacity-[0.04] select-none pointer-events-none max-w-[80%] text-center leading-tight">
                            {project.title}
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.repoUrl ? (
                          <a
                            href={project.repoUrl}
                            className="p-2.5 glass rounded-full hover:bg-brand-primary hover:text-black transition-colors"
                            aria-label={`${project.title} repository`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={16} />
                          </a>
                        ) : null}
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            className="p-2.5 glass rounded-full hover:bg-brand-primary hover:text-black transition-colors"
                            aria-label={`${project.title} live site`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={16} />
                          </a>
                        ) : null}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + idx * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono text-brand-secondary">{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
              {!showAll && currentCategory.projects.length > 3 && (
                <div className="flex justify-center mt-12">
                  <button
                    onClick={() => onViewAll ? onViewAll() : setShowAll(true)}
                    className="group flex items-center gap-3 px-8 py-3 rounded-full glass border border-white/[0.06] hover:border-brand-accent/30 hover:shadow-lg hover:shadow-brand-accent/10 transition-all duration-300"
                  >
                    <span className="text-sm font-bold uppercase tracking-wider text-brand-primary group-hover:text-brand-accent transition-colors">
                      View More Projects
                    </span>
                    <ArrowDown size={16} className="text-brand-secondary group-hover:text-brand-accent group-hover:translate-y-0.5 transition-all duration-300" />
                  </button>
                </div>
              )}
            </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="flex items-center justify-center gap-2 mt-16">
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => changeCategory(idx)}
            className="group"
            aria-label={`Switch to ${cat.label}`}
          >
            <div className={cn(
              "rounded-full transition-all duration-500",
              idx === activeIdx
                ? "w-8 h-2 bg-brand-accent"
                : "w-2 h-2 bg-brand-secondary/30 group-hover:bg-brand-secondary/60"
            )} />
          </button>
        ))}
      </div>

      <p className="text-center text-[10px] text-brand-secondary/40 uppercase tracking-[0.2em] font-bold mt-4 md:hidden">
        Swipe to explore
      </p>

      {/* Lightbox Modal */}
      {lightboxProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setLightboxProject(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxProject(null)}
              className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            {lightboxProject.imageUrl ? (
              <img
                src={lightboxProject.imageUrl}
                alt={lightboxProject.title}
                className="max-w-full max-h-[75vh] w-full object-contain rounded-2xl"
              />
            ) : (
              <div className="w-full aspect-video rounded-2xl glass flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-brand-secondary/40">
                  {lightboxProject.title}
                </span>
              </div>
            )}
            <h3 className="text-xl md:text-2xl font-bold font-display text-white mt-5 text-center">
              {lightboxProject.title}
            </h3>
          </div>
        </div>
      )}
    </Section>
  );
}

export function AllProjects() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [direction, setDirection] = useState(0);
  const [lightboxProject, setLightboxProject] = useState<Project | null>(null);

  const changeCategory = useCallback((idx: number) => {
    if (idx === activeIdx) return;
    setDirection(idx > activeIdx ? 1 : -1);
    setActiveIdx(idx);
  }, [activeIdx]);

  const handlePanEnd = useCallback((_: PointerEvent, info: PanInfo) => {
    const threshold = 60;
    const absX = Math.abs(info.offset.x);
    const absY = Math.abs(info.offset.y);

    if (absX > threshold && absX > absY * 1.5) {
      if (info.offset.x < 0 && activeIdx < categories.length - 1) {
        changeCategory(activeIdx + 1);
      } else if (info.offset.x > 0 && activeIdx > 0) {
        changeCategory(activeIdx - 1);
      }
    }
  }, [activeIdx, changeCategory]);

  const currentCategory = categories[activeIdx];

  return (
    <Section id="projects" className="min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
        <div className="max-w-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-[1px] bg-brand-accent" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-secondary">Projects</span>
          </div>
          <h2 className="text-6xl font-display font-black tracking-tighter uppercase leading-none">
            All <span className="text-gradient">Projects</span>
          </h2>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-12 overflow-x-auto pb-2 scrollbar-hide -mx-6 md:-mx-0 px-6 md:px-0">
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => changeCategory(idx)}
            className={cn(
              "relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors duration-500",
              idx === activeIdx
                ? "text-white"
                : "text-brand-secondary hover:text-brand-primary"
            )}
          >
            {idx === activeIdx && (
              <motion.div
                layoutId="activeTabAll"
                className="absolute inset-0 bg-brand-accent rounded-full shadow-lg shadow-brand-accent/25"
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative z-10">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <motion.div
        className={cn(
          "relative -mx-6 md:-mx-0 px-6 md:px-0",
          currentCategory.id !== 'web' && "overflow-hidden"
        )}
        onPanEnd={handlePanEnd}
        style={{ touchAction: 'pan-y pinch-zoom' }}
      >
        <AnimatePresence mode="popLayout" custom={direction}>
          <motion.div
            key={activeIdx}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: 'spring', stiffness: 350, damping: 30, mass: 0.9 },
              opacity: { duration: 0.3 },
              scale: { duration: 0.3 },
            }}
          >
            {currentCategory.id === 'web' ? (
              <WebLayerStack projects={currentCategory.projects} />
            ) : (
              <div>
                <div className="grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-3">
                  {currentCategory.projects.map((project, idx) => (
                  <div
                    key={project.title}
                    className={cn(
                      "group relative flex flex-col",
                      project.size === 'large' ? 'md:col-span-2' : ''
                    )}
                  >
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15 + idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      className={cn(
                        "relative rounded-3xl overflow-hidden glass aspect-video mb-6 transition-all duration-500 cursor-pointer",
                        project.image
                      )}
                      onClick={() => {
                        if (project.imageUrl) {
                          setLightboxProject(project);
                        }
                      }}
                    >
                      {project.imageUrl ? (
                        <img
                          src={project.imageUrl}
                          alt={project.title}
                          className="h-full w-full object-cover object-center"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center">
                          <div className="text-5xl font-display font-black tracking-tighter opacity-[0.04] select-none pointer-events-none max-w-[80%] text-center leading-tight">
                            {project.title}
                          </div>
                        </div>
                      )}
                      <div className="absolute top-3 right-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {project.repoUrl ? (
                          <a
                            href={project.repoUrl}
                            className="p-2.5 glass rounded-full hover:bg-brand-primary hover:text-black transition-colors"
                            aria-label={`${project.title} repository`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github size={16} />
                          </a>
                        ) : null}
                        {project.liveUrl ? (
                          <a
                            href={project.liveUrl}
                            className="p-2.5 glass rounded-full hover:bg-brand-primary hover:text-black transition-colors"
                            aria-label={`${project.title} live site`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={16} />
                          </a>
                        ) : null}
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.25 + idx * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex flex-col gap-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                          {project.category}
                        </span>
                        <span className="text-[10px] font-mono text-brand-secondary">{String(idx + 1).padStart(2, '0')}</span>
                      </div>
                    </motion.div>
                  </div>
                ))}
              </div>
            </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <div className="flex items-center justify-center gap-2 mt-16">
        {categories.map((cat, idx) => (
          <button
            key={cat.id}
            onClick={() => changeCategory(idx)}
            className="group"
            aria-label={`Switch to ${cat.label}`}
          >
            <div className={cn(
              "rounded-full transition-all duration-500",
              idx === activeIdx
                ? "w-8 h-2 bg-brand-accent"
                : "w-2 h-2 bg-brand-secondary/30 group-hover:bg-brand-secondary/60"
            )} />
          </button>
        ))}
      </div>

      <p className="text-center text-[10px] text-brand-secondary/40 uppercase tracking-[0.2em] font-bold mt-4 md:hidden">
        Swipe to explore
      </p>

      {/* Lightbox Modal */}
      {lightboxProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setLightboxProject(null)}
        >
          <div
            className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxProject(null)}
              className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Close lightbox"
            >
              <X size={24} />
            </button>
            {lightboxProject.imageUrl ? (
              <img
                src={lightboxProject.imageUrl}
                alt={lightboxProject.title}
                className="max-w-full max-h-[75vh] w-full object-contain rounded-2xl"
              />
            ) : (
              <div className="w-full aspect-video rounded-2xl glass flex items-center justify-center">
                <span className="text-2xl font-display font-bold text-brand-secondary/40">
                  {lightboxProject.title}
                </span>
              </div>
            )}
            <h3 className="text-xl md:text-2xl font-bold font-display text-white mt-5 text-center">
              {lightboxProject.title}
            </h3>
          </div>
        </div>
      )}
    </Section>
  );
}
