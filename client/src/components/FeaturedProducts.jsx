import { useMemo, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ProductCard } from './ProductCard.jsx'
import ScrollAnimation from './ScrollAnimation.jsx'
import { useProducts } from '../hooks/useProducts.js'

const MIN_FEATURED_TARGET = 5
const MAX_CAROUSEL_ITEMS = 10

export default function FeaturedProducts() {
  const { products } = useProducts()
  const trackRef = useRef(null)

  const highlightedProducts = useMemo(() => {
    const activeProducts = products.filter((product) => product.active)
    const featuredProducts = activeProducts.filter((product) => product.featured)

    if (featuredProducts.length >= MIN_FEATURED_TARGET) {
      return featuredProducts.slice(0, MAX_CAROUSEL_ITEMS)
    }

    const fallbackProducts = activeProducts.filter((product) => !product.featured)
    return [...featuredProducts, ...fallbackProducts].slice(0, MAX_CAROUSEL_ITEMS)
  }, [products])

  const moveCarousel = (direction) => {
    if (!trackRef.current) return
    const viewport = trackRef.current
    const movement = Math.round(viewport.clientWidth * 0.85)
    viewport.scrollBy({ left: direction * movement, behavior: 'smooth' })
  }

  if (!highlightedProducts.length) return null

  return (
    <section id="destacados" className="py-20 sm:py-24 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollAnimation>
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between mb-10">
            <div className="max-w-2xl">
              <span className="inline-block text-gold-500 text-sm font-semibold uppercase tracking-[0.15em] mb-3">Selección curada</span>
              <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-dark mb-4">Destacados de la granja</h2>
              <p className="text-dark-light/70 text-lg">Nuestros productos más recomendados para una compra rápida, simple y premium.</p>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={() => moveCarousel(-1)}
                className="h-11 w-11 rounded-full border border-olive-200 text-olive-700 hover:bg-olive-50 transition"
                aria-label="Ver productos anteriores"
              >
                <ChevronLeft className="mx-auto" size={20} />
              </button>
              <button
                onClick={() => moveCarousel(1)}
                className="h-11 w-11 rounded-full border border-olive-200 text-olive-700 hover:bg-olive-50 transition"
                aria-label="Ver productos siguientes"
              >
                <ChevronRight className="mx-auto" size={20} />
              </button>
            </div>
          </div>
        </ScrollAnimation>

        <div
          ref={trackRef}
          className="flex gap-4 sm:gap-5 lg:gap-6 overflow-x-auto pb-4 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {highlightedProducts.map((product, index) => (
            <div key={product.id} className="snap-start shrink-0 basis-[86%] sm:basis-[47%] lg:basis-[31%] xl:basis-[24%] 2xl:basis-[19%]">
              <ScrollAnimation delay={index * 70}>
                <div className="h-full">
                  <ProductCard product={product} featured={product.featured} />
                </div>
              </ScrollAnimation>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
