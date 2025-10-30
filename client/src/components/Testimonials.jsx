import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaStar, FaQuoteRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Testimonials = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [currentIndex, setCurrentIndex] = useState(0)

  const testimonials = [
    {
      name: 'שרה כהן',
      treatment: 'עיצוב גבות',
      rating: 5,
      text: 'הגעתי לאיילה אחרי שנים של חיפוש אחר המקום המושלם. התוצאה הייתה מדהימה! הגבות שלי נראות טבעיות ומעוצבות בצורה מושלמת. השירות מקצועי ואדיב ביותר.',
      image: 'https://randomuser.me/api/portraits/women/1.jpg',
    },
    {
      name: 'מיכל לוי',
      treatment: 'מילוי שפתיים',
      rating: 5,
      text: 'הייתי חוששת מטיפולי מילוי, אבל איילה הרגיעה אותי והסבירה כל שלב. התוצאה טבעית ומדהימה! השפתיים שלי נראות מלאות וטבעיות. ממליצה בחום!',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
    },
    {
      name: 'רונית אברהם',
      treatment: 'חומצה היאלורונית',
      rating: 5,
      text: 'טיפול ברמה הכי גבוהה שיש! איילה היא אמנית אמיתית. הקמטים שלי נעלמו והעור נראה צעיר ורענן. אני מרגישה כמו בת 30! תודה רבה!',
      image: 'https://randomuser.me/api/portraits/women/3.jpg',
    },
    {
      name: 'דנה גולן',
      treatment: 'טיפול פנים',
      rating: 5,
      text: 'המקום הכי נעים והמקצועי שהייתי בו! טיפול פנים שעשיתי פה הפך את העור שלי. אחרי שנים של מאבק בעור בעייתי, סוף סוף מצאתי את הפתרון. תודה ענקית!',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    {
      name: 'יעל מזרחי',
      treatment: 'הסרת שיער בלייזר',
      rating: 5,
      text: 'הטכנולוגיה החדשנית והטיפול המקצועי הפכו את חווית הלייזר לנעימה וקלה. אין יותר שיער מיותר! ממליצה לכל חברותיי.',
      image: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
  ]

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-primary-50 via-pink-50 to-purple-50 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 right-20 w-64 h-64 bg-primary-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-pink-300 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            מה הלקוחות שלנו אומרות
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            אלפי לקוחות מרוצות שבחרו בנו ונתנו לנו את האמון שלהן
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-pink-400 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Testimonials Carousel */}
        <div ref={ref} className="max-w-4xl mx-auto relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 text-primary-200 text-6xl opacity-50">
                <FaQuoteRight />
              </div>

              {/* Rating Stars */}
              <div className="flex justify-center mb-6 space-x-1 space-x-reverse">
                {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400 text-2xl" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed relative z-10">
                "{testimonials[currentIndex].text}"
              </p>

              {/* Author Info */}
              <div className="flex flex-col items-center">
                <motion.img
                  whileHover={{ scale: 1.1 }}
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-primary-200 shadow-lg"
                />
                <h4 className="text-xl font-bold text-gray-800 mb-1">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-primary-600 font-medium">
                  {testimonials[currentIndex].treatment}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <div className="flex justify-between items-center mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="bg-white text-primary-600 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
            >
              <FaChevronRight />
            </motion.button>

            {/* Dots Indicator */}
            <div className="flex space-x-2 space-x-reverse">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex
                      ? 'bg-primary-600 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="bg-white text-primary-600 w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
            >
              <FaChevronLeft />
            </motion.button>
          </div>
        </div>

        {/* Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
        >
          {[
            { number: '98%', label: 'שביעות רצון' },
            { number: '2000+', label: 'לקוחות מרוצות' },
            { number: '5★', label: 'דירוג ממוצע' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5 }}
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg"
            >
              <div className="text-4xl font-bold text-primary-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default Testimonials

