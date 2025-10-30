import { motion, useScroll, useTransform } from 'framer-motion'
import { FaStar, FaArrowDown } from 'react-icons/fa'

const Hero = () => {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 500], [0, 150])
  const y2 = useTransform(scrollY, [0, 500], [0, -150])
  const scale = useTransform(scrollY, [0, 500], [1, 1.2])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const scrollToServices = () => {
    const element = document.getElementById('services')
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-pink-400"
      style={{ perspective: '1000px' }}
    >
      {/* 3D Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ y: y1, scale }}
          animate={{
            rotateX: [0, 360],
            rotateY: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute top-20 right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2, scale }}
          animate={{
            rotateX: [360, 0],
            rotateY: [360, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute bottom-20 left-20 w-96 h-96 bg-pink-300/10 rounded-full blur-3xl"
        />
        
        {/* Additional 3D floating shapes */}
        <motion.div
          animate={{
            y: [0, -30, 0],
            rotateZ: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-3xl blur-xl transform rotate-45"
        />
        <motion.div
          animate={{
            y: [0, 40, 0],
            rotateZ: [360, 180, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-br from-pink-300/20 to-red-400/20 rounded-full blur-2xl"
        />
      </div>

      <motion.div 
        className="container mx-auto px-4 relative z-10"
        style={{ opacity }}
      >
        <div className="text-center text-white" style={{ transformStyle: 'preserve-3d' }}>
          {/* Small Badge with 3D effect */}
          <motion.div
            initial={{ opacity: 0, y: 20, rotateX: -90 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            transition={{ duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05, rotateY: 5 }}
            className="inline-flex items-center space-x-2 space-x-reverse bg-white/20 backdrop-blur-md px-6 py-2 rounded-full mb-6 shadow-lg"
            style={{ transform: 'translateZ(50px)' }}
          >
            <span className="flex space-x-1 space-x-reverse">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-300 text-sm" />
              ))}
            </span>
            <span className="text-sm font-medium">מספר 1 בתחום הקוסמטיקה</span>
          </motion.div>

          {/* Main Heading with 3D depth */}
          <motion.h1
            initial={{ opacity: 0, y: 30, z: -100 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
            whileHover={{ scale: 1.02, z: 50 }}
            className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            style={{ 
              transform: 'translateZ(100px)',
              textShadow: '0 10px 30px rgba(0,0,0,0.3)'
            }}
          >
            <span className="font-serif">Ayalla</span>
            <br />
            <span className="font-light">Cosmetics</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl lg:text-3xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            טיפולי קוסמטיקה מתקדמים ומקצועיים
            <br />
            <span className="text-lg md:text-xl">
              גבות • הסרת שיער • חומצה היאלורונית • עיצוב שפתיים • טיפולי פנים
            </span>
          </motion.p>

          {/* CTA Buttons with 3D effects */}
          <motion.div
            initial={{ opacity: 0, y: 30, z: -50 }}
            animate={{ opacity: 1, y: 0, z: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 sm:space-x-reverse mb-16"
            style={{ transform: 'translateZ(75px)' }}
          >
            <motion.button
              onClick={scrollToServices}
              whileHover={{ scale: 1.05, y: -5, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-primary-600 px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-3xl transition-all w-full sm:w-auto"
              style={{ 
                transformStyle: 'preserve-3d',
                boxShadow: '0 20px 50px rgba(0,0,0,0.3)'
              }}
            >
              גלי את השירותים שלנו
            </motion.button>
            <motion.a
              href="tel:0523190438"
              whileHover={{ scale: 1.05, y: -5, rotateX: 5 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-primary-600 transition-all w-full sm:w-auto text-center"
              style={{ 
                transformStyle: 'preserve-3d',
                boxShadow: '0 20px 50px rgba(0,0,0,0.2)'
              }}
            >
              התקשרי עכשיו
            </motion.a>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="flex flex-col items-center"
          >
            <span className="text-white/80 text-sm mb-2">גלול למטה</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="cursor-pointer"
              onClick={scrollToServices}
            >
              <FaArrowDown className="text-white text-2xl" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg
          viewBox="0 0 1440 320"
          className="w-full h-auto"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,128L48,138.7C96,149,192,171,288,165.3C384,160,480,128,576,128C672,128,768,160,864,165.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

export default Hero

