import { ShoppingBag, ClipboardList, Send, CheckCircle2 } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation.jsx'

const steps = [
  {
    icon: ShoppingBag,
    title: 'Elige tus productos',
    description: 'Explora nuestro catálogo y agrega al carrito lo que más te guste.',
    color: 'bg-olive-100 text-olive-700',
  },
  {
    icon: ClipboardList,
    title: 'Completa tus datos',
    description: 'Ingresa tu nombre, dirección y localidad en el formulario del carrito.',
    color: 'bg-cream-200 text-gold-600',
  },
  {
    icon: Send,
    title: 'Envía tu pedido',
    description: 'Con un clic, tu pedido se envía directo a nuestro WhatsApp.',
    color: 'bg-green-100 text-green-700',
  },
  {
    icon: CheckCircle2,
    title: 'Te confirmamos todo',
    description: 'Nuestro equipo te contactará para confirmar pago y coordinar despacho.',
    color: 'bg-olive-100 text-olive-600',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-[#F8F7F4] py-20 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="text-center mb-16 bg-white rounded-3xl border border-olive-100 p-8 sm:p-10 shadow-lg shadow-olive-900/5">
            <span className="inline-block text-olive-600 text-sm font-semibold uppercase tracking-[0.15em] mb-3">Proceso simple</span>
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark mb-4">¿Cómo funciona?</h2>
            <p className="text-dark-light/75 text-lg max-w-2xl mx-auto">Pedir tus productos del campo es fácil, rápido y seguro. Solo 4 pasos y listo.</p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <ScrollAnimation key={index} delay={index * 100}>
              <div className="group relative bg-white rounded-2xl p-8 border border-olive-100 shadow-md shadow-olive-900/5 hover:border-olive-200 transition-all duration-500 hover:shadow-xl hover:shadow-olive-900/10 hover:-translate-y-1">
                <div className="absolute top-4 right-4 text-6xl font-heading font-bold text-olive-100/60">{index + 1}</div>
                <div className={`w-14 h-14 rounded-2xl ${step.color} flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                  <step.icon size={24} />
                </div>
                <h3 className="font-heading font-semibold text-xl text-dark mb-3">{step.title}</h3>
                <p className="text-dark-light/65 leading-relaxed">{step.description}</p>
                {index < 3 && <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-olive-200" />}
              </div>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
