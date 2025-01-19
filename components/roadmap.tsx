"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'

interface RoadmapItem {
  title: string
  subtitle: string
  period: string
  description: string
  icon: React.ReactNode
}

interface RoadmapProps {
  title: string
  items: RoadmapItem[]
}

export function Roadmap({ title, items }: RoadmapProps) {
  return (
    <section className="backdrop-blur-md bg-white/30 dark:bg-black/30 py-20">
      <h2 className="text-3xl font-bold mb-12 text-center text-white">{title}</h2>
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-500" />
        {items.map((item, index) => (
          <RoadmapItem key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  )
}

function RoadmapItem({ item, index }: { item: RoadmapItem; index: number }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className={`flex items-center mb-16 ${index % 2 === 0 ? 'flex-row-reverse' : ''}`}
    >
      <div className={`w-1/2 ${index % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-gray-800 p-6 rounded-lg shadow-lg cursor-pointer relative overflow-hidden"
          onClick={() => setIsOpen(true)}
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-blue-500" />
          <div className="flex items-center mb-2">
            <div className="text-blue-500 mr-2">{item.icon}</div>
            <h3 className="text-xl font-semibold text-white">{item.title}</h3>
          </div>
          <p className="text-blue-400">{item.subtitle}</p>
          <p className="text-gray-400">{item.period}</p>
        </motion.div>
      </div>
      <div className="w-8 h-8 bg-blue-500 rounded-full absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
        <div className="w-4 h-4 bg-white rounded-full" />
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>{item.title}</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-blue-400">{item.subtitle}</p>
            <p className="text-gray-400 mb-4">{item.period}</p>
            <p className="text-gray-200">{item.description}</p>
          </div>
        </DialogContent>
      </Dialog>
    </motion.div>
  )
}

