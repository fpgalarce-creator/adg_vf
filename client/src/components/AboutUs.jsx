import aboutImg from "../assets/herovf.jpeg"
import { Heart, Leaf, Users, Award } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation.jsx'

const values = [
  { icon: Heart, title: 'Con cariño', desc: 'Cada producto es seleccionado pensando en tu familia.' },
  { icon: Leaf, title: '100% Natural', desc: 'Sin químicos, sin conservantes artificiales.' },
  { icon: Users, title: 'Trato cercano', desc: 'Te conocemos y te acompañamos en cada pedido.' },
  { icon: Award, title: 'Calidad real', desc: 'Estándar premium del campo chileno.' },
]

export default function AboutUs() {
  return (
    <section id="nosotros" className="py-24 sm:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          {/* Image Side */}
          <ScrollAnimation>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden">
              <img
                src={aboutImg}
                alt="Productos frescos del campo"
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollAnimation>

          {/* Text Side */}
          <div className="lg:py-2">
            <ScrollAnimation>
              <span className="block text-olive-600 text-sm font-semibold uppercase tracking-[0.15em] mb-2">
                Nuestra historia
              </span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark mb-5 leading-tight">
                Somos <span className="text-olive-600">Alma de Granja</span>
              </h2>
              <p className="text-dark-light/70 text-lg leading-relaxed mb-4">
                Nacimos de la pasión por lo auténtico. Creemos que los mejores sabores
                vienen de la tierra, del cuidado artesanal y del respeto por cada proceso.
              </p>
              <p className="text-dark-light/70 text-lg leading-relaxed mb-8">
                Seleccionamos cada producto con el mismo estándar con el que elegiríamos
                para nuestra propia familia. Trabajamos con productores locales de la zona
                de O'Higgins, garantizando frescura, trazabilidad y un trato humano en cada paso.
              </p>
            </ScrollAnimation>

            {/* Values Grid */}
            <div className="grid grid-cols-2 gap-4">
              {values.map((value, index) => (
                <ScrollAnimation key={index} delay={index * 100}>
                  <div className="group p-4 rounded-2xl bg-cream-50 hover:bg-olive-50 border border-olive-100/50 transition-all duration-300 hover:-translate-y-0.5">
                    <value.icon className="text-olive-600 mb-2 transition-transform duration-300 group-hover:scale-110" size={22} />
                    <h4 className="font-heading font-semibold text-dark text-sm mb-1">{value.title}</h4>
                    <p className="text-dark-light/50 text-xs leading-relaxed">{value.desc}</p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
