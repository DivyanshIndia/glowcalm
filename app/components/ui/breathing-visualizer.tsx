"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "./button"
import { Badge } from "./badge"
import { Play, Pause, RotateCcw } from "lucide-react"
import { useSound } from "~/hooks/use-sound"

interface BreathingVisualizerProps {
  color?: string
  expandTime?: number
  contractTime?: number
  holdExpandTime?: number
  holdContractTime?: number
  size?: number
  className?: string
  soundSrc?: string
}

type BreathingPhase = "expand" | "hold-expand" | "contract" | "hold-contract"

export function BreathingVisualizer({
  color = "bg-blue-500",
  expandTime = 4,
  contractTime = 4,
  holdExpandTime = 0,
  holdContractTime = 0,
  size = 200,
  className = "",
  soundSrc
}: BreathingVisualizerProps) {
  const [isActive, setIsActive] = useState(false)
  const [currentPhase, setCurrentPhase] = useState<BreathingPhase>("expand")
  const [cycleCount, setCycleCount] = useState(0)

  // Use the sound hook only if soundSrc is provided
  const { play, pause, stop } = useSound(soundSrc, { loop: true })

  useEffect(() => {
    if (!soundSrc) return
    if (isActive) {
      play()
    } else {
      pause()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive, soundSrc])

  const totalCycleTime = expandTime + holdExpandTime + contractTime + holdContractTime

  useEffect(() => {
    if (!isActive) return

    const phases: BreathingPhase[] = []
    const durations: number[] = []

    // Add expand phase
    phases.push("expand")
    durations.push(expandTime)

    // Add hold after expand if specified
    if (holdExpandTime > 0) {
      phases.push("hold-expand")
      durations.push(holdExpandTime)
    }

    // Add contract phase
    phases.push("contract")
    durations.push(contractTime)

    // Add hold after contract if specified
    if (holdContractTime > 0) {
      phases.push("hold-contract")
      durations.push(holdContractTime)
    }

    let currentPhaseIndex = 0
    let timeoutId: NodeJS.Timeout

    const nextPhase = () => {
      setCurrentPhase(phases[currentPhaseIndex])

      timeoutId = setTimeout(() => {
        currentPhaseIndex = (currentPhaseIndex + 1) % phases.length
        if (currentPhaseIndex === 0) {
          setCycleCount((prev) => prev + 1)
        }
        nextPhase()
      }, durations[currentPhaseIndex] * 1000)
    }

    nextPhase()

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isActive, expandTime, contractTime, holdExpandTime, holdContractTime])

  const getScale = () => {
    switch (currentPhase) {
      case "expand":
      case "hold-expand":
        return 1.5
      case "contract":
      case "hold-contract":
        return 0.8
      default:
        return 1
    }
  }

  const getAnimationDuration = () => {
    switch (currentPhase) {
      case "expand":
        return expandTime
      case "contract":
        return contractTime
      case "hold-expand":
        return holdExpandTime
      case "hold-contract":
        return holdContractTime
      default:
        return 1
    }
  }

  const getPhaseText = () => {
    switch (currentPhase) {
      case "expand":
        return "Inhale"
      case "hold-expand":
        return "Hold"
      case "contract":
        return "Exhale"
      case "hold-contract":
        return "Hold"
      default:
        return "Ready"
    }
  }

  const reset = () => {
    setIsActive(false)
    setCurrentPhase("expand")
    setCycleCount(0)
    stop()
  }

  return (
    <div className={`flex flex-col items-center space-y-6 ${className}`}>
      <div className="relative flex items-center justify-center" style={{ width: size * 2, height: size * 2 }}>
        <motion.div
          className={`rounded-full ${color} shadow-lg`}
          style={{ width: size, height: size }}
          animate={{
            scale: isActive ? getScale() : 1,
          }}
          transition={{
            duration: isActive ? getAnimationDuration() : 0.5,
            ease: currentPhase.includes("hold") ? "linear" : "easeInOut",
          }}
        />

        {/* Breathing instruction text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white font-semibold">
            <div className="text-lg">{isActive ? getPhaseText() : "Ready"}</div>
            {isActive && <div className="text-sm opacity-80">{Math.ceil(getAnimationDuration())}s</div>}
          </div>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <Button onClick={() => setIsActive(!isActive)} variant={isActive ? "secondary" : "default"} size="lg">
          {isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isActive ? "Pause" : "Start"}
        </Button>

        <Button onClick={reset} variant="outline" size="lg">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {cycleCount > 0 && (
        <Badge variant="secondary" className="text-sm">
          Cycles completed: {cycleCount}
        </Badge>
      )}
    </div>
  )
}


