import { Link } from 'react-router-dom'
import { ArrowRight, Heart, Leaf } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation.jsx'
import { useProducts } from '../hooks/useProducts.js'
import { formatPrice } from './ProductCard.jsx'
import heroImageFallback from '../assets/contenido2.jpeg'
import cardImageFallback from '../assets/contenido.jpeg'

const normalize = (value = '') => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

const campaignCards = [
  {
    id: 'canasta-huevos-campo',
    title: 'Canasta de Huevos de Campo',
    description: 'Huevos frescos de gallinas libres, criadas con amor y alimentación natural.',
    price: 7490,
    categoryHints: ['huevos', 'campo'],
    imageHints: ['huevos', 'canasta'],
    fallbackImage: heroImageFallback,
  },
  {
    id: 'tabla-gourmet-artesanal',
    title: 'Tabla Gourmet Artesanal',
    description: 'Selección de quesos artesanales, frutos secos, aceitunas y acompañamientos premium.',
    price: 24990,
    categoryHints: ['quesos', 'frutos secos', 'otros'],
    imageHints: ['queso', 'almendras', 'nueces', 'pistachos'],
    fallbackImage: cardImageFallback,
  },
  {
    id: 'canasta-premium-campo',
    title: 'Canasta Premium del Campo',
    description: 'Un regalo completo con lo mejor del campo chileno, listo para sorprender.',
    price: 29990,
    categoryHints: ['otros', 'huevos', 'frutos secos'],
    imageHints: ['nueces', 'almendras', 'huevos'],
    fallbackImage: heroImageFallback,
  },
]

const resolveCardImage = (products, card) => {
  if (!Array.isArray(products) || products.length === 0) return card.fallbackImage

  const matchByHints = products.find((product) => {
    if (!product?.image) return false
    const title = normalize(product.title || product.name)
    const category = normalize(product.category || product.categoria)
    return card.imageHints.some((hint) => title.includes(normalize(hint)))
      || card.categoryHints.some((hint) => category.includes(normalize(hint)))
  })

  return matchByHints?.image || card.fallbackImage
}

export default function FeaturedPromoSection() {
  const { products } = useProducts()

  const cards = campaignCards.map((card) => ({
    ...card,
    image: resolveCardImage(products, card),
  }))

  return (
    <section
      aria-label="Destacados promocionales"
      className="relative isolate overflow-hidden bg-[#FFF1EF] py-16 sm:py-20 lg:py-24"
    >
      <div className="pointer-events-none absolute -left-24 top-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,_rgba(201,111,118,0.18)_0%,_rgba(201,111,118,0)_72%)]" />
      <div className="pointer-events-none absolute -right-16 -top-8 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(194,168,120,0.16)_0%,_rgba(194,168,120,0)_70%)]" />
      <div className="pointer-events-none absolute -bottom-20 right-10 h-60 w-60 rounded-full bg-[radial-gradient(circle,_rgba(94,111,82,0.12)_0%,_rgba(94,111,82,0)_74%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <header className="mx-auto mb-10 max-w-3xl text-center sm:mb-12">
            <span className="inline-flex items-center rounded-full border border-[#C96F76]/30 bg-[#C96F76]/12 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8A4A54]">
              Edición especial
            </span>

            <h2 className="mt-5 font-heading text-3xl font-semibold leading-tight text-[#2B2B28] sm:text-4xl lg:text-5xl">
              Regalos perfectos para el <span className="text-[#C96F76]">Día de la Madre</span>
            </h2>

            <div className="mt-4 inline-flex items-center gap-3 text-[#C2A878]" aria-hidden="true">
              <span className="h-px w-14 bg-[#C2A878]/60" />
              <Heart size={14} fill="currentColor" className="text-[#C96F76]" />
              <Leaf size={14} className="text-[#5E6F52]" />
              <span className="h-px w-14 bg-[#C2A878]/60" />
            </div>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-[#5C5A56] sm:text-lg">
              Sorprende con canastas premium del campo chileno, seleccionadas con dedicación.
            </p>
          </header>
        </ScrollAnimation>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card, index) => (
            <ScrollAnimation key={card.id} delay={index * 70} className="h-full">
              <article className="group flex h-full flex-col overflow-hidden rounded-[1.45rem] border border-[#E9DED8] bg-[#FFFEFC] shadow-[0_14px_30px_rgba(43,43,40,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(43,43,40,0.14)]">
                <div className="relative h-52 overflow-hidden sm:h-56">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="font-heading text-2xl font-semibold leading-tight text-[#2B2B28]">{card.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#615F5A] sm:text-base">{card.description}</p>

                  <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#E9DED8] pt-4">
                    <span className="font-heading text-3xl font-semibold text-[#5E6F52]">{formatPrice(card.price)}</span>

                    <Link
                      to="/productos?categoria=otros"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#C2A878]/65 px-4 py-2 text-sm font-semibold text-[#5E6F52] transition-colors duration-300 hover:bg-[#F7EEE5] sm:px-5"
                    >
                      Ver productos
                      <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>
              </article>
            </ScrollAnimation>
          ))}
        </div>
      </div>
    </section>
  )
}
