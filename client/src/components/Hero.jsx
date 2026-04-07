import heroImg from "../assets/hero.jpeg"
import { MessageCircle, ArrowDown } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation.jsx'

export default function Hero() {
  const scrollToProducts = () => {
    document.querySelector('#productos')?.scrollIntoView({ behavior: 'smooth' })
  }

  const openWhatsApp = () => {
    const msg = encodeURIComponent('¡Hola Alma de Granja! Me gustaría hacer un pedido 🌿')
    window.open(`https://wa.me/56958086762?text=${msg}`, '_blank')
  }

  return (
    <section id="inicio" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Campo verde con productos frescos"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-900/70 via-olive-900/50 to-olive-900/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-olive-900/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <ScrollAnimation>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-cream-200 text-sm font-medium">Productos frescos del campo chileno</span>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={100}>
          <h1 className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 text-balance">
            Lo mejor del campo,{' '}
            <span className="text-gold-400">directo a tu mesa</span>
          </h1>
        </ScrollAnimation>

        <ScrollAnimation delay={200}>
          <p className="text-cream-300 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed">
            Seleccionamos con cariño los productos más frescos y auténticos del campo para ti.
            Quesos artesanales, huevos de campo, frutos secos y mucho más.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={250}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-base sm:text-lg text-cream-200/90 mb-6">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-400 rounded-full" />
              Rancagua
            </span>
            <span className="hidden sm:block text-cream-400/50">·</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-400 rounded-full" />
              Machalí
            </span>
            <span className="hidden sm:block text-cream-400/50">·</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-400 rounded-full" />
              Graneros
            </span>
            <span className="hidden sm:block text-cream-400/50">·</span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-gold-400 rounded-full" />
              San Fco. de Mostazal
            </span>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={300}>
          <div className="inline-block bg-gold-500/25 border-2 border-gold-400/40 rounded-full px-8 py-3 mb-10 shadow-lg shadow-gold-500/10">
            <p className="text-gold-300 font-bold text-base sm:text-lg tracking-wide">
              🚚 Despacho GRATIS en compras sobre $20.000
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={400}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={openWhatsApp}
              className="group flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-lg shadow-green-900/30 hover:shadow-xl hover:shadow-green-900/40 hover:-translate-y-0.5"
            >
              <MessageCircle size={22} className="transition-transform group-hover:scale-110" />
              Pedir por WhatsApp
            </button>
            <button
              onClick={scrollToProducts}
              className="group flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 border border-white/20 hover:border-white/40 hover:-translate-y-0.5"
            >
              Ver productos
              <ArrowDown size={18} className="transition-transform group-hover:translate-y-1" />
            </button>
          </div>
        </ScrollAnimation>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-50 to-transparent" />
    </section>
  )
}
