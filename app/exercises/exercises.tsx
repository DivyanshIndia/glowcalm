import { useState, useRef, useEffect } from "react"
import { BreathingVisualizer } from "~/components/ui/breathing-visualizer"
import { Card, CardContent } from "~/components/ui/card"
import { ScrollArea } from "~/components/ui/scroll-area"
import { ChevronDown } from "lucide-react"
import { breathingTechniques } from "~/data/data"

export default function Exercises() {
  const [selectedTechnique, setSelectedTechnique] = useState<keyof typeof breathingTechniques>("boxBreathing")
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const currentTechnique = breathingTechniques[selectedTechnique]

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  return (
    <div className="md:h-screen p-4 md:p-6 flex flex-col animated-gradient">

    <div className="md:h-screen p-4 md:p-6 flex flex-col">
      <div className="flex-1 mx-auto w-full max-w-7xl flex flex-col">
        <div className="flex flex-col lg:flex-row gap-6 flex-1">
          {/* Visualizer section */}
          <div className="w-full flex-1">
            <Card className="h-full bg-transparent border-0 shadow-none">
              <CardContent className="p-6 md:p-8 h-full">
                <div className="flex flex-col items-center justify-center h-full space-y-6">
                  {/* Technique name as dropdown trigger */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className="flex items-center gap-2 text-2xl font-semibold text-slate-900 hover:text-slate-700 transition-colors"
                    >
                      {currentTechnique.name}
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${isDropdownOpen ? "transform rotate-180" : ""}`}
                      />
                    </button>

                    {isDropdownOpen && (
                      <div className="absolute z-10 mt-2 w-80 bg-white rounded-lg shadow-lg border border-slate-200 left-1/2 transform -translate-x-1/2">
                        <ScrollArea className="h-64">
                          <div className="p-2">
                            {Object.entries(breathingTechniques).map(([key, technique]) => (
                              <div
                                key={key}
                                className={`p-3 rounded-md cursor-pointer transition-colors hover:bg-slate-50 ${
                                  selectedTechnique === key ? "bg-slate-100" : ""
                                }`}
                                onClick={() => {
                                  setSelectedTechnique(key as keyof typeof breathingTechniques)
                                  setIsDropdownOpen(false)
                                }}
                              >
                                <div className="font-medium text-slate-900">{technique.name}</div>
                                <div className="text-sm text-slate-600 mt-1">{technique.description}</div>
                                <div className="flex flex-wrap gap-2 text-xs text-slate-500 mt-2">
                                  <span>In: {technique.expandTime}s</span>
                                  {technique.holdExpandTime > 0 && <span>Hold: {technique.holdExpandTime}s</span>}
                                  <span>Out: {technique.contractTime}s</span>
                                  {technique.holdContractTime > 0 && <span>Hold: {technique.holdContractTime}s</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </div>
                    )}
                  </div>

                  <p className="text-slate-600 text-center max-w-md">{currentTechnique.description}</p>

                  <div className="flex items-center justify-center flex-1">
                    <BreathingVisualizer
                      color={currentTechnique.color}
                      expandTime={currentTechnique.expandTime}
                      contractTime={currentTechnique.contractTime}
                      holdExpandTime={currentTechnique.holdExpandTime}
                      holdContractTime={currentTechnique.holdContractTime}
                      size={200}
                      soundSrc="/nature.mp3"
                    />
                  </div>

                  <div className="text-sm text-slate-500 space-y-1 text-center max-w-md">
                    <p>
                      Timing: Inhale {currentTechnique.expandTime}s
                      {currentTechnique.holdExpandTime > 0 && ` → Hold ${currentTechnique.holdExpandTime}s`} → Exhale{" "}
                      {currentTechnique.contractTime}s
                      {currentTechnique.holdContractTime > 0 && ` → Hold ${currentTechnique.holdContractTime}s`}
                    </p>
                    <p>Find a comfortable position and breathe naturally with the visualization</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

