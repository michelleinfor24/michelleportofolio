import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Briefcase } from "lucide-react";

interface ExperienceItem {
  id: number;
  title: string;
  company: string;
  period: string;
  description: string;
  image?: string;
}

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    fetch("/api/experiences")
      .then((res) => res.json())
      .then((data) => setExperiences(data))
      .catch((err) => console.error("Error fetching experiences:", err));
  }, []);

  return (
    <section id="experience" className="py-24 bg-[#FFF9FB]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-sakura-deep font-medium mb-4">
            <Briefcase className="w-5 h-5" />
            <span className="uppercase tracking-widest text-sm">Journey</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Experience & Achievements</h2>
        </div>

        <div className="max-w-5xl mx-auto space-y-12">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center glass p-8 rounded-3xl border-white/60 shadow-xl shadow-sakura-dusty/5"
            >
              <div className="order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-4">
                  <span className="px-4 py-1 rounded-full bg-sakura-light/30 text-sakura-accent text-xs font-bold uppercase tracking-widest">
                    {exp.period}
                  </span>
                </div>
                <h3 className="text-3xl font-serif text-gray-900 mb-2">{exp.title}</h3>
                <p className="text-sakura-deep font-medium mb-6 text-lg italic">{exp.company}</p>
                <p className="text-gray-600 leading-relaxed font-light text-lg">
                  {exp.description}
                </p>
              </div>
              
              {exp.image && (
                <div className="order-1 lg:order-2 aspect-video rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                  <img 
                    src={exp.image} 
                    alt={exp.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
