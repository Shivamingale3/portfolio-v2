"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface ProjectCardProps {
  project: {
    id: number
    title: string
    description: string
    images: string[]
    video?: string
    technologies: string[]
    liveUrl?: string
    githubUrl?: string
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="h-48 bg-gray-700 relative">
          <Image
            src={project.images[0] || "/placeholder.svg"}
            alt={project.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-6">
          <h4 className="text-xl font-semibold mb-2 text-white">
            {project.title}
          </h4>
          <p className="text-gray-300 mb-4">
            {project.description.substring(0, 100)}...
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech, index) => (
              <span key={index} className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs">
                {tech}
              </span>
            ))}
            {project.technologies.length > 3 && (
              <span className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs">
                +{project.technologies.length - 3}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gray-800 text-white sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              {project.images.map((image, index) => (
                <div key={index} className="relative h-48">
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${project.title} image ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
              ))}
            </div>
            {project.video && (
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  src={project.video}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full rounded-lg"
                ></iframe>
              </div>
            )}
            <p className="text-gray-300">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-blue-500 text-white rounded-full text-xs">
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex justify-end space-x-2">
              {project.liveUrl && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">View Live</a>
                </Button>
              )}
              {project.githubUrl && (
                <Button variant="outline" asChild>
                  <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">GitHub</a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

