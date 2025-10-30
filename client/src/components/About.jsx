import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaAward, FaCertificate, FaUsers, FaHeart } from 'react-icons/fa'

const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const stats = [
    { icon: <FaUsers />, number: '2000+', label: 'לקוחות מרוצות' },
    { icon: <FaAward />, number: '15+', label: 'שנות ניסיון' },
    { icon: <FaCertificate />, number: '50+', label: 'הסמכות מקצועיות' },
    { icon: <FaHeart />, number: '100%', label: 'שביעות רצון' },
  ]

  const values = [
    {
      title: 'מקצועיות',
      description: 'צוות מיומן ומוסמך עם ניסיון רב שנים בתחום הקוסמטיקה',
      gradient: 'from-purple-400 to-pink-500',
    },
    {
      title: 'איכות',
      description: 'שימוש במוצרים ובטכנולוגיות המתקדמות ביותר בשוק',
      gradient: 'from-pink-400 to-red-400',
    },
    {
      title: 'אישיות',
      description: 'טיפול אישי ומותאם לכל לקוחה וצרכיה הייחודיים',
      gradient: 'from-blue-400 to-cyan-400',
    },
  ]

  return (
    <section id="about" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            אודות Ayalla Cosmetics
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            ברוכות הבאות למרכז הקוסמטיקה המתקדם שלנו, שם יופי, מקצועיות ואיכות נפגשים
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-pink-400 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1560750588-73207b1ef5b8?w=800&h=600&fit=crop"
                alt="Ayalla Cosmetics"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary-600/50 to-transparent" />
            </div>
            
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-6 max-w-xs"
            >
              <div className="flex items-center space-x-3 space-x-reverse">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xl">
                  <FaAward />
                </div>
                <div>
                  <div className="font-bold text-gray-800">מעל 15 שנה</div>
                  <div className="text-sm text-gray-600">בתחום הקוסמטיקה</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Side */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold text-gray-800">
              הסיפור שלנו
            </h3>
            <p className="text-lg text-gray-600 leading-relaxed">
              Ayalla Cosmetics נוסדה מתוך אהבה אמיתית לעולם היופי והקוסמטיקה. 
              במשך למעלה מ-15 שנה, אנו מספקות טיפולי קוסמטיקה מתקדמים ומקצועיים 
              ללקוחותינו, תוך שימוש בטכנולוגיות המתקדמות ביותר ובמוצרים באיכות הגבוהה ביותר.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              הצוות המקצועי שלנו עבר הכשרות מתקדמות בארץ ובחו"ל, ומחזיק בהסמכות 
              מהמוסדות המובילים בתחום. אנו מאמינות שכל אישה ראויה להרגיש יפה ובטוחה 
              בעצמה, ולכן אנו מעניקות טיפול אישי ומסור לכל לקוחה.
            </p>
            
            {/* Values */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white shadow-md"
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br ${value.gradient} flex items-center justify-center text-white font-bold text-xl`}>
                    ✓
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">{value.title}</h4>
                  <p className="text-sm text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="text-center p-8 bg-gradient-to-br from-white to-gray-50 rounded-2xl shadow-lg"
            >
              <div className="text-4xl text-primary-500 mb-4 flex justify-center">
                {stat.icon}
              </div>
              <div className="text-4xl font-bold text-gray-800 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default About

