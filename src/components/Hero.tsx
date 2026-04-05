import { motion } from "motion/react";
import { Sparkles } from "lucide-react";

export default function Hero() {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden sakura-gradient">
      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 left-10 w-24 h-24 bg-sakura-light/30 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            y: [0, 20, 0],
            rotate: [0, -5, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 right-10 w-32 h-32 bg-sakura-dusty/30 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-6 text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 border border-sakura-light text-sakura-accent text-sm font-medium mb-8"
        >
          <Sparkles className="w-4 h-4" />
          <span>Welcome to my digital space</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-serif text-gray-900 mb-6 leading-tight"
        >
          Michelle <span className="text-sakura-deep italic">Laurentia</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-10 font-light tracking-wide"
        >
          Creative Student & Aspiring Developer crafting elegant digital experiences with a touch of grace.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: "#D481A2" }}
            whileTap={{ scale: 0.95 }}
            href="#portfolio"
            className="px-8 py-4 rounded-full bg-sakura-deep text-white font-medium shadow-lg shadow-sakura-deep/20 transition-all"
          >
            View Portfolio
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.6)" }}
            whileTap={{ scale: 0.95 }}
            href="#about"
            className="px-8 py-4 rounded-full glass text-sakura-accent font-medium transition-all"
          >
            About Me
          </motion.a>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-sakura-dusty rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-sakura-deep rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
