import { motion } from "motion/react";
import { APP_NAME, APP_DESCRIPTION, ROUTES,  } from "../../constants";
import { Button } from "~/components/ui/button";
import { useNavigate } from "react-router";
import { People } from "~/components/people";

export function Welcome() {
  const navigate = useNavigate()
  return (
    <main className="min-h-screen bg-gradient-to-br from-yellow-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center min-h-[80vh] space-y-12">
          {/* Header Section */}
          <motion.header 
            className="text-center space-y-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              className="flex items-center justify-center mb-8"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.2,
                type: "spring",
                stiffness: 200,
                damping: 15
              }}
            >
              <motion.div 
                className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-lg"
                animate={{ 
                  boxShadow: [
                    "0 10px 25px rgba(245, 158, 11, 0.3)",
                    "0 15px 35px rgba(245, 158, 11, 0.4)",
                    "0 10px 25px rgba(245, 158, 11, 0.3)"
                  ]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <motion.svg
                  className="w-12 h-12 text-primary-foreground"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                  animate={{ 
                  scale: [1, 1.1, 1],
                  }}
                  transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                  }}
                >
                  {/* Simple "breath" icon: stylized lungs */}
                  <path
                  d="M24 44V24M24 24C24 14 14 14 14 24V36M24 24C24 14 34 14 34 24V36"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  />
                  <path
                  d="M14 36c0 4 4 8 10 8s10-4 10-8"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.div>
            </motion.div>
            <motion.h1 
              className="text-5xl font-bold text-gray-900 dark:text-white mb-4 "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              {APP_NAME}
            </motion.h1>
            <motion.p 
              className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed "
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              {APP_DESCRIPTION}
            </motion.p>

          <motion.div className="flex items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}>
             <People/>
           </motion.div>
          </motion.header>
           

         <div className="grid grid-cols-2 gap-4 max-w-md ">
           <Button onClick={ () => navigate(ROUTES.breathe)}>Start Here</Button>
          <Button onClick={ () => navigate(ROUTES.explore)}>Explore</Button>
         </div>

          
        </div>
      </div>
    </main>
  );
}

