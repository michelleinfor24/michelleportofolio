import { motion, AnimatePresence } from "motion/react";
import { User, Mail, Instagram, Github } from "lucide-react";
import { useState, useEffect } from "react";

export default function About() {
  const profilePhotos = [
    "/WhatsApp Image 2026-04-05 at 22.02.13.jpeg",
    "/WhatsApp Image 2026-04-05 at 22.02.13 (1).jpeg",
    "/WhatsApp Image 2026-04-05 at 22.02.14.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % profilePhotos.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [profilePhotos.length]);

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, label: "Email", value: "michelle.infor24@gmail.com" },
    { icon: <Instagram className="w-4 h-4" />, label: "Instagram", value: "@dreamchies_" },
    { icon: <Github className="w-4 h-4" />, label: "GitHub", value: "github.com/michelleinfor24" },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl shadow-sakura-dusty/20 border-8 border-white relative bg-sakura-light/10">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={profilePhotos[currentIndex]}
                  alt="Michelle Laurentia"
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                  className="w-full h-full object-cover absolute inset-0"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    // Fallback if local image doesn't exist yet
                    const target = e.target as HTMLImageElement;
                    if (!target.src.includes("picsum")) {
                      target.src = `https://picsum.photos/seed/michelle${currentIndex}/800/1000`;
                    }
                  }}
                />
              </AnimatePresence>
            </div>
            {/* Decorative Bow Overlay */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-sakura-light rounded-full flex items-center justify-center shadow-lg z-10">
              <span className="text-4xl">🎀</span>
            </div>
            
            {/* Carousel Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
              {profilePhotos.map((_, idx) => (
                <div 
                  key={idx}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${idx === currentIndex ? "bg-sakura-deep w-6" : "bg-white/50"}`}
                />
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 text-sakura-deep font-medium mb-4">
              <User className="w-5 h-5" />
              <span className="uppercase tracking-widest text-sm">About Me</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">
              A blend of <span className="italic text-sakura-deep">creativity</span> and technical curiosity.
            </h2>
            <p className="text-gray-600 mb-8 leading-relaxed text-lg font-light">
              Hello! I'm Michelle Laurentia, a student with a deep passion for technology and creative design. 
              I believe that digital experiences should not only be functional but also graceful and visually 
              delightful. My journey is driven by a desire to craft elegant solutions that resonate with people.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="p-6 rounded-2xl bg-sakura-light/10 border border-sakura-light/30">
                <h3 className="font-serif text-xl text-sakura-accent mb-2">Teamwork</h3>
                <p className="text-sm text-gray-500">Strong communication and collaboration skills developed through school activities.</p>
              </div>
              <div className="p-6 rounded-2xl bg-sakura-light/10 border border-sakura-light/30">
                <h3 className="font-serif text-xl text-sakura-accent mb-2">Design</h3>
                <p className="text-sm text-gray-500">A keen eye for aesthetic consistency and user-centric design principles.</p>
              </div>
            </div>

            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div key={info.label} className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-sakura-light/20 flex items-center justify-center text-sakura-deep group-hover:bg-sakura-deep group-hover:text-white transition-all">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-widest">{info.label}</p>
                    <p className="text-gray-700 font-medium">{info.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
