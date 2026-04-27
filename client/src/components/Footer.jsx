import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Camera,
  Share2,
  Leaf,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Truck,
} from 'lucide-react'
import logo from '../assets/logo_almadegranja.svg'

const navLinks = [
  { label: 'Inicio', type: 'scroll', id: 'inicio' },
  { label: 'Destacados', to: '/productos?destacados=true' },
  { label: 'Productos', to: '/productos' },
  { label: 'Nosotros', type: 'scroll', id: 'nosotros' },
  { label: 'Contacto', type: 'scroll', id: 'contacto' },
]

const categoryLinks = [
  { label: 'Huevos', to: '/productos?categoria=huevos' },
  { label: 'Frutos secos', to: '/productos?categoria=frutos-secos' },
  { label: 'Quesos', to: '/productos?categoria=quesos' },
  { label: 'Aceites de Oliva', to: '/productos?categoria=aceites-de-oliva' },
  { label: 'Otros', to: '/productos?categoria=otros' },
]

const trustItems = [
  { icon: MessageCircle, title: 'Pedido por WhatsApp', subtitle: 'Coordinación directa' },
  { icon: Truck, title: 'Despacho coordinado', subtitle: 'En zonas disponibles' },
  { icon: PackageCheck, title: 'Productos seleccionados', subtitle: 'Calidad de origen' },
  { icon: Leaf, title: 'Compromiso local', subtitle: 'Atención cercana' },
]

const qualities = [
  { icon: Leaf, label: '100% Naturales' },
  { icon: ShieldCheck, label: 'Calidad garantizada' },
  { icon: Truck, label: 'Despacho coordinado' },
]

export default function Footer() {
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
    <footer className="relative overflow-hidden border-t border-[#D8C59E]/20 bg-[linear-gradient(115deg,#1f2b20_0%,#243527_38%,#2f3a2e_72%,#27352a_100%)] text-[#F5F3EF]">
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-25">
        <div className="absolute -top-24 right-[-90px] h-72 w-72 rounded-full border border-[#C2A878]/20" />
        <div className="absolute top-20 left-[-120px] h-80 w-80 rounded-full border border-[#C2A878]/15" />
        <div className="absolute bottom-12 right-0 h-28 w-[40%] border-t border-[#C2A878]/10" />
        <div className="absolute bottom-6 left-[20%] h-40 w-40 rounded-full border border-[#C2A878]/10" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4 xl:gap-12">
          <div className="xl:pr-8 xl:border-r xl:border-[#E3D4B4]/15">
            <img src={logo} alt="Alma de Granja" className="mb-5 h-20 w-auto" />
            <p className="max-w-sm text-sm leading-relaxed text-[rgba(245,243,239,0.78)]">
              Selección premium de productos del campo chileno, con despacho coordinado y atención personalizada.
            </p>
            <ul className="mt-6 space-y-3 text-sm">
              {qualities.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-3 text-[rgba(245,243,239,0.9)]">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#C2A878]/45 bg-[#18241a]/45 text-[#C2A878]">
                    <Icon size={15} />
                  </span>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div className="xl:pr-8 xl:border-r xl:border-[#E3D4B4]/15">
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#C2A878]">Navegación</h4>
            <ul className="space-y-3 text-[15px]">
              {navLinks.map((item) => (
                <li key={item.label}>
                  {item.type === 'scroll' ? (
                    <button
                      onClick={() => scrollTo(item.id)}
                      className="group inline-flex items-center gap-2 text-[rgba(245,243,239,0.8)] transition-colors duration-300 hover:text-[#C2A878]"
                    >
                      <CheckCircle2 size={14} className="text-[#C2A878]/65 transition-colors duration-300 group-hover:text-[#C2A878]" />
                      {item.label}
                    </button>
                  ) : (
                    <Link
                      to={item.to}
                      className="group inline-flex items-center gap-2 text-[rgba(245,243,239,0.8)] transition-colors duration-300 hover:text-[#C2A878]"
                    >
                      <CheckCircle2 size={14} className="text-[#C2A878]/65 transition-colors duration-300 group-hover:text-[#C2A878]" />
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="xl:pr-8 xl:border-r xl:border-[#E3D4B4]/15">
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#C2A878]">Categorías</h4>
            <ul className="space-y-3 text-[15px]">
              {categoryLinks.map((item) => (
                <li key={item.label}>
                  <Link to={item.to} className="text-[rgba(245,243,239,0.8)] transition-colors duration-300 hover:text-[#C2A878]">
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/productos" className="group inline-flex items-center gap-2 font-medium text-[#C2A878]">
                  Ver todos los productos
                  <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.18em] text-[#C2A878]">Contacto</h4>
            <div className="space-y-4 text-[15px] text-[rgba(245,243,239,0.86)]">
              <a href="https://wa.me/56958086762" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 transition-colors duration-300 hover:text-[#C2A878]">
                <MessageCircle size={18} className="mt-0.5 text-[#C2A878]" />
                <span>+56 9 9086 1197</span>
              </a>
              <p className="flex items-start gap-3">
                <Clock3 size={18} className="mt-0.5 shrink-0 text-[#C2A878]" />
                <span>Lunes a Viernes, 09:00 - 18:30 hrs</span>
              </p>
              <p className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0 text-[#C2A878]" />
                <span>O&apos;Higgins de Pilay</span>
              </p>
            </div>

            <a
              href="https://wa.me/56958086762"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-6 inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-[#8AB06F]/45 bg-[linear-gradient(120deg,#355336,#456d45)] px-5 py-3.5 font-medium text-[#F5F3EF] shadow-[0_12px_25px_rgba(15,28,17,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(15,28,17,0.33)]"
            >
              <MessageCircle size={17} />
              Escríbenos por WhatsApp
              <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
            </a>
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-[#DCC8A0]/20 bg-[#203122]/55 px-4 py-5 backdrop-blur-[2px] sm:px-6">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4 xl:gap-0">
            {trustItems.map(({ icon: Icon, title, subtitle }, index) => (
              <div
                key={title}
                className={`flex items-start gap-3 px-2 py-2 xl:px-5 ${index < trustItems.length - 1 ? 'xl:border-r xl:border-[#DCC8A0]/18' : ''}`}
              >
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#C2A878]/45 bg-[#152218]/65 text-[#C2A878]">
                  <Icon size={17} />
                </span>
                <div>
                  <p className="font-medium text-[#F5F3EF]">{title}</p>
                  <p className="text-sm text-[rgba(245,243,239,0.72)]">{subtitle}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-5 border-t border-[#D9C8A2]/20 pt-6 text-sm text-[rgba(245,243,239,0.75)] lg:flex-row lg:items-center lg:justify-between">
          <p>© 2026 Alma de Granja. Todos los derechos reservados.</p>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <p>
              Desarrollado por{' '}
              <a href="https://loopdigital.cl" target="_blank" rel="noopener noreferrer" className="text-[#C2A878] transition-colors duration-300 hover:text-[#E2C58C]">
                LoopDigital.cl
              </a>
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#C2A878]/45 text-[#C2A878] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C2A878]/10"
              >
                <Camera size={16} />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#C2A878]/45 text-[#C2A878] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#C2A878]/10"
              >
                <Share2 size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
