import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import huevosImg from '../assets/products/huevos-de-campo.jpeg'
import frutosSecosImg from '../assets/products/Nueces-500grs.jpeg'
import quesosImg from '../assets/contenido2.jpeg'
import canastasImg from '../assets/gallerymain.jpg'
import ScrollAnimation from './ScrollAnimation.jsx'

const categoryCards = [
  {
    id: 'huevos',
    title: 'Huevos de campo',
    image: huevosImg,
  },
  {
    id: 'frutos-secos',
    title: 'Frutos secos',
    image: frutosSecosImg,
  },
  {
    id: 'quesos',
    title: 'Quesos artesanales',
    image: quesosImg,
  },
  {
    id: 'canastas',
    title: 'Canastas y packs',
    image: canastasImg,
  },
]

export default function HeroCategoriesPanel() {
  return (
    <ScrollAnimation delay={180}>
      <aside className="relative rounded-[2rem] border border-white/30 bg-white/16 p-5 sm:p-6 backdrop-blur-md shadow-[0_20px_48px_rgba(15,23,42,0.2)]">
        <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/20 via-white/[0.06] to-transparent" />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/90">Vitrina curada</p>
          <h2 className="mt-2 font-heading text-2xl sm:text-[1.9rem] font-semibold text-white">Explora por categoría</h2>

          <div className="mt-5 grid grid-cols-1 min-[500px]:grid-cols-2 gap-3.5 sm:gap-4">
            {categoryCards.map((category) => (
              <Link
                key={category.id}
                to={`/productos?categoria=${category.id}`}
                className="group relative isolate flex aspect-[1/1] overflow-hidden rounded-[1.25rem] border border-white/60 bg-white/94 text-[color:var(--text-primary)] shadow-[0_10px_24px_rgba(15,23,42,0.13)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_34px_rgba(15,23,42,0.2)]"
              >
                <img
                  src={category.image}
                  alt={category.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141910]/55 via-[#1f2618]/16 to-white/8 transition-colors duration-300 group-hover:from-[#141910]/62" />

                <div className="relative mt-auto w-full p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-3 rounded-xl border border-white/35 bg-[#f8f6f0]/80 px-3 py-2.5 backdrop-blur-[3px] transition-colors duration-300 group-hover:bg-[#fbf9f2]/92 group-hover:border-[color:var(--accent)]/45">
                    <h3 className="text-sm sm:text-[0.95rem] leading-tight font-semibold text-[color:var(--text-primary)]">{category.title}</h3>
                    <span className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/75 text-[color:var(--primary)] shadow-[0_4px_10px_rgba(35,43,29,0.15)] transition-all duration-300 group-hover:bg-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </ScrollAnimation>
  )
}
