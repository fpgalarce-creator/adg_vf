import { useEffect, useMemo, useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useProducts } from '../hooks/useProducts.js'
import { useCart } from '../context/CartContext.jsx'
import ScrollAnimation from './ScrollAnimation.jsx'
import { formatPrice } from './ProductCard.jsx'
import { getHighlightedProducts } from '../utils/featuredProducts.js'

const AUTOPLAY_INTERVAL = 4600

function MainFeaturedCard({ product }) {
  const { addItem } = useCart()

  return (
    <article className="group relative z-20 overflow-hidden rounded-[1.8rem] border border-white/50 bg-white/92 backdrop-blur-lg shadow-[0_26px_56px_rgba(15,23,42,0.34)] transition-all duration-700 ease-in-out hover:-translate-y-1.5 hover:shadow-[0_34px_64px_rgba(15,23,42,0.36)]">
      <div className="relative aspect-[5/4] overflow-hidden bg-cream-100">
        <img
          src={product.image}
          alt={product.title || product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      <div className="flex flex-col gap-3 p-4 sm:p-5">
        <h3 className="line-clamp-2 min-h-[3.15rem] font-heading text-xl font-semibold leading-tight text-dark sm:text-2xl">
          {product.title || product.name}
        </h3>

        <div className="mt-auto flex items-end justify-between gap-3">
          <span className="font-heading text-2xl font-bold text-olive-700 sm:text-[1.8rem]">{formatPrice(product.price)}</span>
          <button
            onClick={() => addItem(product)}
            className="inline-flex items-center gap-2 rounded-xl bg-olive-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-500 ease-in-out hover:bg-olive-700"
          >
            <ShoppingCart size={16} /> Agregar
          </button>
        </div>
      </div>
    </article>
  )
}

function PreviewCard({ product, onClick, variant }) {
  const variantClasses =
    variant === 'right'
      ? 'left-[66%] top-[16%] z-10 w-[48%] scale-[0.92] opacity-80'
      : 'left-[-28%] top-[30%] z-0 w-[44%] scale-[0.8] opacity-50'

  return (
    <button
      onClick={onClick}
      className={`group absolute hidden overflow-hidden rounded-[1.6rem] border border-white/38 bg-white/62 text-left backdrop-blur-sm transition-all duration-700 ease-in-out sm:block ${variantClasses} shadow-[0_14px_30px_rgba(15,23,42,0.18)] hover:opacity-90`}
      aria-label={`Ver ${product.title || product.name}`}
    >
      <div className="aspect-[3/2] bg-cream-100 overflow-hidden">
        <img
          src={product.image}
          alt={product.title || product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-[1.04]"
        />
      </div>
      <div className="px-3 py-2.5">
        <p className="line-clamp-1 text-xs font-semibold text-dark/80">{product.title || product.name}</p>
      </div>
    </button>
  )
}

export default function HeroFeaturedCarousel() {
  const { products } = useProducts()
  const highlightedProducts = useMemo(() => getHighlightedProducts(products, 8), [products])

  const [activeIndex, setActiveIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  useEffect(() => {
    if (!highlightedProducts.length) return
    setActiveIndex((prev) => (prev >= highlightedProducts.length ? 0 : prev))
  }, [highlightedProducts.length])

  useEffect(() => {
    if (highlightedProducts.length <= 1 || isHovered) return
    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % highlightedProducts.length)
    }, AUTOPLAY_INTERVAL)

    return () => window.clearInterval(timer)
  }, [highlightedProducts.length, isHovered])

  if (!highlightedProducts.length) return null

  const activeProduct = highlightedProducts[activeIndex]
  const nextProduct = highlightedProducts[(activeIndex + 1) % highlightedProducts.length]
  const trailingProduct = highlightedProducts[(activeIndex + 2) % highlightedProducts.length]

  return (
    <ScrollAnimation delay={180}>
      <div
        className="relative rounded-[2.3rem] border border-white/20 bg-white/[0.07] p-6 sm:p-7 backdrop-blur-[3px]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="pointer-events-none absolute inset-0 rounded-[2.3rem] bg-gradient-to-br from-white/12 via-white/[0.03] to-transparent" />

        <div className="relative min-h-[22rem] sm:min-h-[25.5rem]">
          <div
            key={activeProduct.id}
            className="relative z-20 w-full sm:w-[68%] sm:translate-x-[2%] transition-all duration-700 ease-in-out"
            style={{ animation: 'premiumFocusIn 700ms ease-in-out' }}
          >
            <MainFeaturedCard product={activeProduct} />
          </div>

          {highlightedProducts.length > 1 && nextProduct && (
            <PreviewCard
              product={nextProduct}
              variant="right"
              onClick={() => setActiveIndex((activeIndex + 1) % highlightedProducts.length)}
            />
          )}

          {highlightedProducts.length > 2 && trailingProduct && (
            <PreviewCard
              product={trailingProduct}
              variant="left"
              onClick={() => setActiveIndex((activeIndex + 2) % highlightedProducts.length)}
            />
          )}
        </div>

        <div className="mt-4 flex items-center gap-2 sm:gap-2.5">
          {highlightedProducts.slice(0, 6).map((product, idx) => {
            const realIndex = idx
            const isActive = realIndex === activeIndex
            return (
              <button
                key={product.id}
                onClick={() => setActiveIndex(realIndex)}
                className={`h-2.5 rounded-full transition-all duration-500 ${isActive ? 'w-8 bg-white' : 'w-2.5 bg-white/45 hover:bg-white/70'}`}
                aria-label={`Seleccionar ${product.title || product.name}`}
              />
            )
          })}
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2.5 sm:hidden">
        {highlightedProducts.slice(0, 3).map((product, idx) => (
          <button
            key={`${product.id}-${idx}`}
            onClick={() => setActiveIndex(idx)}
            className="overflow-hidden rounded-2xl border border-white/30 bg-white/50"
          >
            <div className="aspect-square bg-cream-100">
              <img src={product.image} alt={product.title || product.name} className="h-full w-full object-cover" loading="lazy" />
            </div>
          </button>
        ))}
      </div>
    </ScrollAnimation>
  )
}
