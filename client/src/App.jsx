import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import HowItWorks from './components/HowItWorks.jsx'
import FeaturedProducts from './components/FeaturedProducts.jsx'
import Products from './components/Products.jsx'
import AboutUs from './components/AboutUs.jsx'
import Gallery from './components/Gallery.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import AdminPage from './pages/AdminPage.jsx'

function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <FeaturedProducts />
        <Products />
        <AboutUs />
        <Contact />
        <Gallery />
      </main>
      <Footer />
      <CartDrawer />
    </>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
