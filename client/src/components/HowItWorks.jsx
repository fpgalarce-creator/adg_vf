import { ShoppingBag, ClipboardList, Send } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation.jsx'

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

export default function HowItWorks() {
  return (
    <section className="bg-[#F8F7F4] py-20 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-12">
            <span className="inline-block text-olive-600 text-sm font-semibold uppercase tracking-[0.15em] mb-3">Cómo comprar</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark mb-4">Compra en 3 pasos</h2>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <ScrollAnimation key={step.title} delay={index * 90}>
              <div className="h-full bg-white rounded-2xl p-8 border border-olive-100 shadow-sm">
                <div className="w-12 h-12 rounded-xl bg-olive-100 text-olive-700 flex items-center justify-center mb-5">
                  <step.icon size={22} />
                </div>
                <h3 className="font-heading font-semibold text-xl text-dark mb-3">{step.title}</h3>
                <p className="text-dark-light/70 leading-relaxed">{step.description}</p>
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
