import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Folder, ShoppingBag, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

interface ProjectItem {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<ProjectItem[]>([]);

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-[#FFF9FB]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 text-sakura-deep font-medium mb-4">
            <Folder className="w-5 h-5" />
            <span className="uppercase tracking-widest text-sm">Portfolio</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-900">Creative Projects</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {projects.map((project, index) => {
            const isDIY = project.title.toLowerCase().includes("diy");
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-xl shadow-sakura-dusty/5 border border-sakura-light/20 hover:shadow-2xl hover:shadow-sakura-dusty/10 transition-all hover:scale-[1.02]"
              >
                <div className="aspect-video overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="p-8">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-[10px] uppercase tracking-widest font-bold text-sakura-deep bg-sakura-light/20 px-2 py-1 rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="text-2xl font-serif text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-500 text-sm mb-6 font-light leading-relaxed">
                    {project.description}
                  </p>
                  
                  {isDIY ? (
                    <motion.div whileHover={{ x: 5 }}>
                      <Link
                        to="/gallery"
                        className="inline-flex items-center gap-2 text-sakura-deep font-medium hover:text-sakura-accent transition-colors"
                      >
                        <span>View Product</span>
                        <ShoppingBag className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  ) : (
                    <div className="h-6" /> // Placeholder to keep spacing consistent
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
