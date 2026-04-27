import { Link } from 'react-router-dom'
import { MapPin, ShoppingBag, PackageCheck, MessageCircle, ArrowRight, Truck, Leaf } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation.jsx'

const steps = [
  {
    icon: ShoppingBag,
    title: 'Ver productos',
    description: 'Explora todo nuestro catálogo',
    to: '/productos',
    ariaLabel: 'Ver productos'
  },
  {
    icon: PackageCheck,
    title: 'Elige tus productos',
    description: 'Selecciona tus favoritos'
  },
  {
    icon: MessageCircle,
    title: 'Envía tu carrito por WhatsApp',
    description: 'Te responderemos a la brevedad'
  }
]

export default function HeroInfoBar() {
  return (
    <section aria-label="Información de despacho y compra" className="relative -mt-2 z-20 pb-4 sm:pb-6 lg:pb-8">
      <ScrollAnimation>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] sm:rounded-[2.3rem] border border-[#d8cfbe]/28 bg-[linear-gradient(120deg,#2f3a2e_0%,#344331_44%,#3a4638_100%)] shadow-[0_18px_55px_rgba(19,24,16,0.28)] px-6 py-7 sm:px-9 sm:py-10 lg:px-12 lg:py-12">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(228,208,164,0.22),transparent_41%),radial-gradient(circle_at_bottom_left,rgba(167,190,137,0.18),transparent_47%)]" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-[45%] opacity-20" aria-hidden="true">
              <div className="absolute right-5 top-7 h-40 w-40 rounded-full border border-[#e5d5af]/25" />
              <div className="absolute right-10 top-16 h-28 w-28 rounded-full border border-[#e5d5af]/18" />
              <div className="absolute bottom-8 right-7 h-20 w-40 rounded-[100%] border border-[#c6d3ad]/22" />
              <Leaf size={78} className="absolute bottom-5 right-7 text-[#d7c39d]/35" />
            </div>

            <div className="relative flex flex-col gap-8 lg:grid lg:grid-cols-[1.03fr_auto_1fr] lg:items-stretch lg:gap-10">
              <div className="space-y-4 lg:space-y-5">
                <p className="inline-flex items-center gap-2 text-[#e3cca2] text-[0.68rem] sm:text-xs uppercase tracking-[0.2em] font-semibold">
                  <MapPin size={14} className="text-[#e9d5ad] icon-soft-float" />
                  Zonas de despacho
                </p>
                <h3 className="text-[#f8f3e7] text-[1.7rem] sm:text-[2rem] lg:text-[2.35rem] font-semibold leading-[1.16] text-balance">
                  Solo vendemos en <span className="text-[#e6cc9d]">Rancagua, Machalí, Graneros y San Francisco de Mostazal</span>
                </h3>
                <div className="inline-flex items-center gap-3 rounded-2xl bg-white/6 border border-white/14 px-3.5 py-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e3d4b5]/35 bg-[#e3d4b5]/10">
                    <Truck size={18} className="text-[#e8d4ad] icon-soft-float" aria-hidden="true" />
                  </span>
                  <p className="text-[#f6efde]/88 text-base sm:text-[1.06rem] leading-snug text-balance">
                    Despachos rápidos y seguros directo desde el campo a tu hogar.
                  </p>
                </div>
              </div>

              <div className="hidden lg:block w-px self-stretch bg-gradient-to-b from-transparent via-[#e4d1a8]/42 to-transparent" aria-hidden="true" />

              <div className="lg:pl-1">
                <p className="text-[#e3cca2] text-[0.68rem] sm:text-xs uppercase tracking-[0.2em] font-semibold mb-4 sm:mb-5">Compra rápida</p>
                <ol className="flex flex-col gap-3.5 sm:gap-4">
                  {steps.map((step) => {
                    const Icon = step.icon
                    const content = (
                      <>
                        <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5ead3] text-[#4b5b45] border border-[#f4e7ce]/90 shadow-[0_6px_16px_rgba(15,20,12,0.18)]">
                          <Icon size={20} className="icon-soft-float" aria-hidden="true" />
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block text-[#f7f2e6] text-base sm:text-[1.06rem] font-medium leading-tight">
                            {step.title}
                          </span>
                          <span className="block text-[#f4edde]/76 text-sm sm:text-[1.02rem] mt-1 leading-snug">
                            {step.description}
                          </span>
                        </span>
                        <ArrowRight size={22} className="shrink-0 text-[#e8d2a8] transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )

                    return (
                      <li key={step.title}>
                        {step.to ? (
                          <Link
                            to={step.to}
                            aria-label={step.ariaLabel}
                            className="group flex items-center gap-3 sm:gap-4 rounded-2xl border border-white/17 bg-white/[0.06] px-3.5 py-3.5 sm:px-4 sm:py-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.1] hover:border-[#f2deb6]/40 hover:shadow-[0_12px_24px_rgba(12,17,10,0.2)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#f2deba]/70"
                          >
                            {content}
                          </Link>
                        ) : (
                          <div className="group flex items-center gap-3 sm:gap-4 rounded-2xl border border-white/17 bg-white/[0.06] px-3.5 py-3.5 sm:px-4 sm:py-4 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/[0.1] hover:border-[#f2deb6]/40 hover:shadow-[0_12px_24px_rgba(12,17,10,0.2)]">
                            {content}
                          </div>
                        )}
                      </li>
                    )
                  })}
                </ol>
                <div className="mt-4 sm:mt-6 flex items-center justify-center lg:justify-start gap-2 text-sm font-medium text-white/80 text-center lg:text-left opacity-0 translate-y-1 animate-[contactFadeIn_700ms_ease-out_140ms_forwards] motion-reduce:animate-none motion-reduce:opacity-100 motion-reduce:translate-y-0">
                  <Truck size={16} className="shrink-0 text-white/75" aria-hidden="true" />
                  <p>Por compras sobre $25.000 el despacho es gratis</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ScrollAnimation>
    </section>
  )
}
