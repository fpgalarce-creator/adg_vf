import { Link } from 'react-router-dom'
import { MessageCircle, ArrowRight } from 'lucide-react'
import heroImg from '../assets/contenido.jpeg'
import ScrollAnimation from './ScrollAnimation.jsx'
import HeroCategoriesPanel from './HeroCategoriesPanel.jsx'

export default function Hero() {
  const openWhatsApp = () => {
    const msg = encodeURIComponent('¡Hola Alma de Granja! Me gustaría hacer un pedido 🌿')
    window.open(`https://wa.me/56958086762?text=${msg}`, '_blank')
  }

  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Campo verde con productos frescos" className="w-full h-full object-cover object-[52%_30%]" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#1d2419]/58 via-[#222a1f]/38 to-[#38442f]/56" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-28 sm:pb-32 lg:pt-28 lg:pb-36">
        <div className="grid items-start gap-8 lg:gap-12 xl:gap-16 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">
          <div className="max-w-2xl text-left">
            <ScrollAnimation>
              <span className="inline-flex items-center gap-2 bg-white/16 backdrop-blur-md px-5 py-2 rounded-full border border-white/30 mb-7 text-cream-50 text-sm font-medium shadow-[0_8px_28px_rgba(0,0,0,0.2)]">
              Selección premium del campo chileno
              </span>
            </ScrollAnimation>

            <ScrollAnimation delay={120}>
              <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.03] mb-6 text-balance" style={{ fontFamily: "'Playfair Display', serif" }}>
              Sabores auténticos,
              <span className="block text-[color:var(--accent)] mt-2">calidad que se nota</span>
              </h1>
            </ScrollAnimation>

            <ScrollAnimation delay={220}>
              <p className="text-cream-50/95 text-lg sm:text-xl max-w-xl mb-9 leading-relaxed">
              Productos de campo seleccionados con estándar boutique: huevos, quesos, frutos secos y canastas para regalar o disfrutar en casa.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={320}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4">
              <Link to="/productos" className="group flex items-center justify-center gap-2 bg-[color:var(--bg-card)] text-[color:var(--text-primary)] px-8 py-4 rounded-full border border-[color:var(--border-soft)] font-semibold text-lg transition-all duration-300 hover:bg-[color:var(--bg-secondary)] hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                Ver productos
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <button onClick={openWhatsApp} className="group flex items-center justify-center gap-3 bg-[color:var(--whatsapp)] hover:bg-[color:var(--whatsapp-hover)] text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                <MessageCircle size={22} className="transition-transform group-hover:scale-110" />
                Pedir por WhatsApp
              </button>
              </div>
            </ScrollAnimation>
          </div>

          <HeroCategoriesPanel />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[color:var(--bg-primary)] to-transparent" />
    </section>
  )
}
