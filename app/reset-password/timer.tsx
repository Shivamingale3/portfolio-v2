import type React from "react"
import { useState, useEffect } from "react"

interface TimerProps {
  duration: number
  isActive: boolean
  onFinish: () => void
}

const Timer: React.FC<TimerProps> = ({ duration, isActive, onFinish }) => {
  const [timeLeft, setTimeLeft] = useState(duration)

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null

    if (isActive && timeLeft > 0) {
      intervalId = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalId!)
            onFinish()
            return 0
          }
          return prevTime - 1
        })
      }, 1000)
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isActive, timeLeft, onFinish])

  useEffect(() => {
    if (isActive) {
      setTimeLeft(duration)
    }
  }, [isActive, duration])

  const minutes = Math.floor(timeLeft / 60)
  const seconds = timeLeft % 60

  return (
    <div className="text-sm font-medium text-white">
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  )
}

export default Timer

