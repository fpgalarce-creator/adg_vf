import logo from "../assets/logo_almadegranja.svg"
import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { totalItems, openCart } = useCart()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Inicio', href: '#inicio' },
    { label: 'Destacados', href: '#destacados' },
    { label: 'Productos', href: '#productos' },
    { label: 'Nosotros', href: '#nosotros' },
    { label: 'Contacto', href: '#contacto' },
  ]

  const scrollTo = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-all duration-500 ${scrolled
        ? 'shadow-lg shadow-olive-900/5 border-b border-olive-200/50'
        : 'shadow-sm'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <button onClick={() => scrollTo('#inicio')} className="flex items-center gap-2 group">

            <div className="flex flex-col">
              <span className="font-heading font-semibold text-lg leading-tight text-olive-800">
                <img src={logo} alt="Alma de Granja" className="h-18 w-auto" />
              </span>
            </div>
          </button>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 text-dark-light hover:text-olive-700 hover:bg-olive-100/80"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full transition-all duration-300 bg-olive-600 text-white hover:bg-olive-700"
            >
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-[bounce_0.5s_ease-in-out]">
                  {totalItems}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg transition-colors text-olive-700"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="bg-white border-t border-olive-200/50 px-4 py-4 space-y-1">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollTo(link.href)}
              className="block w-full text-left px-4 py-3 rounded-xl text-dark-light hover:bg-olive-100 hover:text-olive-700 transition-colors font-medium"
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  )
}
