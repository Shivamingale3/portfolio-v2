"use client";

import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";

export function Navbar() {
  const [isOpen, setIsOpen]: [boolean, Dispatch<SetStateAction<boolean>>] =
    useState(false);

  return (
    <header className="fixed w-full z-10 backdrop-blur bg-white/30 dark:bg-black/30 pt-5">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex w-full justify-between items-center">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-gray-800 dark:text-white"
          >
            Shivam Ingale
          </motion.h1>
          <div className="hidden md:flex items-center space-x-4">
            <NavItems setIsOpen={setIsOpen} isOpen={isOpen} />
          </div>
          <button
            className="md:hidden text-gray-800 dark:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden mt-4 bg-white/90 dark:bg-black/90 rounded-lg shadow-lg py-4"
          >
            <div className="flex flex-col space-y-4 items-center">
              <NavItems setIsOpen={setIsOpen} isOpen={isOpen} />
            </div>
          </motion.div>
        )}
      </nav>
    </header>
  );
}

function NavItems({
  setIsOpen,
  isOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isOpen: boolean;
}) {
  const navItems = [
    { name: "", route: "#profile" },
    { name: "About", route: "#about" },
    { name: "Projects", route: "#projects" },
    { name: "Skills", route: "#skills" },
    { name: "Education", route: "#education" },
    { name: "Experience", route: "#experience" },
    { name: "Contact Me", route: "#contact-me" },
  ];

  return (
    <>
      {navItems
        .filter((item) => item.name)
        .map((item) => (
          <a
            onClick={() => setIsOpen(!isOpen)}
            key={item.name}
            href={item.route}
            className="text-gray-800 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
          >
            {item.name}
          </a>
        ))}
    </>
  );
}
