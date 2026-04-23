import { Link, useLocation, useNavigate } from 'react-router-dom'
import { MessageCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const location = useLocation()
  const navigate = useNavigate()

  const scrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`)
      return
    }
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4">Alma de Granja</h3>
            <p className="text-cream-500/60 text-sm leading-relaxed max-w-xs">Selección premium de productos del campo chileno, con despacho coordinado y atención personalizada.</p>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-cream-500/70 mb-4">Navegación</h4>
            <ul className="space-y-2">
              <li><button onClick={() => scrollTo('inicio')} className="text-cream-500/70 hover:text-white text-sm">Inicio</button></li>
              <li><Link to="/productos#destacados" className="text-cream-500/70 hover:text-white text-sm">Destacados</Link></li>
              <li><Link to="/productos" className="text-cream-500/70 hover:text-white text-sm">Productos</Link></li>
              <li><button onClick={() => scrollTo('nosotros')} className="text-cream-500/70 hover:text-white text-sm">Nosotros</button></li>
              <li><button onClick={() => scrollTo('contacto')} className="text-cream-500/70 hover:text-white text-sm">Contacto</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-cream-500/70 mb-4">Contacto</h4>
            <div className="space-y-3">
              <a href="https://wa.me/56958086762" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-cream-500/70 hover:text-green-400 text-sm"><MessageCircle size={16} /> +56 9 5808 6762</a>
              <p className="text-cream-500/70 text-sm">Fundo El Milagro S/N, San Francisco de Mostazal</p>
              <p className="text-cream-500/70 text-sm">hola@almadegranja.cl</p>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream-500/40 text-sm">© {currentYear} Alma de Granja. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
