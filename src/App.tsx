import CustomCursor from "./components/CustomCursor";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import ProductGallery from "./components/ProductGallery";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

const SakuraParticle = ({ delay }: { delay: number; key?: any }) => (
  <motion.div
    initial={{ y: -20, x: Math.random() * 100 + "%", opacity: 0, rotate: 0 }}
    animate={{ 
      y: "110vh", 
      x: (Math.random() * 100 - 50) + "%", 
      opacity: [0, 0.15, 0.15, 0],
      rotate: 360 
    }}
    transition={{ 
      duration: 20 + Math.random() * 10, 
      repeat: Infinity, 
      delay,
      ease: "linear" 
    }}
    className="fixed pointer-events-none z-0 text-sakura-light/10 text-lg"
  >
    🌸
  </motion.div>
);

function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace("#", ""));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname, hash]);

  return null;
}

function HomePage() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <Hero />
      
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <About />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Experience />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Skills />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <Projects />
      </motion.div>
    </motion.main>
  );
}

export default function App() {
  const [particles, setParticles] = useState<number[]>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 6 }, (_, i) => i * 5));
  }, []);

  return (
    <BrowserRouter>
      <AnimatePresence>
        <div className="relative min-h-screen overflow-x-hidden bg-[#FFF9FB]">
          {/* Subtle Sakura Rain Background */}
          {particles.map((delay, i) => (
            <SakuraParticle key={i} delay={delay} />
          ))}

          <CustomCursor />
          <Navbar />
          <ScrollToHash />
          
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/gallery" element={<ProductGallery />} />
          </Routes>

          <Footer />
        </div>
      </AnimatePresence>
    </BrowserRouter>
  );
}
