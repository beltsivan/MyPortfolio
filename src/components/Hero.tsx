import { motion } from 'motion/react';
import { ArrowDownRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-20 overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-[radial-gradient(circle_at_50%_-20%,#3b82f633,transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start"
        >
          <span className="text-sm font-bold tracking-[0.2em] uppercase text-brand-accent mb-6">
            Graphic & Web Designer / Portfolio
          </span>
          
          <h1 className="text-[12vw] md:text-[10vw] font-display font-black leading-[0.85] tracking-tighter uppercase mb-8">
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="block"
            >
              CREATE.

            </motion.span>
            <motion.span
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="block text-gradient"
            >
              DESIGN.
            </motion.span>
            <motion.span
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="block"
            >
              BUILD.
            </motion.span>
          </h1>

          <div className="flex flex-col md:flex-row items-start md:items-end w-full justify-between gap-12">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 0.8 }}
              className="max-w-3xl text-lg text-brand-secondary leading-relaxed"
            >
              I am Ivan Matew M. Beltran living in Tayud, Liloan, Cebu, Philippines. I create compelling visual identities, engaging graphic designs, and modern web solutions that balance creativity, functionality, and performance. 
              I embrace AI to enhance efficiency and accelerate innovation while maintaining a thoughtful, human-centered approach to every project.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-16 h-16 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-brand-primary group-hover:text-background transition-all duration-300">
                <ArrowDownRight size={32} />
              </div>
              <span className="font-display font-medium uppercase tracking-wider text-sm">
                Scroll to explore
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Aesthetic floaters */}
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-10 w-64 h-64 glass rounded-full blur-3xl -z-10 opacity-30"
      />
    </section>
  );
}
