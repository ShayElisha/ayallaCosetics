import { motion } from 'framer-motion'
import { FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt, FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    services: [
      'עיצוב גבות',
      'הסרת שיער',
      'חומצה היאלורונית',
      'עיצוב שפתיים',
      'טיפולי פנים',
    ],
    quickLinks: [
      { label: 'אודות', href: '#about' },
      { label: 'שירותים', href: '#services' },
      { label: 'גלריה', href: '#gallery' },
      { label: 'המלצות', href: '#testimonials' },
      { label: 'צור קשר', href: '#contact' },
    ],
  }

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId.replace('#', ''))
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <h3 className="text-3xl font-bold">
                <span className="gradient-text font-serif">Ayalla</span>
                <span className="font-light text-white"> Cosmetics</span>
              </h3>
            </Link>
            <p className="text-gray-300 mb-4 leading-relaxed">
              מרכז קוסמטיקה מתקדם המציע טיפולים מקצועיים ואיכותיים ביותר. 
              אנו מחויבות לספק לך חוויה ייחודית ותוצאות מושלמות.
            </p>
            <div className="flex space-x-3 space-x-reverse">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-purple-600 flex items-center justify-center hover:shadow-lg transition-all"
              >
                <FaInstagram />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center hover:shadow-lg transition-all"
              >
                <FaFacebook />
              </motion.a>
              <motion.a
                href="https://wa.me/972523190438?text=היי%20אני%20מעוניינת%20לקבוע%20תור%20ב-Ayalla%20Cosmetics"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center hover:shadow-lg transition-all"
              >
                <FaWhatsapp />
              </motion.a>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">השירותים שלנו</h4>
            <ul className="space-y-2">
              {footerLinks.services.map((service, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection('services')}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-4">קישורים מהירים</h4>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-300 hover:text-primary-400 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-4">יצירת קשר</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 space-x-reverse text-gray-300">
                <FaPhone className="text-primary-400 mt-1 flex-shrink-0" />
                <a href="tel:0523190438" className="hover:text-primary-400 transition-colors">
                  052-319-0438
                </a>
              </li>
              <li className="flex items-start space-x-3 space-x-reverse text-gray-300">
                <FaEnvelope className="text-primary-400 mt-1 flex-shrink-0" />
                <a href="mailto:ayalla450@gmail.com" className="hover:text-primary-400 transition-colors">
                  ayalla450@gmail.com
                </a>
              </li>
              <li className="flex items-start space-x-3 space-x-reverse text-gray-300">
                <FaMapMarkerAlt className="text-primary-400 mt-1 flex-shrink-0" />
                <span>קיבוץ גולויות 12, אשדוד</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm text-center md:text-right">
              © {currentYear} Ayalla Cosmetics. כל הזכויות שמורות.
            </p>
            <p className="text-gray-400 text-sm flex items-center">
              נבנה באהבה <FaHeart className="text-red-500 mx-2" /> על ידי צוות המפתחים
            </p>
            <div className="flex space-x-4 space-x-reverse text-sm">
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                תנאי שימוש
              </a>
              <span className="text-gray-600">|</span>
              <a href="#" className="text-gray-400 hover:text-primary-400 transition-colors">
                מדיניות פרטיות
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="relative h-2 bg-gradient-to-r from-primary-500 via-pink-500 to-purple-500" />
    </footer>
  )
}

export default Footer

