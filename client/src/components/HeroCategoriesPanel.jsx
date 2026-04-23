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
      <aside className="w-full lg:max-w-[36rem] lg:justify-self-end lg:pt-2 xl:pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4 lg:gap-5">
          {categoryCards.map((category) => (
            <Link
              key={category.id}
              to={`/productos?categoria=${category.id}`}
              className="group relative isolate flex aspect-[1.2/1] sm:aspect-[1.03/1] overflow-hidden rounded-2xl text-white transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(15,23,42,0.28)]"
              aria-label={`Ver categoría ${category.title}`}
            >
              <img
                src={category.image}
                alt={category.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-[1.045]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#13190f]/58 via-[#1b2314]/20 to-transparent transition-colors duration-300 group-hover:from-[#13190f]/64" />

              <div className="relative mt-auto w-full p-3 sm:p-3.5 lg:p-4">
                <div className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-white/50 bg-white/78 px-3 py-1.5 backdrop-blur-[2px] transition-colors duration-300 group-hover:bg-white/86">
                  <span className="truncate text-sm sm:text-[0.94rem] font-semibold text-[color:var(--text-primary)]">{category.title}</span>
                  <span className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/92 text-[color:var(--primary)] transition-transform duration-300 ease-out group-hover:translate-x-0.5">
                    <ArrowUpRight size={13} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </aside>
    </ScrollAnimation>
  )
}
