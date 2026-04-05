import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Zap } from "lucide-react";

interface SkillItem {
  id: number;
  name: string;
  category: string;
}

export default function Skills() {
  const [skills, setSkills] = useState<SkillItem[]>([]);

  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((data) => setSkills(data))
      .catch((err) => console.error("Error fetching skills:", err));
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-sakura-deep font-medium mb-4">
            <Zap className="w-5 h-5" />
            <span className="uppercase tracking-widest text-sm">Capabilities</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Technical Skills</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="px-6 py-3 rounded-full bg-sakura-light/10 border border-sakura-light/40 text-sakura-accent font-medium shadow-sm hover:shadow-md hover:bg-sakura-light/20 transition-all cursor-default"
            >
              {skill.name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
