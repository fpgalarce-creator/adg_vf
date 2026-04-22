import logo from '../assets/logo_almadegranja.svg'
import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

const homeAnchors = {
  inicio: 'inicio',
  destacados: 'destacados',
  nosotros: 'nosotros',
  contacto: 'contacto',
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, openCart } = useCart()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToHomeSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`)
      setMobileOpen(false)
      return
    }

    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileOpen(false)
  }

  const linkBase = 'px-4 py-2 rounded-full text-sm font-medium transition-all duration-300'

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md transition-all duration-500 ${scrolled ? 'shadow-lg shadow-olive-900/5 border-b border-olive-200/50' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <img src={logo} alt="Alma de Granja" className="h-16 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <button onClick={() => scrollToHomeSection(homeAnchors.inicio)} className={`${linkBase} text-dark-light hover:text-olive-700 hover:bg-olive-100/80`}>Inicio</button>
            <button onClick={() => scrollToHomeSection(homeAnchors.destacados)} className={`${linkBase} text-dark-light hover:text-olive-700 hover:bg-olive-100/80`}>Destacados</button>
            <NavLink to="/productos" className={({ isActive }) => `${linkBase} ${isActive ? 'bg-olive-600 text-white shadow-md shadow-olive-900/20' : 'text-dark-light hover:text-olive-700 hover:bg-olive-100/80'}`}>Productos</NavLink>
            <button onClick={() => scrollToHomeSection(homeAnchors.nosotros)} className={`${linkBase} text-dark-light hover:text-olive-700 hover:bg-olive-100/80`}>Nosotros</button>
            <button onClick={() => scrollToHomeSection(homeAnchors.contacto)} className={`${linkBase} text-dark-light hover:text-olive-700 hover:bg-olive-100/80`}>Contacto</button>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={openCart} aria-label="Abrir cesta" className="relative p-2.5 rounded-full transition-all duration-300 bg-olive-600 text-white hover:bg-olive-700">
              <ShoppingCart size={20} />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">{totalItems}</span>}
            </button>

            <button onClick={() => setMobileOpen((prev) => !prev)} className="md:hidden p-2 rounded-lg transition-colors text-olive-700" aria-label="Abrir menú">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-white border-t border-olive-200/50 px-4 py-4 space-y-1">
          <button onClick={() => scrollToHomeSection(homeAnchors.inicio)} className="block w-full text-left px-4 py-3 rounded-xl text-dark-light hover:bg-olive-100 hover:text-olive-700 font-medium">Inicio</button>
          <button onClick={() => scrollToHomeSection(homeAnchors.destacados)} className="block w-full text-left px-4 py-3 rounded-xl text-dark-light hover:bg-olive-100 hover:text-olive-700 font-medium">Destacados</button>
          <Link to="/productos" onClick={() => setMobileOpen(false)} className={`block w-full text-left px-4 py-3 rounded-xl font-medium ${location.pathname === '/productos' ? 'bg-olive-600 text-white' : 'text-dark-light hover:bg-olive-100 hover:text-olive-700'}`}>Productos</Link>
          <button onClick={() => scrollToHomeSection(homeAnchors.nosotros)} className="block w-full text-left px-4 py-3 rounded-xl text-dark-light hover:bg-olive-100 hover:text-olive-700 font-medium">Nosotros</button>
          <button onClick={() => scrollToHomeSection(homeAnchors.contacto)} className="block w-full text-left px-4 py-3 rounded-xl text-dark-light hover:bg-olive-100 hover:text-olive-700 font-medium">Contacto</button>
        </div>
      </div>
    </nav>
  )
}
