import { Leaf, ShieldCheck, Truck } from 'lucide-react'

const benefits = [
  { icon: Leaf, title: 'Origen seleccionado', text: 'Productos frescos y trazables, elegidos con criterio de calidad.' },
  { icon: Truck, title: 'Despacho coordinado', text: 'Atención personalizada para confirmar tiempos, pago y entrega.' },
  { icon: ShieldCheck, title: 'Compra confiable', text: 'Acompañamiento directo por WhatsApp en todo el proceso de compra.' },
]

export default function Benefits() {
  return (
    <section className="py-20 bg-cream-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map(({ icon: Icon, title, text }) => (
            <article key={title} className="h-full rounded-2xl border border-olive-100 bg-white p-6">
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-olive-100 text-olive-700"><Icon size={20} /></div>
              <h3 className="font-heading text-xl font-semibold text-dark mb-2">{title}</h3>
              <p className="text-dark-light/70">{text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
