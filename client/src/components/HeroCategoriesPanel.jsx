import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import huevosImg from '../assets/products/huevos-de-campo.jpeg'
import frutosSecosImg from '../assets/products/Nueces-500grs.jpeg'
import quesosImg from '../assets/contenido2.jpeg'
import canastasImg from '../assets/gallerymain.jpg'
import ScrollAnimation from './ScrollAnimation.jsx'

const heroCategories = [
  {
    id: 'huevos',
    title: 'Huevos de campo',
    description: 'Frescos y naturales de gallinas libres',
    image: huevosImg,
  },
  {
    id: 'frutos-secos',
    title: 'Frutos secos',
    description: 'Seleccionados y de la mejor calidad',
    image: frutosSecosImg,
  },
  {
    id: 'quesos',
    title: 'Quesos artesanales',
    description: 'Elaborados con pasión y tradición',
    image: quesosImg,
  },
  {
    id: 'canastas',
    title: 'Canastas y packs',
    description: 'Para regalar o compartir momentos especiales',
    image: canastasImg,
  },
]

export default function HeroCategoriesPanel() {
  return (
    <ScrollAnimation delay={180}>
      <aside className="relative rounded-[2.2rem] border border-white/25 bg-white/10 p-5 sm:p-6 backdrop-blur-md shadow-[0_24px_54px_rgba(15,23,42,0.24)]">
        <div className="pointer-events-none absolute inset-0 rounded-[2.2rem] bg-gradient-to-br from-white/18 via-white/[0.05] to-transparent" />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/85">Explora nuestras categorías</p>
          <h2 className="mt-2 font-heading text-2xl sm:text-[1.9rem] font-semibold text-white">Compra por tipo de producto</h2>

          <div className="mt-5 grid grid-cols-1 min-[480px]:grid-cols-2 gap-3.5">
            {heroCategories.map((category) => (
              <Link
                key={category.id}
                to={`/productos?categoria=${category.id}`}
                className="group overflow-hidden rounded-2xl border border-[color:var(--border-soft)] bg-[color:var(--bg-card)]/95 text-[color:var(--text-primary)] shadow-[0_10px_26px_rgba(15,23,42,0.14)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_30px_rgba(15,23,42,0.2)]"
              >
                <div className="relative h-28 overflow-hidden bg-[color:var(--bg-secondary)]">
                  <img
                    src={category.image}
                    alt={category.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
                </div>

                <div className="p-3.5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="font-semibold text-[0.96rem] leading-tight text-[color:var(--text-primary)]">{category.title}</h3>
                    <ArrowUpRight size={15} className="mt-0.5 shrink-0 text-[color:var(--primary)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                  <p className="mt-1.5 text-xs leading-relaxed text-[color:var(--text-secondary)]">{category.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </ScrollAnimation>
  )
}
