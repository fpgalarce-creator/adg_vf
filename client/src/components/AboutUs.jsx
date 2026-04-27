import aboutImg from '../assets/herovf.jpeg'
import ScrollAnimation from './ScrollAnimation.jsx'

export default function AboutUs() {
  return (
    <section id="nosotros" className="py-24 sm:py-32 bg-[color:var(--bg-primary)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <ScrollAnimation>
            <div>
              <span className="block text-[color:var(--primary)] text-sm font-semibold uppercase tracking-[0.15em] mb-2">Nosotros</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[color:var(--text-primary)] mb-5 leading-tight">Una marca de campo con mirada premium</h2>
              <p className="text-[color:var(--text-secondary)] text-lg leading-relaxed mb-4">
                En Alma de Granja conectamos tradición y cuidado artesanal para acercarte productos nobles, frescos y trazables.
              </p>
              <p className="text-[color:var(--text-secondary)] text-lg leading-relaxed">
                Trabajamos junto a productores locales de O'Higgins para construir una experiencia cercana, confiable y con estándares altos en cada pedido.
              </p>
            </div>
          </ScrollAnimation>

          <ScrollAnimation>
            <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-lg shadow-olive-900/10">
              <img src={aboutImg} alt="Equipo y productos de Alma de Granja" className="w-full h-full object-cover" />
            </div>
          </ScrollAnimation>
        </div>
      </div>
    </section>
  )
}
