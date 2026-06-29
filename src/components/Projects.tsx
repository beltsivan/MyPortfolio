import { useState, useCallback } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Section } from './Section';
import { ExternalLink, Github, ArrowDown, ChevronLeft, ChevronRight, X, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import appointmentImage from '../assets/appointment.png';
import schoolImage from '../assets/school.png';
import mcdeliveryImage from '../assets/mcdelivery.jpg';
import diamondSkinImage from '../assets/DiamondSkin.png';

interface Project {
  title: string;
  category: string;
  subCategory?: string;
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
  // ── Beauty ──────────────────────────────────────────────
  {
    title: 'Diamond Skin Care — Brand Identity',
    subCategory: 'Beauty',
    category: 'Brand Identity',
    image: 'bg-gradient-to-br from-pink-600/30 to-rose-600/10',
    imageUrl: '/graphic%20design/beauty/beauty.PNG',
    description: 'Complete brand identity suite for Diamond Skin Care including logo, color palette, and brand guidelines.',
    tags: ['Brand Identity', 'Logo Design', 'Color Palette', 'Typography'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Diamond Skin Care — Social Media Kit',
    subCategory: 'Beauty',
    category: 'Social Media',
    image: 'bg-gradient-to-br from-pink-500/30 to-fuchsia-500/10',
    imageUrl: '/graphic%20design/beauty/DiamondSkinPost.jpg',
    description: 'Social media post designs for Diamond Skin Care featuring promotional content and brand storytelling.',
    tags: ['Canva', 'Social Media', 'Content Creation', 'Marketing'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Diamond Skin Care — Promotional Series',
    subCategory: 'Beauty',
    category: 'Social Media',
    image: 'bg-gradient-to-br from-rose-500/30 to-pink-600/10',
    imageUrl: '/graphic%20design/beauty/DiamondSkinPost1.jpg',
    description: 'A series of promotional graphics highlighting Diamond Skin Care services and treatment offerings.',
    tags: ['Social Media', 'Promotional', 'Canva', 'Graphic Design'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Diamond Skin Care — Product Showcase',
    subCategory: 'Beauty',
    category: 'Social Media',
    image: 'bg-gradient-to-br from-fuchsia-500/30 to-purple-600/10',
    imageUrl: '/graphic%20design/beauty/DiamondSkinPost2.jpg',
    description: 'Product-focused social media creatives showcasing Diamond Skin Care treatments and services.',
    tags: ['Product Showcase', 'Social Media', 'Visual Design', 'Canva'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Diamond Skin Care — Story Highlights',
    subCategory: 'Beauty',
    category: 'Social Media',
    image: 'bg-gradient-to-br from-violet-500/30 to-fuchsia-500/10',
    imageUrl: '/graphic%20design/beauty/DiamondSkinPost3.jpg',
    description: 'Instagram Story highlight covers and story templates for Diamond Skin Care brand presence.',
    tags: ['Instagram', 'Stories', 'Branding', 'Social Media'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Diamond Skin Care — Ad Campaign',
    subCategory: 'Beauty',
    category: 'Advertising',
    image: 'bg-gradient-to-br from-pink-500/30 to-orange-500/10',
    imageUrl: '/graphic%20design/beauty/DiamondSKinPost4.jpg',
    description: 'Paid ad creatives designed for Diamond Skin Care digital marketing campaigns across platforms.',
    tags: ['Advertising', 'Digital Marketing', 'Canva', 'Creative Design'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Diamond Skin Care — Banner Designs',
    subCategory: 'Beauty',
    category: 'Web Graphics',
    image: 'bg-gradient-to-br from-rose-500/30 to-violet-600/10',
    imageUrl: '/graphic%20design/beauty/DiamondSkinPost5.jpg',
    description: 'Web and social media banner designs for Diamond Skin Care brand awareness campaigns.',
    tags: ['Banners', 'Web Graphics', 'Social Media', 'Branding'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Beauty Editorial Layouts',
    subCategory: 'Beauty',
    category: 'Editorial Design',
    image: 'bg-gradient-to-br from-purple-600/30 to-pink-500/10',
    imageUrl: '/graphic%20design/beauty/image_2025-01-21_205631939.png',
    description: 'Editorial and magazine-style layouts for beauty industry print and digital publications.',
    tags: ['Editorial', 'Layout Design', 'Typography', 'Print'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Spa & Wellness Graphics',
    subCategory: 'Beauty',
    category: 'Print Design',
    image: 'bg-gradient-to-br from-pink-600/30 to-stone-500/10',
    imageUrl: '/graphic%20design/beauty/image_2025-01-21_205646349.png',
    description: 'Print-ready promotional materials for spa and wellness services including flyers and brochures.',
    tags: ['Print Design', 'Brochures', 'Flyers', 'Wellness'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Beauty Service Menu Design',
    subCategory: 'Beauty',
    category: 'Print Design',
    image: 'bg-gradient-to-br from-fuchsia-600/30 to-pink-500/10',
    imageUrl: '/graphic%20design/beauty/image_2025-01-21_205708555.png',
    description: 'Elegant service menu and price list designs for beauty and skincare clinics.',
    tags: ['Menu Design', 'Print', 'Typography', 'Luxury Branding'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },

  // ── Church Design ───────────────────────────────────────
  {
    title: 'Canyon Springs Church — Website Design',
    subCategory: 'Church Design',
    category: 'Web Design',
    image: 'bg-gradient-to-br from-amber-600/30 to-yellow-600/10',
    imageUrl: '/graphic%20design/chruchDesign/CanyonSpringsChurch.com.png',
    description: 'Full website homepage design for Canyon Springs Church with modern, welcoming aesthetics.',
    tags: ['Web Design', 'UI/UX', 'Figma', 'Responsive'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Church Event Poster — Series 1',
    subCategory: 'Church Design',
    category: 'Print Design',
    image: 'bg-gradient-to-br from-yellow-600/30 to-orange-600/10',
    imageUrl: '/graphic%20design/chruchDesign/1.jpg',
    description: 'Event poster design for church gatherings, conferences, and community outreach programs.',
    tags: ['Poster Design', 'Print', 'Typography', 'Event'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Church Event Poster — Series 2',
    subCategory: 'Church Design',
    category: 'Print Design',
    image: 'bg-gradient-to-br from-orange-600/30 to-red-600/10',
    imageUrl: '/graphic%20design/chruchDesign/2.jpg',
    description: 'Bold and inspiring poster series designed for church events and worship gatherings.',
    tags: ['Poster Design', 'Print', 'Color Theory', 'Event'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Church Event Poster — Series 3',
    subCategory: 'Church Design',
    category: 'Print Design',
    image: 'bg-gradient-to-br from-amber-500/30 to-stone-600/10',
    imageUrl: '/graphic%20design/chruchDesign/3.jpg',
    description: 'Minimalist poster design for church youth events and community service programs.',
    tags: ['Poster Design', 'Minimalist', 'Print', 'Community'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Church Event Poster — Series 4',
    subCategory: 'Church Design',
    category: 'Print Design',
    image: 'bg-gradient-to-br from-yellow-500/30 to-amber-600/10',
    imageUrl: '/graphic%20design/chruchDesign/4.jpg',
    description: 'Faith-based event promotional materials designed for both print and digital distribution.',
    tags: ['Poster Design', 'Faith', 'Print', 'Digital'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },

  // ── Flower Shopsss ─────────────────────────────────────────
  {
    title: 'Flower Shop — Brand Collateral',
    subCategory: 'Flower Shop',
    category: 'Brand Identity',
    image: 'bg-gradient-to-br from-green-600/30 to-emerald-600/10',
    imageUrl: '/graphic%20design/flowerShop/image_2025-01-21_204444035.png',
    description: 'Brand collateral and identity system for a boutique flower shop including logo and packaging.',
    tags: ['Brand Identity', 'Packaging', 'Logo Design', 'Floral'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Floral Arrangement Lookbook',
    subCategory: 'Flower Shop',
    category: 'Editorial Design',
    image: 'bg-gradient-to-br from-emerald-500/30 to-teal-600/10',
    imageUrl: '/graphic%20design/flowerShop/image_2025-01-21_204505814.png',
    description: 'A beautifully designed lookbook showcasing seasonal floral arrangements and bouquet collections.',
    tags: ['Lookbook', 'Editorial', 'Floral Design', 'Photography'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Flower Shop — Social Media Posts',
    subCategory: 'Flower Shop',
    category: 'Social Media',
    image: 'bg-gradient-to-br from-teal-500/30 to-green-600/10',
    imageUrl: '/graphic%20design/flowerShop/image_2025-01-21_204519690.png',
    description: 'Social media content strategy and post designs for a floral business online presence.',
    tags: ['Social Media', 'Content Strategy', 'Canva', 'Floral'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Floral Branding Elements',
    subCategory: 'Flower Shop',
    category: 'Brand Identity',
    image: 'bg-gradient-to-br from-green-500/30 to-lime-600/10',
    imageUrl: '/graphic%20design/flowerShop/image_2025-01-21_204531488.png',
    description: 'Branding elements and visual assets for a flower shop including patterns and iconography.',
    tags: ['Brand Elements', 'Patterns', 'Icons', 'Visual Identity'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Floral Promotion Flyers',
    subCategory: 'Flower Shop',
    category: 'Print Design',
    image: 'bg-gradient-to-br from-lime-500/30 to-green-600/10',
    imageUrl: '/graphic%20design/flowerShop/image_2025-01-21_204616784.png',
    description: 'Seasonal promotion flyers and discount cards for a flower shop marketing campaigns.',
    tags: ['Flyers', 'Print', 'Promotional', 'Seasonal'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Flower Shop — Catalog Design',
    subCategory: 'Flower Shop',
    category: 'Editorial Design',
    image: 'bg-gradient-to-br from-emerald-600/30 to-green-500/10',
    imageUrl: '/graphic%20design/flowerShop/image_2025-01-21_204627726.png',
    description: 'Product catalog design featuring flower arrangements with pricing and occasion categories.',
    tags: ['Catalog', 'Editorial', 'Typography', 'Floral'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },

  // ── Food & Drinks ───────────────────────────────────────
  {
    title: 'Food Menu Board Design',
    subCategory: 'Food & Drinks',
    category: 'Menu Design',
    image: 'bg-gradient-to-br from-red-600/30 to-orange-600/10',
    imageUrl: '/graphic%20design/food&drinks/image_2025-01-21_205103613.png',
    description: 'Digital and print menu board design for restaurants featuring daily specials and categories.',
    tags: ['Menu Design', 'Typography', 'Food', 'Print'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Restaurant Brand Marketing',
    subCategory: 'Food & Drinks',
    category: 'Marketing Design',
    image: 'bg-gradient-to-br from-orange-500/30 to-red-600/10',
    imageUrl: '/graphic%20design/food&drinks/image_2025-01-21_205206212.png',
    description: 'Marketing collateral suite for a restaurant brand including flyers, banners, and promotional materials.',
    tags: ['Marketing', 'Branding', 'Flyers', 'Restaurant'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Food Illustration Series',
    subCategory: 'Food & Drinks',
    category: 'Digital Art',
    image: 'bg-gradient-to-br from-amber-500/30 to-yellow-600/10',
    imageUrl: '/graphic%20design/food&drinks/image_2025-01-21_205506282.png',
    description: 'Custom food illustrations and vector art for restaurant menus and promotional materials.',
    tags: ['Illustration', 'Vector Art', 'Food', 'Digital Art'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Beverage Branding Suite',
    subCategory: 'Food & Drinks',
    category: 'Brand Identity',
    image: 'bg-gradient-to-br from-yellow-500/30 to-amber-600/10',
    imageUrl: '/graphic%20design/food&drinks/image_2025-01-21_205532421.png',
    description: 'Complete branding suite for a beverage brand including labels, packaging, and marketing assets.',
    tags: ['Brand Identity', 'Packaging', 'Labels', 'Beverage'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Social Media Food Content',
    subCategory: 'Food & Drinks',
    category: 'Social Media',
    image: 'bg-gradient-to-br from-orange-600/30 to-red-500/10',
    imageUrl: '/graphic%20design/food&drinks/image_2025-01-21_205546869.png',
    description: 'Social media post designs for food brands featuring menu highlights and promotional campaigns.',
    tags: ['Social Media', 'Food Photography', 'Content', 'Marketing'],
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
      {
        title: 'Diamond Skin Care — Appointment Booking & CMS',
        category: 'Live Web Application',
        image: 'bg-rose-600/20',
        imageUrl: diamondSkinImage,
        description: 'A modern skincare business website with online appointment booking, user authentication, and a full admin CMS dashboard for managing services, bookings, and content.',
        tags: ['React.js', 'Tailwind CSS', 'Firebase', 'Firestore', 'Vercel'],
        liveUrl: 'https://diamond-skin-care.vercel.app/',
        repoUrl: '',
        size: 'large',
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
    projects: [],
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

function groupBySubCategory(projects: Project[]): Map<string, Project[]> {
  const groups = new Map<string, Project[]>();
  for (const project of projects) {
    const key = project.subCategory || 'Other';
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key)!.push(project);
  }
  return groups;
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
            ) : !showAll ? (
              <div>
                <div className="grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-3">
                  {currentCategory.projects.slice(0, 3).map((project, idx) => (
                    <div
                      key={project.title}
                      className="group relative flex flex-col"
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
                {currentCategory.projects.length > 3 && (
                  <div className="flex justify-center mt-10">
                    <button
                      onClick={() => onViewAll ? onViewAll() : setShowAll(true)}
                      className="group flex items-center gap-3 px-8 py-3 rounded-full glass border border-white/[0.06] hover:border-brand-accent/30 hover:shadow-lg hover:shadow-brand-accent/10 transition-all duration-300"
                    >
                      <span className="text-sm font-bold uppercase tracking-wider text-brand-primary group-hover:text-brand-accent transition-colors">
                        View More Projects
                      </span>
                      <ArrowRight size={16} className="text-brand-secondary group-hover:text-brand-accent group-hover:translate-y-0.5 transition-all duration-300" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                {(() => {
                  const groups = groupBySubCategory(currentCategory.projects);
                  const entries = Array.from(groups.entries());
                  let globalIdx = 0;
                  return entries.map(([subCategory, projs]) => (
                    <div key={subCategory} className="mb-14 last:mb-0">
                      <motion.div
                        initial={{ opacity: 0, x: -12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="flex items-center gap-3 mb-7"
                      >
                        <div className="w-10 h-[1px] bg-brand-accent/60" />
                        <span className="text-base font-black uppercase tracking-[0.1em] text-brand-accent">
                          {subCategory}
                        </span>
                        <div className="h-[1px] flex-1 bg-white/[0.06]" />
                      </motion.div>
                      <div className="grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-3">
                        {projs.map((project) => {
                          const idx = globalIdx++;
                          return (
                            <div
                              key={project.title}
                              className="group relative flex flex-col"
                            >
                              <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.15 + idx * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                                transition={{ delay: 0.25 + idx * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
                          );
                        })}
                      </div>
                    </div>
                  ));
                })()}
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
                {(() => {
                  const groups = groupBySubCategory(currentCategory.projects);
                  const entries = Array.from(groups.entries());
                  let globalIdx = 0;
                  return entries.map(([subCategory, projs]) => {
                    const section = (
                      <div key={subCategory} className="mb-14 last:mb-0">
                        <motion.div
                          initial={{ opacity: 0, x: -12 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                          className="flex items-center gap-3 mb-7"
                        >
                          <div className="w-10 h-[1px] bg-brand-accent/60" />
                          <span className="text-base font-black uppercase tracking-[0.1em] text-brand-accent">
                            {subCategory}
                          </span>
                          <div className="h-[1px] flex-1 bg-white/[0.06]" />
                        </motion.div>
                        <div className="grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-3">
                          {projs.map((project) => {
                            const idx = globalIdx++;
                            return (
                              <div
                                key={project.title}
                                className="group relative flex flex-col"
                              >
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.15 + idx * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
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
                                  transition={{ delay: 0.25 + idx * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
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
                            );
                          })}
                        </div>
                      </div>
                    );
                    return section;
                  });
                })()}
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
