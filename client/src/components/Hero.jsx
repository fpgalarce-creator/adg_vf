import heroImg from '../assets/contenido.jpeg'
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
      <div className="absolute inset-0">
        <img
          src={heroImg}
          alt="Campo verde con productos frescos"
          className="w-full h-full object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/45 to-olive-900/75" />
        <div className="absolute inset-0 bg-gradient-to-r from-olive-900/45 via-transparent to-black/20" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-20">
        <ScrollAnimation>
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 mb-8">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-cream-200 text-sm font-medium">Productos frescos del campo chileno</span>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={100}>
          <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 text-balance"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Lo mejor del campo, <span className="text-gold-400">directo a tu mesa</span>
          </h1>
        </ScrollAnimation>

        <ScrollAnimation delay={200}>
          <p className="text-cream-200 text-lg sm:text-xl max-w-2xl mx-auto mb-4 leading-relaxed"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Seleccionamos con cariño los productos más frescos y auténticos del campo para ti.
            Quesos artesanales, huevos de campo, frutos secos y mucho más.
          </p>
        </ScrollAnimation>

        <ScrollAnimation delay={250}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-lg sm:text-xl md:text-2xl text-cream-100 mb-6 font-medium">
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-gold-400 rounded-full" />Rancagua</span>
            <span className="hidden sm:block text-cream-400/50">·</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-gold-400 rounded-full" />Machalí</span>
            <span className="hidden sm:block text-cream-400/50">·</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-gold-400 rounded-full" />Graneros</span>
            <span className="hidden sm:block text-cream-400/50">·</span>
            <span className="flex items-center gap-2"><span className="w-2 h-2 bg-gold-400 rounded-full" />San Fco. de Mostazal</span>
          </div>
        </ScrollAnimation>

        <ScrollAnimation delay={300}>
          <div className="inline-block rounded-full px-8 sm:px-10 py-3.5 sm:py-4 mb-10 bg-cream-100/22 border border-cream-100/45 backdrop-blur-sm shadow-lg shadow-black/20 animate-[heroBadgeFloat_4.5s_ease-in-out_infinite] transition-all duration-300 hover:bg-cream-100/30 hover:border-cream-100/60">
            <p className="text-cream-50 font-extrabold text-lg sm:text-2xl tracking-wide [text-shadow:0_1px_8px_rgba(0,0,0,0.28)]">🚚 Despacho GRATIS en compras sobre $25.000</p>
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

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cream-50 to-transparent" />
    </section>
  )
}
