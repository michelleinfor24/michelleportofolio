import { motion } from "motion/react";
import { Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const isGallery = location.pathname === "/gallery";

  const navItems = [
    { name: "Home", href: "/#home" },
    { name: "About", href: "/#about" },
    { name: "Experience", href: "/#experience" },
    { name: "Portfolio", href: "/#portfolio" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-2xl"
    >
      <div className="glass rounded-full px-6 py-3 flex items-center justify-between shadow-sm border border-white/40">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sakura-base rounded-full flex items-center justify-center">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
          <span className="font-serif font-semibold text-sakura-accent hidden sm:block">
            Michelle L.
          </span>
        </Link>

        <div className="flex items-center gap-6">
          {navItems.map((item) => (
            isGallery ? (
              <motion.div key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Link
                  to={item.href}
                  className="text-sm font-medium text-gray-600 hover:text-sakura-deep transition-colors"
                >
                  {item.name}
                </Link>
              </motion.div>
            ) : (
              <motion.div key={item.name} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <a
                  href={item.href.replace("/", "")}
                  className="text-sm font-medium text-gray-600 hover:text-sakura-deep transition-colors"
                >
                  {item.name}
                </a>
              </motion.div>
            )
          ))}
        </div>
      </div>
    </motion.nav>
  );
}
