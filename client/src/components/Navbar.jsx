import logo from '../assets/logo_almadegranja.svg'
import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

const homeAnchors = {
  inicio: 'inicio',
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
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-[color:var(--bg-primary)]/95 backdrop-blur-md transition-all duration-500 ${scrolled ? 'shadow-lg shadow-black/5 border-b border-[color:var(--border-soft)]' : 'shadow-sm'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2">
            <img src={logo} alt="Alma de Granja" className="h-16 w-auto" />
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <button onClick={() => scrollToHomeSection(homeAnchors.inicio)} className={`${linkBase} text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-secondary)]`}>Inicio</button>
            <Link to="/productos?destacados=true" onClick={() => setMobileOpen(false)} className={`${linkBase} text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-secondary)]`}>Destacados</Link>
            <NavLink to="/productos" className={({ isActive }) => `${linkBase} ${isActive ? 'bg-[color:var(--primary)] text-white shadow-md shadow-black/10' : 'text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-secondary)]'}`}>Productos</NavLink>
            <button onClick={() => scrollToHomeSection(homeAnchors.nosotros)} className={`${linkBase} text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-secondary)]`}>Nosotros</button>
            <button onClick={() => scrollToHomeSection(homeAnchors.contacto)} className={`${linkBase} text-[color:var(--text-secondary)] hover:text-[color:var(--text-primary)] hover:bg-[color:var(--bg-secondary)]`}>Contacto</button>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={openCart} aria-label="Abrir cesta" className="relative p-2.5 rounded-full transition-all duration-300 bg-[color:var(--primary)] text-white hover:bg-[color:var(--primary-hover)]">
              <ShoppingCart size={20} />
              {totalItems > 0 && <span className="absolute -top-1 -right-1 w-5 h-5 bg-[color:var(--accent)] text-white text-[10px] font-bold rounded-full flex items-center justify-center">{totalItems}</span>}
            </button>

            <button onClick={() => setMobileOpen((prev) => !prev)} className="md:hidden p-2 rounded-lg transition-colors text-[color:var(--primary)]" aria-label="Abrir menú">
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="bg-[color:var(--bg-card)] border-t border-[color:var(--border-soft)] px-4 py-4 space-y-1">
          <button onClick={() => scrollToHomeSection(homeAnchors.inicio)} className="block w-full text-left px-4 py-3 rounded-xl text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-secondary)] hover:text-[color:var(--text-primary)] font-medium">Inicio</button>
          <Link to="/productos?destacados=true" onClick={() => setMobileOpen(false)} className="block w-full text-left px-4 py-3 rounded-xl text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-secondary)] hover:text-[color:var(--text-primary)] font-medium">Destacados</Link>
          <Link to="/productos" onClick={() => setMobileOpen(false)} className={`block w-full text-left px-4 py-3 rounded-xl font-medium ${location.pathname === '/productos' ? 'bg-[color:var(--primary)] text-white' : 'text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-secondary)] hover:text-[color:var(--text-primary)]'}`}>Productos</Link>
          <button onClick={() => scrollToHomeSection(homeAnchors.nosotros)} className="block w-full text-left px-4 py-3 rounded-xl text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-secondary)] hover:text-[color:var(--text-primary)] font-medium">Nosotros</button>
          <button onClick={() => scrollToHomeSection(homeAnchors.contacto)} className="block w-full text-left px-4 py-3 rounded-xl text-[color:var(--text-secondary)] hover:bg-[color:var(--bg-secondary)] hover:text-[color:var(--text-primary)] font-medium">Contacto</button>
        </div>
      </div>
    </nav>
  )
}
