import { useState, useCallback, useMemo, memo } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { Section } from './Section';
import { ExternalLink, Github, ArrowDown, ChevronLeft, ChevronRight, X, ArrowRight, Award } from 'lucide-react';
import { cn } from '../lib/utils';
import appointmentImage from '../assets/appointment.png';
import schoolImage from '../assets/school.png';
import mcdeliveryImage from '../assets/mcdelivery.jpg';
import diamondSkinImage from '../assets/DiamondSkin.png';
import { SlideViewer } from './SlideViewer';

// ─── Certificate Data ────────────────────────────────────────────────────────
interface Certificate {
  title: string;
  issuer: string;
  gradient: string;
  accentColor: string;
  imageUrl?: string;  // JPG to display directly
  year?: string;
}

const certificates: Certificate[] = [
  {
    title: 'ISC² Certified in Cybersecurity — Module 1',
    issuer: 'ISC²',
    gradient: 'from-blue-600/40 via-cyan-700/20 to-blue-900/30',
    accentColor: '#3b82f6',
    imageUrl: '/certificates/CertificateISC2D1.jpg',
    year: '2025',
  },
  {
    title: 'ISC² Certified in Cybersecurity — Module 2',
    issuer: 'ISC²',
    gradient: 'from-blue-500/40 via-indigo-700/20 to-blue-900/30',
    accentColor: '#6366f1',
    imageUrl: '/certificates/CertificateISC2D2.jpg',
    year: '2025',
  },
  {
    title: 'ISC² Certified in Cybersecurity — Module 3',
    issuer: 'ISC²',
    gradient: 'from-indigo-600/40 via-blue-700/20 to-indigo-900/30',
    accentColor: '#818cf8',
    imageUrl: '/certificates/CertificateISC2D3.jpg',
    year: '2025',
  },
  {
    title: 'ISC² Certified in Cybersecurity — Module 4',
    issuer: 'ISC²',
    gradient: 'from-violet-600/40 via-indigo-700/20 to-violet-900/30',
    accentColor: '#a78bfa',
    imageUrl: '/certificates/CertificateISC2D4.jpg',
    year: '2025',
  },
  {
    title: 'IBM Design Thinking Practitioner',
    issuer: 'IBM',
    gradient: 'from-cyan-600/40 via-sky-700/20 to-cyan-900/30',
    accentColor: '#06b6d4',
    // No JPG available — shows gradient fallback
    year: '2025',
  },
  {
    title: 'Entrepreneurship & Startup Certificate',
    issuer: 'Wadhwani Foundation',
    gradient: 'from-amber-600/40 via-orange-700/20 to-amber-900/30',
    accentColor: '#f59e0b',
    imageUrl: '/certificates/WadhwaniFoundation.jpg',
    year: '2025',
  },
];

