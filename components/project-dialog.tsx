"use client"

import { useState } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Image from "next/image"

interface ProjectDialogProps {
  project: {
    id: number
    title: string
    description: string
    images: string[]
    video?: string
    technologies: string[]
  }
}

export function ProjectDialog({ project }: ProjectDialogProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="h-48 bg-gray-300 dark:bg-gray-700 relative">
          <Image
            src={project.images[0] || "/placeholder.svg"}
            alt={project.title}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="p-6">
          <h4 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
            {project.title}
          </h4>
          <p className="text-gray-600 dark:text-gray-300">
            {project.description.substring(0, 100)}...
          </p>
        </div>
      </motion.div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[800px]">
          <DialogHeader>
            <DialogTitle>{project.title}</DialogTitle>
            <DialogDescription>
              {project.description}
            </DialogDescription>
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
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, index) => (
                <span key={index} className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-sm">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="flex justify-end">
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

