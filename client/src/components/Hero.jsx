import { Link } from 'react-router-dom'
import heroImg from '../assets/contenido.jpeg'
import { MessageCircle, ArrowRight } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation.jsx'

export default function Hero() {
  const openWhatsApp = () => {
    const msg = encodeURIComponent('¡Hola Alma de Granja! Me gustaría hacer un pedido 🌿')
    window.open(`https://wa.me/56958086762?text=${msg}`, '_blank')
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Campo verde con productos frescos" className="w-full h-full object-cover object-[50%_30%]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-olive-900/70" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <ScrollAnimation>
          <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 mb-8 text-cream-100 text-sm font-medium">Selección premium del campo chileno</span>
        </ScrollAnimation>

        <ScrollAnimation delay={120}>
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 text-balance" style={{ fontFamily: "'Playfair Display', serif" }}>
            Sabores auténticos,
            <span className="block text-gold-400">calidad que se nota</span>
          </h1>
        </ScrollAnimation>

        <ScrollAnimation delay={220}>
          <p className="text-cream-100 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Productos de campo seleccionados con estándar boutique: huevos, quesos, frutos secos y canastas para regalar o disfrutar en casa.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={320}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/productos" className="group flex items-center gap-2 bg-cream-50 text-olive-800 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:-translate-y-0.5">
              Ver productos
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <button onClick={openWhatsApp} className="group flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
              <MessageCircle size={22} className="transition-transform group-hover:scale-110" />
              Pedir por WhatsApp
            </button>
          </div>
        </ScrollAnimation>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-50 to-transparent" />
    </section>
  )
}
