import { Link } from 'react-router-dom'
import { MapPin, ShoppingBag, PackageCheck, MessageCircle, ArrowRight } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation.jsx'

const steps = [
  {
    icon: ShoppingBag,
    label: 'Ve a productos',
    to: '/productos'
  },
  {
    icon: PackageCheck,
    label: 'Elige tus productos'
  },
  {
    icon: MessageCircle,
    label: 'Envía tu carrito por WhatsApp y te responderemos'
  }
]

export default function HeroInfoBar() {
  return (
    <section aria-label="Información de despacho y compra" className="relative -mt-2 z-20 pb-4 sm:pb-6 lg:pb-8">
      <ScrollAnimation>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[1.8rem] sm:rounded-[2.1rem] border border-[#d8cfbe]/45 bg-[linear-gradient(135deg,#3f4d36_0%,#4f5f45_54%,#627454_100%)] shadow-[0_18px_40px_rgba(21,28,18,0.2)] px-6 py-7 sm:px-8 sm:py-9 lg:px-11 lg:py-11">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(240,228,199,0.22),transparent_40%),radial-gradient(circle_at_bottom_left,rgba(211,224,189,0.15),transparent_46%)]" aria-hidden="true" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:gap-10">
              <div className="lg:w-[43%]">
                <p className="inline-flex items-center gap-2 text-cream-50 text-[0.68rem] sm:text-xs uppercase tracking-[0.18em] font-semibold mb-3">
                  <MapPin size={14} className="text-[#f1e4cb] icon-soft-float" />
                  Zonas de despacho
                </p>
                <p className="text-cream-50 text-lg sm:text-[1.34rem] font-medium leading-relaxed text-balance">
                  Solo vendemos en Rancagua, Machalí, Graneros y San Francisco de Mostazal
                </p>
              </div>

              <div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-cream-100/50 to-transparent" aria-hidden="true" />

              <div className="lg:flex-1">
                <p className="text-[#f2deba] text-[0.68rem] sm:text-xs uppercase tracking-[0.18em] font-semibold mb-4">Compra rápida</p>
                <ol className="flex flex-col gap-3.5 md:gap-4 md:flex-row md:flex-wrap md:items-center md:gap-y-3">
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    const content = (
                      <>
                        <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/14 border border-white/28">
                          <Icon size={15} className="text-cream-50 icon-soft-float" aria-hidden="true" />
                        </span>
                        <span className="text-cream-50 text-sm sm:text-[0.96rem] leading-snug">{step.label}</span>
                      </>
                    )

                    return (
                      <li key={step.label} className="flex items-center gap-2.5">
                        {step.to ? (
                          <Link to={step.to} className="group inline-flex items-center gap-2.5 rounded-full px-2.5 py-1.5 -mx-2 transition-all duration-300 hover:bg-white/14 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2deba]/70">
                            {content}
                            <ArrowRight size={14} className="text-[#f5e5c8] transition-transform duration-300 group-hover:translate-x-0.5" />
                          </Link>
                        ) : (
                          <div className="inline-flex items-center gap-2.5 px-0.5">{content}</div>
                        )}

                        {index < steps.length - 1 && (
                          <span className="hidden md:inline-block mx-3 h-px w-5 bg-cream-100/45" aria-hidden="true" />
                        )}
                      </li>
                    )
                  })}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  )
}
