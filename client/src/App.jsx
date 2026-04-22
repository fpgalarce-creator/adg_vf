import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import FeaturedProducts from './components/FeaturedProducts.jsx'
import Products from './components/Products.jsx'
import AboutUs from './components/AboutUs.jsx'
import Benefits from './components/Benefits.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import FloatingSocialButtons from './components/FloatingSocialButtons.jsx'
import AdminPage from './pages/AdminPage.jsx'

function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CartDrawer />
      <FloatingSocialButtons />
    </>
  )
}

function LandingPage() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const element = document.getElementById(id)
    if (element) {
      setTimeout(() => element.scrollIntoView({ behavior: 'smooth', block: 'start' }), 30)
    }
  }, [location.hash])

  return (
    <PublicLayout>
      <Hero />
      <FeaturedProducts />
      <HowItWorks />
      <Benefits />
      <AboutUs />
      <Contact />
    </PublicLayout>
  )
}

function ProductsPage() {
  return (
    <PublicLayout>
      <Products />
    </PublicLayout>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/productos" element={<ProductsPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/admin/login" element={<AdminPage />} />
    </Routes>
  )
}

export default App
