import { Link } from 'react-router-dom'
import { ArrowRight, MessageCircle, Sparkles } from 'lucide-react'
import ScrollAnimation from './ScrollAnimation.jsx'
import { useProducts } from '../hooks/useProducts.js'
import { formatPrice } from './ProductCard.jsx'
import heroImageFallback from '../assets/contenido2.jpeg'
import cardImageFallback from '../assets/contenido.jpeg'

const defaultCampaign = {
  badge: 'Edición especial',
  title: 'Regalos perfectos para el Día de la Madre',
  subtitle: 'Sorprende con canastas premium del campo chileno, seleccionadas con dedicación.',
  mainImage: heroImageFallback,
  mainImageAlt: 'Canasta premium de campaña con productos del campo',
  ctaLabel: 'Ver todas las canastas',
  ctaTo: '/productos?categoria=otros',
  whatsappLabel: 'Hablar por WhatsApp',
}

const fallbackCards = [
  {
    id: 'canasta-clasica',
    title: 'Canasta Clásica',
    description: 'Selección balanceada de productos frescos y artesanales para regalar.',
    image: cardImageFallback,
    price: null,
  },
  {
    id: 'canasta-gourmet',
    title: 'Canasta Gourmet',
    description: 'Quesos, frutos secos y detalles premium para una experiencia inolvidable.',
    image: heroImageFallback,
    price: null,
  },
  {
    id: 'canasta-signature',
    title: 'Canasta Signature',
    description: 'Curaduría especial de temporada con presentación elegante.',
    image: cardImageFallback,
    price: null,
  },
]

const normalize = (value = '') => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim()

export default function FeaturedPromoSection({ campaign = {} }) {
  const { products } = useProducts()
  const mergedCampaign = { ...defaultCampaign, ...campaign }

  const promoProducts = products
    .filter((product) => {
      const category = normalize(product.category)
      return product.active && (category === 'otros' || category.includes('canasta'))
    })
    .slice(0, 3)
    .map((product) => ({
      id: product.id,
      title: product.title || product.name,
      description: product.description,
      image: product.image,
      price: Number(product.price) > 0 ? Number(product.price) : null,
    }))

  const cards = promoProducts.length > 0 ? promoProducts : fallbackCards

  const openWhatsApp = () => {
    const message = encodeURIComponent('¡Hola Alma de Granja! Quiero conocer las canastas promocionales 🌿')
    window.open(`https://wa.me/56958086762?text=${message}`, '_blank')
  }

  return (
    <section aria-label="Destacados promocionales" className="py-16 sm:py-20 lg:py-24 bg-[color:var(--bg-primary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="mb-8 sm:mb-10 lg:mb-12 text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#C4A35A]/35 bg-[#C4A35A]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-[#5C6B3C]">
              <Sparkles size={14} className="text-[#C4A35A]" />
              {mergedCampaign.badge}
            </span>
            <h2 className="mt-4 font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-[color:var(--text-primary)] text-balance">
              {mergedCampaign.title}
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[color:var(--text-secondary)] max-w-3xl">
              {mergedCampaign.subtitle}
            </p>
          </div>
        </ScrollAnimation>

        <div className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-6 lg:gap-8 items-stretch">
          <ScrollAnimation className="h-full">
            <article className="group relative h-full min-h-[320px] sm:min-h-[420px] overflow-hidden rounded-[2rem] border border-[color:var(--border-soft)] shadow-[0_20px_45px_rgba(18,24,17,0.1)]">
              <img
                src={mergedCampaign.mainImage}
                alt={mergedCampaign.mainImageAlt}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
            </article>
          </ScrollAnimation>

          <div className="grid grid-cols-1 gap-4 sm:gap-5">
            {cards.map((card, index) => (
              <ScrollAnimation key={card.id} delay={index * 80}>
                <article className="group rounded-3xl border border-[color:var(--border-soft)] bg-[color:var(--bg-card)] p-4 sm:p-5 shadow-[0_10px_30px_rgba(24,29,20,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_34px_rgba(20,25,18,0.12)]">
                  <div className="flex items-center gap-4">
                    <div className="h-20 w-20 sm:h-24 sm:w-24 overflow-hidden rounded-2xl bg-[color:var(--bg-secondary)] shrink-0">
                      <img src={card.image} alt={card.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="font-heading text-lg sm:text-xl font-semibold text-[color:var(--text-primary)] leading-tight">{card.title}</h3>
                      <p className="mt-1.5 text-sm text-[color:var(--text-secondary)] line-clamp-2">{card.description}</p>
                      <div className="mt-3 flex items-center justify-between gap-3">
                        <span className="font-heading text-base sm:text-lg font-bold text-[#5C6B3C]">
                          {card.price ? formatPrice(card.price) : 'Consultar precio'}
                        </span>
                        <Link
                          to={`${mergedCampaign.ctaTo}#destacados`}
                          className="inline-flex items-center gap-2 rounded-full border border-[#C4A35A]/45 px-4 py-2 text-sm font-semibold text-[#5C6B3C] transition-colors duration-300 hover:bg-[#C4A35A]/14"
                        >
                          Ver productos
                          <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollAnimation>
            ))}
          </div>
        </div>

        <ScrollAnimation delay={130}>
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to={mergedCampaign.ctaTo}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-[#5C6B3C] px-8 py-3.5 text-base font-semibold text-white shadow-[0_14px_30px_rgba(92,107,60,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#506033]"
            >
              {mergedCampaign.ctaLabel}
              <ArrowRight size={18} />
            </Link>

            <button
              type="button"
              onClick={openWhatsApp}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full border border-[#C4A35A]/45 bg-[#C4A35A]/10 px-8 py-3.5 text-base font-semibold text-[#5C6B3C] transition-colors duration-300 hover:bg-[#C4A35A]/18"
            >
              <MessageCircle size={18} />
              {mergedCampaign.whatsappLabel}
            </button>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  )
}
