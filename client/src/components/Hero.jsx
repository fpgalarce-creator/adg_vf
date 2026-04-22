import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MessageCircle, ArrowRight, ShoppingBag, ClipboardList, Send } from 'lucide-react'
import heroImg from '../assets/contenido.jpeg'
import ScrollAnimation from './ScrollAnimation.jsx'
import { loadProducts } from '../utils/productStore.js'

const steps = [
  {
    icon: ShoppingBag,
    title: 'Elige tus productos',
    description: 'Revisa nuestros productos destacados y selecciona todo lo que quieras agregar a tu cesta.',
  },
  {
    icon: ClipboardList,
    title: 'Rellena los datos de tu cesta',
    description: 'Completa tu pedido con los datos necesarios para que podamos coordinar correctamente tu compra.',
  },
  {
    icon: Send,
    title: 'Envía tu pedido por WhatsApp',
    description: 'Envía tu carro por WhatsApp y nuestro personal hablará contigo para coordinar el pago y la entrega de tus productos.',
  },
]

const STEP_INTERVAL_MS = 4200

export default function Hero() {
  const [activeStep, setActiveStep] = useState(0)
  const [activeProducts, setActiveProducts] = useState([])

  useEffect(() => {
    const products = loadProducts().filter((product) => product.active)
    setActiveProducts(products)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((current) => (current + 1) % steps.length)
    }, STEP_INTERVAL_MS)

    return () => clearInterval(interval)
  }, [])

  const marqueeItems = useMemo(() => {
    if (!activeProducts.length) return []
    return [...activeProducts, ...activeProducts]
  }, [activeProducts])

  const openWhatsApp = () => {
    const msg = encodeURIComponent('¡Hola Alma de Granja! Me gustaría hacer un pedido 🌿')
    window.open(`https://wa.me/56958086762?text=${msg}`, '_blank')
  }

  return (
    <section id="inicio" className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroImg} alt="Campo verde con productos frescos" className="w-full h-full object-cover object-[52%_30%]" />
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/50 to-olive-900/75" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-40 sm:pb-44 lg:pt-28 lg:pb-48">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr] gap-8 lg:gap-12 items-center">
          <div className="text-left max-w-2xl">
            <ScrollAnimation>
              <span className="inline-flex items-center gap-2 bg-white/12 backdrop-blur-md px-5 py-2 rounded-full border border-white/25 mb-7 text-cream-100 text-sm font-medium shadow-[0_8px_28px_rgba(0,0,0,0.22)]">
                Selección premium del campo chileno
              </span>
            </ScrollAnimation>

            <ScrollAnimation delay={120}>
              <h1 className="font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white leading-[1.03] mb-6 text-balance" style={{ fontFamily: "'Playfair Display', serif" }}>
                Sabores auténticos,
                <span className="block text-gold-400 mt-2">calidad que se nota</span>
              </h1>
            </ScrollAnimation>

            <ScrollAnimation delay={220}>
              <p className="text-cream-100/95 text-lg sm:text-xl max-w-xl mb-9 leading-relaxed">
                Productos de campo seleccionados con estándar boutique: huevos, quesos, frutos secos y canastas para regalar o disfrutar en casa.
              </p>
            </ScrollAnimation>

            <ScrollAnimation delay={320}>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4">
                <Link to="/productos" className="group flex items-center justify-center gap-2 bg-cream-50 text-olive-800 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white hover:-translate-y-0.5 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                  Ver productos
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <button onClick={openWhatsApp} className="group flex items-center justify-center gap-3 bg-green-600/95 hover:bg-green-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 shadow-[0_8px_24px_rgba(0,0,0,0.25)]">
                  <MessageCircle size={22} className="transition-transform group-hover:scale-110" />
                  Pedir por WhatsApp
                </button>
              </div>
            </ScrollAnimation>
          </div>

          <ScrollAnimation delay={220}>
            <aside className="w-full lg:max-w-[480px] lg:ml-auto rounded-3xl border border-white/25 bg-white/12 backdrop-blur-xl p-5 sm:p-6 text-cream-100 shadow-[0_22px_60px_rgba(0,0,0,0.35)]">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-cream-100/80">Cómo comprar</p>
                  <h2 className="font-heading text-2xl sm:text-[1.7rem] font-semibold text-white">Compra en 3 pasos</h2>
                </div>
                <span className="text-sm font-medium text-cream-100/85">0{activeStep + 1}/03</span>
              </div>

              <div className="relative min-h-[218px]">
                {steps.map((step, index) => {
                  const Icon = step.icon
                  const isActive = index === activeStep

                  return (
                    <article
                      key={step.title}
                      className={`absolute inset-0 rounded-2xl border border-white/20 bg-black/20 p-5 sm:p-6 transition-all duration-700 ease-out ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
                      }`}
                      aria-hidden={!isActive}
                    >
                      <div className="w-11 h-11 rounded-xl bg-olive-100/20 border border-white/20 text-cream-50 flex items-center justify-center mb-4">
                        <Icon size={20} />
                      </div>
                      <h3 className="font-heading text-xl text-white mb-3">{step.title}</h3>
                      <p className="text-cream-100/90 leading-relaxed text-[0.98rem]">{step.description}</p>
                    </article>
                  )
                })}
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2" role="tablist" aria-label="Progreso de compra en tres pasos">
                {steps.map((step, index) => (
                  <button
                    key={step.title}
                    onClick={() => setActiveStep(index)}
                    className="h-1.5 rounded-full bg-white/20 overflow-hidden"
                    aria-label={`Ver paso ${index + 1}`}
                  >
                    <span
                      className={`block h-full rounded-full transition-all duration-500 ${index === activeStep ? 'w-full bg-gold-400' : 'w-0 bg-transparent'}`}
                    />
                  </button>
                ))}
              </div>
            </aside>
          </ScrollAnimation>
        </div>
      </div>

      {!!marqueeItems.length && (
        <div className="absolute bottom-0 left-0 right-0 z-10">
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-olive-900/95 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-olive-900/95 to-transparent" />

          <div className="hero-marquee-wrapper border-y border-white/15 bg-black/25 backdrop-blur-sm py-3 sm:py-4">
            <div
              className="hero-marquee-track flex items-center gap-3 sm:gap-4 w-max hover:[animation-play-state:paused]"
              style={{ animationDuration: `${Math.max(34, activeProducts.length * 7)}s` }}
            >
              {marqueeItems.map((product, index) => (
                <figure
                  key={`${product.id}-${index}`}
                  className="h-16 w-24 sm:h-20 sm:w-32 md:h-24 md:w-40 rounded-xl overflow-hidden border border-white/20 bg-white/10 shrink-0"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-cream-50 to-transparent" />
    </section>
  )
}
