
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "~/components/ui/card"
import { Badge } from "~/components/ui/badge"
import { Button } from "~/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "~/components/ui/dialog"
import { Clock } from "lucide-react"
import { BreathingVisualizer } from "~/components/ui/breathing-visualizer"
import { breathingTechniques } from "~/data/data"



const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
  hover: {
    y: -8,
    scale: 1.02,
    transition: {
      duration: 0.2,
      ease: "easeOut",
    },
  },
}

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Beginner":
      return "bg-green-100 text-green-800"
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800"
    case "Advanced":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

export default function ExploreTechniques() {
  const [selectedTechnique, setSelectedTechnique] = useState<string | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Explore Breathing Techniques</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover powerful breathing methods to reduce stress, improve focus, and enhance your well-being
          </p>
        </motion.div>

        {/* Techniques Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Object.entries(breathingTechniques).map(([key, technique]) => {
            const IconComponent = technique.icon
            return (
              <motion.div key={key} variants={cardVariants} whileHover="hover">
                <Dialog>
                  <DialogTrigger asChild>
                    <Card className="cursor-pointer h-full bg-gradient-to-br from-yellow-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 backdrop-blur-sm border-0  hover:shadow-xl transition-shadow duration-300">
                      <CardHeader className="pb-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className={`p-3 rounded-full ${technique.color} bg-opacity-10`}>
                            <IconComponent className={`w-6 h-6  text-white`} />
                          </div>
                          <Badge className={getDifficultyColor(technique.difficulty)}>{technique.difficulty}</Badge>
                        </div>
                        <CardTitle className="text-xl mb-2">{technique.name}</CardTitle>
                        <CardDescription className="text-gray-600">{technique.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <Clock className="w-4 h-4" />
                            <span>
                              {technique.expandTime}s in • {technique.contractTime}s out
                              {technique.holdExpandTime > 0 && ` • ${technique.holdExpandTime}s hold`}
                            </span>
                          </div>

                          <Badge variant="secondary" className="text-xs">
                            {technique.category}
                          </Badge>

                          <div className="pt-2">
                            <p className="text-sm font-medium text-gray-700 mb-2">Key Benefits:</p>
                            <ul className="text-xs text-gray-600 space-y-1">
                              {technique.benefits.slice(0, 2).map((benefit, index) => (
                                <li key={index} className="flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                                  {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </DialogTrigger>

                  <DialogContent >
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-3 text-2xl">
                        <div className={`p-2 rounded-full ${technique.color} bg-opacity-10`}>
                          <IconComponent className={`w-6 h-6 text-white`} />
                        </div>
                        {technique.name}
                      </DialogTitle>
                    </DialogHeader>

                    <div className="space-y-6 pt-4">
                      <p className="text-gray-600 text-lg">{technique.description}</p>

                      <div className="flex flex-wrap gap-2">
                        <Badge className={getDifficultyColor(technique.difficulty)}>{technique.difficulty}</Badge>
                        <Badge variant="secondary">{technique.category}</Badge>
                      </div>

                      {/* Breathing Visualizer */}
                      <div className="flex justify-center py-8">
                        <BreathingVisualizer
                          color={technique.color}
                          expandTime={technique.expandTime}
                          contractTime={technique.contractTime}
                          holdExpandTime={technique.holdExpandTime}
                          holdContractTime={technique.holdContractTime}
                          size={150}
                          soundSrc="/flute.mp3"
                        />
                      </div>   

                     
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            )
          })}
        </motion.div>

       
      </div>
    </div>
  )
}
