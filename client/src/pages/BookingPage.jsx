import { useState } from 'react'
import { motion } from 'framer-motion'
import { FaCalendar, FaClock, FaUser, FaPhone, FaEnvelope, FaCheckCircle } from 'react-icons/fa'
import axios from 'axios'

const BookingPage = () => {
  const [step, setStep] = useState(1)
  const [bookingData, setBookingData] = useState({
    service: '',
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    notes: '',
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingConfirmed, setBookingConfirmed] = useState(false)

  const services = [
    { id: 'eyebrows', name: 'עיצוב גבות', duration: '45 דקות', price: '150 ₪' },
    { id: 'hair-removal', name: 'הסרת שיער', duration: '60 דקות', price: '200 ₪' },
    { id: 'hyaluronic', name: 'חומצה היאלורונית', duration: '90 דקות', price: '800 ₪' },
    { id: 'lips', name: 'עיצוב שפתיים', duration: '60 דקות', price: '600 ₪' },
    { id: 'facial', name: 'טיפול פנים', duration: '75 דקות', price: '300 ₪' },
  ]

  const availableTimes = [
    '09:00', '10:00', '11:00', '12:00', '13:00',
    '14:00', '15:00', '16:00', '17:00', '18:00', '19:00'
  ]

  const handleChange = (field, value) => {
    setBookingData({ ...bookingData, [field]: value })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      await axios.post('/api/bookings', bookingData)
      setBookingConfirmed(true)
    } catch (error) {
      alert('אירעה שגיאה בקביעת התור. אנא נסי שוב.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (bookingConfirmed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-pink-50 pt-24 pb-12 px-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="max-w-md w-full bg-white rounded-2xl shadow-2xl p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <FaCheckCircle className="text-white text-4xl" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-4 text-gray-800">התור נקבע בהצלחה!</h2>
          <p className="text-gray-600 mb-6">
            קיבלנו את פנייתך. נשלח אישור ב-SMS ובאימייל בקרוב.
          </p>
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-right">
            <p className="text-sm text-gray-600 mb-2">פרטי התור:</p>
            <p className="font-medium">{services.find(s => s.id === bookingData.service)?.name}</p>
            <p className="text-gray-600">{bookingData.date} בשעה {bookingData.time}</p>
          </div>
          <motion.button
            onClick={() => window.location.href = '/'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full bg-gradient-to-r from-primary-500 to-pink-500 text-white py-3 rounded-lg font-medium"
          >
            חזרה לדף הבית
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-pink-50 pt-24 pb-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            קביעת תור
          </h1>
          <p className="text-gray-600">מלאי את הפרטים ונחזור אליך בהקדם</p>
        </motion.div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                  step >= s
                    ? 'bg-gradient-to-r from-primary-500 to-pink-500 text-white'
                    : 'bg-gray-300 text-gray-600'
                }`}
              >
                {s}
              </motion.div>
              {s < 3 && (
                <div className={`w-16 h-1 ${step > s ? 'bg-primary-500' : 'bg-gray-300'}`} />
              )}
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          {/* Step 1: Select Service */}
          {step === 1 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">בחרי את הטיפול</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {services.map((service) => (
                  <motion.div
                    key={service.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleChange('service', service.id)}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      bookingData.service === service.id
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-primary-300'
                    }`}
                  >
                    <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                    <p className="text-gray-600 text-sm mb-1">{service.duration}</p>
                    <p className="text-primary-600 font-bold">{service.price}</p>
                  </motion.div>
                ))}
              </div>
              <motion.button
                onClick={() => setStep(2)}
                disabled={!bookingData.service}
                whileHover={{ scale: bookingData.service ? 1.05 : 1 }}
                whileTap={{ scale: bookingData.service ? 0.95 : 1 }}
                className={`w-full mt-8 py-4 rounded-lg font-bold text-lg transition-all ${
                  bookingData.service
                    ? 'bg-gradient-to-r from-primary-500 to-pink-500 text-white hover:shadow-lg'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                המשך
              </motion.button>
            </div>
          )}

          {/* Step 2: Select Date & Time */}
          {step === 2 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">בחרי תאריך ושעה</h2>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">תאריך</label>
                <input
                  type="date"
                  value={bookingData.date}
                  onChange={(e) => handleChange('date', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                />
              </div>
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">שעה</label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                  {availableTimes.map((time) => (
                    <motion.button
                      key={time}
                      whileHover={{ scale: 1.05 }}
                      onClick={() => handleChange('time', time)}
                      className={`py-3 rounded-lg font-medium transition-all ${
                        bookingData.time === time
                          ? 'bg-gradient-to-r from-primary-500 to-pink-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>
              <div className="flex space-x-4 space-x-reverse">
                <motion.button
                  onClick={() => setStep(1)}
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 py-4 rounded-lg font-bold text-lg border-2 border-gray-300 text-gray-700"
                >
                  חזרה
                </motion.button>
                <motion.button
                  onClick={() => setStep(3)}
                  disabled={!bookingData.date || !bookingData.time}
                  whileHover={{ scale: (bookingData.date && bookingData.time) ? 1.05 : 1 }}
                  className={`flex-1 py-4 rounded-lg font-bold text-lg ${
                    bookingData.date && bookingData.time
                      ? 'bg-gradient-to-r from-primary-500 to-pink-500 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  המשך
                </motion.button>
              </div>
            </div>
          )}

          {/* Step 3: Personal Details */}
          {step === 3 && (
            <div>
              <h2 className="text-2xl font-bold mb-6">פרטים אישיים</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">שם מלא *</label>
                  <input
                    type="text"
                    value={bookingData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                    placeholder="הזיני את שמך"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">טלפון *</label>
                  <input
                    type="tel"
                    value={bookingData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                    placeholder="050-123-4567"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">אימייל</label>
                  <input
                    type="email"
                    value={bookingData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none"
                    placeholder="example@email.com"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-medium mb-2">הערות</label>
                  <textarea
                    value={bookingData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    rows="3"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 outline-none resize-none"
                    placeholder="הערות נוספות..."
                  />
                </div>
              </div>
              <div className="flex space-x-4 space-x-reverse mt-8">
                <motion.button
                  onClick={() => setStep(2)}
                  whileHover={{ scale: 1.05 }}
                  className="flex-1 py-4 rounded-lg font-bold text-lg border-2 border-gray-300 text-gray-700"
                >
                  חזרה
                </motion.button>
                <motion.button
                  onClick={handleSubmit}
                  disabled={!bookingData.name || !bookingData.phone || isSubmitting}
                  whileHover={{ scale: (bookingData.name && bookingData.phone && !isSubmitting) ? 1.05 : 1 }}
                  className={`flex-1 py-4 rounded-lg font-bold text-lg ${
                    bookingData.name && bookingData.phone && !isSubmitting
                      ? 'bg-gradient-to-r from-primary-500 to-pink-500 text-white'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? 'שולח...' : 'אשרי תור'}
                </motion.button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default BookingPage

