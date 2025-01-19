"use client";

import { ProjectCard } from "./project-card";

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    liveUrl: "https://example.com",
    githubUrl: "https://github.com/example/ecommerce",
  },
  {
    id: 2,
    title: "AI-powered Chatbot",
    description:
      "An intelligent chatbot powered by natural language processing. Built with Python and TensorFlow, integrated into a React frontend for seamless user interaction.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    technologies: ["Python", "TensorFlow", "React", "Flask"],
    liveUrl: "https://example.com/chatbot",
    githubUrl: "https://github.com/example/chatbot",
  },
  {
    id: 3,
    title: "Blockchain Voting System",
    description:
      "A secure and transparent voting system built on Ethereum blockchain. Includes smart contracts for vote tallying and a user-friendly web interface.",
    images: ["/placeholder.svg", "/placeholder.svg", "/placeholder.svg"],
    technologies: ["Solidity", "Ethereum", "Web3.js", "React"],
    githubUrl: "https://github.com/example/blockchain-voting",
  },
  {
    id: 4,
    title: "Task Management App",
    description:
      "A collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    images: ["/placeholder.svg", "/placeholder.svg"],
    technologies: ["React", "Redux", "Socket.io", "Express"],
    liveUrl: "https://example.com/task-app",
    githubUrl: "https://github.com/example/task-management",
  },
  {
    id: 5,
    title: "Weather Forecast Dashboard",
    description:
      "A responsive weather forecast dashboard that provides real-time weather information, interactive maps, and historical data visualization.",
    images: ["/placeholder.svg"],
    technologies: ["Vue.js", "D3.js", "OpenWeatherMap API"],
    liveUrl: "https://example.com/weather",
    githubUrl: "https://github.com/example/weather-dashboard",
  },
];
export function Projects() {
  return (
    <div className="container w-full" id="projects">
      <h3 className="text-3xl font-bold mb-8 text-white text-center">
        Featured Projects
      </h3>
      <div className="grid backdrop-blur-md bg-white/30 dark:bg-black/30 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
