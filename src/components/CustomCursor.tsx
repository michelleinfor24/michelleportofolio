import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "motion/react";

export default function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useSpring(0, { stiffness: 400, damping: 40 });
  const mouseY = useSpring(0, { stiffness: 400, damping: 40 });

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isClickable = 
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("group"); // For gallery items

      setIsHovering(!!isClickable);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main Bow Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      >
        <motion.div
          animate={{
            scale: isHovering ? 1.8 : 1.2,
            rotate: isHovering ? [0, -10, 10, 0] : 0,
          }}
          transition={{
            rotate: isHovering ? { repeat: Infinity, duration: 2 } : { duration: 0.3 }
          }}
          className="relative"
        >
          {/* Aesthetic Coquette Bow SVG */}
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-md filter"
          >
            {/* Left Loop */}
            <path
              d="M24 24C24 24 10 12 6 18C2 24 10 30 16 26C20 23.3333 24 24 24 24Z"
              fill={isHovering ? "#D481A2" : "#F8C8DC"}
              stroke="#D481A2"
              strokeWidth="1.5"
            />
            {/* Right Loop */}
            <path
              d="M24 24C24 24 38 12 42 18C46 24 38 30 32 26C28 23.3333 24 24 24 24Z"
              fill={isHovering ? "#D481A2" : "#F8C8DC"}
              stroke="#D481A2"
              strokeWidth="1.5"
            />
            {/* Left Tail */}
            <path
              d="M22 26C22 26 18 36 12 38C10 38.6667 14 34 16 32"
              stroke="#D481A2"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Right Tail */}
            <path
              d="M26 26C26 26 30 36 36 38C38 38.6667 34 34 32 32"
              stroke="#D481A2"
              strokeWidth="2"
              strokeLinecap="round"
            />
            {/* Center Knot */}
            <circle cx="24" cy="24" r="3" fill="#D481A2" />
            <circle cx="24" cy="24" r="1.5" fill="#F8C8DC" opacity="0.5" />
          </svg>
        </motion.div>
      </motion.div>

      {/* Trail/Glow Effect */}
      <motion.div
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.4 : 0.2,
        }}
        className="fixed top-0 left-0 pointer-events-none z-[9998] w-12 h-12 rounded-full bg-sakura-light blur-2xl"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />
    </>
  );
}
