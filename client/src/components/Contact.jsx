import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaPhone, FaWhatsapp, FaInstagram, FaFacebook, FaMapMarkerAlt, FaClock, FaEnvelope } from 'react-icons/fa'
import axios from 'axios'

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: '',
  })

  const [status, setStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus({ type: '', message: '' })

    try {
      const response = await axios.post('/api/contact', formData)
      setStatus({
        type: 'success',
        message: 'הפנייה נשלחה בהצלחה! ניצור איתך קשר בהקדם.',
      })
      setFormData({
        name: '',
        phone: '',
        email: '',
        service: '',
        message: '',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: 'אירעה שגיאה בשליחת הפנייה. אנא נסי שוב או צרי קשר טלפונית.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: <FaPhone />,
      title: 'טלפון',
      value: '052-319-0438',
      link: 'tel:0523190438',
      gradient: 'from-blue-400 to-blue-600',
    },
    {
      icon: <FaWhatsapp />,
      title: 'WhatsApp',
      value: 'שלחי הודעה',
      link: 'https://wa.me/972523190438?text=היי%20אני%20מעוניינת%20לקבוע%20תור%20ב-Ayalla%20Cosmetics',
      gradient: 'from-green-400 to-green-600',
    },
    {
      icon: <FaEnvelope />,
      title: 'אימייל',
      value: 'ayalla450@gmail.com',
      link: 'mailto:ayalla450@gmail.com',
      gradient: 'from-red-400 to-pink-600',
    },
    {
      icon: <FaMapMarkerAlt />,
      title: 'כתובת',
      value: 'קיבוץ גולויות 12, אשדוד',
      link: 'https://maps.google.com/?q=קיבוץ+גולויות+12+אשדוד',
      gradient: 'from-purple-400 to-purple-600',
    },
  ]

  const services = [
    'עיצוב גבות',
    'הסרת שיער',
    'חומצה היאלורונית',
    'עיצוב שפתיים',
    'עיצוב אף ולסת',
    'טיפולי פנים',
    'אחר',
  ]

  return (
    <section id="contact" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            צרי קשר
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            נשמח לענות על כל שאלה ולקבוע לך תור בזמן הנוח לך
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-pink-400 mx-auto mt-6 rounded-full" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-3xl font-bold mb-6 text-gray-800">
              שלחי לנו הודעה
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
                  שם מלא *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  placeholder="הזיני את שמך"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">
                  טלפון *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  placeholder="050-123-4567"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                  אימייל
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                  placeholder="example@email.com"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-gray-700 font-medium mb-2">
                  סוג הטיפול *
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all"
                >
                  <option value="">בחרי טיפול</option>
                  {services.map((service, index) => (
                    <option key={index} value={service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-700 font-medium mb-2">
                  הודעה
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none transition-all resize-none"
                  placeholder="ספרי לנו קצת על הטיפול שאת מעוניינת בו..."
                />
              </div>

              {status.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg ${
                    status.type === 'success'
                      ? 'bg-green-100 text-green-700 border border-green-200'
                      : 'bg-red-100 text-red-700 border border-red-200'
                  }`}
                >
                  {status.message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full py-4 rounded-lg font-bold text-lg text-white shadow-lg transition-all ${
                  isSubmitting
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-primary-500 to-pink-500 hover:shadow-xl'
                }`}
              >
                {isSubmitting ? 'שולח...' : 'שלחי הודעה'}
              </motion.button>
            </form>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all"
                >
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${info.gradient} flex items-center justify-center text-white text-xl mb-4`}>
                    {info.icon}
                  </div>
                  <h4 className="font-bold text-gray-800 mb-1">{info.title}</h4>
                  <p className="text-gray-600 text-sm">{info.value}</p>
                </motion.a>
              ))}
            </div>

            {/* Hours */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center space-x-3 space-x-reverse mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl">
                  <FaClock />
                </div>
                <h4 className="font-bold text-gray-800 text-xl">שעות פעילות</h4>
              </div>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>ראשון - חמישי:</span>
                  <span className="font-medium">09:00 - 20:00</span>
                </div>
                <div className="flex justify-between">
                  <span>שישי:</span>
                  <span className="font-medium">09:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>שבת:</span>
                  <span className="font-medium">סגור</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="font-bold text-gray-800 text-xl mb-4">עקבי אחרינו</h4>
              <div className="flex space-x-4 space-x-reverse">
                <motion.a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center text-white text-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <FaInstagram />
                </motion.a>
                <motion.a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl shadow-lg hover:shadow-xl transition-all"
                >
                  <FaFacebook />
                </motion.a>
              </div>
            </div>

            {/* Map */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3392.8255936753047!2d34.646389!3d31.804167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1502b7c2b7c2b7c2%3A0x1502b7c2b7c2b7c2!2z16fXmdeln9eVINeS15XXnNeV15nXldefIDEyLCDXkNep15PXlNeT!5e0!3m2!1siw!2sil!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Location Map"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Contact

