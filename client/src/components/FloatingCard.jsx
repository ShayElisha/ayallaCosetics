import { motion } from 'framer-motion'
import { useState } from 'react'

const FloatingCard = ({ children, delay = 0, ...props }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, rotateX: -10 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        rotateX: 0,
      }}
      transition={{ 
        duration: 0.8,
        delay,
        type: "spring",
        stiffness: 100
      }}
      whileHover={{
        y: -20,
        rotateX: 5,
        rotateY: isHovered ? 5 : 0,
        scale: 1.05,
        transition: { duration: 0.3 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      {...props}
    >
      <div
        style={{
          transformStyle: 'preserve-3d',
          transform: 'translateZ(50px)',
        }}
      >
        {children}
      </div>
    </motion.div>
  )
}

export default FloatingCard

