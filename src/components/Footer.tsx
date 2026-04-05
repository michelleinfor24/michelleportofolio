import { Heart, Instagram, Github, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="py-16 bg-white border-t border-sakura-light/30">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center text-center md:text-left">
          <div>
            <h3 className="text-2xl font-serif text-sakura-accent mb-4">Michelle Laurentia</h3>
            <p className="text-gray-500 font-light max-w-xs mx-auto md:mx-0">
              Crafting digital experiences with grace, elegance, and technical curiosity.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-6">
              <a href="https://instagram.com/dreamchies_" className="text-sakura-deep hover:text-sakura-accent transition-all hover:scale-110">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="https://github.com/michelleinfor24" className="text-sakura-deep hover:text-sakura-accent transition-all hover:scale-110">
                <Github className="w-6 h-6" />
              </a>
              <a href="mailto:michelle.infor24@gmail.com" className="text-sakura-deep hover:text-sakura-accent transition-all hover:scale-110">
                <Mail className="w-6 h-6" />
              </a>
            </div>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Phone className="w-4 h-4" />
              <span>0812 2220 8685</span>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p className="text-gray-400 text-sm mb-2">© 2026 Michelle Laurentia</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
