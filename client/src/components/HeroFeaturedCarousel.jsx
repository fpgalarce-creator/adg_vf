import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, ShoppingCart, Plus, Minus } from 'lucide-react'
import { useProducts } from '../hooks/useProducts.js'
import { useCart } from '../context/CartContext.jsx'
import ScrollAnimation from './ScrollAnimation.jsx'
import { formatPrice } from './ProductCard.jsx'

const MIN_FEATURED_TARGET = 5
const MAX_CAROUSEL_ITEMS = 10

function HeroProductCard({ product }) {
  const { addItem, updateQuantity, items } = useCart()
  const cartItem = items.find((item) => item.id === product.id)
  const quantity = cartItem ? cartItem.quantity : 0

  return (
    <article className="group h-full min-h-[22rem] rounded-3xl overflow-hidden border border-white/30 bg-white/90 backdrop-blur-lg shadow-[0_22px_45px_rgba(15,23,42,0.22)] flex flex-col">
      <div className="relative aspect-[4/3] bg-cream-100 overflow-hidden">
        <img src={product.image} alt={product.title || product.name} loading="lazy" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
        {product.featured && (
          <span className="absolute top-3 left-3 rounded-full bg-gold-500 text-white text-[10px] font-bold uppercase tracking-wide px-3 py-1.5">
            Destacado
          </span>
        )}
      </div>

      <div className="p-5 sm:p-6 flex flex-1 flex-col gap-4">
        <h3 className="font-heading text-xl font-semibold text-dark leading-tight line-clamp-2 min-h-[3.4rem]">{product.title || product.name}</h3>

        <div className="mt-auto flex items-end justify-between gap-3">
          <span className="font-heading font-bold text-2xl text-olive-700">{formatPrice(product.price)}</span>

          {quantity === 0 ? (
            <button onClick={() => addItem(product)} className="inline-flex items-center gap-2 bg-olive-600 hover:bg-olive-700 text-white px-4 py-2.5 rounded-xl text-sm font-semibold transition">
              <ShoppingCart size={16} /> Agregar
            </button>
          ) : (
            <div className="flex items-center bg-olive-600 rounded-xl overflow-hidden">
              <button onClick={() => updateQuantity(product.id, quantity - 1)} className="flex items-center justify-center w-9 h-10 text-white hover:bg-olive-700" aria-label="Disminuir cantidad">
                <Minus size={15} strokeWidth={2.5} />
              </button>
              <span className="flex items-center justify-center min-w-[2rem] h-10 text-white text-sm font-bold tabular-nums">{quantity}</span>
              <button onClick={() => addItem(product)} className="flex items-center justify-center w-9 h-10 text-white hover:bg-olive-700" aria-label="Aumentar cantidad">
                <Plus size={15} strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  )
}

export default function HeroFeaturedCarousel() {
  const { products } = useProducts()
  const trackRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)

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
    const card = viewport.querySelector('[data-hero-card]')
    const movement = card ? card.clientWidth + 20 : Math.round(viewport.clientWidth * 0.92)
    viewport.scrollBy({ left: direction * movement, behavior: 'smooth' })
  }

  useEffect(() => {
    if (!trackRef.current || highlightedProducts.length <= 1 || isHovered) return

    const viewport = trackRef.current
    const interval = window.setInterval(() => {
      const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth
      const next = viewport.scrollLeft + viewport.clientWidth * 0.92
      const target = next >= maxScrollLeft - 8 ? 0 : next
      viewport.scrollTo({ left: target, behavior: 'smooth' })
    }, 4200)

    return () => window.clearInterval(interval)
  }, [highlightedProducts.length, isHovered])

  if (!highlightedProducts.length) return null

  return (
    <ScrollAnimation delay={180}>
      <div
        id="destacados"
        className="relative rounded-[2rem] border border-white/20 bg-white/10 backdrop-blur-sm p-3 sm:p-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="absolute right-4 top-4 z-20 hidden sm:flex items-center gap-2">
          <button
            onClick={() => moveCarousel(-1)}
            className="h-9 w-9 rounded-full border border-white/45 bg-white/75 text-olive-700 hover:bg-white transition"
            aria-label="Ver productos anteriores"
          >
            <ChevronLeft className="mx-auto" size={18} />
          </button>
          <button
            onClick={() => moveCarousel(1)}
            className="h-9 w-9 rounded-full border border-white/45 bg-white/75 text-olive-700 hover:bg-white transition"
            aria-label="Ver productos siguientes"
          >
            <ChevronRight className="mx-auto" size={18} />
          </button>
        </div>

        <div
          ref={trackRef}
          className="flex overflow-x-auto gap-4 sm:gap-5 snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {highlightedProducts.map((product) => (
            <div
              key={product.id}
              data-hero-card
              className="snap-start shrink-0 basis-[88%] sm:basis-[78%] lg:basis-[76%] xl:basis-[48%]"
            >
              <HeroProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </ScrollAnimation>
  )
}
