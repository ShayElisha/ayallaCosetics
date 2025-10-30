import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes, FaPhone, FaWhatsapp } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
      setIsMobileMenuOpen(false)
    } else {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    }
  }

  const menuItems = [
    { label: 'בית', section: 'hero' },
    { label: 'שירותים', section: 'services' },
    { label: 'אודות', section: 'about' },
    { label: 'גלריה', section: 'gallery' },
    { label: 'המלצות', section: 'testimonials' },
    { label: 'צור קשר', section: 'contact' },
  ]

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 space-x-reverse">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl md:text-3xl font-bold"
            >
              <span className="gradient-text font-serif">Ayalla</span>
              <span className={`${isScrolled ? 'text-gray-800' : 'text-white'} font-light`}>
                {' '}Cosmetics
              </span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex items-center space-x-8 space-x-reverse">
            {menuItems.map((item, index) => (
              <motion.button
                key={index}
                onClick={() => scrollToSection(item.section)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`font-medium transition-colors ${
                  isScrolled
                    ? 'text-gray-700 hover:text-primary-600'
                    : 'text-white hover:text-primary-200'
                }`}
              >
                {item.label}
              </motion.button>
            ))}
          </nav>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center space-x-4 space-x-reverse">
            <motion.a
              href="tel:0523190438"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-full transition-colors ${
                isScrolled
                  ? 'text-gray-700 hover:bg-gray-100'
                  : 'text-white hover:bg-white/20'
              }`}
            >
              <FaPhone className="text-sm" />
              <span>052-319-0438</span>
            </motion.a>
            <motion.button
              onClick={() => scrollToSection('contact')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-2 rounded-full font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              קבעי תור
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`lg:hidden text-2xl ${isScrolled ? 'text-gray-800' : 'text-white'}`}
          >
            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 bg-white rounded-lg shadow-xl overflow-hidden"
            >
              <nav className="flex flex-col py-4">
                {menuItems.map((item, index) => (
                  <motion.button
                    key={index}
                    onClick={() => scrollToSection(item.section)}
                    whileTap={{ scale: 0.95 }}
                    className="text-right px-6 py-3 text-gray-700 hover:bg-primary-50 hover:text-primary-600 transition-colors"
                  >
                    {item.label}
                  </motion.button>
                ))}
                <div className="border-t border-gray-200 mt-4 pt-4 px-6 space-y-3">
                  <a
                    href="tel:0523190438"
                    className="flex items-center justify-center space-x-2 space-x-reverse px-4 py-3 bg-gray-100 rounded-lg text-gray-700"
                  >
                    <FaPhone />
                    <span>052-319-0438</span>
                  </a>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="w-full bg-gradient-to-r from-primary-500 to-primary-600 text-white px-6 py-3 rounded-lg font-medium"
                  >
                    קבעי תור
                  </button>
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  )
}

export default Header

