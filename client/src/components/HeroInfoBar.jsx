import { Link } from 'react-router-dom'
import { MapPin, ShoppingBag, PackageCheck, MessageCircle } from 'lucide-react'
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
    <section aria-label="Información de despacho y compra" className="relative -mt-1 z-20">
      <ScrollAnimation>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-olive-200/70 bg-cream-50/92 supports-[backdrop-filter]:bg-cream-50/82 backdrop-blur-sm rounded-3xl shadow-[0_12px_34px_rgba(53,59,39,0.08)] px-5 py-5 sm:px-7 sm:py-6 lg:px-9 lg:py-7">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:gap-7">
              <div className="lg:w-[44%]">
                <p className="inline-flex items-center gap-2 text-olive-600 text-xs uppercase tracking-[0.16em] font-semibold mb-2">
                  <MapPin size={14} className="text-olive-500" />
                  Zonas de despacho
                </p>
                <p className="text-olive-900 text-base sm:text-lg lg:text-[1.1rem] font-medium leading-relaxed text-balance">
                  Solo vendemos en Rancagua, Machalí, Graneros y San Francisco de Mostazal
                </p>
              </div>

              <div className="hidden lg:block w-px self-stretch bg-olive-200/70" aria-hidden="true" />

              <div className="lg:flex-1">
                <p className="text-olive-500 text-xs uppercase tracking-[0.16em] font-semibold mb-3">Compra rápida</p>
                <ol className="flex flex-col gap-2.5 sm:gap-3 md:flex-row md:flex-wrap md:items-center md:gap-0">
                  {steps.map((step, index) => {
                    const Icon = step.icon
                    const content = (
                      <>
                        <Icon size={15} className="text-olive-600 shrink-0" aria-hidden="true" />
                        <span className="text-olive-800 text-sm sm:text-[0.95rem] leading-snug">{step.label}</span>
                      </>
                    )

                    return (
                      <li key={step.label} className="flex items-center gap-2.5">
                        {step.to ? (
                          <Link to={step.to} className="inline-flex items-center gap-2.5 rounded-full px-2 py-1 -mx-2 transition-colors hover:text-olive-600 hover:bg-olive-100/70">
                            {content}
                          </Link>
                        ) : (
                          <div className="inline-flex items-center gap-2.5 px-0.5">{content}</div>
                        )}

                        {index < steps.length - 1 && (
                          <span className="hidden md:inline-block mx-4 h-px w-6 bg-olive-300/75" aria-hidden="true" />
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
