import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa'

const Gallery = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [selectedImage, setSelectedImage] = useState(null)
  const [filter, setFilter] = useState('all')
  
  const openLightbox = (image) => {
    setSelectedImage(image)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }
  
  const GalleryItem = ({ item, index }) => {
    const x = useMotionValue(0)
    const y = useMotionValue(0)
    
    const rotateX = useTransform(y, [-100, 100], [15, -15])
    const rotateY = useTransform(x, [-100, 100], [-15, 15])
    
    const handleMouseMove = (event) => {
      const rect = event.currentTarget.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      x.set((event.clientX - centerX) / 5)
      y.set((event.clientY - centerY) / 5)
    }
    
    const handleMouseLeave = () => {
      x.set(0)
      y.set(0)
    }
    
    return (
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.8, rotateY: -45 }}
        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
        exit={{ opacity: 0, scale: 0.8, rotateY: 45 }}
        transition={{ duration: 0.5, delay: index * 0.05 }}
        whileHover={{ z: 100 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="group relative aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all cursor-pointer"
        onClick={() => openLightbox(item)}
      >
        {/* Image */}
        <div style={{ transform: 'translateZ(0)' }}>
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        
        {/* Overlay with 3D depth */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{ transform: 'translateZ(50px)' }}
        >
          <div 
            className="absolute bottom-0 left-0 right-0 p-6 text-white"
            style={{ transform: 'translateZ(75px)' }}
          >
            <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-gray-200">{item.description}</p>
          </div>
        </div>

        {/* Corner Badge with 3D effect */}
        <div 
          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-primary-600"
          style={{ transform: 'translateZ(100px)' }}
        >
          {categories.find(cat => cat.id === item.category)?.label}
        </div>
        
        {/* 3D shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/0 via-white/20 to-white/0"
          initial={{ x: '-100%', y: '-100%' }}
          whileHover={{ x: '100%', y: '100%' }}
          transition={{ duration: 0.6 }}
          style={{ transform: 'translateZ(25px)' }}
        />
      </motion.div>
    )
  }

  // Placeholder images - במציאות אלו יהיו תמונות אמיתיות
  const galleryItems = [
    { id: 1, category: 'eyebrows', title: 'עיצוב גבות', description: 'עיצוב גבות מושלם', image: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=400&fit=crop' },
    { id: 2, category: 'lips', title: 'עיצוב שפתיים', description: 'מילוי שפתיים טבעי', image: 'https://images.unsplash.com/photo-1515688594390-b649af70d282?w=400&h=400&fit=crop' },
    { id: 3, category: 'skin', title: 'טיפול פנים', description: 'עור זוהר ובריא', image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=400&fit=crop' },
    { id: 4, category: 'eyebrows', title: 'גבות מושלמות', description: 'צביעה ועיצוב', image: 'https://images.unsplash.com/photo-1583001809642-906fee53e6eb?w=400&h=400&fit=crop' },
    { id: 5, category: 'filler', title: 'חומצה היאלורונית', description: 'מילוי קמטים', image: 'https://images.unsplash.com/photo-1559599101-f09722fb4948?w=400&h=400&fit=crop' },
    { id: 6, category: 'lips', title: 'שפתיים מלאות', description: 'נפח טבעי', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=400&h=400&fit=crop' },
    { id: 7, category: 'skin', title: 'פילינג', description: 'התחדשות העור', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop' },
    { id: 8, category: 'eyebrows', title: 'מיקרובליידינג', description: 'גבות מושלמות', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=400&fit=crop' },
    { id: 9, category: 'filler', title: 'עיצוב לסת', description: 'קונטור מושלם', image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=400&fit=crop' },
  ]

  const categories = [
    { id: 'all', label: 'הכל' },
    { id: 'eyebrows', label: 'גבות' },
    { id: 'lips', label: 'שפתיים' },
    { id: 'filler', label: 'מילויים' },
    { id: 'skin', label: 'טיפולי פנים' },
  ]

  const filteredItems = filter === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === filter)

  const navigateImage = (direction) => {
    const currentIndex = filteredItems.findIndex(item => item.id === selectedImage.id)
    const newIndex = direction === 'next'
      ? (currentIndex + 1) % filteredItems.length
      : (currentIndex - 1 + filteredItems.length) % filteredItems.length
    setSelectedImage(filteredItems[newIndex])
  }

  return (
    <section id="gallery" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 gradient-text">
            הגלריה שלנו
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            הצצה לעבודות שלנו ולתוצאות המדהימות של הלקוחות שלנו
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-400 to-pink-400 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <motion.button
              key={category.id}
              onClick={() => setFilter(category.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                filter === category.id
                  ? 'bg-gradient-to-r from-primary-500 to-pink-500 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.label}
            </motion.button>
          ))}
        </motion.div>

        {/* Gallery Grid with 3D perspective */}
        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ perspective: '2000px' }}
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, index) => (
              <GalleryItem key={item.id} item={item} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
              onClick={closeLightbox}
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-4 right-4 text-white text-3xl hover:text-primary-400 transition-colors z-10"
              >
                <FaTimes />
              </button>

              {/* Navigation Buttons */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage('prev')
                }}
                className="absolute right-4 text-white text-4xl hover:text-primary-400 transition-colors z-10"
              >
                <FaChevronRight />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  navigateImage('next')
                }}
                className="absolute left-4 text-white text-4xl hover:text-primary-400 transition-colors z-10"
              >
                <FaChevronLeft />
              </button>

              {/* Image Container */}
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="max-w-4xl max-h-[90vh] w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={selectedImage.image}
                  alt={selectedImage.title}
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="text-center mt-4 text-white">
                  <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                  <p className="text-gray-300">{selectedImage.description}</p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

export default Gallery

