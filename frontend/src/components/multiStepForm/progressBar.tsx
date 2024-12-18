"use client"
import { useEffect, useState } from "react"

export default function ProgressBar() {
  const [progress, setProgress] = useState(0)
  const maxProgress = 100
  const duration = 4

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= maxProgress) {
          clearInterval(interval)
          return maxProgress
        }
        return prevProgress + (maxProgress / duration)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [maxProgress, duration])

  return (
    <div className="relative w-full h-4 bg-white rounded-full">
      <div
        className="absolute top-0 left-0 h-4 bg-green-500 rounded-full"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  )
}