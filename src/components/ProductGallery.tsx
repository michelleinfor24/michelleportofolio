import { motion } from "motion/react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

export default function ProductGallery() {
  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Assuming user will upload diy1.jpeg, diy2.jpeg, etc.
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    url: `/diy${i + 1}.jpeg`,
    alt: `Handmade DIY Product ${i + 1}`,
  }));

  return (
    <div className="min-h-screen bg-[#FFF9FB] py-20 px-6">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sakura-deep hover:text-sakura-accent transition-colors font-medium mb-8"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-6 h-6 text-sakura-deep" />
            <h1 className="text-4xl md:text-6xl font-serif text-gray-900">DIY Product Gallery</h1>
          </div>
          <p className="text-gray-500 font-light text-lg max-w-2xl">
            A collection of handmade aesthetic accessories, crafted with care and creativity.
          </p>
        </motion.div>

        {/* Standard Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="relative"
            >
              <div className="relative group overflow-hidden rounded-2xl border-4 border-white shadow-lg shadow-sakura-dusty/5 hover:shadow-xl hover:shadow-sakura-dusty/10 transition-all aspect-square">
                <img
                  src={product.url}
                  alt={product.alt}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://picsum.photos/seed/diy${product.id}/600/600`;
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
