import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import huevosImg from '../assets/products/huevos-de-campo.jpeg'
import frutosSecosImg from '../assets/products/Nueces-500grs.jpeg'
import quesosImg from '../assets/contenido2.jpeg'
import canastasImg from '../assets/gallerymain.jpg'
import ScrollAnimation from './ScrollAnimation.jsx'

const featuredCategory = {
  id: 'huevos',
  title: 'Huevos de campo',
  kicker: 'Selección protagonista',
  cta: 'Explorar categoría',
  image: huevosImg,
}

const secondaryCategories = [
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
      <aside className="relative rounded-[2.1rem] border border-white/35 bg-white/18 p-5 sm:p-6 backdrop-blur-md shadow-[0_22px_52px_rgba(15,23,42,0.22)]">
        <div className="pointer-events-none absolute inset-0 rounded-[2.1rem] bg-gradient-to-br from-white/24 via-white/[0.09] to-transparent" />

        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-cream-100/90">Vitrina curada</p>
          <h2 className="mt-2 font-heading text-2xl sm:text-[1.9rem] font-semibold text-white">Explora por categoría</h2>

          <div className="mt-5 space-y-3.5">
            <Link
              to={`/productos?categoria=${featuredCategory.id}`}
              className="group relative block overflow-hidden rounded-[1.4rem] border border-white/55 bg-white/96 shadow-[0_12px_28px_rgba(15,23,42,0.16)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_34px_rgba(15,23,42,0.22)]"
            >
              <div className="relative h-44 sm:h-48 overflow-hidden">
                <img
                  src={featuredCategory.image}
                  alt={featuredCategory.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1d2218]/44 via-[#20261b]/12 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white">
                <p className="text-[0.64rem] sm:text-[0.7rem] uppercase tracking-[0.16em] text-cream-100/95">{featuredCategory.kicker}</p>
                <div className="mt-1.5 flex items-end justify-between gap-3">
                  <h3 className="font-heading text-xl sm:text-2xl leading-tight font-semibold text-cream-50">{featuredCategory.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-[0.82rem] sm:text-sm text-cream-100/95">
                    {featuredCategory.cta}
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </div>
            </Link>

            <div className="grid grid-cols-1 min-[520px]:grid-cols-3 gap-3">
              {secondaryCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/productos?categoria=${category.id}`}
                  className="group relative isolate overflow-hidden rounded-[1.05rem] border border-white/60 bg-white/94 text-[color:var(--text-primary)] shadow-[0_10px_22px_rgba(15,23,42,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_28px_rgba(15,23,42,0.16)]"
                >
                  <div className="relative h-24 sm:h-28 overflow-hidden bg-[color:var(--bg-secondary)]">
                    <img
                      src={category.image}
                      alt={category.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/15" />
                  </div>

                  <div className="absolute inset-x-0 bottom-0 p-2.5">
                    <div className="flex items-center justify-between gap-2 rounded-xl bg-[#f7f5f0]/88 px-2.5 py-1.5 backdrop-blur-[2px]">
                      <h3 className="text-[0.78rem] leading-tight font-semibold text-[color:var(--text-primary)]">{category.title}</h3>
                      <ArrowUpRight size={13} className="shrink-0 text-[color:var(--primary)] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </aside>
    </ScrollAnimation>
  )
}
