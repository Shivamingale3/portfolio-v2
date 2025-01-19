"use client";

import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Education } from "@/components/education";
import { Experience } from "@/components/experience";
import { FloatingIcons } from "@/components/floating-icons";
import { Navbar } from "@/components/navbar";
import { Profile } from "@/components/profile";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-black text-white">
      <FloatingIcons />
      <Navbar />
      <main className="container mx-auto px-6 pt-24">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="py-20 text-center"
        >
          <Profile />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          id="projects"
          className="py-20"
        >
          <Projects />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          id="skills"
          className="py-20"
        >
          <Skills />
        </motion.section>

        <Education />
        <Experience />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="py-20"
        >
          <About />
        </motion.section>
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="py-20"
        >
          <Contact />
        </motion.section>
      </main>

      <footer className="bg-gray-900 py-6 mt-20">
        <div className="container mx-auto px-6 text-center text-gray-400">
          <p>© 2025 Shivam Ingale. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
