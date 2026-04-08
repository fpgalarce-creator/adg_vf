import { MessageCircle } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollTo = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <footer className="bg-dark text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-olive-600 flex items-center justify-center">
                <span className="text-white font-heading font-bold text-lg">A</span>
              </div>
              <div>
                <h3 className="font-heading font-semibold text-lg">Alma de Granja</h3>
                <p className="text-[10px] uppercase tracking-[0.2em] text-cream-500/60">Del campo a tu mesa</p>
              </div>
            </div>
            <p className="text-cream-500/50 text-sm leading-relaxed max-w-xs">
              Seleccionamos con cariño los mejores productos del campo chileno 
              para llevarlos directo a tu mesa. Calidad, frescura y confianza.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-cream-500/70 mb-4">
              Navegación
            </h4>
            <ul className="space-y-2">
              {[
                { label: 'Inicio', href: '#inicio' },
                { label: 'Destacados', href: '#destacados' },
                { label: 'Productos', href: '#productos' },
                { label: 'Nosotros', href: '#nosotros' },
                { label: 'Contacto', href: '#contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollTo(link.href)}
                    className="text-cream-500/50 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading font-semibold text-sm uppercase tracking-wider text-cream-500/70 mb-4">
              Contacto
            </h4>
            <div className="space-y-3">
              <a
                href="https://wa.me/56990861197"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-cream-500/50 hover:text-green-400 text-sm transition-colors duration-300"
              >
                <MessageCircle size={16} />
                +56 9 9086 1197
              </a>
              <p className="text-cream-500/50 text-sm">
                Rancagua · Machalí · Graneros · San Fco. de Mostazal
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-cream-500/40 text-sm">
            © {currentYear} Alma de Granja. Todos los derechos reservados.
          </p>
          <p className="text-cream-500/30 text-xs">
            Hecho con ❤️ desde el campo de O'Higgins
          </p>
        </div>
      </div>
    </footer>
  )
}
