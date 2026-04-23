import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation.jsx'
import huevosImage from '../assets/products/huevos-de-campo.jpeg'
import frutosSecosImage from '../assets/products/Almendras.jpeg'
import quesosImage from '../assets/contenido2.jpeg'
import canastasImage from '../assets/gallery_card_1.jpeg'

const promoCategories = [
  {
    title: 'Huevos de campo',
    description: 'Frescura natural para tu mesa diaria.',
    image: huevosImage,
    href: '/productos?categoria=huevos'
  },
  {
    title: 'Frutos secos',
    description: 'Selección premium para cada momento.',
    image: frutosSecosImage,
    href: '/productos?categoria=frutos-secos'
  },
  {
    title: 'Quesos artesanales',
    description: 'Sabor, tradición y carácter.',
    image: quesosImage,
    href: '/productos?categoria=quesos'
  },
  {
    title: 'Canastas y packs',
    description: 'Opciones pensadas para regalar o compartir.',
    image: canastasImage,
    href: '/productos?categoria=canastas'
  }
]

export default function PromotionalCategories() {
  return (
    <section aria-label="Categorías promocionales" className="pb-14 sm:pb-20 bg-[color:var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="mb-7 sm:mb-9">
            <span className="inline-flex items-center rounded-full bg-[color:var(--bg-primary)] text-[color:var(--primary)] border border-[color:var(--border-soft)] px-3 py-1 text-[0.68rem] sm:text-xs uppercase tracking-[0.16em] font-semibold">
              Explora por categoría
            </span>
            <h2 className="mt-3 font-heading text-2xl sm:text-3xl lg:text-[2.05rem] font-semibold text-[color:var(--text-primary)]">Una selección curada para comprar mejor</h2>
            <p className="mt-3 text-[color:var(--text-secondary)] max-w-2xl">Accede directo a categorías destacadas y encuentra productos premium en segundos.</p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 lg:gap-6">
          {promoCategories.map((category, index) => (
            <ScrollAnimation key={category.title} delay={index * 80}>
              <Link
                to={category.href}
                className="group relative isolate overflow-hidden rounded-[1.55rem] sm:rounded-[1.8rem] min-h-[220px] sm:min-h-[255px] lg:min-h-[285px] block shadow-[0_18px_40px_rgba(30,34,23,0.16)] hover:shadow-[0_26px_48px_rgba(30,34,23,0.24)] transition-all duration-500 hover:-translate-y-1"
                aria-label={`Ver categoría ${category.title}`}
              >
                <img
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-[#1f2419]/74 via-[#262b1f]/56 to-[#2f3426]/72" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/52 via-transparent to-transparent opacity-85" />

                <div className="relative z-10 h-full flex flex-col justify-end p-6 sm:p-7 lg:p-8">
                  <p className="text-cream-100/85 text-[0.68rem] sm:text-xs uppercase tracking-[0.16em] mb-2">Categoría destacada</p>
                  <h3 className="text-cream-50 font-heading text-2xl sm:text-[1.7rem] leading-tight font-semibold text-balance">{category.title}</h3>
                  <p className="mt-2 text-cream-100/90 text-sm sm:text-[0.95rem] max-w-[34ch]">{category.description}</p>

                  <span className="mt-4 inline-flex items-center gap-2 text-[color:var(--accent-soft)] font-medium text-sm sm:text-[0.95rem]">
                    Ver productos
                    <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </Link>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
