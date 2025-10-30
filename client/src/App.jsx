import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Hero from './components/Hero'
import Services from './components/Services'
import Gallery from './components/Gallery'
import About from './components/About'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BookingPage from './pages/BookingPage'
import './App.css'

function HomePage() {
  return (
    <>
      <Hero />
      <Services />
      <About />
      <Gallery />
      <Testimonials />
      <Contact />
    </>
  )
}

function App() {
  return (
    <Router>
      <div className="App min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App

