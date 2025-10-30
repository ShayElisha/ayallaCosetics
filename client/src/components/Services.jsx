import { motion, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useState } from 'react'
import { 
  FaEye, 
  FaFeatherAlt, 
  FaSyringe, 
  FaSprayCan,
  FaUserMd 
} from 'react-icons/fa'
import { GiLips, GiNoseFront } from 'react-icons/gi'

const Services = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const ServiceCard = ({ service, index }) => {
    const [isHovered, setIsHovered] = useState(false)
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    
    const rotateX = useTransform(y, [-100, 100], [10, -10])
    const rotateY = useTransform(x, [-100, 100], [-10, 10])

    const handleMouseMove = (event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      x.set(event.clientX - centerX)
      y.set(event.clientY - centerY)
    }

    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
      setIsHovered(false)
    }

    return (
      <motion.div
        variants={itemVariants}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        whileHover={{ scale: 1.05, z: 50 }}
        className="relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
      >
        {/* Gradient Background on Hover */}
        <motion.div 
          className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 transition-opacity duration-300`}
          animate={{ opacity: isHovered ? 0.1 : 0 }}
        />
        
        {/* Content with 3D depth */}
        <div 
          className="relative p-8"
          style={{
            transform: 'translateZ(75px)',
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Icon with 3D effect */}
          <motion.div 
            className={`w-16 h-16 rounded-full bg-gradient-to-br ${service.gradient} flex items-center justify-center text-white text-3xl mb-6 shadow-lg`}
            style={{
              transform: 'translateZ(100px)',
            }}
            animate={{
              rotateY: isHovered ? 360 : 0,
              scale: isHovered ? 1.1 : 1,
            }}
            transition={{ duration: 0.6 }}
          >
            {service.icon}
          </motion.div>

          {/* Title */}
          <h3 className="text-2xl font-bold mb-3 text-gray-800"
            style={{ transform: 'translateZ(50px)' }}>
            {service.title}
          </h3>

          {/* Description */}
          <p className="text-gray-600 mb-4 leading-relaxed"
            style={{ transform: 'translateZ(40px)' }}>
            {service.description}
          </p>

          {/* Features */}
          <div className="space-y-2" style={{ transform: 'translateZ(30px)' }}>
            {service.features.map((feature, idx) => (
              <motion.div 
                key={idx} 
                className="flex items-center space-x-2 space-x-reverse text-sm text-gray-500"
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: isHovered ? 0 : -20, opacity: isHovered ? 1 : 0.7 }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${service.gradient}`} />
                <span>{feature}</span>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`mt-6 w-full py-3 rounded-lg font-medium text-white bg-gradient-to-r ${service.gradient} shadow-md hover:shadow-lg transition-all`}
            style={{ transform: 'translateZ(60px)' }}
          >
            קבעי תור
          </motion.button>
        </div>

        {/* 3D Border shine effect */}
        <motion.div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)`,
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    )
  }

  const services = [
    {
      icon: <FaEye />,
      title: 'עיצוב גבות',
      description: 'עיצוב גבות מושלם המותאם במיוחד לקווי הפנים שלך, כולל צביעה ושעווה',
      features: ['שעווה', 'צביעה', 'חיטוט', 'מיקרובליידינג'],
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      icon: <FaFeatherAlt />,
      title: 'הסרת שיער',
      description: 'הסרת שיער מתקדמת עם טכנולוגיה חדשנית לעור חלק ומושלם',
      features: ['שעווה חמה', 'שעווה קרה', 'לייזר', 'IPL'],
      gradient: 'from-pink-400 to-red-400',
    },
    {
      icon: <FaSyringe />,
      title: 'חומצה היאלורונית',
      description: 'טיפולי מילוי והזרקות חומצה היאלורונית לנפח ועור צעיר',
      features: ['מילוי קמטים', 'עיצוב פנים', 'נפח שפתיים', 'הידרציה'],
      gradient: 'from-blue-400 to-cyan-400',
    },
    {
      icon: <GiLips />,
      title: 'עיצוב שפתיים',
      description: 'טיפולי שפתיים מתקדמים למראה מושלם ונפח טבעי',
      features: ['מילוי', 'קונטור', 'תיקון אסימטריה', 'הגדלה'],
      gradient: 'from-red-400 to-pink-500',
    },
    {
      icon: <GiNoseFront />,
      title: 'עיצוב אף ולסת',
      description: 'טיפולים אסתטיים לעיצוב ושיפור קווי האף והלסת',
      features: ['מילוי', 'עיצוב קונטור', 'תיקון פרופורציות', 'חידוד'],
      gradient: 'from-indigo-400 to-purple-500',
    },
    {
      icon: <FaUserMd />,
      title: 'טיפולי פנים',
      description: 'טיפולי פנים מתקדמים לעור זוהר, בריא ורענן',
      features: ['ניקוי עמוק', 'פילינג', 'מסכות', 'טיפולי נוגדי גיל'],
      gradient: 'from-green-400 to-teal-400',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            השירותים שלנו
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            טיפולי קוסמטיקה מתקדמים ומקצועיים המותאמים אישית עבורך
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-pink-400 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Services Grid with 3D perspective */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          style={{
            perspective: '1500px',
          }}
        >
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-16"
        >
          <p className="text-lg text-gray-600 mb-6">
            לא מצאת את מה שחיפשת? צרי איתנו קשר לייעוץ אישי
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              const element = document.getElementById('contact')
              if (element) element.scrollIntoView({ behavior: 'smooth' })
            }}
            className="bg-gradient-to-r from-primary-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
          >
            צרי קשר לייעוץ חינם
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default Services

