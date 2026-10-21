import { useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import FeaturesPage from './pages/FeaturesPage'
import WhyChoosePage from './pages/WhyChoosePage'
import TestimonialsPage from './pages/TestimonialsPage'
import FaqPage from './pages/FaqPage'
import ContactPage from './pages/ContactPage'
import NotFound from './pages/NotFound'

function Page({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  )
}

export default function App() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/features" element={<Page><FeaturesPage /></Page>} />
          <Route path="/why-choose" element={<Page><WhyChoosePage /></Page>} />
          <Route path="/testimonials" element={<Page><TestimonialsPage /></Page>} />
          <Route path="/faq" element={<Page><FaqPage /></Page>} />
          <Route path="/contact" element={<Page><ContactPage /></Page>} />
          <Route path="*" element={<Page><NotFound /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
