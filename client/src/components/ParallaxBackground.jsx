import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const ParallaxBackground = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 300])
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -300])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360])

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating 3D Shapes */}
      <motion.div
        style={{ y: y1, rotateZ: rotate }}
        className="absolute top-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-300/20 to-purple-400/20 blur-2xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-40 left-20 w-40 h-40 rounded-full bg-gradient-to-br from-primary-300/20 to-pink-300/20 blur-3xl"
      />
      <motion.div
        style={{ y: y1, rotateZ: rotate }}
        className="absolute bottom-40 right-40 w-64 h-64 rounded-full bg-gradient-to-br from-purple-300/10 to-pink-400/10 blur-3xl"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-20 left-10 w-48 h-48 rounded-full bg-gradient-to-br from-pink-400/20 to-red-300/20 blur-2xl"
      />
    </div>
  )
}

export default ParallaxBackground

