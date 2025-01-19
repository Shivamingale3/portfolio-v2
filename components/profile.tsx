import { useEffect, useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

export function Profile() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-8 backdrop-blur-md bg-white/30 dark:bg-black/30 border-[0.1px] border-solid border-gray-700 rounded-2xl p-16 m-20">
      <div className="w-100 h-100  overflow-hidden flex items-center justify-center">
        {mounted && (
          <img
            src="/profile.png" // Path to your image in the public directory
            alt="Profile Avatar"
            className="w-full h-full object-cover"
          />
        )}
      </div>
      <div className="text-center md:text-left">
        <h2 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          Shivam Ingale
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">
          Software Engineer
        </p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Passionate about creating innovative web solutions and exploring
          cutting-edge technologies. With expertise in React, Node.js, and cloud
          platforms, I strive to build scalable and efficient applications.
        </p>
        <div className="flex justify-center md:justify-start space-x-4">
          <a
            href="https://github.com/Shivamingale3"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <FaGithub size={24} />
          </a>
          <a
            href="https://linkedin.com/shivam-ingale"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <FaLinkedin size={24} />
          </a>
          <a
            href="https://instagram.com/shiv_am_034"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white transition-colors"
          >
            <FaInstagram size={24} />
          </a>
        </div>
      </div>
    </div>
  );
}
