"use client";

import { motion } from "framer-motion";
import { FaAws, FaDocker, FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { SiGraphql, SiMongodb, SiTypescript } from "react-icons/si";

const skills = [
  { name: "React", icon: FaReact, level: 90, color: "#61DAFB" },
  { name: "Node.js", icon: FaNodeJs, level: 85, color: "#339933" },
  { name: "TypeScript", icon: SiTypescript, level: 80, color: "#3178C6" },
  { name: "Python", icon: FaPython, level: 75, color: "#3776AB" },
  { name: "Docker", icon: FaDocker, level: 70, color: "#2496ED" },
  { name: "AWS", icon: FaAws, level: 65, color: "#FF9900" },
  { name: "GraphQL", icon: SiGraphql, level: 60, color: "#E10098" },
  { name: "MongoDB", icon: SiMongodb, level: 55, color: "#47A248" },
];
export function Skills() {
  return (
    <div className="container w-full" id="skills">
      <h3 className="text-3xl font-bold mb-8 text-white text-center">Skills</h3>
      <div className="grid backdrop-blur-md bg-white/30 dark:bg-black/30 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {skills.map((skill) => (
          <motion.div
            key={skill.name}
            whileHover={{ scale: 1.05 }}
            className="bg-gray-900 rounded-lg p-6 text-center transition-all duration-300 ease-in-out hover:shadow-xl dark"
          >
            <skill.icon
              className="w-12 h-12 mx-auto mb-4"
              style={{ color: skill.color }}
            />
            <h4 className="text-xl font-semibold mb-2 text-white">
              {skill.name}
            </h4>
            <div className="w-full bg-gray-700 rounded-full h-2.5">
              <div
                className="h-2.5 rounded-full"
                style={{
                  width: `${skill.level}%`,
                  backgroundColor: skill.color,
                }}
              ></div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
