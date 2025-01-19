"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaPython,
  FaJava,
  FaHtml5,
  FaCss3,
  FaJs,
  FaVuejs,
  FaAngular,
  FaSwift,
  FaRust,
} from "react-icons/fa";
import {
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiRuby,
  SiKotlin,
} from "react-icons/si";

const icons = [
  { Icon: FaReact, color: "#61DAFB" },
  { Icon: FaNodeJs, color: "#339933" },
  { Icon: FaPython, color: "#3776AB" },
  { Icon: FaJava, color: "#007396" },
  { Icon: FaHtml5, color: "#E34F26" },
  { Icon: FaCss3, color: "#1572B6" },
  { Icon: FaJs, color: "#F7DF1E" },
  { Icon: FaVuejs, color: "#4FC08D" },
  { Icon: FaAngular, color: "#DD0031" },
  { Icon: FaSwift, color: "#FA7343" },
  { Icon: FaRust, color: "#000000" },
  { Icon: SiJavascript, color: "#F7DF1E" },
  { Icon: SiTypescript, color: "#3178C6" },
  { Icon: SiCplusplus, color: "#00599C" },
  { Icon: SiRuby, color: "#CC342D" },
  { Icon: SiKotlin, color: "#0095D5" },
];

interface FloatingIcon {
  Icon: React.ElementType;
  color: string;
  x: number;
  y: number;
  size: number;
  duration: number;
}

export function FloatingIcons() {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);

  useEffect(() => {
    const newIcons = icons.map((icon) => ({
      ...icon,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 30 + 20,
      duration: Math.random() * 10 + 5, // Faster movement
    }));
    setFloatingIcons(newIcons);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {floatingIcons.map((icon, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            color: icon.color,
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            fontSize: `${icon.size}px`,
          }}
          animate={{
            y: ["-50%", "50%", "-50%", "50%"],
            x: ["-50%", "50%", "-50%", "50%"],
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <icon.Icon />
        </motion.div>
      ))}
    </div>
  );
}