function CertificatesGrid() {
  const [lightboxCert, setLightboxCert] = useState<Certificate | null>(null);

  return (
    <>
      <div className="grid gap-8 lg:gap-10 grid-cols-1 md:grid-cols-3">
        {certificates.map((cert, idx) => (
          <motion.div
            key={cert.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 + idx * 0.08, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="group relative flex flex-col cursor-pointer"
            onClick={() => setLightboxCert(cert)}
            aria-label={`View ${cert.title}`}
          >
            {/* Card visual */}
            <div
              className={cn(
                "relative rounded-3xl overflow-hidden glass aspect-video mb-5 transition-all duration-500",
                !cert.imageUrl && `bg-gradient-to-br ${cert.gradient}`
              )}
            >
              {cert.imageUrl ? (
                // ── Actual certificate image ──
                <img
                  src={cert.imageUrl}
                  alt={cert.title}
                  className="h-full w-full object-cover object-top"
                />
              ) : (
                // ── Gradient fallback (no image available) ──
                <>
                  <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/[0.04]" />
                  <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-white/[0.03]" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center ring-1 ring-white/10 backdrop-blur-sm"
                      style={{ background: `${cert.accentColor}22` }}
                    >
                      <Award size={28} style={{ color: cert.accentColor }} />
                    </div>
                    <div className="text-center px-4">
                      <p
                        className="text-[11px] font-black uppercase tracking-[0.18em] mb-1"
                        style={{ color: cert.accentColor }}
                      >
                        {cert.issuer}
                      </p>
                      <p className="text-xs text-white/50 font-medium leading-snug max-w-[160px] mx-auto">
                        {cert.title}
                      </p>
                    </div>
                  </div>
                </>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-2 px-5 py-2.5 glass rounded-full">
                  <Award size={14} className="text-white" />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">View Certificate</span>
                </div>
              </div>

              {/* Year badge */}
              {cert.year && (
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 glass rounded-full text-[9px] font-bold uppercase tracking-widest text-white/60">
                    {cert.year}
                  </span>
                </div>
              )}
            </div>

            {/* Info below card */}
            <div className="flex items-center justify-between">
              <div className="flex flex-col gap-1">
                <span
                  className="text-[10px] font-bold uppercase tracking-widest"
                  style={{ color: cert.accentColor }}
                >
                  {cert.issuer}
                </span>
                <p className="text-sm font-bold font-display leading-tight text-brand-primary line-clamp-2">
                  {cert.title}
                </p>
              </div>
              <span className="text-[10px] font-mono text-brand-secondary shrink-0 ml-3">
                {String(idx + 1).padStart(2, '0')}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Certificate Lightbox */}
      {lightboxCert && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={() => setLightboxCert(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightboxCert(null)}
              className="absolute -top-12 right-0 p-2 text-white/60 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={24} />
            </button>
            {lightboxCert.imageUrl ? (
              <img
                src={lightboxCert.imageUrl}
                alt={lightboxCert.title}
                className="max-w-full max-h-[78vh] w-full object-contain rounded-2xl shadow-2xl"
              />
            ) : (
              <div className={cn(
                "w-full aspect-video rounded-2xl flex items-center justify-center bg-gradient-to-br",
                lightboxCert.gradient
              )}>
                <div className="text-center">
                  <Award size={48} style={{ color: lightboxCert.accentColor }} className="mx-auto mb-3" />
                  <p className="text-white/70 text-sm">No image available for this certificate.</p>
                </div>
              </div>
            )}
            <h3 className="text-lg md:text-2xl font-bold font-display text-white mt-5 text-center">
              {lightboxCert.title}
            </h3>
            <p
              className="text-sm font-bold uppercase tracking-widest mt-1"
              style={{ color: lightboxCert.accentColor }}
            >
              {lightboxCert.issuer}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

interface Project {
  title: string;
  category: string;
  subCategory?: string;
  image: string;
  imageUrl: string;
  slides?: string[];
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

const makeSlides = (name: string, count: number) =>
  Array.from(
    { length: count },
    (_, i) => `/presentationDeckDesign/${encodeURIComponent(name)}/${encodeURIComponent(name)}-${String(i + 1).padStart(2, '0')}.png`
  );

const presentationDeckProjects: Project[] = [
  {
    title: 'Flexibility and Adaptability',
    category: 'Presentation Deck',
    image: 'bg-gradient-to-br from-emerald-600/30 to-teal-600/10',
    imageUrl: '/presentationDeckDesign/Flexibility%20and%20Adaptability/Flexibility%20and%20Adaptability-01.png',
    slides: makeSlides('Flexibility and Adaptability', 17),
    description: 'A presentation deck exploring the value of flexibility and adaptability in modern business environments and leadership.',
    tags: ['Presentation', 'Adaptability', 'Business Strategy'],
    liveUrl: '',
    repoUrl: '',
    size: 'large',
  },
  {
    title: 'Operations Management',
    category: 'Presentation Deck',
    image: 'bg-gradient-to-br from-blue-600/30 to-cyan-600/10',
    imageUrl: '/presentationDeckDesign/Operations%20Management/Operations%20Management-01.png',
    slides: makeSlides('Operations Management', 16),
    description: 'A presentation deck covering key operations management principles, process optimization, and operational efficiency strategies.',
    tags: ['Presentation', 'Operations', 'Process Optimization'],
    liveUrl: '',
    repoUrl: '',
    size: 'large',
  },
  {
    title: 'Business Development Management',
    category: 'Presentation Deck',
    image: 'bg-gradient-to-br from-amber-600/30 to-yellow-600/10',
    imageUrl: '/presentationDeckDesign/Business%20Development%20Management/Business%20Development%20Management-01.png',
    slides: makeSlides('Business Development Management', 24),
    description: 'A presentation deck on business development strategies, market growth, and strategic partnership building.',
    tags: ['Presentation', 'Business Development', 'Strategy'],
    liveUrl: '',
    repoUrl: '',
    size: 'large',
  },
  {
    title: 'Conflict Management',
    category: 'Presentation Deck',
    image: 'bg-gradient-to-br from-red-600/30 to-rose-600/10',
    imageUrl: '/presentationDeckDesign/Conflict%20Management/Conflict%20Management-01.png',
    slides: makeSlides('Conflict Management', 22),
    description: 'A presentation deck exploring conflict resolution techniques, communication strategies, and workplace harmony.',
    tags: ['Presentation', 'Conflict Resolution', 'Communication'],
    liveUrl: '',
    repoUrl: '',
    size: 'large',
  },
  {
    title: 'Cultural Awareness',
    category: 'Presentation Deck',
    image: 'bg-gradient-to-br from-violet-600/30 to-purple-600/10',
    imageUrl: '/presentationDeckDesign/Cultural%20Awareness/Cultural%20Awareness-01.png',
    slides: makeSlides('Cultural Awareness', 18),
    description: 'A presentation deck on cultural awareness, diversity, inclusion, and cross-cultural communication in the workplace.',
    tags: ['Presentation', 'Cultural Awareness', 'Diversity', 'Inclusion'],
    liveUrl: '',
    repoUrl: '',
    size: 'large',
  },
  {
    title: 'Empathy in the Workplace',
    category: 'Presentation Deck',
    image: 'bg-gradient-to-br from-pink-600/30 to-fuchsia-600/10',
    imageUrl: '/presentationDeckDesign/Empathy%20in%20the%20Workplace/Empathy%20in%20the%20Workplace-01.png',
    slides: makeSlides('Empathy in the Workplace', 20),
    description: 'A presentation deck exploring the role of empathy in leadership, team dynamics, and organizational culture.',
    tags: ['Presentation', 'Empathy', 'Leadership', 'Workplace Culture'],
    liveUrl: '',
    repoUrl: '',
    size: 'large',
  },
];

const tshirtDesignProjects: Project[] = [
  {
    title: 'MM T-Shirt Design',
    subCategory: 'T-Shirt',
    category: 'T-Shirt Design',
    image: 'bg-gradient-to-br from-blue-600/30 to-cyan-600/10',
    imageUrl: '/tShirt/MM%20v2.png',
    description: 'Bold typographical t-shirt design featuring MM branding with modern aesthetic.',
    tags: ['T-Shirt', 'Typography', 'Streetwear', 'Design'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'Ancient T-Shirt Design',
    subCategory: 'T-Shirt',
    category: 'T-Shirt Design',
    image: 'bg-gradient-to-br from-amber-600/30 to-yellow-600/10',
    imageUrl: '/tShirt/Ancient%20v2.png',
    description: 'Ancient-inspired t-shirt design with vintage aesthetic and cultural motifs.',
    tags: ['T-Shirt', 'Vintage', 'Ancient', 'Illustration'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'David T-Shirt Design',
    subCategory: 'T-Shirt',
    category: 'T-Shirt Design',
    image: 'bg-gradient-to-br from-rose-600/30 to-pink-600/10',
    imageUrl: '/tShirt/David.png',
    description: 'Art-inspired t-shirt design featuring David motif with contemporary styling.',
    tags: ['T-Shirt', 'Art', 'Illustration', 'Classic'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'T-Shirt Design 06',
    subCategory: 'T-Shirt',
    category: 'T-Shirt Design',
    image: 'bg-gradient-to-br from-emerald-600/30 to-teal-600/10',
    imageUrl: '/tShirt/6.png',
    description: 'Minimalist t-shirt design with clean lines and modern typography.',
    tags: ['T-Shirt', 'Minimalist', 'Typography', 'Modern'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'T-Shirt Design 08',
    subCategory: 'T-Shirt',
    category: 'T-Shirt Design',
    image: 'bg-gradient-to-br from-violet-600/30 to-purple-600/10',
    imageUrl: '/tShirt/8.png',
    description: 'Abstract graphic t-shirt design with bold color blocking.',
    tags: ['T-Shirt', 'Abstract', 'Graphic', 'Color'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'T-Shirt Design 09',
    subCategory: 'T-Shirt',
    category: 'T-Shirt Design',
    image: 'bg-gradient-to-br from-orange-600/30 to-red-600/10',
    imageUrl: '/tShirt/9.png',
    description: 'Streetwear-inspired t-shirt design with edgy graphic elements.',
    tags: ['T-Shirt', 'Streetwear', 'Graphic', 'Edgy'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'T-Shirt Design 10',
    subCategory: 'T-Shirt',
    category: 'T-Shirt Design',
    image: 'bg-gradient-to-br from-sky-600/30 to-indigo-600/10',
    imageUrl: '/tShirt/10.png',
    description: 'Contemporary t-shirt design with geometric patterns and shapes.',
    tags: ['T-Shirt', 'Geometric', 'Contemporary', 'Pattern'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'T-Shirt Design 13',
    subCategory: 'T-Shirt',
    category: 'T-Shirt Design',
    image: 'bg-gradient-to-br from-lime-600/30 to-green-600/10',
    imageUrl: '/tShirt/13.png',
    description: 'Nature-inspired t-shirt design with organic motifs and earthy tones.',
    tags: ['T-Shirt', 'Nature', 'Organic', 'Illustration'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'T-Shirt Design 14',
    subCategory: 'T-Shirt',
    category: 'T-Shirt Design',
    image: 'bg-gradient-to-br from-fuchsia-600/30 to-pink-600/10',
    imageUrl: '/tShirt/14.png',
    description: 'Pop-art inspired t-shirt design with vibrant colors and bold graphics.',
    tags: ['T-Shirt', 'Pop-Art', 'Vibrant', 'Graphic'],
    liveUrl: '',
    repoUrl: '',
    size: 'small',
  },
  {
    title: 'T-Shirt Design 15',
    subCategory: 'T-Shirt',
    category: 'T-Shirt Design',
    image: 'bg-gradient-to-br from-cyan-600/30 to-blue-600/10',
    imageUrl: '/tShirt/15.png',
    description: 'Modern typographic t-shirt design with custom lettering and layout.',
    tags: ['T-Shirt', 'Typography', 'Lettering', 'Modern'],
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
        category: 'Under Development',
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
        category: 'Live Demo',
        image: 'bg-emerald-600/20',
        imageUrl: mcdeliveryImage,
        description: 'A full-stack McDelivery Philippines website clone with user authentication, menu categories, cart management, order placement, and an admin dashboard for order tracking.',
        tags: ['PHP', 'phpMyAdmin', 'MySQL', 'HTML/CSS', 'JavaScript'],
        liveUrl: 'https://drive.google.com/file/d/1CpOY1L24ArxARm-HoZXaPt5Aas-7sDpj/view?usp=sharing',
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
    id: 'tshirt',
    label: 'T-Shirt Design',
    projects: tshirtDesignProjects,
  },
  {
    id: 'presentation',
    label: 'Presentation Deck Design',
    projects: presentationDeckProjects,
  },
  {
    id: 'certificates',
    label: 'Certificates',
    projects: [], // handled by CertificatesGrid
  },
];

// Opacity-only transition: avoids expensive scale repaint and layout shift
const slideVariants = {
  enter: (_dir: number) => ({ opacity: 0 }),
  center: { opacity: 1 },
  exit: (_dir: number) => ({ opacity: 0 }),
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
      {lightboxProject?.slides ? (
        <SlideViewer
          slides={lightboxProject.slides}
          title={lightboxProject.title}
          onClose={() => setLightboxProject(null)}
        />
      ) : lightboxProject && (
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

  const groupedProjects = useMemo(() => {
    return groupBySubCategory(currentCategory.projects);
  }, [currentCategory.projects]);

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
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIdx}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.25, ease: 'easeInOut' }
            }}
          >
            {currentCategory.id === 'certificates' ? (
              <CertificatesGrid />
            ) : currentCategory.id === 'web' ? (
              <WebLayerStack projects={currentCategory.projects} />
            ) : !showAll ? (
              <div>
                <div className="grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-3">
                  {currentCategory.projects.slice(0, 3).map((project, idx) => (
                    <div
                      key={project.title}
                      className="group relative flex flex-col"
                    >
                      <div
                        className={cn(
                          "relative rounded-3xl overflow-hidden glass aspect-video mb-6 transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-brand-accent/5",
                          project.image
                        )}
                        onClick={() => {
                          if (project.slides || project.imageUrl) {
                            setLightboxProject(project);
                          }
                        }}
                      >
                        {project.slides ? (
                          <img
                            src={project.slides[0]}
                            alt={project.title}
                            className="h-full w-full object-cover object-center"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : project.imageUrl ? (
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="h-full w-full object-cover object-center"
                            loading="lazy"
                            decoding="async"
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
                      </div>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                            {project.category}
                          </span>
                          <span className="text-[10px] font-mono text-brand-secondary">{String(idx + 1).padStart(2, '0')}</span>
                        </div>
                      </div>
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
                  const entries = Array.from(groupedProjects.entries());
                  let globalIdx = 0;
                  return entries.map(([subCategory, projs]) => (
                    <div key={subCategory} className="mb-14 last:mb-0">
                      <div className="flex items-center gap-3 mb-7">
                        <div className="w-10 h-[1px] bg-brand-accent/60" />
                        <span className="text-base font-black uppercase tracking-[0.1em] text-brand-accent">
                          {subCategory}
                        </span>
                        <div className="h-[1px] flex-1 bg-white/[0.06]" />
                      </div>
                      <div className="grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-3">
                        {projs.map((project) => {
                          const idx = globalIdx++;
                          return (
                            <div
                              key={project.title}
                              className="group relative flex flex-col"
                            >
                              <div
                                className={cn(
                                  "relative rounded-3xl overflow-hidden glass aspect-video mb-6 transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-brand-accent/5",
                                  project.image
                                )}
                                onClick={() => {
                                  if (project.slides || project.imageUrl) {
                                    setLightboxProject(project);
                                  }
                                }}
                              >
                                {project.slides ? (
                                  <img
                                    src={project.slides[0]}
                                    alt={project.title}
                                    className="h-full w-full object-cover object-center"
                                    loading="lazy"
                                    decoding="async"
                                  />
                                ) : project.imageUrl ? (
                                  <img
                                    src={project.imageUrl}
                                    alt={project.title}
                                    className="h-full w-full object-cover object-center"
                                    loading="lazy"
                                    decoding="async"
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
                              </div>
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                                    {project.category}
                                  </span>
                                  <span className="text-[10px] font-mono text-brand-secondary">{String(idx + 1).padStart(2, '0')}</span>
                                </div>
                              </div>
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
      {lightboxProject?.slides ? (
        <SlideViewer
          slides={lightboxProject.slides}
          title={lightboxProject.title}
          onClose={() => setLightboxProject(null)}
        />
      ) : lightboxProject && (
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

  const groupedProjects = useMemo(() => {
    return groupBySubCategory(currentCategory.projects);
  }, [currentCategory.projects]);

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
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={activeIdx}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              opacity: { duration: 0.25, ease: 'easeInOut' }
            }}
          >
            {currentCategory.id === 'certificates' ? (
              <CertificatesGrid />
            ) : currentCategory.id === 'web' ? (
              <WebLayerStack projects={currentCategory.projects} />
            ) : (
              <div>
                {(() => {
                  const entries = Array.from(groupedProjects.entries());
                  let globalIdx = 0;
                  return entries.map(([subCategory, projs]) => {
                    const section = (
                      <div key={subCategory} className="mb-14 last:mb-0">
                        <div className="flex items-center gap-3 mb-7">
                          <div className="w-10 h-[1px] bg-brand-accent/60" />
                          <span className="text-base font-black uppercase tracking-[0.1em] text-brand-accent">
                            {subCategory}
                          </span>
                          <div className="h-[1px] flex-1 bg-white/[0.06]" />
                        </div>
                        <div className="grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-3">
                          {projs.map((project) => {
                            const idx = globalIdx++;
                            return (
                              <div
                                key={project.title}
                                className="group relative flex flex-col"
                              >
                                <div
                                  className={cn(
                                    "relative rounded-3xl overflow-hidden glass aspect-video mb-6 transition-all duration-500 cursor-pointer hover:scale-[1.02] hover:shadow-lg hover:shadow-brand-accent/5",
                                    project.image
                                  )}
                                  onClick={() => {
                                    if (project.slides || project.imageUrl) {
                                      setLightboxProject(project);
                                    }
                                  }}
                                >
                                  {project.slides ? (
                                    <img
                                      src={project.slides[0]}
                                      alt={project.title}
                                      className="h-full w-full object-cover object-center"
                                      loading="lazy"
                                      decoding="async"
                                    />
                                  ) : project.imageUrl ? (
                                    <img
                                      src={project.imageUrl}
                                      alt={project.title}
                                      className="h-full w-full object-cover object-center"
                                      loading="lazy"
                                      decoding="async"
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
                                </div>
                                <div className="flex flex-col gap-2">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[10px] font-bold uppercase tracking-widest text-brand-accent">
                                      {project.category}
                                    </span>
                                    <span className="text-[10px] font-mono text-brand-secondary">{String(idx + 1).padStart(2, '0')}</span>
                                  </div>
                                </div>
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
      {lightboxProject?.slides ? (
        <SlideViewer
          slides={lightboxProject.slides}
          title={lightboxProject.title}
          onClose={() => setLightboxProject(null)}
        />
      ) : lightboxProject && (
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
